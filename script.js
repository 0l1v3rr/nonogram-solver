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