export class OpeningHours {
    constructor(
        public days: string[],
        public openTime: string,
        public closeTime: string,
    ) {}

    withinOpeningHours(datetime: string) {
        const time = new Date(datetime).getHours()
        return (
            time >= parseInt(this.openTime) && time < parseInt(this.closeTime)
        )
    }
    isOpenOn(date: string) {
        const dayString = this.dayNameFor(date)
        if (this.days.includes(dayString)) {
            return this.withinOpeningHours(date)
        }
        return false
    }

    nextOpeningDate(date: string) {
        return ""
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
