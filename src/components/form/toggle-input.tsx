import React, { FC, useState } from "react"

import { ScheduleInput } from "~options"

type Props = {
  input: ScheduleInput
  index: number
  inputKey: string
  handleInputChange: (index: number, key: string, value: any) => void
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToggleInput: FC<Props> = ({
  input,
  index,
  inputKey,
  handleInputChange,
  setEditing
}) => {
  const [toggle, setToggle] = useState(input[inputKey])
  const [timer, setTimer] = useState(null)

  const handleChange = (index, key) => {
    clearTimeout(timer)
    setToggle(!toggle)
    setEditing(true)

    setTimer(
      setTimeout(() => {
        handleInputChange(index, key, !toggle)
        setEditing(false)
      }, 600)
    )
  }

  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      defaultChecked={toggle}
      onChange={(e) => {
        handleChange(index, inputKey)
      }}
    />
  )
}
