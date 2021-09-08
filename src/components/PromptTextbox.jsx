import React from "react"
import TextareaAutosize from "react-textarea-autosize"

import "../styles/promptTextbox.scss"

export default function PromptTextbox({ promptText, setInsertPrompt, setPromptText, insertPrompt }) {
  return (
    <div className="prompt-input">
      <TextareaAutosize
        minRows="4"
        className="prompt-textarea"
        placeholder="Write some prompt..."
        value={insertPrompt || promptText}
        onChange={evt => {
          setInsertPrompt("")
          setPromptText(evt.currentTarget.value)
        }}
      />
    </div>
  )
}
