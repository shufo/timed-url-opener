import dayjs from "dayjs";
import { ScheduleInput } from "~options";
import { generateUUID } from "~utils";

export const factoryInput = (options = {}) => {
    const input: ScheduleInput = {
        enabled: true,
        title: "",
        url: "",
        time: dayjs().add(5, "minutes").format("HH:mm"),
        date: dayjs().format("YYYY-MM-DD"),
        frequency: "daily",
        uuid: generateUUID(),
        amount: 1,
        unit: "minutes",
        background: false,
        added_at: new Date().toISOString(),
        is_valid: false,
        ...options
    }

    return input
}