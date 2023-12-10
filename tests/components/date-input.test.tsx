import { describe, expect, it, jest } from "@jest/globals"
import { CalendarIcon } from "@primer/octicons-react"
import { render } from "@testing-library/react"
import React from "react"

import { DateInput } from "~components/form/date-input"

import { factoryInput } from "../utils"

describe("test contents/hello", () => {
  const handleInputChange = jest.fn()
  const input = factoryInput()

  it("should render label", () => {
    expect(
      render(
        <DateInput
          icon={CalendarIcon}
          label="Hello"
          input={input}
          index={1}
          handleInputChange={handleInputChange}
          setEditing={jest.fn()}
        />
      ).getByText("Hello")
    ).toBeTruthy()
  })
})
