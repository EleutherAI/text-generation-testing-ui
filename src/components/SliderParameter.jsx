import React from "react"
import Tooltip from "@mui/material/Tooltip"

export function SliderParameter({ id, tooltipText, title, value, minValue, maxValue, defaultValue, onChange }) {
  return (
    <Tooltip title={<span className="tooltip-text">{tooltipText}</span>}>
      <div className="slider-container">
        <p className="slider-title control-title">
          <span>{title}</span>
          <span className="right-top">{value}</span>
        </p>
        <p>
          <input id={id} className="slider" type="range" min={minValue}
                 max={maxValue} defaultValue={defaultValue} onChange={onChange} />
        </p>
      </div>
    </Tooltip>
  )
}
