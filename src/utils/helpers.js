export function generateId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const randLetters = Array.from({ length: 2 }, () =>
        letters[Math.floor(Math.random() * letters.length)]
    ).join("");
    const randNumbers = Array.from({ length: 4 }, () =>
        numbers[Math.floor(Math.random() * numbers.length)]
    ).join("");
    return `${randLetters}${randNumbers}`;
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }).format(amount);
}