import {
  BrowserIcon,
  CalendarIcon,
  ClockIcon,
  NumberIcon,
  PulseIcon,
  QuestionIcon,
  SingleSelectIcon,
  TrashIcon
} from "@primer/octicons-react"
import React, { useState } from "react"
import toast from "react-hot-toast"

import { useStorage } from "@plasmohq/storage/hook"

import { DateInput } from "./form/date-input"
import { NumberInput } from "./form/number-input"
import { SelectInput } from "./form/select-input"
import { TextInput } from "./form/text-input"
import { TimeInput } from "./form/time-input"
import { ToggleInput } from "./form/toggle-input"
import { UrlInput } from "./form/url-input"
import { Schedules } from "./schedules"

export const OptionInput = ({ input, index }) => {
  const [editing, setEditing] = useState(false)
  const [inputs, setInputs] = useStorage("inputs", [])

  const handleDeleteInput = (index: number) => {
    const newInputs = [...inputs]
    const oldInput = newInputs[index]
    newInputs.splice(index, 1)
    setInputs(newInputs)
    toast(`Schedule ID: ${oldInput.uuid} Deleted.`, { icon: "🗑️" })
  }

  const handleInputChange = (index: number, key: string, value: any) => {
    const newInputs = [...inputs]
    newInputs[index][key] = value
    setInputs(newInputs)
  }

  return (
    <>
      <div className="text-md">Schedule ID: {input.uuid}</div>
      <div key={input.uuid} className="flex flex-wrap gap-4">
        <TextInput
          label="Title (option)"
          placeholder="e.g. My Schedule"
          index={index}
          input={input}
          handleInputChange={handleInputChange}
          setEditing={setEditing}
        />
        <UrlInput
          icon={BrowserIcon}
          label="URL (required)"
          index={index}
          input={input}
          handleInputChange={handleInputChange}
          setEditing={setEditing}
        />

        <SelectInput
          icon={PulseIcon}
          index={index}
          input={input}
          handleInputChange={handleInputChange}
          setEditing={setEditing}
          inputKey="frequency"
          options={[
            { key: "Every", value: "every" },
            { key: "Daily", value: "daily" },
            { key: "Weekday", value: "weekday" },
            { key: "Oneshot", value: "oneshot" }
          ]}
        />

        {input.frequency === "every" && (
          <NumberInput
            icon={NumberIcon}
            label="Amount"
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
          />
        )}
        {input.frequency === "every" && (
          <SelectInput
            icon={SingleSelectIcon}
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
            inputKey="unit"
            options={[
              { key: "Minutes", value: "minutes" },
              { key: "Hours", value: "hours" },
              { key: "Days", value: "days" }
            ]}
          />
        )}
        {input.frequency === "every" && (
          <DateInput
            icon={CalendarIcon}
            label="Start Date"
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
          />
        )}
        {input.frequency === "oneshot" && (
          <DateInput
            icon={CalendarIcon}
            label="Date"
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
          />
        )}
        {input.frequency === "every" && (
          <TimeInput
            icon={ClockIcon}
            label="Start Time"
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
          />
        )}
        {["oneshot", "daily", "weekday"].includes(input.frequency) && (
          <TimeInput
            icon={ClockIcon}
            label="Time"
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
          />
        )}
        <div className="w-full prose md:ml-2 xl:ml-auto">
          <div>
            <Schedules input={input} editing={editing} />
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Advanced Options
          </div>
          <div className="collapse-content">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Open Tab in Background</span>
                <ToggleInput
                  index={index}
                  input={input}
                  handleInputChange={handleInputChange}
                  setEditing={setEditing}
                  inputKey="background"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text flex">
            Enabled
            <button
              className="tooltip tooltip-right"
              data-tip="Enable or disable this schedule.">
              <QuestionIcon size={20} className="ml-2" />
            </button>
          </span>
          <ToggleInput
            index={index}
            input={input}
            handleInputChange={handleInputChange}
            setEditing={setEditing}
            inputKey="enabled"
          />
        </label>
      </div>
      <div className="row flex justify-center p-4">
        {editing ? (
          <div>
            <p>
              <span className="loading loading-spinner loading-xs"></span>{" "}
              Saving...
            </p>
          </div>
        ) : (
          <div>
            <p className="invisible">Placeholder</p>
          </div>
        )}
      </div>
      <div className="row flex justify-center">
        <button
          onClick={() => handleDeleteInput(index)}
          className="btn btn-secondary mt-4 w-1/3 mb-4 text-md">
          <TrashIcon size={24} />
          Delete
        </button>
      </div>
      {index !== inputs.length - 1 && <div className="w-full divider"></div>}
    </>
  )
}
