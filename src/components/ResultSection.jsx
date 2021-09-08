import React from "react"

export default function ResultSection({ resultText, promptInResult, onClickSendPromptButton, topP, temp, isLoading }) {
  return (
    <div className="result-section">
      <h3 className="result-title">Result</h3>
      <div className="result-text">
        <span className="prompt-in-result-bold">{promptInResult}</span>
        {resultText}
      </div>
      {resultText && (
        <div className="send-result-button">
          <button
            className="button-primary"
            disabled={!!isLoading}
            onClick={() => onClickSendPromptButton(resultText, topP, temp)}>
            Send result as prompt
          </button>
        </div>
      )}
    </div>
  )
}
