class OpeningDay {
    constructor(
        public day: string,
        public isOpen: boolean,
    ) {}
}

export class OpeningHours {
    public newInterfaceDays: OpeningDay[]
    constructor(
        public days: string[],
        public openTime: string,
        public closeTime: string,
    ) {
        this.newInterfaceDays = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ].map((day) => {
            return new OpeningDay(day, days.includes(day))
        })
    }

    withinOpeningHours(datetime: string) {
        const time = new Date(datetime).getHours()
        return (
            time >= parseInt(this.openTime) && time < parseInt(this.closeTime)
        )
    }

    isOpenOn(date: string) {
        return (
            this.days.includes(this.dayNameFor(date)) &&
            this.withinOpeningHours(date)
        )
    }

    nextOpeningDate(datetime: string) {
        const dayname = this.dayNameFor(datetime)
        const nextDay = this.days.indexOf(dayname) + 1
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
