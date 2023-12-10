import React, { FC } from "react"

import { capitalize } from "~utils"

type Props = {
  current: string
  target: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeSelectButton: FC<Props> = ({ current, target, setTheme }) => {
  // change theme
  const handleThemeChange = (theme: string) => {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setTheme(theme)
      event.preventDefault()
    }
  }

  return (
    <button
      className={`btn join-item ${current === target ? "btn-active" : ""}`}
      onClick={handleThemeChange(target)}>
      {capitalize(target)}
    </button>
  )
}
