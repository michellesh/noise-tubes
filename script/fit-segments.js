// Divide 10ft stock pieces into segments

const stockLength = 3048 // 10 ft
const numStockPieces = 4 // 40 ft total
const bladeWidth = 4 // ~1/8" (3.18mm) rounded up

// Circle!
// Units: millimeters
const segments = [
  { index: 0, length: 247 },
  { index: 1, length: 391 },
  { index: 2, length: 486 },
  { index: 3, length: 557 },
  { index: 4, length: 612 },
  { index: 5, length: 656 },
  { index: 6, length: 691 },
  { index: 7, length: 719 },
  { index: 8, length: 739 },
  { index: 9, length: 753 },
  { index: 10, length: 760 },
  { index: 11, length: 762 },
  { index: 12, length: 760 },
  { index: 13, length: 753 },
  { index: 14, length: 739 },
  { index: 15, length: 719 },
  { index: 16, length: 691 },
  { index: 17, length: 656 },
  { index: 18, length: 612 },
  { index: 19, length: 557 },
  { index: 20, length: 486 },
  { index: 21, length: 391 },
  { index: 22, length: 247 },
]

// Sine Wave!
// Units: millimeters
/*
const segments = [
  { index: 0, length: 150 },
  { index: 1, length: 181 },
  { index: 2, length: 217 },
  { index: 3, length: 283 },
  { index: 4, length: 361 },
  { index: 5, length: 424 },
  { index: 6, length: 469 },
  { index: 7, length: 490 },
  { index: 8, length: 493 },
  { index: 9, length: 484 },
  { index: 10, length: 474 },
  { index: 11, length: 489 },
  { index: 12, length: 506 },
  { index: 13, length: 517 },
  { index: 14, length: 522 },
  { index: 15, length: 522 },
  { index: 16, length: 518 },
  { index: 17, length: 509 },
  { index: 18, length: 492 },
  { index: 19, length: 474 },
  { index: 20, length: 482 },
  { index: 21, length: 492 },
  { index: 22, length: 492 },
  { index: 23, length: 474 },
  { index: 24, length: 432 },
  { index: 25, length: 372 },
  { index: 26, length: 296 },
  { index: 27, length: 225 },
  { index: 28, length: 187 },
  { index: 29, length: 153 }
]
*/

function compareFn(a, b) {
  if (a.length < b.length) { // a is less than b by some ordering criterion
    return -1;
  } else if (a.length > b.length) { // a is greater than b by the ordering criterion
    return 1;
  }
  // a must be equal to b
  return 0;
}

sortedSegments = segments.map(s =>
  ({ ...s, length: s.length + bladeWidth })
).sort(compareFn).reverse()

stockPieces = [] // [ [522, 518, ...] ... ]

const sum = arr => arr.reduce((acc, x) => acc + x, 0)

const doesSegmentFit = (stockPiece, segment) => {
  const total = sum(stockPiece) + segment
  return (total) < stockLength
}

sortedSegments.map(s => {
  let currentIndex = 0;
  while (s.stockPieceIndex == undefined) {
    if (!stockPieces[currentIndex]) {
      stockPieces[currentIndex] = []
    }
    if (doesSegmentFit(stockPieces[currentIndex], s.length)) {
      stockPieces[currentIndex].push(s.length)
      s.stockPieceIndex = currentIndex
    }
    currentIndex++
  }
  return s
})

stockPieces.forEach(stockPiece => {
  const total = sum(stockPiece)
  console.log(stockPiece.map(x => x - bladeWidth), "total", total, "remaining", stockLength - total)
})
