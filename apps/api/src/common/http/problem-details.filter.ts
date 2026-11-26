import { randomUUID } from "node:crypto";

import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  type ExceptionFilter,
} from "@nestjs/common";
import type { ProblemDetails } from "@society/contracts";

interface RequestLike {
  headers: Readonly<Record<string, string | string[] | undefined>>;
  originalUrl?: string;
  url: string;
}

interface ResponseLike {
  json(body: ProblemDetails): void;
  status(statusCode: number): ResponseLike;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function titleFromStatus(status: number): string {
  const statusName = HttpStatus[status];

  if (typeof statusName !== "string") {
    return status >= 500 ? "Internal server error" : "Request failed";
  }

  return statusName
    .toLowerCase()
    .split("_")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<RequestLike>();
    const response = http.getResponse<ResponseLike>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = isHttpException ? exception.getResponse() : undefined;
    const responseRecord = isRecord(exceptionResponse) ? exceptionResponse : undefined;
    const responseMessage = responseRecord?.message;
    const requestHeader = request.headers["x-request-id"];
    const requestId =
      typeof requestHeader === "string" && requestHeader.length > 0 ? requestHeader : randomUUID();
    const detail =
      status >= 500
        ? "The server could not complete the request."
        : typeof responseMessage === "string"
          ? responseMessage
          : typeof exceptionResponse === "string"
            ? exceptionResponse
            : titleFromStatus(status);
    const errors = Array.isArray(responseMessage)
      ? responseMessage.map((message) => ({
          code: "VALIDATION_ERROR",
          message: String(message),
        }))
      : undefined;
    const problem: ProblemDetails = {
      type: "about:blank",
      title: titleFromStatus(status),
      status,
      code: status === 422 ? "VALIDATION_ERROR" : `HTTP_${status}`,
      detail,
      instance: request.originalUrl ?? request.url,
      requestId,
      ...(errors ? { errors } : {}),
    };

    response.status(status).json(problem);
  }
}
