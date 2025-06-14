from src.opening_hours import OpeningHours
import pytest
from approvaltests.approvals import verify


@pytest.fixture
def shop_hours():
    return OpeningHours(
        days=["mon", "wed", "fri"], open_time="08:00", close_time="16:00"
    )


def test_is_open_on(shop_hours: OpeningHours):
    opening_hours = f"Opening hours: {shop_hours.open_time} - {shop_hours.close_time}"
    opening_days = f"Opening days: {shop_hours.days}"
    results = {
        "wednesday": shop_hours.isOpenOn("2016-05-11T12:22:11.824Z"),
        "wednesday_after_hours": shop_hours.isOpenOn("2016-05-11T16:01:00.000Z"),
        "thursday": shop_hours.isOpenOn("2016-05-12T12:22:11.824Z"),
    }
    verify(f"OPEN HOURS: {opening_hours}\nOPEN DAYS: {opening_days}\n\n{results}")


def header_for_hours(shop_hours: OpeningHours):
    opening_hours = f"Opening hours: {shop_hours.open_time} - {shop_hours.close_time}"
    opening_days = f"Opening days: {shop_hours.days}"
    header = f"OPEN HOURS: {opening_hours}\nOPEN DAYS: {opening_days}\n\n"
    return header


def test_next_opening_date(shop_hours: OpeningHours):
    header = header_for_hours(shop_hours)

    inputs = [
        "2016-05-09T12:22:11.824Z",
        "2016-05-11T12:22:11.824Z",
        "2016-05-13T12:22:11.824Z",
        "2016-05-15T12:22:11.824Z",
    ]
    results = [
        f"{input} ({shop_hours.day_name_for(input)}) => {shop_hours.nextOpeningDate(input)}"
        for input in inputs
    ]
    to_verify = "\n".join(results)
    verify(f"{header}{to_verify}")
