import solve from './solver.js';

const savedContainer = document.querySelector('[data-saved-container]');
let saved = JSON.parse(localStorage.getItem('savedNonograms'));

function loadSavedItems() {
    if(saved == null) {
        savedContainer.innerHTML = '<div class="no-items-exist color-muted">There\'s no saved nonograms. 😔</div>'
        return;
    }

    let savedInnerHtml = '';
    for(let i of saved) {
        savedInnerHtml += `<div class="saved-item">
            <div class="saved-item-title">${i.name}</div>
            <div class="saved-item-subtitle">Nonogram - ${i.size}x${i.size}</div>
            <div class="nonogram-preview">
                <div class="preview-grid grid-${i.size}">
                    ${generateGrid(i)}
                </div>
            </div>
            <div class="saved-item-footer">
                <button class="btn-danger btn-primary delete-btn" data-id="${i.id}">Delete</button>
            </div>
        </div>`;
    }
    savedContainer.innerHTML = savedInnerHtml;
}
loadSavedItems();

function handleDeleteButtonClick() {
    let deleteBtns = document.querySelectorAll('.delete-btn');
    for(let delBtn of deleteBtns) {
        delBtn.onclick = (e) => {
            const id = e.target.dataset.id;
    
            let currentData = JSON.parse(localStorage.getItem('savedNonograms'));
            let newData = [];
    
            for(let i of currentData) {
                if(i.id === id) break;
                else newData.push(i);
            }
    
            localStorage.setItem('savedNonograms', JSON.stringify(newData).toString());
            saved = JSON.parse(localStorage.getItem('savedNonograms'));
            loadSavedItems();
            deleteBtns = document.querySelectorAll('.delete-btn');
        }
    }
}
handleDeleteButtonClick();

function generateGrid(item) {
    const solution = solve(item.x, item.y, item.size, item.size);

    let res = '';
    let classes = 'preview-item ';

    for(let i = 0; i < item.size; i++) {
        for(let j = 0; j < item.size; j++) {

            if(i === 0) classes += 'bt-0 ';
            if(i === item.size - 1) classes += 'bb-0 ';
            if(j === 0) classes += 'bl-0 ';
            if(j === item.size - 1) classes += 'br-0 ';

            if(solution[i][j]) classes += 'filled ';

            res += `<div class="${classes}"></div>`;
            classes = 'preview-item ';
        }
    }
    return res;
}