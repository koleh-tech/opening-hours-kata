import { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"
import { Datetime, OpeningHours, Period, Time } from "./OpeningHours"
import openingHoursLogo from "./assets/opening-hours.png"

function App() {
    const [datetimeToCheck, setDatetimeToCheck] = useState(
        new Datetime(new Date(Date.now()).toISOString()),
    )
    const [openingHours, setOpeningHours] = useState(
        new OpeningHours(["Mon", "Thu"], Period.fromStrings("08:00", "16:30")),
    )

    function retrieveDateIndex(index: number, toSplit: string) {
        return parseInt(toSplit.split("-")[index])
    }

    type DatetimeInputEvent = {
        target: {
            value: string
        }
    }

    function handleDatetimeInput(event: DatetimeInputEvent) {
        const toConvert = event.target.value
        const newDate = new Date()
        newDate.setFullYear(retrieveDateIndex(0, toConvert))
        newDate.setMonth(retrieveDateIndex(1, toConvert) - 1)
        newDate.setDate(retrieveDateIndex(2, toConvert))

        const newTime = Time.fromString(toConvert.split("T")[1])
        return setDatetimeToCheck(Datetime.fromDate(newTime.asSeenOn(newDate)))
    }

    const header = (
        <div>
            <a
                href="https://www.flaticon.com/free-icons/opening-hours"
                title="opening hours icons"
                className="logo"
            >
                <img src={openingHoursLogo} alt="Opening-hours-business-icon" />
            </a>
            <p>The business, on: </p>
        </div>
    )

    return (
        <>
            {header}
            <input
                type="datetime-local"
                value={datetimeToCheck.format()}
                onChange={handleDatetimeInput}
            ></input>{" "}
            <p>
                ({datetimeToCheck.longDayName()}) is{" "}
                {openingHours.isOpenOn(datetimeToCheck) ? "open" : "closed"}.
            </p>
            <div className="opening-hours">
                <h3>Configure hours:</h3>
                <div className="hours">
                    Opens at:
                    <input
                        type="time"
                        value={openingHours.openingPeriod.formatOpenTime()}
                        onChange={(e) =>
                            setOpeningHours(
                                new OpeningHours(
                                    openingHours.openDays,
                                    Period.fromStrings(
                                        e.target.value,
                                        openingHours.openingPeriod.formatCloseTime(),
                                    ),
                                ),
                            )
                        }
                    ></input>
                </div>
                <p></p>

                <div className="hours">
                    Closes at:
                    <input
                        type="time"
                        value={openingHours.openingPeriod.formatCloseTime()}
                        onChange={(e) =>
                            setOpeningHours(
                                new OpeningHours(
                                    openingHours.openDays,
                                    Period.fromStrings(
                                        openingHours.openingPeriod.formatOpenTime(),
                                        e.target.value,
                                    ),
                                ),
                            )
                        }
                    ></input>
                </div>

                <h3>Configure days:</h3>
                <div>
                    {openingHours.allDays.map((day) => (
                        <div>
                            <div className="day">
                                <input
                                    type="checkbox"
                                    id="scales"
                                    name="scales"
                                    checked
                                />
                                <label>{day.name}</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
