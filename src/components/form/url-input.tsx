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

export const UrlInput: FC<Props> = ({
  icon,
  label,
  input,
  index,
  handleInputChange,
  setEditing
}) => {
  const [url, setUrl] = useState(input.url)
  const [timer, setTimer] = useState(null)
  const Icon = icon

  const handleChange = (index, key, value) => {
    clearTimeout(timer)
    setUrl(value)
    setEditing(true)

    setTimer(
      setTimeout(() => {
        handleInputChange(index, key, value)
        setEditing(false)
      }, 600)
    )
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <div className="w-full">
      <label className="label">
        <span className="label-text">
          <>
            <Icon size={16} className="mr-2" verticalAlign="middle" />
            {label}
          </>
        </span>
      </label>
      <input
        type="url"
        value={url}
        onChange={(e) => {
          handleChange(index, "url", e.target.value)
        }}
        className={`input input-bordered input-primary mt-1 p-2 border rounded-md w-full ${
          !isValidUrl(url) && url.length > 0 ? "border-red-500" : ""
        }`}
        placeholder="e.g. https://example.com"
      />
      {!isValidUrl(url) && url.length > 0 && (
        <p className="text-red-500 text-sm mt-1">Please enter a valid URL.</p>
      )}
    </div>
  )
}
