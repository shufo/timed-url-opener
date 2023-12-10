import dayjs, { Dayjs } from "dayjs"
import type { ScheduleInput, Unit } from "~options"

export const generateUUID = () => {
    // Public Domain/MIT
    var d = new Date().getTime() //Timestamp
    var d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = Math.random() * 16 //random number between 0 and 16
            if (d > 0) {
                //Use timestamp until depleted
                r = (d + r) % 16 | 0
                d = Math.floor(d / 16)
            } else {
                //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0
                d2 = Math.floor(d2 / 16)
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
        }
    )
}

export const getCloseTime = (unit: Unit, amount: number, startTime: Dayjs) => {
    const now = dayjs()
    const diffInMinutes = now.diff(startTime, "minute")

    let surplus = 0

    switch (unit) {
        case "minutes":
            surplus = diffInMinutes % amount
        case "hours":
            surplus = diffInMinutes % (amount * 60)
        case "days":
            surplus = diffInMinutes % (amount * 60 * 24)
    }

    if (surplus > 0) {
        return dayjs().second(0).subtract(surplus, "minute")
    }

    return startTime.second(0).add(amount, "minute")
}

export const generateNext5Dates = (input: ScheduleInput): Dayjs[] => {
    // daily
    if (input.frequency === "daily") {
        const dates = []

        const hour = parseInt(input.time.split(":")[0])
        const minute = parseInt(input.time.split(":")[1])
        const startTime = dayjs().hour(hour).minute(minute).second(0)

        for (let i = 0; i < 5; i++) {
            if (startTime.isAfter(dayjs())) {
                dates.push(startTime.add(i, "day"))
                continue
            }

            dates.push(startTime.add(i + 1, "day"))
        }

        return dates
    }

    // weekday
    if (input.frequency === "weekday") {
        const dates = []

        const hour = parseInt(input.time.split(":")[0])
        const minute = parseInt(input.time.split(":")[1])
        let startTime = dayjs().hour(hour).minute(minute).second(0)

        // get next 5 weekdays
        while (dates.length < 5) {
            if (startTime.day() !== 0 && startTime.day() !== 6) {
                if (startTime.isAfter(dayjs())) {
                    dates.push(startTime)
                }
            }

            startTime = startTime.add(1, "day")
        }

        return dates
    }

    if (input.frequency === "oneshot") {
        const dates = []

        const year = parseInt(input.date.split("-")[0])
        const month = parseInt(input.date.split("-")[1])
        const day = parseInt(input.date.split("-")[2])
        const hour = parseInt(input.time.split(":")[0])
        const minute = parseInt(input.time.split(":")[1])

        dates.push(
            dayjs()
                .year(year)
                .month(month - 1)
                .date(day)
                .hour(hour)
                .minute(minute)
                .second(0)
        )

        return dates
    }

    let now = dayjs()

    const year = parseInt(input.date.split("-")[0])
    const month = parseInt(input.date.split("-")[1])
    const day = parseInt(input.date.split("-")[2])
    const hour = parseInt(input.time.split(":")[0])
    const minute = parseInt(input.time.split(":")[1])

    now = now
        .year(year)
        .month(month - 1)
        .date(day)
        .hour(hour)
        .minute(minute)
        .second(0)

    const dates = []

    // generate dates while next 5 days from now is reached
    let i = 0

    const current = dayjs()

    let currentTime = getCloseTime(input.unit, input.amount, now)

    while (dates.length < 5) {
        if (currentTime.isBefore(current)) {
            currentTime = currentTime.add(input.amount, input.unit)
            continue
        }

        dates.push(currentTime)

        currentTime = currentTime.add(input.amount, input.unit)
    }

    return dates
}

export function computeNextAlarmTime(time: string) {
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));

    if (scheduledTime <= now) {
        scheduledTime.setDate(now.getDate() + 1);
    }

    return scheduledTime.getTime();
}

export function computeNextFiveWeekdayAlarmTime(time: string): Dayjs[] {
    const now = dayjs();
    const [hours, minutes] = time.split(':');
    let scheduledTime = dayjs(now).hour(parseInt(hours)).minute(parseInt(minutes)).second(0);

    if (scheduledTime.isBefore(now)) {
        scheduledTime = scheduledTime.add(1, 'day');
    }

    const dates = []

    while (dates.length < 5) {
        if (scheduledTime.day() !== 0 && scheduledTime.day() !== 6) {
            dates.push(scheduledTime);
        }
        scheduledTime = scheduledTime.add(1, 'day');
    }

    return dates
}

export const capitalize = (str) => {
    if (typeof str !== "string" || !str) return str
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}