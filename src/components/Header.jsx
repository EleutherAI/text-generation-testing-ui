import React from "react"

import "../styles/header.scss"

export default function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <header className="header-container">
      <div className="content-wrapper row">
        <div>
          <h1 className="logo">
            <a href="/">
              <img id="logo" className="logo-image" src="/img/eai_logo_small_exported.png" alt="EleutherAI logo" />
              <span className="logo-text">EleutherAI</span>
            </a>
          </h1>
        </div>

        <div className="head-right">
          <span className="dark-mode-switch">
            <img src="/img/halfCircle.svg" alt="Dark mode" onClick={() => toggleDarkMode(!isDarkMode)} />
          </span>
        </div>
      </div>
    </header>
  )
}
