import React from "react"

import IconXClose from "../icons/IconXClose"

import "../styles/promptList.scss"

const PromptList = ({ close, data, selectItem, isDarkMode }) => {
  return (
    <div className="prompt-list-overlay" onClick={close}>
      <div className="prompt-list-container" onClick={undefined}>
        <div className="prompt-list-head">
          <h4 className="prompt-head-title">Selected prompts</h4>
          <IconXClose
            className="close-icon"
            fill={isDarkMode ? "#00bbff" : "#34566f"}
            alt="Close prompt list"
            onClick={close}
            width="1.2em"
          />
        </div>
        <div className="prompt-list-content">
          <ul className="prompt-list">
            {data.map(item => (
              <li
                key={item.id}
                onClick={() => {
                  selectItem(item.text)
                  close()
                }}>
                {item.link_source}
                <p className="item-link">source: {item.source_link}</p>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PromptList
