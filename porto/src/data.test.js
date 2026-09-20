import { describe, it, expect } from "vitest";
import p from "./data/profile.json";

describe("profile", () => {
  it("has 10 projects + 5 research", () => {
    expect(p.projects.length).toBe(10);
    expect(p.research.length).toBe(5);
  });
  it("has hero, education[2], experience[4], orgs[6], contact", () => {
    expect(p.hero.name).toBe("Muhammad Pandu Wirakusuma");
    expect(p.education.length).toBe(2);
    expect(p.experience.length).toBe(4);
    expect(p.orgs.length).toBe(6);
    expect(p.contact.emails.length).toBe(2);
  });
});
