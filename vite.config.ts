import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    base: "/opening-hours-kata/", // replace with your GitHub repo name
    plugins: [react()],
})
