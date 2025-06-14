from datetime import datetime, time, timedelta
import calendar


class OpeningHours:
    def __init__(self, days, open_time, close_time):
        self.days = [day.lower() for day in days]
        self.open_time = time.fromisoformat(open_time)
        self.close_time = time.fromisoformat(close_time)

    def isOpenOn(self, dt: str):
        local_dt = datetime.fromisoformat(dt.replace("Z", "+00:00"))
        weekday = calendar.day_name[local_dt.weekday()].lower()
        return (
            weekday[:3] in self.days
            and self.open_time <= local_dt.time() <= self.close_time
        )

    def nextOpeningDate(self, dt: str):
        current_dt = datetime.fromisoformat(dt.replace("Z", "+00:00"))
        for i in range(8):
            candidate = current_dt + timedelta(days=i)
            weekday = calendar.day_name[candidate.weekday()].lower()[:3]
            if weekday in self.days:
                opening_datetime = candidate.replace(
                    hour=self.open_time.hour,
                    minute=self.open_time.minute,
                    second=0,
                    microsecond=0,
                )
                if opening_datetime > current_dt:
                    return opening_datetime.isoformat() + "Z"
        return None
