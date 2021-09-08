import React from "react"

import "../styles/header.scss"

export default function Header() {
  return (
    <header className="header-container">
      <div className="content-wrapper row">
        <a href="https://www.eleuther.ai/">
          <img id="logo" className="logo-image" src="img/eai_logo_small_exported.png" alt="EleutherAI logo" />
        </a>
        <h1 className="logo-text">
          <a href="/">EleutherAI</a>
        </h1>
      </div>
    </header>
  )
}
