const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

class Day {
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

    timeFor() {
        const date = this.date
        return new Date(date).toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }
}

export class Period {
    constructor(
        public openTime: string,
        public closeTime: string,
    ) {}

    includes(datetime: Datetime) {
        const time = new Date(datetime.toDate()).getHours()
        return (
            time >= parseInt(this.openTime) && time < parseInt(this.closeTime)
        )
    }
}

export class OpeningHours {
    public allDays: Day[]
    constructor(
        openDays: string[],
        public openingPeriod: Period,
    ) {
        this.allDays = allDays.map(
            (day) => new Day(day, openDays.includes(day)),
        )
    }

    get openDayNames() {
        return this.allDays.filter((day) => day.isOpen).map((day) => day.name)
    }

    isOpenOn(input: Datetime) {
        return (
            this.openDayNames.includes(input.dayName()) &&
            this.openingPeriod.includes(input)
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
        return new Datetime(date).timeFor()
    }
}
