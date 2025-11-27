export const validateEvent = (data) => {
    const errors = [];

    if (!data.title || data.title.trim().length < 3) {
        errors.push("Назва має містити мінімум 3 символи.");
    }

    if (data.price < 0) {
        errors.push("Ціна не може бути від'ємною.");
    }

    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
        errors.push("Дата не може бути в минулому.");
    }

    if (!data.location || data.location.trim() === "") {
        errors.push("Вкажіть місце проведення.");
    }

    if (data.poster && data.poster.trim() !== "") {
        try {
            new URL(data.poster);
        } catch (_) {
            errors.push("Невірний формат URL для афіші.");
        }
    }

    return errors;
};