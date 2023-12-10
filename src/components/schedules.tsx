import { CalendarIcon, MeterIcon } from "@primer/octicons-react"
import dayjs from "dayjs"
import React, { FC, useEffect, useState } from "react"

import { ScheduleInput } from "~options"
import * as utils from "~utils"

const weekday = require("dayjs/plugin/weekday")
dayjs.extend(weekday)

const utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

type Props = {
  input: ScheduleInput
  editing: boolean
}

export const Schedules: FC<Props> = ({ input, editing }) => {
  const [times, setTimes] = useState(utils.generateNext5Dates(input))

  useEffect(() => {
    // Function to update times
    const updateTimes = () => {
      setTimes(utils.generateNext5Dates(input))
    }

    // Initial update
    updateTimes()

    // Set up an interval to update times every seconds
    const intervalId = setInterval(updateTimes, 1000)

    // Cleanup on component unmount
    return () => clearInterval(intervalId)
  }, [input, editing])

  return (
    <div>
      <h4>
        <CalendarIcon size={24} />
        <span className="ml-2">
          Upcoming Schedules {!input.enabled && <span>(Deactivated)</span>}
        </span>
      </h4>
      {editing ? (
        <div className="flex flex-col gap-3 w-full">
          {input.frequency === "oneshot" ? (
            <div className="text-lg skeleton h-12 w-full"></div>
          ) : (
            <>
              <div className="text-lg skeleton h-12 w-full"></div>
              <div className="text-lg skeleton h-12 w-full"></div>
              <div className="text-lg skeleton h-12 w-full"></div>
              <div className="text-lg skeleton h-12 w-full"></div>
              <div className="text-lg skeleton h-12 w-full"></div>
            </>
          )}
        </div>
      ) : (
        <table className={input.enabled ? "table" : "table opacity-50"}>
          <tbody>
            {times.map((time) => {
              return (
                <tr key={time.valueOf()}>
                  <td className="font-mono text-lg">
                    <MeterIcon
                      size={18}
                      className="mr-2"
                      verticalAlign="middle"
                    />
                    {time.format("YYYY/MM/DD HH:mm:ss")}
                  </td>
                  <td className="text-lg">{time.fromNow()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
