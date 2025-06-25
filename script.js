const puzzle = document.getElementById("puzzle");
const size = 5;
let tiles = [];
let emptyIndex = 24;
let level = 1;

function setLevel(lvl) {
  level = lvl;
  resetPuzzle();
}

function resetPuzzle() {
  tiles = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
  shuffle(tiles);
  tiles.push(null); // empty tile
  emptyIndex = tiles.indexOf(null);
  renderPuzzle();
  closePopup();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderPuzzle() {
  puzzle.innerHTML = '';
  tiles.forEach((val, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (val === null) {
      tile.classList.add('empty');
    } else {
      tile.addEventListener('click', () => moveTile(index));
      if (level === 1) { //Show numbers on each tile
        tile.textContent = val;
      }
    }
    puzzle.appendChild(tile);
  });
}

function moveTile(index) {
  const validMoves = [index - 1, index + 1, index - size, index + size];
  if (
    validMoves.includes(emptyIndex) &&
    Math.abs(index % size - emptyIndex % size) +
      Math.abs(Math.floor(index / size) - Math.floor(emptyIndex / size)) === 1
  ) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    emptyIndex = index;
    renderPuzzle();
    if (checkWin()) setTimeout(showPopup, 300);
  }
}

function checkWin() {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return true;
}

function showPopup() {
  document.getElementById('winPopup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('winPopup').style.display = 'none';
}

// Initialize
resetPuzzle();
//886356