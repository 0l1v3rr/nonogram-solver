import solve from './solver.js';

let x = [];
let y = [];

const gridSizePanel = document.querySelector('[data-grid-size]');
const mainPanel = document.querySelector('[data-main]');
const popup = document.querySelector('[data-popup]');

const gridContainer = document.querySelector('[data-grid-container]');
const gridHeader = document.querySelector('[data-main-header]');

const backBtn = document.querySelector('[data-back-btn]');
const solveBtn = document.querySelector('[data-solve-btn]');
const understandBtn = document.querySelector('[data-understand-btn]');

const eraseBtn = document.querySelector('[data-erase-btn]');

const nextBtn = document.querySelector('[data-next-btn]');
const grid5x5 = document.getElementById('grid-5x5');
const grid10x10 = document.getElementById('grid-10x10');
const grid15x15 = document.getElementById('grid-15x15');

const gridDataSidebar = document.querySelector('[data-grid-sidebar]');
const gridDataHeader = document.querySelector('[data-grid-header]');

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

solveBtn.onclick = () => {
    x = [];
    y = [];
    for(let i = 0; i < activeGridSize; i++) {
        let xvalue = document.getElementById(`x-value-${i}`).innerText;
        if(xvalue.includes(',')) {
            x.push(xvalue.split(',').join(' ').split(', ').join(' '));
        } else {
            x.push(xvalue);
        }

        let yvalue = document.getElementById(`y-value-${i}`).innerText;
        if(yvalue.includes(',')) {
            y.push(yvalue.split(', ').join(' ').split(',').join(' ').trim());
        } else {
            y.push(yvalue);
        }
    }

    const solution = solve(x, y, activeGridSize, activeGridSize);
    if(solution == null) {
        popup.classList.add('active');
        mainPanel.classList.add('blur');
        emptyGrid();
        return;
    }

    let gridInnerHtml = '';
    let classes = 'nonogram-grid-item ';

    for(let i = 0; i < activeGridSize; i++) {
        for(let j = 0; j < activeGridSize; j++) {

            if(i === 0) classes += 'bt-0 ';
            if(i === activeGridSize - 1) classes += 'bb-0 ';
            if(j === 0) classes += 'bl-0 ';
            if(j === activeGridSize - 1) classes += 'br-0 ';

            if(solution[i][j]) classes += 'filled ';

            gridInnerHtml += `<div class="${classes}"></div>`;
            classes = 'nonogram-grid-item ';
        }
    }
    gridContainer.innerHTML = gridInnerHtml;
}

understandBtn.onclick = () => {
    popup.classList.remove('active');
    mainPanel.classList.remove('blur');
}

eraseBtn.onclick = () => {
    generateEmptyGrid();
}

function generateEmptyGrid() {
    emptyGrid();    

    let gridHeaderHtml = '';
    let gridSidebarHtml = '';
    for(let i = 0; i < activeGridSize; i++) {
        gridHeaderHtml += `<div class="header-input" id="x-value-${i}" contenteditable="true">${activeGridSize}</div>`;
        gridSidebarHtml += `<div class="header-input" id="y-value-${i}" contenteditable="true">${activeGridSize}</div>`;
    }

    document.documentElement.style.setProperty('--grid-size', activeGridSize);
    gridDataSidebar.innerHTML = gridSidebarHtml;
    gridDataHeader.innerHTML = gridHeaderHtml;
}

function emptyGrid() {
    let gridInnerHtml = '';
    let classes = 'nonogram-grid-item ';

    for(let i = 0; i < activeGridSize; i++) {
        for(let j = 0; j < activeGridSize; j++) {

            if(i === 0) classes += 'bt-0 ';
            if(i === activeGridSize - 1) classes += 'bb-0 ';
            if(j === 0) classes += 'bl-0 ';
            if(j === activeGridSize - 1) classes += 'br-0 ';

            if(activeGridSize > 5) {
                if((j + 1) % 5 === 0 && j != activeGridSize - 1) classes += 'br-1 ';
                if(j % 5 === 0 && j != 0) classes += 'bl-1 ';
                if((i + 1) % 5 === 0 && i != activeGridSize - 1) classes += 'bb-1 ';
                if(i % 5 === 0 && i != 0) classes += 'bt-1 ';
            }

            gridInnerHtml += `<div class="${classes}"></div>`;
            classes = 'nonogram-grid-item ';
        }
    }
    gridContainer.innerHTML = gridInnerHtml;
}