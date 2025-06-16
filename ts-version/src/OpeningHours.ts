export class OpeningHours {
    constructor(
        public days: string[],
        public openTime: string,
        public closeTime: string,
    ) {}

    isOpenOn(date: string) {
        const dayString = this.dayNameFor(date)
        if (this.days.includes(dayString)) {
            const time = new Date(date).getHours()
            if (
                time >= parseInt(this.openTime) &&
                time < parseInt(this.closeTime)
            ) {
                return true
            } else {
                return false
            }
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
