export function snapToGrid(
    value: number,
    gridSize = 10
  ) {
    return (
      Math.round(value / gridSize) *
      gridSize
    )
  }
