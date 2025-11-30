export type Operator = '+' | '-' | '×' | '÷'

export function formatNumber(value: string) {
  const [int, dec] = value.split('.')
  const i = Number(int)
  const intl = new Intl.NumberFormat('en-US').format(isNaN(i) ? 0 : i)
  return dec !== undefined ? `${intl}.${dec}` : intl
}

export function compute(a: string, b: string, op: Operator) {
  const x = Number(a)
  const y = Number(b)
  let r = 0
  if (op === '+') r = x + y
  else if (op === '-') r = x - y
  else if (op === '×') r = x * y
  else if (op === '÷') r = y === 0 ? NaN : x / y
  const s = String(r)
  return s.includes('.') ? String(Number(r.toFixed(12))) : s
}
