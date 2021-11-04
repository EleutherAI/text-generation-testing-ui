import React from "react"
import Select from "react-select"

import "../styles/playgroundHeader.scss"
import PresetPrompts from "../data/presetPrompts"

export default function PlaygroundHeader({ isDarkMode, presetSelected }) {
  // taken from colors.scss
  const DARK_THEME_BG2 = "#1d2327"
  const DARK_THEME_TEXT = "#dbdbdb"
  const DARK_THEME_BLUE = "#00bbff"

  const customStyles = isDarkMode => ({
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? DARK_THEME_BG2 : "white"
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? DARK_THEME_BG2 : "white"
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: isDarkMode ? DARK_THEME_TEXT : "black"
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: isDarkMode ? "white" : DARK_THEME_TEXT,
      "&:hover": {
        color: isDarkMode ? DARK_THEME_TEXT : "black"
      }
    }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        backgroundColor: isDarkMode ? DARK_THEME_BLUE : provided
      }
    })
  })

  return (
    <div className="content-wrapper playground-header">
      <div className="title">
        <h2>
          {!!process.env.REACT_APP_TITLE ? process.env.REACT_APP_TITLE : "EleTinker Text Generator"}
        </h2>
      </div>

      {process.env.REACT_APP_PROMPT_SUGGESTIONS === "true" &&
      <Select className="preset-section" options={PresetPrompts} placeholder="Try a preset prompt..."
              menuColor="green" styles={customStyles(isDarkMode)}
              onChange={presetSelected} />
      }
    </div>
  )
}
