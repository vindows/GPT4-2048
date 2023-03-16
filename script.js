class Tile {
  constructor(value) {
    this.value = value;
    this.div = document.createElement('div');
    this.update();
  }

  update() {
    this.div.innerText = this.value || '';
    this.div.className = 'tile-' + this.value;
    this.div.classList.add('grid-tile'); // Add this line
  }
}

function createGrid(size) {
  const grid = document.querySelector('.grid');
  const tiles = [];

  for (let i = 0; i < size; i++) {
    tiles[i] = [];
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      grid.appendChild(cell);

      const tile = new Tile(0);
      tiles[i][j] = tile;
      cell.appendChild(tile.div);
    }
  }

  return tiles;
}
// Rest of the script remains the same


function addRandomTile(tiles) {
  const emptyTiles = [];

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j].value === 0) {
        emptyTiles.push({ i, j });
      }
    }
  }

  if (emptyTiles.length) {
    const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    tiles[i][j].value = Math.random() < 0.9 ? 2 : 4;
    tiles[i][j].update();
  }
}

function move(tiles, direction) {
  let moved = false;

  if (direction === 'ArrowUp' || direction === 'ArrowLeft') {
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        moved |= moveTile(tiles, i, j, direction);
      }
    }
  } else {
    for (let i = tiles.length - 1; i >= 0; i--) {
      for (let j = tiles[i].length - 1; j >= 0; j--) {
        moved |= moveTile(tiles, i, j, direction);
      }
    }
  }

  if (moved) {
    addRandomTile(tiles);
  }
}

function moveTile(tiles, i, j, direction) {
  if (tiles[i][j].value === 0) return false;

  const [di, dj] = direction === 'ArrowUp' ? [-1, 0] :
                   direction === 'ArrowRight' ? [0, 1] :
                   direction === 'ArrowDown' ? [1, 0] : [0, -1];

  let [ni, nj] = [i + di, j + dj];

  while (ni >= 0 && nj >= 0 && ni < tiles.length && nj < tiles[ni].length) {
    if (tiles[ni][nj].value === 0) {
      tiles[ni][nj].value = tiles[i][j].value;
      tiles[ni][nj].update();
      tiles[i][j].value = 0;
      tiles[i][j].update();
      [i, j] = [ni, nj];
      [ni, nj] = [i + di, j + dj];
    } else if (tiles[ni][nj].value === tiles[i][j].value) {
      tiles[ni][nj].value *= 2;
      tiles[ni][nj].update();
      tiles[i][j].value = 0;
      tiles[i][j].update();
      return true;
    } else {
      break;
    }

      return i !== ni - di || j !== nj - dj;
}

function handleKeyPress(event) {
  if (event.key.startsWith('Arrow')) {
    move(grid, event.key); // Change this line
  }
}

const grid = createGrid(4); // Change this line
addRandomTile(grid); // Change this line
addRandomTile(grid); // Change this line
document.addEventListener('keydown', handleKeyPress);
