import React from "react"

export default function RunButton({ isDisabled, onClick, errorText }) {

  return (
    <div className="run-model-container">
      <button className="button-primary run-btn" disabled={isDisabled} onClick={onClick}>
        Run ✨
      </button>

      <div className="partner-promo-text">
        Powered by&nbsp;
        <a href="https://hub.getneuro.ai/model/nlp/gpt-j-6B-text-generation"
           target="_blank" rel="noopener noreferrer">
          Neuro
        </a>
      </div>

      {errorText && <p className="error-text">{errorText}</p>}
    </div>
  )
}
