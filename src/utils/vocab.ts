


export function getWordForDays(daysNumb: number): string {
    if (daysNumb < 20 && daysNumb > 9) {
        return "Дней";
    }

    let days = daysNumb;
    while (days > 9) {
        days -= 10;
    }

    switch (days) {
        case 1:
            return "День";
        case 2:
        case 3:
        case 4:
            return "Дня";
        default:
            return "Дней";
    }
}

export function getWordForHours(daysNumb: number): string {
    if (daysNumb < 20 && daysNumb > 9) {
        return "Часов";
    }

    let days = daysNumb;
    while (days > 9) {
        days -= 10;
    }

    switch (days) {
        case 1:
            return "Час";
        case 2:
        case 3:
        case 4:
            return "Часа";
        default:
            return "Часов";
    }
}

export function getWordForMinutes(daysNumb: number): string {
    if (daysNumb < 20 && daysNumb > 9) {
        return "Минут";
    }

    let days = daysNumb;
    while (days > 9) {
        days -= 10;
    }

    switch (days) {
        case 1:
            return "Минута";
        case 2:
        case 3:
        case 4:
            return "Минуты";
        default:
            return "Минут";
    }
}

export function getWordForSeconds(daysNumb: number): string {
    if (daysNumb < 20 && daysNumb > 9) {
        return "Секунд";
    }

    let days = daysNumb;
    while (days > 9) {
        days -= 10;
    }

    switch (days) {
        case 1:
            return "Секунда";
        case 2:
        case 3:
        case 4:
            return "Секунды";
        default:
            return "Секунд";
    }
}