const STORAGE_KEY = 'eventsData';

const generateMockData = () => {
    const currentYear = new Date().getFullYear();
    
    return [
        { id: crypto.randomUUID(), title: "Джаз на даху", category: "Концерти", date: `${currentYear}-06-15`, price: 500, location: "Roof Top", poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "IT Forum 2025", category: "Конференції", date: `${currentYear}-09-20`, price: 1200, location: "Експоцентр", poster: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Марафон 'Біжи'", category: "Спорт", date: `${currentYear}-05-10`, price: 300, location: "Центральний парк", poster: "https://images.unsplash.com/photo-1552674605-46d536d2f481?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Сучасне мистецтво", category: "Виставки", date: `${currentYear}-04-12`, price: 150, location: "Галерея 'Art'", poster: "https://images.unsplash.com/photo-1518998053901-5348d3969105?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Рок-фестиваль", category: "Концерти", date: `${currentYear}-07-01`, price: 850, location: "Стадіон Арена", poster: "https://images.unsplash.com/photo-1459749411177-0473ef716175?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Startup Pitch Day", category: "Конференції", date: `${currentYear}-10-05`, price: 0, location: "Coworking Hub", poster: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Йога на світанку", category: "Спорт", date: `${currentYear}-06-21`, price: 100, location: "Міський пляж", poster: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Фотовиставка 'Світ'", category: "Виставки", date: `${currentYear}-11-15`, price: 50, location: "Музей історії", poster: "https://images.unsplash.com/photo-1522851195689-f54058d8b6ce?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Оркестр у саду", category: "Концерти", date: `${currentYear}-08-24`, price: 400, location: "Ботанічний сад", poster: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Blockchain Summit", category: "Конференції", date: `${currentYear}-12-12`, price: 2500, location: "Hilton Hotel", poster: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Турнір з тенісу", category: "Спорт", date: `${currentYear}-07-15`, price: 200, location: "Спорткомплекс", poster: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=300&q=80" },
        { id: crypto.randomUUID(), title: "Скульптури з льоду", category: "Виставки", date: `${currentYear}-01-15`, price: 120, location: "Площа Ринок", poster: "https://images.unsplash.com/photo-1612456225451-bb8d10d0131d?auto=format&fit=crop&w=300&q=80" }
    ];
};

export const getEvents = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data || JSON.parse(data).length === 0) {
        const mocks = generateMockData();
        saveEvents(mocks);
        return mocks;
    }
    
    return JSON.parse(data);
};

export const saveEvents = (events) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const createEventObject = (formData) => {
    return {
        id: crypto.randomUUID(),
        title: formData.get('title'),
        category: formData.get('category'),
        date: formData.get('date'),
        price: parseFloat(formData.get('price')),
        location: formData.get('location'),
        poster: formData.get('poster')
    };
};