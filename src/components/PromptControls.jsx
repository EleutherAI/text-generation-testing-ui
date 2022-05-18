import React from "react"

import IconLightning from "../icons/IconLightning"

import "../styles/promptControls.scss"

export default function PromptControls({
  topP,
  temp,
  setTopP,
  setTemp,
  onClickSendPromptButton,
  isLoading,
  promptText,
  isDarkMode
}) {
  return (
    <>
      <div className="model-controls">
        <div className="slider-container">
          <p className="slider-title">TOP-P</p>
          <p>
            <input
              type="range"
              min="0"
              max="100"
              className="slider"
              id="myTopPRange"
              defaultValue="90"
              onChange={({ target: { value: radius } }) => {
                setTopP(radius / 100)
              }}
            />
          </p>
          <p className="slider-value">{topP}</p>
        </div>
        <div className="slider-container">
          <p className="slider-title">Temperature</p>
          <p>
            <input
              type="range"
              min="0"
              max="150"
              className="slider"
              id="myTempRange"
              defaultValue="80"
              onChange={({ target: { value: radius } }) => {
                setTemp(radius / 100)
              }}
            />
          </p>
          <p className="slider-value">{temp}</p>
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={e => {
            e.preventDefault()
            if (!isLoading) onClickSendPromptButton("", topP, temp)
          }}
          disabled={!!isLoading || !promptText.length}
          className="button-primary">
          Run the model!
          <span className="button-icon">
            <IconLightning fill={isDarkMode ? "#00bbff" : "#34566f"} />
          </span>
        </button>
        <div className="partner-promo-text">
          Powered by <a href="https://www.mystic.ai/">Mystic.ai</a>
        </div>
      </div>
    </>
  )
}
