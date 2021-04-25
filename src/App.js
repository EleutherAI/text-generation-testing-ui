import { useState, useEffect } from "react";
import "./App.css";

import Loader from "./components/Loader";

function App() {
  const [promptText, setPromptText] = useState("");
  const [topP, setTopP] = useState(0.5);
  const [temp, setTemp] = useState(0.5);
  const [resultText, setResultText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setResultText("");
    setIsLoading(false);
  }, []);

  const onClickSendPromptButton = (
    text = "eleuther",
    topP = 0.9,
    temp = 0.75
  ) => {
    setIsLoading(true);
    fetch(
      "https://cors-proxy-janko.herokuapp.com/http://34.90.220.168:5000/complete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: text,
          top_p: topP,
          temp: temp,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setIsLoading(false);
        if (data.completion) {
          setResultText(data.completion);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <header className="header-container">
        <div className="content-wrapper row">
          <a href="/">
            <img
              id="logo"
              className="logo-image"
              src="img/eai_logo_small_exported.png"
              alt="Eleuther AI logo"
            />
          </a>
          <h1 className="logo-text">
            <a href="/">EleutherAI</a>
          </h1>
        </div>
      </header>
      <div className="main">
        <div className="content-wrapper narrow">
          <h2 className="page-title">TEST EAI LANGUAGE MODELS</h2>
          <div className="model-choice-section">
            <span className="model-text">MODEL: </span>
            <span className="model-name">GPT-NEO 1.2B</span>
            <span className="model-icon">
              <img src="img/eai_brain.svg" alt="model icon" />
            </span>
          </div>
          <div className="form-container">
            <div className="prompt-input">
              <textarea
                className="prompt-textarea"
                placeholder="Write some prompt..."
                onChange={(evt) => setPromptText(evt.currentTarget.value)}
              ></textarea>
            </div>
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
                    onChange={({ target: { value: radius } }) => {
                      setTopP(radius / 100);
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
                    min="50"
                    max="150"
                    className="slider"
                    id="myTempRange"
                    onChange={({ target: { value: radius } }) => {
                      setTemp(radius / 100);
                    }}
                  />
                </p>
                <p className="slider-value">{temp}</p>
              </div>
            </div>
            <div className="button-container">
              <button
                onClick={() => {
                  onClickSendPromptButton(promptText, topP, temp);
                }}
                className="button-primary"
              >
                Run the model!
                <span className="button-icon">
                  <img src="img/lightning.svg" alt="lightning icon" />
                </span>
              </button>
            </div>
          </div>
          {isLoading && <Loader />}

          {resultText && !isLoading && (
            <div className="result-section">
              <h3 className="result-title">Result</h3>
              <div className="result-text">{resultText}</div>
            </div>
          )}
        </div>
      </div>
      <footer>
        <div className="footer-content">Eleuther AI 2021</div>
      </footer>
    </div>
  );
}

export default App;
