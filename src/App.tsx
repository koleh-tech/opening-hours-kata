import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Datetime, OpeningHours, Period, Time } from "./OpeningHours"

function App() {
    const [datetimeToCheck, setDatetimeToCheck] = useState(
        new Datetime(new Date(Date.now()).toISOString()),
    )

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Business on {datetimeToCheck.longDayName()} at </h1>
            <input
                type="time"
                value={datetimeToCheck.time()}
                onChange={(e) => {
                    const newTime = Time.fromString(e.target.value)
                    return setDatetimeToCheck(
                        Datetime.fromDate(
                            newTime.asSeenOn(datetimeToCheck.asDate()),
                        ),
                    )
                }}
            ></input>
            <h1>
                is{" "}
                {new OpeningHours(
                    ["Mon", "Thu"],
                    Period.fromStrings("08:00", "16:30"),
                ).isOpenOn(datetimeToCheck)
                    ? "open"
                    : "closed"}
            </h1>
        </>
    )
}

export default App
