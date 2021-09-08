import React from "react"

import "../styles/loader.scss"

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">
        Waiting for the model to respond... It may take up to a minute to generate. Please be patient!
      </p>
    </div>
  )
}
