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

export class OpeningHoursNew {
    constructor(
        public openTime: string,
        public closeTime: string,
    ) {}

    withinOpeningHours(datetime: string) {
        const time = new Date(datetime).getHours()
        return (
            time >= parseInt(this.openTime) && time < parseInt(this.closeTime)
        )
    }
}

export class ShopBusinessHours {
    public days: OpeningDay[]
    constructor(
        inputDays: string[],
        public openingHours: OpeningHoursNew,
    ) {
        this.days = allDays.map(
            (day) => new OpeningDay(day, inputDays.includes(day)),
        )
    }

    get openDays() {
        return this.days.filter((day) => day.isOpen)
    }

    get openDayNames() {
        return this.openDays.map((day) => day.name)
    }

    isOpenOn(date: string) {
        return (
            this.openDayNames.includes(new Datetime(date).dayName()) &&
            this.openingHours.withinOpeningHours(date)
        )
    }

    nextOpeningDate(input: Datetime) {
        const daysAfter = this.days.slice(
            this.days.map((day) => day.name).indexOf(input.dayName()) + 1,
        )
        const nextOpenDayIndex =
            [...daysAfter, ...this.days].findIndex((day) => day.isOpen) + 1
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
