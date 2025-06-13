from src.opening_hours import OpeningHours
import pytest
from approvals import verify

@pytest.fixture
def shop_hours():
    return OpeningHours(days=["mon", "wed", "fri"], open_time="08:00", close_time="16:00")

def test_is_open_on(shop_hours):
    results = {
        "wednesday": shop_hours.isOpenOn("2016-05-11T12:22:11.824Z"),
        "thursday": shop_hours.isOpenOn("2016-05-12T12:22:11.824Z")
    }
    verify(str(results))

def test_next_opening_date(shop_hours):
    next_open = shop_hours.nextOpeningDate("2016-05-11T12:22:11.824Z")
    verify(next_open)