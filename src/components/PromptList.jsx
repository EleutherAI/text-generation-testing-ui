import React from "react"

import "../styles/promptList.scss"

const PromptList = ({ close, data, selectItem }) => {
  return (
    <div className="prompt-list-overlay" onClick={close}>
      <div className="prompt-list-container" onClick={undefined}>
        <div className="prompt-list-head">
          <h4 className="prompt-head-title">Selected prompts</h4>
          <img className="close-icon" src="img/x_close.svg" alt="Close prompt list" onClick={close} />
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
