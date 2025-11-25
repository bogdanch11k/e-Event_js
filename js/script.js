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

const savedData = localStorage.getItem('eventsData');
const eventsList = savedData ? JSON.parse(savedData) : [];

console.log(eventsList);

const createBtn = document.getElementById('createEventBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModalBtn');
const eventForm = document.getElementById('eventForm');
const openModal = () => {
    modalOverlay.style.display = 'flex';
};

const closeModal = () => {
    modalOverlay.style.display = 'none';
    eventForm.reset();
};

createBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(eventForm);
    const price = parseFloat(formData.get('price'));

    if (price < 0) {
        alert("Ціна не може бути від'ємною!");
        return;
    }

    const newEvent = new EventEntry(
        formData.get('title'),
        formData.get('category'),
        formData.get('date'),
        price,
        formData.get('location'),
        formData.get('poster')
    );

    eventsList.push(newEvent);

    localStorage.setItem('eventsData', JSON.stringify(eventsList));

    console.log(eventsList);

    closeModal();
});
