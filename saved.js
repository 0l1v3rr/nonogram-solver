const savedContainer = document.querySelector('[data-saved-container]');

const saved = JSON.parse(localStorage.getItem('savedNonograms'));

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
        </div>`;
    }
    savedContainer.innerHTML = savedInnerHtml;
}
loadSavedItems();