export function validateUser(id, elem, def = null) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "ADMIN") return elem;
    return id.indexOf(user.id) >= 0 ? elem : def;
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
            return "Завершена"
        default :
            return "Не известно"
    }
}

export function getStatusColor(str) {
    switch (str) {
        case "OPENED":
            return "#00d1fa"
        case "WORKING":
            return "#00FF00"
        case "ARCHIVED":
            return "#777777"
        case "TESTING":
            return "#eed802"
        case "CLOSED":
            return "#cecece"
        default :
            return "#fff"
    }
}


export function arrayIntersectionFilter(src, filter, filterUser, field) {
    let i = 0, c = filter.length, index = {};
    for (; i < c; ++i) {
        index[filter[i][field]] = 1;
    }
    index[filterUser] = 1;
    return src.filter(item => !index.hasOwnProperty(item[field]));
}