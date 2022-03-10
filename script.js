import solve from './solver.js';

/*const x = [
    '4 4',
    '1 2 3 2',
    '13 1',
    '13',
    '4 2 2',
    '7 1 1',
    '1 4 1 2',
    '1 3 3',
    '1 4 1 2',
    '7 1',
    '4 2 1',
    '13',
    '8 3 2',
    '1 6 2',
    '4 4',
];
const y = [
    '3 3',
    '1 1 5 1 1',
    '1 4 4 1',
    '6 6',
    '13',
    '12',
    '3 5 3',
    '6 6',
    '5 2 2',
    '1 2 3 2 1',
    '1 2 1 2 1',
    '1 2 3 2 1',
    '3 2 2 1 1',
    '1 2 3',
    '4 3',
];

const solution = solve(x, y, 15, 15);

for(let i = 0; i < 15; i++) {
    let res = "";
    for(let j = 0; j < 15; j++) {
        if(solution[i][j]) res += "#";
        else res += " ";
    }
    console.log(res);
}*/

const gridSizePanel = document.querySelector('[data-grid-size]');
const mainPanel = document.querySelector('[data-main]');

const gridContainer = document.querySelector('[data-grid-container]');
const gridHeader = document.querySelector('[data-main-header]');

const backBtn = document.querySelector('[data-back-btn]');

const nextBtn = document.querySelector('[data-next-btn]');
const grid5x5 = document.getElementById('grid-5x5');
const grid10x10 = document.getElementById('grid-10x10');
const grid15x15 = document.getElementById('grid-15x15');

let activeGridSize = 5;

function handleGridClick(e, gridSize) {
    grid5x5.classList.remove('active');
    grid10x10.classList.remove('active');
    grid15x15.classList.remove('active');
    e.target.classList.add('active');
    activeGridSize = gridSize;
}

grid5x5.onclick = (e) => handleGridClick(e, 5);
grid10x10.onclick = (e) => handleGridClick(e, 10);
grid15x15.onclick = (e) => handleGridClick(e, 15);

nextBtn.onclick = () => {
    gridSizePanel.style.display = 'none';
    mainPanel.style.display = 'block';
    generateEmptyGrid();
    gridHeader.innerHTML = `Nonogram - ${activeGridSize}x${activeGridSize}`;
}

backBtn.onclick = () => {
    gridSizePanel.style.display = 'block';
    mainPanel.style.display = 'none';
    grid5x5.classList.add('active');
    grid10x10.classList.remove('active');
    grid15x15.classList.remove('active');
    activeGridSize = 5;
}

function generateEmptyGrid() {
    let gridInnerHtml = '';
    for(let i = 0; i < activeGridSize * activeGridSize; i++) {
        gridInnerHtml += '<div class="nonogram-grid-item"></div>';
    }
    document.documentElement.style.setProperty('--grid-size', activeGridSize);
    gridContainer.innerHTML = gridInnerHtml;
}