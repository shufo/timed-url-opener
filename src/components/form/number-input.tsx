import { Icon } from "@primer/octicons-react"
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

export const NumberInput: FC<Props> = ({
  icon,
  label,
  input,
  index,
  handleInputChange,
  setEditing
}) => {
  const [amount, setAmount] = useState(input.amount)
  const [timer, setTimer] = useState(null)
  const Icon = icon

  const handleChange = (index, key, value) => {
    clearTimeout(timer)
    setAmount(value)
    setEditing(true)

    setTimer(
      setTimeout(() => {
        handleInputChange(index, key, value)
        setEditing(false)
      }, 600)
    )
  }

  return (
    <div className="mt-4 md:mt-0">
      <label className="label">
        <span className="label-text">
          <Icon size={16} className="mr-2" verticalAlign="middle" />
          {label}
        </span>
      </label>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => {
          handleChange(index, "amount", e.target.value)
        }}
        className="input input-bordered input-secondary mt-1 p-2 w-16"
      />
    </div>
  )
}
