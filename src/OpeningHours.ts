const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

class Day {
    constructor(
        public name: string,
        public isOpen: boolean,
    ) {}
}

class ClosesBeforeOpeningError extends Error {
    constructor() {
        super("Store must close after it opens")
    }
}

export class Datetime {
    constructor(private date: string) {}

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

    time() {
        return new Date(this.date).toLocaleTimeString("en-AU", {
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

    setTimeFor(input: Datetime) {
        const date = input.toDate()
        date.setHours(this.hour, this.minute)
        date.setMinutes(this.minute)
        return new Datetime(date.toUTCString())
    }

    static fromString(input: string) {
        return new Time(
            parseInt(input.split(":")[0]),
            parseInt(input.split(":")[1]),
        )
    }
}

const NullTime = () => new Time(-1, -1)

export class Period {
    private openTime: Time = NullTime()
    private closeTime: Time = NullTime()

    constructor(openTimeOld: string, closeTimeOld: string) {
        this.openTime = Time.fromString(openTimeOld)
        this.closeTime = Time.fromString(closeTimeOld)
        if (this.openTime.hour > this.closeTime.hour) {
            throw new ClosesBeforeOpeningError()
        }
        if (this.openTime.hour === this.closeTime.hour) {
            if (this.openTime.minute > this.closeTime.minute) {
                throw new ClosesBeforeOpeningError()
            }
        }
    }

    includes(datetime: Datetime) {
        const time = datetime.toDate()

        const opensOn = this.openTime.setTimeFor(datetime).toDate()
        const closesOn = this.closeTime.setTimeFor(datetime).toDate()
        return time >= opensOn && time < closesOn
    }

    formatInLocalTime() {
        const opensOnLocal = this.openTime
            .setTimeFor(new Datetime(`2016-05-13T11:11:00.000Z`))
            .toDate()
            .toLocaleTimeString("en-AU", {
                hour: "2-digit",
                minute: "2-digit",
            })
        const closesOnLocal = this.closeTime
            .setTimeFor(new Datetime(`2016-05-13T11:11:00.000Z`))
            .toDate()
            .toLocaleTimeString("en-AU", {
                hour: "2-digit",
                minute: "2-digit",
            })
        return `${opensOnLocal} - ${closesOnLocal}`
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
            this.openDayNames().includes(input.dayName()) &&
            this.openingPeriod.includes(input)
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
        return this.allDays.map((day) => day.name).indexOf(input.dayName()) + 1
    }
}
