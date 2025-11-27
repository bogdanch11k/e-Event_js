class EventEntry {
    constructor(title, category, date, price, location, poster) {
        this.id = Date.now();
        this.title = title;
        this.category = category;
        this.date = date;
        this.price = price;
        this.location = location;
        this.poster = poster;
    }
}

let currentEditId = null;

const savedData = localStorage.getItem('eventsData');
let eventsList = savedData ? JSON.parse(savedData) : [];

const createBtn = document.getElementById('createEventBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModalBtn');
const eventForm = document.getElementById('eventForm');
const container = document.getElementById('eventsContainer');
const modalTitle = document.getElementById('modalTitle');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const renderEvents = (listToRender = eventsList) => {
    container.innerHTML = '';

    listToRender.forEach(event => {
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
                <div class="card-info">Дата: ${event.date} | Кат: ${event.category}</div>
                <div class="card-info">Місце: ${event.location}</div>
                <div class="card-price">${event.price} грн</div>
            </div>
            <div class="card-actions">
                <button class="btn-edit" onclick="editEvent(${event.id})">Редагувати</button>
                <button class="btn-delete" onclick="deleteEvent(${event.id})">Видалити</button>
            </div>
        `;
        container.appendChild(card);
    });
};

const filterAllEvents = () => {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    const filteredEvents = eventsList.filter(event => {
        const matchTitle = event.title.toLowerCase().includes(searchValue);
        const matchCategory = categoryValue === "" || event.category === categoryValue;
        
        return matchTitle && matchCategory;
    });

    renderEvents(filteredEvents);
};

searchInput.addEventListener('input', filterAllEvents);
categoryFilter.addEventListener('change', filterAllEvents);

const openModal = () => {
    modalOverlay.style.display = 'flex';
};

const closeModal = () => {
    modalOverlay.style.display = 'none';
    eventForm.reset();
    currentEditId = null;
    modalTitle.textContent = "Нова подія";
};

window.deleteEvent = (id) => {
    if (confirm('Видалити цю подію?')) {
        eventsList = eventsList.filter(event => event.id !== id);
        localStorage.setItem('eventsData', JSON.stringify(eventsList));
        filterAllEvents();
    }
};

window.editEvent = (id) => {
    const eventToEdit = eventsList.find(event => event.id === id);
    if (eventToEdit) {
        eventForm.title.value = eventToEdit.title;
        eventForm.category.value = eventToEdit.category;
        eventForm.date.value = eventToEdit.date;
        eventForm.price.value = eventToEdit.price;
        eventForm.location.value = eventToEdit.location;
        eventForm.poster.value = eventToEdit.poster;

        currentEditId = id;
        modalTitle.textContent = "Редагувати подію";
        openModal();
    }
};

createBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(eventForm);
    const price = parseFloat(formData.get('price'));

    if (price < 0) {
        alert("Ціна не може бути від'ємною!");
        return;
    }

    if (currentEditId) {
        const index = eventsList.findIndex(ev => ev.id === currentEditId);
        if (index !== -1) {
            eventsList[index].title = formData.get('title');
            eventsList[index].category = formData.get('category');
            eventsList[index].date = formData.get('date');
            eventsList[index].price = price;
            eventsList[index].location = formData.get('location');
            eventsList[index].poster = formData.get('poster');
        }
    } else {
        const newEvent = new EventEntry(
            formData.get('title'),
            formData.get('category'),
            formData.get('date'),
            price,
            formData.get('location'),
            formData.get('poster')
        );
        eventsList.push(newEvent);
    }

    localStorage.setItem('eventsData', JSON.stringify(eventsList));
    searchInput.value = '';
    categoryFilter.value = ''; 
    renderEvents();
    closeModal();
});

renderEvents();