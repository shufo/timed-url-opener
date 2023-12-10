import { Icon } from "@primer/octicons-react"
import React, { FC, useState } from "react"

import { ScheduleInput } from "~options"
import { capitalize } from "~utils"

type Props = {
  input: ScheduleInput
  icon: Icon
  index: number
  inputKey: string
  handleInputChange: (index: number, key: string, value: any) => void
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  options: { key: string; value: string }[]
}

export const SelectInput: FC<Props> = ({
  input,
  icon,
  index,
  handleInputChange,
  setEditing,
  inputKey,
  options
}) => {
  const [select, setSelect] = useState(input[inputKey])
  const [timer, setTimer] = useState(null)
  const Icon = icon

  const handleChange = (index, key, value) => {
    clearTimeout(timer)
    setSelect(value)
    setEditing(true)

    setTimer(
      setTimeout(() => {
        handleInputChange(index, key, value)
        setEditing(false)
      }, 50)
    )
  }

  return (
    <div className="mt-4 md:mt-0 w-32">
      <label className="label flex">
        <span className="label-text">
          <Icon size={16} className="mr-2" verticalAlign="middle" />
          {capitalize(inputKey)}
        </span>
      </label>
      <select
        value={select}
        onChange={(e) => {
          handleChange(index, inputKey, e.target.value)
        }}
        className="input input-bordered input-secondary mt-1 p-2 w-full">
        {options.map(({ key, value }) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}
