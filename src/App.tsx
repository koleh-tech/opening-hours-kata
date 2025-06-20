import { useState } from "react"
import "./App.css"
import {
    ClosesBeforeOpeningError,
    Datetime,
    Day,
    OpeningHours,
    Period,
    Time,
} from "./OpeningHours"
import openingHoursLogo from "./assets/opening-hours.png"
import closingHoursLogo from "./assets/closing-hours.png"

function App() {
    const [datetimeToCheck, setDatetimeToCheck] = useState(
        new Datetime(new Date(Date.now()).toISOString()),
    )
    const [openingHours, setOpeningHours] = useState(
        new OpeningHours(["Mon", "Thu"], Period.fromStrings("08:00", "16:30")),
    )
    const [errorMessage, setErrorMessage] = useState(
        new ClosesBeforeOpeningError(""),
    )

    const openingTimeOptions = [
        {
            currentConfig: openingHours.openingPeriod.formatOpenTime(),
            handleChange: (e: { target: { value: string } }) => {
                try {
                    return setOpeningPeriod(
                        Period.fromStrings(
                            e.target.value,
                            openingHours.openingPeriod.formatCloseTime(),
                        ),
                    )
                } catch (error: any) {
                    if (error instanceof ClosesBeforeOpeningError) {
                        setErrorMessage(error)
                    }
                }
            },
            label: "Open",
        },
        {
            currentConfig: openingHours.openingPeriod.formatCloseTime(),
            handleChange: (e: { target: { value: string } }) =>
                setOpeningPeriod(
                    Period.fromStrings(
                        openingHours.openingPeriod.formatOpenTime(),
                        e.target.value,
                    ),
                ),
            label: "Close",
        },
    ]
    return (
        <>
            <div>
                {renderLogo()}
                <p>The business, on: </p>
            </div>
            <input
                type="datetime-local"
                value={datetimeToCheck.format()}
                onChange={handleDatetimeInput}
            ></input>{" "}
            <small>({datetimeToCheck.longDayName()})</small>
            <p>
                is {openingHours.isOpenOn(datetimeToCheck) ? "open" : "closed"},
                and opens again on{" "}
                {Datetime.fromDate(
                    openingHours.nextOpeningDate(datetimeToCheck),
                ).longDayName()}
            </p>
            {errorMessage.message !== "" ? (
                <div>
                    <p>{errorMessage.message}</p>
                    <a href={errorMessage.votingLink}>Vote here</a>
                </div>
            ) : (
                <p></p>
            )}
            <div className="configuration">
                <h3>Configure hours:</h3>
                {openingTimeOptions.map((option) => (
                    <div className="configuration-option">
                        <input
                            type="time"
                            value={option.currentConfig}
                            onChange={option.handleChange}
                        ></input>
                        <label>{option.label}</label>
                    </div>
                ))}

                <h3>Configure days:</h3>
                {openingHours.allDays.map((day, index) => (
                    <div key={day.name} className="configuration-option">
                        <input
                            type="checkbox"
                            id={`day-${index}`}
                            checked={day.isOpen}
                            onChange={() => setOpenDay(day)}
                        />
                        <label htmlFor={`day-${index}`}>{day.name}</label>
                    </div>
                ))}
            </div>
        </>
    )

    function retrieveDateIndex(index: number, toSplit: string) {
        return parseInt(toSplit.split("-")[index])
    }

    function handleDatetimeInput(event: { target: { value: string } }) {
        const toConvert = event.target.value
        const newDate = new Date()
        newDate.setFullYear(retrieveDateIndex(0, toConvert))
        newDate.setMonth(retrieveDateIndex(1, toConvert) - 1)
        newDate.setDate(retrieveDateIndex(2, toConvert))

        const newTime = Time.fromString(toConvert.split("T")[1])
        return setDatetimeToCheck(Datetime.fromDate(newTime.asSeenOn(newDate)))
    }

    function setOpeningPeriod(newPeriod: Period) {
        setOpeningHours(new OpeningHours(openingHours.openDays, newPeriod))
    }

    function setOpenDay(inputDay: Day) {
        return setOpeningHours(
            new OpeningHours(
                openingHours.allDays
                    .map((day) => ({
                        ...day,
                        isOpen:
                            day.name !== inputDay.name
                                ? day.isOpen // leave as is
                                : !day.isOpen,
                    }))
                    .filter((d) => d.isOpen)
                    .map((d) => d.name),
                openingHours.openingPeriod,
            ),
        )
    }

    function renderLogo() {
        return openingHours.isOpenOn(datetimeToCheck) ? (
            <a
                href="https://www.flaticon.com/free-icons/opening-hours"
                title="opening hours icons"
                className="logo"
            >
                <img src={openingHoursLogo} alt="Opening-hours-business-icon" />
            </a>
        ) : (
            <a
                href="https://www.flaticon.com/free-icons/closed"
                title="closed icons"
                className="logo"
            >
                <img src={closingHoursLogo} alt="Opening-hours-business-icon" />
            </a>
        )
    }
}

export default App
