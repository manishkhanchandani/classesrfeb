export const addNumber = (number) {
  return {
    type: 'MATH_ADD',
    payload: number
  }
}

export const subtractNumber = (number) {
  return {
    type: 'MATH_SUBTRACT',
    payload: number
  }
}
