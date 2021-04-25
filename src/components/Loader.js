import React from "react";

export default function Loader() {
  return (
    <div className="loader-container">
      <div class="lds-spinner">
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
      <p className="loader-text">Waiting for the model to respond...</p>
    </div>
  );
}
