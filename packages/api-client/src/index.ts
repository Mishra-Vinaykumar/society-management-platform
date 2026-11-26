import {
  healthResponseSchema,
  problemDetailsSchema,
  type HealthResponse,
  type ProblemDetails,
} from "@society/contracts";

export interface HttpRequest {
  body?: unknown;
  headers: Readonly<Record<string, string>>;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
}

export interface HttpResponse {
  body: unknown;
  headers?: Readonly<Record<string, string>>;
  status: number;
}

export type HttpTransport = (request: HttpRequest) => Promise<HttpResponse>;
export type AccessTokenProvider = () => Promise<string | null>;

export interface ApiClientOptions {
  accessTokenProvider?: AccessTokenProvider;
  baseUrl: string;
  transport: HttpTransport;
}

export class ApiClientError extends Error {
  public readonly problem: ProblemDetails | undefined;
  public readonly status: number;

  public constructor(status: number, problem?: ProblemDetails) {
    super(problem?.detail ?? `API request failed with status ${status}.`);
    this.name = "ApiClientError";
    this.status = status;
    this.problem = problem;
  }
}

export class ApiClient {
  readonly #accessTokenProvider: AccessTokenProvider | undefined;
  readonly #baseUrl: string;
  readonly #transport: HttpTransport;

  public constructor(options: ApiClientOptions) {
    this.#baseUrl = options.baseUrl.replace(/\/$/u, "");
    this.#transport = options.transport;
    this.#accessTokenProvider = options.accessTokenProvider;
  }

  public async getHealth(): Promise<HealthResponse> {
    const response = await this.#request({ method: "GET", path: "/health" });
    return healthResponseSchema.parse(response.body);
  }

  async #request(input: { method: HttpRequest["method"]; path: string }): Promise<HttpResponse> {
    const token = await this.#accessTokenProvider?.();
    const headers: Record<string, string> = { accept: "application/json" };

    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const response = await this.#transport({
      headers,
      method: input.method,
      url: `${this.#baseUrl}${input.path}`,
    });

    if (response.status < 200 || response.status >= 300) {
      const parsedProblem = problemDetailsSchema.safeParse(response.body);
      throw new ApiClientError(
        response.status,
        parsedProblem.success ? parsedProblem.data : undefined,
      );
    }

    return response;
  }
}
