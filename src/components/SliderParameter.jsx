import React from "react"

export function SliderParameter({ id, title, value, minValue, maxValue, defaultValue, onChange }) {
  return (
    <div className="slider-container prompt-section">
      <p className="slider-title control-title">
        <span>{title}</span>
        <span className="right-top">{value}</span>
      </p>
      <p>
        <input id={id} className="slider" type="range" min={minValue}
               max={maxValue} defaultValue={defaultValue} onChange={onChange} />
      </p>
    </div>
  )
}
