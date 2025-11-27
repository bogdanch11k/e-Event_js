import { elements } from './dom.js';
import { getEvents, saveEvents, createEventObject } from './storage.js';
import { validateEvent } from './validation.js';
import { openModal, closeModal } from './modal.js';
import { renderEvents } from './render.js';

let events = getEvents();
let currentPage = 1;

const handleEdit = (id) => {
    const event = events.find(e => e.id === id);
    if (event) {
        elements.eventForm.id.value = event.id;
        elements.eventForm.title.value = event.title;
        elements.eventForm.category.value = event.category;
        elements.eventForm.date.value = event.date;
        elements.eventForm.price.value = event.price;
        elements.eventForm.location.value = event.location;
        elements.eventForm.poster.value = event.poster;
        
        openModal("Редагувати подію");
    }
};

const handleDelete = (id) => {
    if (confirm('Видалити цю подію?')) {
        events = events.filter(e => e.id !== id);
        saveEvents(events);
        updateView();
    }
};

const handlePageChange = (newPage) => {
    currentPage = newPage;
    updateView();
};

const getFilteredAndSortedEvents = () => {
    const search = elements.searchInput.value.toLowerCase();
    const category = elements.categoryFilter.value;
    const sort = elements.sortFilter.value;

    let filtered = events.filter(event => {
        const matchTitle = event.title.toLowerCase().includes(search);
        const matchCategory = category === "" || event.category === category;
        return matchTitle && matchCategory;
    });

    if (sort === 'cheap') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'expensive') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'date_new') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort === 'date_old') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    return filtered;
};

const updateView = () => {
    const processedEvents = getFilteredAndSortedEvents();
    renderEvents(processedEvents, currentPage, handlePageChange, handleEdit, handleDelete);
};

elements.filterToggleBtn.addEventListener('click', () => {
    elements.filtersBar.classList.toggle('mobile-hidden');
    elements.filtersBar.classList.toggle('active');
});

elements.createBtn.addEventListener('click', () => openModal());

elements.closeBtn.addEventListener('click', closeModal);
elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.modalOverlay) closeModal();
});

elements.searchInput.addEventListener('input', () => { currentPage = 1; updateView(); });
elements.categoryFilter.addEventListener('change', () => { currentPage = 1; updateView(); });
elements.sortFilter.addEventListener('change', () => { currentPage = 1; updateView(); });

elements.eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.eventForm);
    
    const rawData = Object.fromEntries(formData.entries());
    rawData.price = parseFloat(rawData.price);

    const errors = validateEvent(rawData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const editId = formData.get('id');

    if (editId) {
        const index = events.findIndex(ev => ev.id === editId);
        if (index !== -1) {
            events[index] = { 
                ...events[index],
                title: rawData.title,
                category: rawData.category,
                date: rawData.date,
                price: rawData.price,
                location: rawData.location,
                poster: rawData.poster
            };
        }
    } else {
        const newEvent = createEventObject(formData);
        events.push(newEvent);
    }

    saveEvents(events);
    closeModal();
    updateView();
});

updateView();