import React from "react"
import "../styles/promptInput.scss"


export default function PromptInput({ setPromptText, promptText, onKeyDown }) {
  return (
    <div className="prompt-input">
      <textarea className="prompt-textarea" placeholder="Write some text and run (⇧+Enter) to generate text." value={promptText}
                onKeyDown={onKeyDown}
                onChange={evt => {
                  setPromptText(evt.currentTarget.value)
                }}
      />
    </div>
  )
}
