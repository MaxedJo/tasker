export function limitedString(str, len) {
    return str.length > len ? str.substring(0, len) + "..." : str;
}

export function validateUser(id, elem, def = null) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "ADMIN") return elem;
    return user.id === id ? elem : null;
}

export function fixStatus(str) {
    switch (str) {
        case "OPENED":
            return "Открыта"
        case "WORKING":
            return "В работе"
        case "ARCHIVED":
            return "В архиве"
        case "TESTING":
            return "На тестировании"
        case "CLOSED":
            return "Закрыта"
        default :
            return "Не известно"
    }
}