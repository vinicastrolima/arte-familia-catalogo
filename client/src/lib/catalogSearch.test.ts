import { describe, expect, it } from "vitest";
import { matchesSearch, normalizeSearchText } from "./catalogSearch";

describe("catalog search", () => {
  it("ignores accents and letter case", () => {
    expect(normalizeSearchText("Mini SANDUÍCHE Natural")).toBe(
      "mini sanduiche natural"
    );
    expect(matchesSearch("sanduiche", ["Mini Sanduíche Natural"])).toBe(true);
  });

  it("matches every search term across different product fields", () => {
    expect(
      matchesSearch("ninho nutella", ["Doces gourmet", ["Ninho com Nutella"]])
    ).toBe(true);
    expect(
      matchesSearch("ninho morango", ["Doces gourmet", ["Ninho com Nutella"]])
    ).toBe(false);
  });

  it("treats punctuation and extra spaces as separators", () => {
    expect(
      matchesSearch("  coffee-break  ", ["Coffee Break para eventos"])
    ).toBe(true);
  });
});
