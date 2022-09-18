declare module '*.png' {
  const value: any;
  export default value;
}

type Card = {
  id?: string | number
  front?: number,
  flipped?: boolean,
  top?: number,
  left?: number,
  transition?: number
}
