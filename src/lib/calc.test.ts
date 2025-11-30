import { describe, expect, it } from "vitest"
import { compute, formatNumber } from "./calc"

describe("compute", () => {
  it("adds numbers", () => {
    expect(compute("12", "7", "+")).toBe("19")
  })

  it("subtracts numbers", () => {
    expect(compute("20", "5", "-")).toBe("15")
  })

  it("multiplies numbers", () => {
    expect(compute("3", "4", "×")).toBe("12")
  })

  it("divides numbers", () => {
    expect(compute("10", "2", "÷")).toBe("5")
  })

  it("handles division by zero", () => {
    expect(compute("10", "0", "÷")).toBe("NaN")
  })

  it("rounds floating point results reasonably", () => {
    expect(compute("0.1", "0.2", "+")).toBe("0.3")
  })
})

describe("formatNumber", () => {
  it("formats integer with separators", () => {
    expect(formatNumber("1234567")).toBe("1,234,567")
  })

  it("keeps decimal part", () => {
    expect(formatNumber("1234.56")).toBe("1,234.56")
  })
})
