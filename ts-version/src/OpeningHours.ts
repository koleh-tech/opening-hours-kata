const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

class Day {
    constructor(
        public name: string,
        public isOpen: boolean,
    ) {}
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

export class Period {
    private openTime: { hour: number; minute: number }
    private closeTime: { hour: number; minute: number }
    constructor(
        private openTimeOld: string,
        private closeTimeOld: string,
    ) {
        this.openTime = {
            hour: parseInt(openTimeOld.split(":")[0]),
            minute: parseInt(openTimeOld.split(":")[1]),
        }
        this.closeTime = {
            hour: parseInt(closeTimeOld.split(":")[0]),
            minute: parseInt(closeTimeOld.split(":")[1]),
        }
    }

    includes(datetime: Datetime) {
        const time = datetime.toDate().getUTCHours()
        const opensOn = new Date(
            `2016-05-13T${this.openTimeOld}:00.000Z`,
        ).getUTCHours()
        const closesOn = new Date(
            `2016-05-13T${this.closeTimeOld}:00.000Z`,
        ).getUTCHours()
        return time >= opensOn && time < closesOn
    }

    formatInLocalTime() {
        const openDate = new Date(`2016-05-13T11:11:00.000Z`)
        openDate.setHours(this.openTime.hour, this.openTime.minute)
        const opensOnLocal = openDate.toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
        })
        const closesOnLocal = new Date(
            `2016-05-13T${this.closeTimeOld}:00.000Z`,
        ).toLocaleTimeString("en-AU", {
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
