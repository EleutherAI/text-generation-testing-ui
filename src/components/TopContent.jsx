import React from "react"

export default function TopContent({ toggleShowPromptList }) {
  return (
    <div className="content-wrapper narrow top-content">
      <div className="left-top">
        <div className="model-choice-section">
          <span className="model-text">MODEL: </span>
          <span className="model-name">
            {!!process.env.REACT_APP_MODEL_NAME ? process.env.REACT_APP_MODEL_NAME : "GPT-J-6B"}
          </span>
          <span className="model-icon">
            <img src="img/eai_brain.svg" alt="model icon" />
          </span>
        </div>
        {process.env.REACT_APP_GITHUB_LINK === "true" && (
          <div className="model-choice-section">
            <span className="model-link">
              <a className="link" href="https://github.com/kingoflolz/mesh-transformer-jax/#gpt-j-6b">
                Model on Github
              </a>
            </span>
          </div>
        )}
      </div>
      {process.env.REACT_APP_PROMPT_SUGGESTIONS === "true" && (
        <div className="right-top">
          <button className="prompt-list-button" onClick={() => toggleShowPromptList(true)}>
            Prompt List
            <span className="prompt-list-button-icon">
              <img src="img/prompt_list.svg" alt="Prompt List Icon" />
            </span>
          </button>
          <p className="description-text">Try a classic prompt evaluated on other models </p>
        </div>
      )}
    </div>
  )
}
