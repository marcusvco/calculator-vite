import { useState } from "react"
import "./App.css"

type Operator = "+" | "-" | "×" | "÷" | null

function formatNumber(value: string) {
  const [int, dec] = value.split(".")
  const i = Number(int)
  const intl = new Intl.NumberFormat("en-US").format(isNaN(i) ? 0 : i)
  return dec !== undefined ? `${intl}.${dec}` : intl
}

function App() {
  const [current, setCurrent] = useState<string>("0")
  const [previous, setPrevious] = useState<string | null>(null)
  const [operator, setOperator] = useState<Operator>(null)
  const [overwrite, setOverwrite] = useState<boolean>(true)

  function inputDigit(d: string) {
    if (overwrite) {
      setCurrent(d)
      setOverwrite(false)
    } else {
      setCurrent((v) => (v === "0" ? d : v + d))
    }
  }

  function inputDecimal() {
    setCurrent((v) => (v.includes(".") ? v : v + "."))
    setOverwrite(false)
  }

  function chooseOperator(op: Exclude<Operator, null>) {
    if (operator && previous !== null && !overwrite) {
      const r = compute(previous, current, operator)
      setPrevious(r)
      setCurrent(r)
    } else {
      setPrevious(current)
    }
    setOperator(op)
    setOverwrite(true)
  }

  function clearAll() {
    setCurrent("0")
    setPrevious(null)
    setOperator(null)
    setOverwrite(true)
  }

  function toggleSign() {
    setCurrent((v) =>
      v.startsWith("-") ? v.slice(1) : v === "0" ? "0" : "-" + v
    )
  }

  function percent() {
    setCurrent((v) => String(Number(v) / 100))
  }

  function equals() {
    if (operator && previous !== null) {
      const r = compute(previous, current, operator)
      setCurrent(r)
      setPrevious(null)
      setOperator(null)
      setOverwrite(true)
    }
  }

  function compute(a: string, b: string, op: Exclude<Operator, null>) {
    const x = Number(a)
    const y = Number(b)
    let r = 0
    if (op === "+") r = x + y
    else if (op === "-") r = x - y
    else if (op === "×") r = x * y
    else if (op === "÷") r = y === 0 ? NaN : x / y
    const s = String(r)
    return s.includes(".") ? String(Number(r.toFixed(12))) : s
  }

  const display = formatNumber(current)

  return (
    <div className="calculator">
      <div className="display" aria-label="display">
        {display}
      </div>
      <div className="keys">
        <button className="key utility" onClick={clearAll}>
          AC
        </button>
        <button className="key utility" onClick={toggleSign}>
          ±
        </button>
        <button className="key utility" onClick={percent}>
          %
        </button>
        <button className="key operator" onClick={() => chooseOperator("÷")}>
          ÷
        </button>
        <button className="key" onClick={() => inputDigit("7")}>
          7
        </button>
        <button className="key" onClick={() => inputDigit("8")}>
          8
        </button>
        <button className="key" onClick={() => inputDigit("9")}>
          9
        </button>
        <button className="key operator" onClick={() => chooseOperator("×")}>
          ×
        </button>
        <button className="key" onClick={() => inputDigit("4")}>
          4
        </button>
        <button className="key" onClick={() => inputDigit("5")}>
          5
        </button>
        <button className="key" onClick={() => inputDigit("6")}>
          6
        </button>
        <button className="key operator" onClick={() => chooseOperator("-")}>
          −
        </button>
        <button className="key" onClick={() => inputDigit("1")}>
          1
        </button>
        <button className="key" onClick={() => inputDigit("2")}>
          2
        </button>
        <button className="key" onClick={() => inputDigit("3")}>
          3
        </button>
        <button className="key operator" onClick={() => chooseOperator("+")}>
          +
        </button>
        <button className="key span-2" onClick={() => inputDigit("0")}>
          0
        </button>
        <button className="key" onClick={inputDecimal}>
          .
        </button>
        <button className="key equals" onClick={equals}>
          =
        </button>
      </div>
    </div>
  )
}

export default App
