import React, { FC, useState } from "react"

import { ScheduleInput } from "~options"

type Props = {
  label: string
  placeholder: string
  input: ScheduleInput
  index: number
  handleInputChange: (index: number, key: string, value: any) => void
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const TextInput: FC<Props> = ({
  label,
  placeholder,
  input,
  index,
  handleInputChange,
  setEditing
}) => {
  const [title, setTitle] = useState(input.title)
  const [timer, setTimer] = useState(null)

  const handleChange = (index, key, value) => {
    clearTimeout(timer)
    setTitle(value)
    setEditing(true)

    setTimer(
      setTimeout(() => {
        handleInputChange(index, key, value)
        setEditing(false)
      }, 600)
    )
  }

  return (
    <div className="w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          handleChange(index, "title", e.target.value)
        }}
        className="input text-lg rounded-md w-full"
        placeholder={placeholder}
      />
    </div>
  )
}
