import { elements } from './dom.js';

export const openModal = (title = "Нова подія") => {
    elements.modalTitle.textContent = title;
    elements.modalOverlay.classList.add('open');
};

export const closeModal = () => {
    elements.modalOverlay.classList.remove('open');
    elements.eventForm.reset();
    elements.eventForm.id.value = ''; 
};