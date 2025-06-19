const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

class Day {
    constructor(
        public name: string,
        public isOpen: boolean,
    ) {}
}

export class ClosesBeforeOpeningError extends Error {
    public votingLink = "https://www.badgerbadgerbadger.com/"
    constructor() {
        super(
            "Closing the next day is not supported yet. Vote here if you'd like to see this feature:",
        )
    }
}

export class OpeningHours {
    private allDays: Day[]

    constructor(
        openDays: string[],
        private openingPeriod: Period,
    ) {
        this.allDays = allDays.map(
            (day) => new Day(day, openDays.includes(day)),
        )
    }

    openDayNames() {
        return this.allDays.filter((day) => day.isOpen).map((day) => day.name)
    }

    isOpenOn(input: Datetime) {
        return (
            this.openDayNames().includes(input.shortDayName()) &&
            this.openingPeriod.includes(input.asDate())
        )
    }

    nextOpeningDate(input: Datetime) {
        const daysAfterInput = [
            ...this.daysAfter(input),
            ...this.allDays, // loop back to the beginning of the week
        ]
        return input
            .incrementBy(daysAfterInput.findIndex((day) => day.isOpen) + 1)
            .toISOString()
    }

    daysAfter(input: Datetime) {
        return this.allDays.slice(this.weekIndexFor(input))
    }

    weekIndexFor(input: Datetime) {
        return (
            this.allDays.map((day) => day.name).indexOf(input.shortDayName()) +
            1
        )
    }
}

export class Datetime {
    constructor(
        private date: string,
        public localeFormat = "en-AU",
    ) {}

    static fromDate(date: Date) {
        return new Datetime(date.toISOString())
    }

    asDate() {
        return new Date(this.date)
    }

    shortDayName() {
        return this.asDate().toLocaleDateString(this.localeFormat, {
            weekday: "short",
        })
    }

    longDayName() {
        return this.asDate().toLocaleDateString(this.localeFormat, {
            weekday: "long",
        })
    }

    incrementBy(incrementBy: number) {
        const inputDay = this.asDate()
        inputDay.setDate(inputDay.getDate() + incrementBy)
        return inputDay
    }

    format() {
        return `${this.date} (${this.shortDayName()})`
    }

    time() {
        return this.asDate().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }
}

export class Time {
    constructor(
        public hour: number,
        public minute: number,
    ) {}

    asSeenOn(input: Date) {
        const date = new Date(input)
        date.setHours(this.hour, this.minute)
        date.setMinutes(this.minute)
        return date
    }

    static fromString(input: string) {
        return new Time(
            parseInt(input.split(":")[0]),
            parseInt(input.split(":")[1]),
        )
    }
}

export class Period {
    static fromStrings(openTimeOld: string, closeTimeOld: string) {
        return new Period(
            Time.fromString(openTimeOld),
            Time.fromString(closeTimeOld),
        )
    }

    constructor(
        private openTime: Time,
        private closeTime: Time,
    ) {
        if (this.openTime.hour > this.closeTime.hour)
            throw new ClosesBeforeOpeningError()

        if (this.openTime.hour === this.closeTime.hour)
            if (this.openTime.minute > this.closeTime.minute)
                throw new ClosesBeforeOpeningError()
    }

    includes(date: Date) {
        return (
            date >= this.openTime.asSeenOn(date) &&
            date < this.closeTime.asSeenOn(date)
        )
    }
}
