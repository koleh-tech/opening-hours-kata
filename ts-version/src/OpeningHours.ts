const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

class OpeningDay {
    constructor(
        public name: string,
        public isOpen: boolean,
    ) {}
}

export class Datetime {
    constructor(public date: string) {}

    dayName() {
        return new Date(this.date).toLocaleDateString("en-AU", {
            weekday: "short",
        })
    }

    incrementBy(incrementBy: number) {
        const inputDay = new Date(this.date)
        inputDay.setDate(inputDay.getDate() + incrementBy)
        return inputDay
    }

    format(input) {
        return `${this.date} (${this.dayName()})`
    }
}

export class OpeningHours {
    public days: OpeningDay[]
    constructor(
        inputDays: string[],
        public openTime: string,
        public closeTime: string,
    ) {
        this.days = allDays.map(
            (day) => new OpeningDay(day, inputDays.includes(day)),
        )
    }

    withinOpeningHours(datetime: string) {
        const time = new Date(datetime).getHours()
        return (
            time >= parseInt(this.openTime) && time < parseInt(this.closeTime)
        )
    }

    get openDays() {
        return this.days.filter((day) => day.isOpen)
    }

    get openDayNames() {
        return this.days.filter((day) => day.isOpen).map((day) => day.name)
    }

    isOpenOn(date: string) {
        return (
            this.openDayNames.includes(new Datetime(date).dayName()) &&
            this.withinOpeningHours(date)
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
