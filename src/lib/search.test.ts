import { describe, expect, it } from "vitest";
import { closestWord, indexWords, matchesAll, matchesAny, parseQuery, stem } from "./search";

describe("stem", () => {
  it.each([
    ["tacos", "taco"],
    ["burgers", "burger"],
    ["noodles", "noodle"],
    ["curries", "curry"],
    ["sandwiches", "sandwich"],
    ["potatoes", "potato"],
    ["bbq", "bbq"],
    ["glass", "glass"],
  ])("%s → %s", (word, expected) => expect(stem(word)).toBe(expected));
});

describe("parseQuery", () => {
  it("drops filler words so phrases like 'indian food' work (Round 1 bug)", () => {
    expect(parseQuery("indian food").tokens).toEqual(["indian"]);
    expect(parseQuery("best burgers in provo").tokens).toEqual(["burger", "provo"]);
    expect(parseQuery("pizza near me").tokens).toEqual(["pizza"]);
  });

  it("joins multi-word names into one token", () => {
    expect(parseQuery("Hot Dogs").tokens).toEqual(["hotdog"]);
    expect(parseQuery("barbecue").tokens).toEqual(["bbq"]);
    expect(parseQuery("bar-b-q").tokens).toEqual(["bbq"]);
  });

  it("treats 'cheap' as a price filter, not a search word", () => {
    expect(parseQuery("cheap tacos")).toEqual({ tokens: ["taco"], cheap: true });
  });

  it("ignores accents, punctuation and case", () => {
    expect(parseQuery("Bánh Mì!").tokens).toEqual(["banh", "mi"]);
    expect(parseQuery("Nonna's").tokens).toEqual(["nonna"]);
  });

  it("returns nothing for an empty search", () => {
    expect(parseQuery("   ")).toEqual({ tokens: [], cheap: false });
  });
});

describe("matching", () => {
  const words = indexWords("Black Sheep Cafe", "Green Chile Pork Navajo Taco");

  it("matches prefixes so results update while typing", () => {
    expect(matchesAll(words, ["nav"])).toBe(true);
    expect(matchesAll(words, ["taco", "pork"])).toBe(true);
  });

  it("requires every word for matchesAll but only one for matchesAny", () => {
    expect(matchesAll(words, ["taco", "sushi"])).toBe(false);
    expect(matchesAny(words, ["taco", "sushi"])).toBe(true);
  });
});

describe("closestWord", () => {
  const vocab = ["pizza", "ramen", "burger", "taco"];

  it("fixes small typos", () => {
    expect(closestWord("piza", vocab)).toBe("pizza");
    expect(closestWord("ramn", vocab)).toBe("ramen");
    expect(closestWord("burgr", vocab)).toBe("burger");
  });

  it("does not suggest for exact matches, very short words or far-off words", () => {
    expect(closestWord("pizza", vocab)).toBeUndefined();
    expect(closestWord("pz", vocab)).toBeUndefined();
    expect(closestWord("sushi", vocab)).toBeUndefined();
  });
});
