import { elements } from './dom.js';

const itemsPerPage = 4;

const createEventCard = (event, onEdit, onDelete) => {
    const card = document.createElement('div');
    card.classList.add('event-card');

    const imageSrc = event.poster ? event.poster : 'https://via.placeholder.com/300x200?text=No+Image';

    card.innerHTML = `
        <div class="card-image-container">
            <div class="card-blur-bg" style="background-image: url('${imageSrc}')"></div>
            <img src="${imageSrc}" alt="${event.title}" class="card-image-main">
        </div>
        <div class="card-content">
            <h3 class="card-title">${event.title}</h3>
            <div class="card-info">${event.date} | Категорія: ${event.category}</div>
            <div class="card-info">Місце: ${event.location}</div>
            <div class="card-price">${event.price} грн</div>
        </div>
        <div class="card-actions">
            <button class="btn-edit">Редагувати</button>
            <button class="btn-delete">Видалити</button>
        </div>
    `;

    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');

    editBtn.addEventListener('click', () => onEdit(event.id));
    deleteBtn.addEventListener('click', () => onDelete(event.id));

    return card;
};

export const renderEvents = (events, currentPage, onPageChange, onEdit, onDelete) => {
    elements.container.innerHTML = '';
    elements.paginationContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = events.slice(start, end);

    if (paginatedItems.length === 0 && events.length > 0) {
        onPageChange(1);
        return;
    }

    paginatedItems.forEach(event => {
        const cardElement = createEventCard(event, onEdit, onDelete);
        elements.container.appendChild(cardElement);
    });

    renderPagination(events.length, currentPage, onPageChange);
};

const renderPagination = (totalItems, currentPage, onPageChange) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    if (pageCount <= 1) return;

    const createBtn = (text, onClick, isDisabled = false, isActive = false) => {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.classList.add('page-btn');
        
        if (isActive) btn.classList.add('active');
        
        if (isDisabled) {
            btn.classList.add('disabled');
        } else {
            btn.addEventListener('click', onClick);
        }
        
        return btn;
    };

    const prevBtn = createBtn('&laquo;', () => onPageChange(currentPage - 1), currentPage === 1);
    elements.paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= pageCount; i++) {
        const btn = createBtn(i, () => onPageChange(i), false, i === currentPage);
        elements.paginationContainer.appendChild(btn);
    }

    const nextBtn = createBtn('&raquo;', () => onPageChange(currentPage + 1), currentPage === pageCount);
    elements.paginationContainer.appendChild(nextBtn);
};