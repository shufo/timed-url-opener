import React, { useEffect, useState } from "react"
import { resolveValue, toast, Toaster } from "react-hot-toast"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import "~style.css"

import {
  EyeIcon,
  PeopleIcon,
  PlusIcon,
  SearchIcon,
  StopwatchIcon
} from "@primer/octicons-react"
import dayjs from "dayjs"

import { ThemeSelectButton } from "~components/form/theme-select-button"
import { Modal } from "~components/modal"
import { OptionInput } from "~components/option-input"
import { menuBarIcons } from "~config"
import { generateUUID } from "~utils"

import { version } from "../package.json"

export type ScheduleInput = {
  title: string
  url: string
  time: string
  date: string
  frequency: Frequency
  amount: number
  unit: Unit
  background: boolean
  enabled: boolean
  uuid: string
  added_at: string
  is_valid: boolean
}

export type Unit = "minutes" | "hours" | "days"
export type Frequency = "every" | "daily" | "weekday" | "oneshot"

const lightThemes = ["light", "nord", "valentine", "retro", "lofi", "cupcake"]
const darkThemes = ["dark", "dracula", "dim", "synthwave", "sunset", "coffee"]

function OptionsIndex() {
  const [inputs, setInputs] = useStorage("inputs", [])
  const [theme, setTheme] = useStorage<string>({
    key: "theme",
    instance: new Storage({ copiedKeyList: ["theme"] })
  })
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        enabled: true,
        title: "",
        url: "",
        time: dayjs().add(5, "minutes").format("HH:mm"),
        date: dayjs().format("YYYY-MM-DD"),
        frequency: "daily",
        uuid: generateUUID(),
        amount: 1,
        unit: "minutes",
        background: false,
        added_at: new Date().toISOString(),
        is_valid: false
      }
    ])
    toast("New schedule added.", { className: "bg-secondary", icon: "👏" })
  }

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme)
    } catch (e) {}

    setTimeout(() => {
      setLoading(false)
    }, 300)
  })

  return (
    <>
      <div
        className={`drawer h-full transition-all duration-300 ease-in-out ${
          !loading ? "" : "blur-lg"
        }`}
        data-theme={theme}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="max-w-full mx-auto">
            <Toaster
              containerClassName="toast"
              gutter={12}
              toastOptions={{ duration: 2000 }}>
              {(t) => (
                <div className="text-base-100 alert text-lg w-11/12 bg-secondary">
                  {resolveValue(t.icon, t)} {resolveValue(t.message, t)}
                </div>
              )}
            </Toaster>
            <div className="navbar bg-base-100">
              <div className="navbar-start">
                <div>
                  <label htmlFor="my-drawer">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle drawer-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
              </div>
              {"  "}
              <div className="navbar-center">
                <StopwatchIcon size={24} />
                <h1 className="text-xl ml-2">Timed URL Opener</h1>
                <span className="ml-4 text-sm align-baseline">v{version}</span>
              </div>
              <div className="navbar-end">
                {Object.entries(menuBarIcons).map(([_, item]) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    title={item.title}>
                    <button className="btn btn-ghost btn-circle">
                      <item.icon size={24} />
                    </button>
                  </a>
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-row items-center">
                <h2 className="text-xl">Schedules</h2>
                <span className="ml-auto">
                  <SearchIcon size={24} verticalAlign="middle" />
                  <input
                    type="text"
                    placeholder="Filter Title..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="input input-bordered ml-2"
                  />
                </span>
              </div>
              {inputs
                .filter((input) =>
                  input.title
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase())
                )
                .map((input, index) => (
                  <div key={index}>
                    <OptionInput key={input.uuid} index={index} input={input} />
                  </div>
                ))}
              <div className="divider p-4">
                {!loading &&
                  (searchKeyword.length === 0 ? (
                    <button
                      onClick={handleAddInput}
                      className="btn btn-primary">
                      <PlusIcon size={24} />
                      Add Schedule
                    </button>
                  ) : (
                    inputs.filter((input) =>
                      input.title
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                    ).length === 0 && (
                      <p className="text-center">
                        No schedules found. Try adding a schedule .
                      </p>
                    )
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <label htmlFor="theme_modal">
                <EyeIcon size={20} />
                Theme
              </label>
            </li>
            <li>
              <label htmlFor="about_modal">
                <PeopleIcon size={20} />
                About
              </label>
            </li>
          </ul>
        </div>
        <Modal
          id="theme_modal"
          icon={<EyeIcon size={24} />}
          lead="Theme"
          body={
            <>
              <h3 className="text-lg mb-2">Light Themes</h3>
              <div className="join mb-2">
                {Array.from(lightThemes).map((target) => (
                  <ThemeSelectButton
                    key={target}
                    current={theme}
                    target={target}
                    setTheme={setTheme}
                  />
                ))}
              </div>
              <h3 className="text-lg mb-2">Dark Themes</h3>
              <div className="join">
                {Array.from(darkThemes).map((target) => (
                  <ThemeSelectButton
                    key={target}
                    current={theme}
                    target={target}
                    setTheme={setTheme}
                  />
                ))}
              </div>
            </>
          }
        />
        <Modal
          id="about_modal"
          icon={<PeopleIcon size={24} />}
          lead="About"
          body="Timed URL Opener is a browser extension that allows you to open a URL at a specific time."
        />
      </div>
      {loading && (
        <div className="fixed inset-0 bg-blur z-50">
          <div className="fixed inset-0 bg-blur z-50 flex items-center justify-center">
            {/* Loading spinner goes here */}
            <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default OptionsIndex
