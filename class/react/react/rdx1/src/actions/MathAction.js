
export const addNumber = (number) => {
  return {
    type: 'ADD',
    payload: number
  }
};


export const subNumber = (number) => {
  return {
    type: 'SUBTRACT',
    payload: number
  }
};
