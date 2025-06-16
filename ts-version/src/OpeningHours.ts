export class OpeningHours {
    constructor(
        public days: string[],
        public openTime: string,
        public closeTime: string,
    ) {}

    isOpenOn(date: string) {
        return false
    }

    nextOpeningDate(date: string) {
        return ""
    }

    dayNameFor(date: string) {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
        })
    }
}
