const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
class OpeningDay {
    constructor(
        public name: string,
        public isOpen: boolean,
    ) {}
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
            this.openDayNames.includes(this.dayNameFor(date)) &&
            this.withinOpeningHours(date)
        )
    }

    nextOpeningDate(datetime: string) {
        const sliceAfterDate = this.days.slice(
            this.days
                .map((day) => day.name)
                .indexOf(this.dayNameFor(datetime)) + 1,
        )
        const nextOpenDayIndex =
            [...sliceAfterDate, ...this.days].findIndex((day) => day.isOpen) + 1
        const inputDay = new Date(datetime)
        inputDay.setDate(inputDay.getDate() + nextOpenDayIndex)
        return inputDay.toISOString()
    }

    dayNameFor(date: string) {
        return new Date(date).toLocaleDateString("en-AU", {
            weekday: "short",
        })
    }

    timeFor(date: string) {
        return new Date(date).toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }
}
