const cardPosition = (cardLength: number): { height: number, width: number, x: number, y: number, sum: number } => {
  const { width, height } = document.getElementById('card-container').getBoundingClientRect()
  const x = width / cardLength
  return { width, height, x, y: (height / 2) - 75, sum: x / cardLength }
}

export default cardPosition
