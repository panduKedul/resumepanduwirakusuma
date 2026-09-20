import { describe, it, expect } from "vitest";
import { filterBy } from "./components/filter";
import profile from "./data/profile.json";

describe("filterBy", () => {
  it("passthrough all/all returns full list", () => {
    expect(filterBy(profile.projects, "all", "all")).toHaveLength(10);
    expect(filterBy(profile.research, "all", "all")).toHaveLength(5);
  });
  it("filters by year 2022", () => {
    const res = filterBy(profile.projects, "2022", "all");
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => String(p.year) === "2022")).toBe(true);
    expect(res).toHaveLength(4);
  });
  it("filters by category", () => {
    const res = filterBy(profile.projects, "all", "UI/UX");
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => (p.tags || []).includes("UI/UX"))).toBe(true);
  });
  it("filters by year + category combo", () => {
    const res = filterBy(profile.projects, "2022", "UI/UX");
    expect(res.every((p) => String(p.year) === "2022" && p.tags.includes("UI/UX"))).toBe(true);
  });
});
