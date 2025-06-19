import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Datetime, OpeningHours, Period } from "./OpeningHours"

function App() {
    const [timeToCheck, setTimeToCheck] = useState(new Date(Date.now()))
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
                Business at {new Date(Date.now()).toLocaleTimeString()}{" "}
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
                    value={`${timeToCheck.getHours()}:${timeToCheck.getMinutes()}`}
                    onChange={(e) => {
                        const thi = e.target.value
                        const newDate = new Date(timeToCheck)
                        newDate.setHours(parseInt(thi.split(":")[0]))
                        newDate.setMinutes(parseInt(thi.split(":")[1]))
                        return setTimeToCheck(newDate)
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
