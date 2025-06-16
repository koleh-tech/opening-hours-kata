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
        return this.days.filter((day) => day.isOpen).map((day) => day.name)
    }

    isOpenOn(date: string) {
        return (
            this.openDays.includes(this.dayNameFor(date)) &&
            this.withinOpeningHours(date)
        )
    }

    nextOpeningDate(datetime: string) {
        const dayname = this.dayNameFor(datetime)
        const nextDay = this.openDays.indexOf(dayname) + 1
        const nextDate = new Date(datetime)
        nextDate.setDate(nextDate.getDate() + nextDay)
        return nextDate.toISOString()
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
