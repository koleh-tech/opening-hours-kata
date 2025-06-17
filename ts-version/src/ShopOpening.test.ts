import { expect, test } from "vitest"
import { ShopBusinessHours, OpeningHoursNew } from "./ShopBusinessHours"

test("adds 1 + 2 to equal 3", () => {
    const toApprove = new ShopBusinessHours(
        ["mon", "wed", "fri"],
        new OpeningHoursNew("08:00", "16:00"),
    ).isOpenOn("2016-05-11T12:22:11.824Z")
    expect(toApprove).toBe(false)
})
