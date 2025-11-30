import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import App from "./App"

test("adds 12 + 7 = 19", async () => {
  const user = userEvent.setup()
  render(<App />)
  const display = screen.getByLabelText("display")
  await user.click(screen.getByRole("button", { name: "1" }))
  await user.click(screen.getByRole("button", { name: "2" }))
  await user.click(screen.getByRole("button", { name: "+" }))
  await user.click(screen.getByRole("button", { name: "7" }))
  await user.click(screen.getByRole("button", { name: "=" }))
  expect(display.textContent).toBe("19")
})

test("multiplies with decimal: 5 × 3.2 = 16", async () => {
  const user = userEvent.setup()
  render(<App />)
  const display = screen.getByLabelText("display")
  await user.click(screen.getByRole("button", { name: "5" }))
  await user.click(screen.getByRole("button", { name: "×" }))
  await user.click(screen.getByRole("button", { name: "3" }))
  await user.click(screen.getByRole("button", { name: "." }))
  await user.click(screen.getByRole("button", { name: "2" }))
  await user.click(screen.getByRole("button", { name: "=" }))
  expect(display.textContent).toBe("16")
})

test("percent converts value to fraction", async () => {
  const user = userEvent.setup()
  render(<App />)
  const display = screen.getByLabelText("display")
  await user.click(screen.getByRole("button", { name: "5" }))
  await user.click(screen.getByRole("button", { name: "0" }))
  await user.click(screen.getByRole("button", { name: "%" }))
  expect(display.textContent).toBe("0.5")
})

test("toggle sign", async () => {
  const user = userEvent.setup()
  render(<App />)
  const display = screen.getByLabelText("display")
  await user.click(screen.getByRole("button", { name: "9" }))
  await user.click(screen.getByRole("button", { name: "±" }))
  expect(display.textContent).toBe("-9")
})

test("AC clears state", async () => {
  const user = userEvent.setup()
  render(<App />)
  const display = screen.getByLabelText("display")
  await user.click(screen.getByRole("button", { name: "9" }))
  await user.click(screen.getByRole("button", { name: "AC" }))
  expect(display.textContent).toBe("0")
})
