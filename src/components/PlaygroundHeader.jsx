import React from "react"
import Select from "react-select"

import "../styles/playgroundHeader.scss"
import PresetPrompts from "../data/presetPrompts"

export default function PlaygroundHeader({ isDarkMode, presetSelected }) {
  return (
    <div className="content-wrapper playground-header">
      <div className="title">
        <h2>
          {!!process.env.REACT_APP_TITLE ? process.env.REACT_APP_TITLE : "EleTinker Text Generator"}
        </h2>
      </div>

      {process.env.REACT_APP_PROMPT_SUGGESTIONS === "true" &&
      <Select className="preset-section" options={PresetPrompts} placeholder="Try a preset prompt..."
              onChange={presetSelected} />
      }
    </div>
  )
}
