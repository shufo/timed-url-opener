import { Storage } from "@plasmohq/storage"
import dayjs from "dayjs";
import type { ScheduleInput } from "~options";
import { computeNextAlarmTime, computeNextFiveWeekdayAlarmTime, generateNext5Dates } from "~utils";

// @ts-ignore
import activeIcon from "../assets/icon_active_32x32.png"
// @ts-ignore
import inactiveIcon from "../assets/icon_inactive_32x32.png"

const defaultTitle = "Timed URL Opener"

const main = async () => {

    const storage = new Storage();

    chrome.runtime.onInstalled.addListener(async () => {
        await updateAlarms();
    });

    chrome.runtime.onStartup.addListener(async () => {
        await updateAlarms();
    });

    chrome.action.onClicked.addListener(function (tab) {
        chrome.runtime.openOptionsPage(() => console.log("options page opened"));
    })

    console.info("background script loaded")

    storage.watch({
        "inputs": async (c) => {
            await updateAlarms();
        },
        make: (c) => {
            console.log(c.newValue)
        }
    })

    async function updateAlarms() {
        chrome.alarms.clearAll();

        const inputs: ScheduleInput[] = await storage.get("inputs");

        await updateIcon(inputs);

        inputs.forEach(async (input) => {

            // return if url is empty
            if (!input.url) return;

            // return if url is not valid
            try {
                new URL(input.url);
            } catch (err) {
                return;
            }

            // return if time is empty when frequency is (daily, weekday, oneshot)
            if (!input.time && ["daily", "weekday", "oneshot"].includes(input.frequency)) return;

            // process by frequency
            switch (input.frequency) {
                case "every":
                    processEveryFrequency(input);
                    return;
                case "daily":
                    processDailyFrequency(input);
                    return;
                case "weekday":
                    processWeekdayFrequency(input);
                    return;
                case "oneshot":
                    processOneshotFrequency(input);
                    return;
                default:
                    return;
            }
        });
    }

    async function updateIcon(inputs: ScheduleInput[]) {
        // set icon to active if enabled inputs exists
        const active = inputs.some(({ url, enabled }) => url.length > 0 && enabled);

        if (active) {
            setIconActive()
        } else {
            setIconInactive()
        }

        // set badge text
        const enabledInputs = inputs.filter(({ url, enabled }) => url.length > 0 && enabled);
        const badgeText = enabledInputs.length > 0 ? enabledInputs.length.toString() : "";
        chrome.action.setBadgeText({ text: badgeText });

        // set title
        chrome.action.setTitle({ title: enabledInputs.length > 0 ? `${defaultTitle} (${enabledInputs.length} active schedules)` : defaultTitle });
    }

    function setIconActive() {
        chrome.action.setIcon({ path: activeIcon });
    }

    function setIconInactive() {
        chrome.action.setIcon({ path: inactiveIcon });
    }

    function processEveryFrequency(input: ScheduleInput) {
        const startTime = dayjs(`${input.date} ${input.time}`);
        const currentTime = dayjs();

        let periodInMinutes = 0;

        // convert amount to number if it is string
        if (typeof input.amount === "string") {
            input.amount = parseInt(input.amount);
        }

        switch (input.unit) {
            case "minutes":
                periodInMinutes = input.amount;
                break;
            case "hours":
                periodInMinutes = input.amount * 60;
                break;
            case "days":
                periodInMinutes = input.amount * 24 * 60;
                break;
        }

        const next5Dates = generateNext5Dates(input);

        chrome.alarms.create(`openURL${input.uuid}`, {
            when: startTime.valueOf() < currentTime.valueOf() ?
                next5Dates.at(0).valueOf() // if startTime is before currentTime, set alarm to next first date
                : startTime.valueOf(), // else set alarm to startTime
            periodInMinutes: periodInMinutes,
        });
    }

    function processDailyFrequency(input: ScheduleInput) {
        chrome.alarms.create(`openURL${input.uuid}`, {
            when: computeNextAlarmTime(input.time),
            periodInMinutes: 24 * 60,
        });
    }

    function processWeekdayFrequency(input: ScheduleInput) {
        const dates = computeNextFiveWeekdayAlarmTime(input.time);

        dates.forEach(async (date) => {
            await chrome.alarms.create(`openURL${input.uuid}${date.valueOf()}`, {
                when: date.valueOf(),
                periodInMinutes: 24 * 60 * 7,
            });
        });
    }

    function processOneshotFrequency(input: ScheduleInput) {
        chrome.alarms.create(`openURL${input.uuid}`, {
            when: computeNextAlarmTime(input.time),
        });
    }

    // open url when alarm is triggered
    chrome.alarms.onAlarm.addListener(async alarm => {
        const uuid = alarm.name.substring('openURL'.length);
        const inputs: ScheduleInput[] = await storage.get("inputs");

        // get property from inputs matched uuid
        const { enabled, url, background } = inputs.find(({ uuid: inputUUID }) => inputUUID === uuid);

        // do nothing if not enabled
        if (!enabled) return;

        const active = !background;
        // open url
        if (url) {
            chrome.tabs.create({ url, active });
            setIconActive()
        }
    });

};

main();