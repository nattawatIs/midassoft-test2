let start = "d6";
let target = "h8";
let brokentiles = ["f6", "f7"];

function getMinMove(start, target, brokenTiles) {
  const horseMove = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const letters = "abcdefgh".split("");

  // แปลงตำแหน่งเป็บ array d6 => [3,5]
  function toArray(pos) {
    const row = parseInt(pos[1]) - 1;
    const col = letters.indexOf(pos[0]);

    return [row, col];
  }

  const brokenSet = new Set();
  for (const broken of brokenTiles) {
    const [x, y] = toArray(broken);
    brokenSet.add(`${x},${y}`);
  }

  console.log(brokenSet);

  const [startX, startY] = toArray(start); // [3,5]
  const [targetX, targetY] = toArray(target); // [7,7]

  const queue = [{ x: startX, y: startY, moves: 0 }];
  const visited = new Set([`${startX},${startY}`]);

  while (queue.length > 0) {
    const { x, y, moves } = queue.shift();

    if (x == targetX && y == targetY) return moves;

    for (const [dx, dy] of horseMove) {
      let nx = x + dx;
      let ny = y + dy;
      let nextKey = `${nx},${ny}`;

      if (
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        !visited.has(nextKey) &&
        !brokenSet.has(nextKey)
      ) {
        visited.add(nextKey);
        queue.push({ x: nx, y: ny, moves: moves + 1 });
      }
    }
  }

  return -1;
}

console.log(getMinMove("d6", "h8", ["f6", "f7"]));
console.log(getMinMove("a1", "h8", []));
