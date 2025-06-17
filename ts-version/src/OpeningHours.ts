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
        const dayname = this.dayNameFor(datetime)
        // __AUTO_GENERATED_PRINT_VAR_START__
        console.log("OpeningHours#nextOpeningDate dayname: %s", dayname) // __AUTO_GENERATED_PRINT_VAR_END__
        const allDayNames = this.days.map((day) => day.name)
        const sliceAfterDate = this.days.slice(allDayNames.indexOf(dayname) + 1)
        // __AUTO_GENERATED_PRINT_VAR_START__
        console.log(
            "OpeningHours#nextOpeningDate sliceAfterDate: %s",
            JSON.stringify(sliceAfterDate),
        ) // __AUTO_GENERATED_PRINT_VAR_END__
        const nextOpenDayIndex =
            sliceAfterDate.findIndex((day) => day.isOpen) + 1
        const inputDay = new Date(datetime)
        inputDay.setDate(inputDay.getDate() + nextOpenDayIndex)
        return inputDay.toISOString()
        this.days.forEach((day) => {
            if (day.isOpen) {
                const nextDay = day.name.indexOf(dayname) + 1
                const nextDate = new Date(datetime)
                nextDate.setDate(nextDate.getDate() + nextDay)
                if (nextDate > new Date()) {
                    return nextDate.toISOString()
                }
            }
        })
        const nextDay = this.openDayNames.indexOf(dayname) + 1
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
