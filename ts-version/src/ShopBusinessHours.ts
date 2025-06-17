const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

class OpeningDay {
    constructor(
        public name: string,
        public isOpen: boolean,
    ) {}
}

export class Datetime {
    constructor(public date: string) {}

    toDate() {
        return new Date(this.date)
    }

    dayName() {
        return this.toDate().toLocaleDateString("en-AU", {
            weekday: "short",
        })
    }

    incrementBy(incrementBy: number) {
        const inputDay = this.toDate()
        inputDay.setDate(inputDay.getDate() + incrementBy)
        return inputDay
    }

    format() {
        return `${this.date} (${this.dayName()})`
    }
}

export class OpeningHours {
    constructor(
        public openTime: string,
        public closeTime: string,
    ) {}

    withinOpeningHours(datetime: Datetime) {
        const time = new Date(datetime.toDate()).getHours()
        return (
            time >= parseInt(this.openTime) && time < parseInt(this.closeTime)
        )
    }
}

export class ShopBusinessHours {
    public allDays: OpeningDay[]
    constructor(
        openDays: string[],
        public openingHours: OpeningHours,
    ) {
        this.allDays = allDays.map(
            (day) => new OpeningDay(day, openDays.includes(day)),
        )
    }

    get openDays() {
        return this.allDays.filter((day) => day.isOpen)
    }

    get openDayNames() {
        return this.openDays.map((day) => day.name)
    }

    isOpenOn(date: string) {
        const input = new Datetime(date)
        return (
            this.openDayNames.includes(input.dayName()) &&
            this.openingHours.withinOpeningHours(input)
        )
    }

    nextOpeningDate(input: Datetime) {
        const daysAfter = this.allDays.slice(
            this.allDays.map((day) => day.name).indexOf(input.dayName()) + 1,
        )
        const nextOpenDayIndex =
            [...daysAfter, ...this.allDays].findIndex((day) => day.isOpen) + 1
        const newDay = input.incrementBy(nextOpenDayIndex)

        return newDay.toISOString()
    }

    timeFor(date: string) {
        return new Date(date).toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }
}
