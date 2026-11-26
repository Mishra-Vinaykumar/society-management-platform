import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the Phase 01 foundation without presenting production data", () => {
    const markup = renderToStaticMarkup(createElement(HomePage));

    expect(markup).toContain("One reliable foundation for every society experience.");
    expect(markup).toContain("Production data");
    expect(markup).toContain("Not connected");
  });
});
