import { Icon } from "@primer/octicons-react"
import dayjs from "dayjs"
import React, { FC, useState } from "react"

import { ScheduleInput } from "~options"

type Props = {
  icon: Icon
  label: string
  input: ScheduleInput
  index: number
  handleInputChange: (index: number, key: string, value: any) => void
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const DateInput: FC<Props> = ({
  icon,
  label,
  input,
  index,
  handleInputChange,
  setEditing
}) => {
  const [date, setDate] = useState(input.date)
  const [timer, setTimer] = useState(null)
  const Icon = icon

  const handleChange = (index, key, value) => {
    clearTimeout(timer)
    setDate(value)
    setEditing(true)

    setTimer(
      setTimeout(() => {
        handleInputChange(index, key, value)
        setEditing(false)
      }, 600)
    )
  }

  return (
    <div className="mt-4 md:mt-0 w-32">
      <label className="label">
        <span className="label-text">
          <>
            <Icon size={16} className="mr-2" verticalAlign="middle" />
            {label}
          </>
        </span>
      </label>
      <input
        type="date"
        value={date}
        min={dayjs().format("YYYY-MM-DD")}
        onChange={(e) => {
          handleChange(index, "date", e.target.value)
        }}
        className="input input-bordered input-secondary mt-1 p-2 border rounded-md w-full"
      />
    </div>
  )
}
