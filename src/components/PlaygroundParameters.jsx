import React from "react"

import "../styles/playgroundParameters.scss"
import IconEaiBrain from "../icons/IconEaiBrain"
import { SliderParameter } from "./SliderParameter"

export default function PlaygroundParameters({
                                               topP,
                                               temp,
                                               setTopP,
                                               setTemp,
                                               isDarkMode
                                             }) {
  return (
    <div className="model-controls">
      <div className="model-choice-section">
        <div className="model-choice-title control-title">
            <span className="model-icon">
              <IconEaiBrain width="1em" height="1em" fill={isDarkMode ? "#FFFFFF" : "#000000"} />
            </span>
          <span className="model-text">Model</span>
        </div>
        <div className="model-type">
            <span className="model-name">
                <a className="link" target="_blank" rel="noopener noreferrer"
                   href="https://github.com/kingoflolz/mesh-transformer-jax/#gpt-j-6b">
                  GPT-J-6B
                </a>
            </span>
        </div>
      </div>

      <SliderParameter id={"myTempRange"} title={"Temperature"} value={temp} minValue={0} maxValue={150} defaultValue={80}
                       tooltipText={"Controls the randomness of the generated text. The Lower the temperature, the more deterministic the model would be."}
                       onChange={({ target: { value: radius } }) => {
                         setTemp(radius / 100)
                       }} />

      <SliderParameter id={"myTopPRange"} title={"TOP-P"} value={topP} minValue={0} maxValue={100} defaultValue={90}
                       tooltipText="Controls the diversity of the generated text. Use lower values for "
                       onChange={({ target: { value: radius } }) => {
                         setTopP(radius / 100)
                       }} />

    </div>
  )
}
