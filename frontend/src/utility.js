export function limitedString(str, len) {
    return str.length > len ? str.substring(0, len) + "..." : str;
}

export function validateUser(id, elem, def = null) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.id === id ? elem : localStorage.user.id;
}

export function fixStatus(str) {
    switch (str) {
        case "OPENED":
            return "Открыта"
        default :
            return "Не известно"
    }
}