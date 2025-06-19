import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Datetime, OpeningHours, Period, Time } from "./OpeningHours"

function App() {
    const [datetimeToCheck, setDatetimeToCheck] = useState(
        new Datetime(new Date(Date.now()).toISOString()),
    )
    const [minute, setMinute] = useState(59)

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
            <h1>
                Business on {datetimeToCheck.dayName()} at{" "}
                {datetimeToCheck.time()}{" "}
                {new OpeningHours(
                    ["Mon", "Fri"],
                    Period.fromStrings("08:00", "16:30"),
                ).isOpenOn(new Datetime(new Date(Date.now()).toISOString()))
                    ? "open"
                    : "closed"}
            </h1>
            Time to check:
            <div className="card">
                <input
                    type="time"
                    value={`${datetimeToCheck.time()}`}
                    onChange={(e) => {
                        const newTime = Time.fromString(e.target.value)
                        return setDatetimeToCheck(
                            Datetime.fromDate(
                                newTime.asSeenOn(datetimeToCheck.asDate()),
                            ),
                        )
                    }}
                ></input>
                <button onClick={() => setMinute((count) => count + 1)}>
                    {minute}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
