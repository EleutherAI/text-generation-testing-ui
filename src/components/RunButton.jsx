import React from "react"

export default function RunButton({ isDisabled, isLoading, onClick, errorText }) {

  return (
    <div className="run-model-container">
      <button className="button-primary run-btn" disabled={isDisabled} onClick={onClick}>
        Run ✨
      </button>
      {errorText && !isLoading && <p className="error-text">{errorText}</p>}

      <div className="partner-promo-text">
        Powered by <a href="https://hub.getneuro.ai/model/nlp/gpt-j-6B-text-generation">Neuro</a>
      </div>
    </div>
  )
}
