import { useState, useEffect, useCallback } from "react"
import "./App.css"

import Loader from "./components/Loader"

function App() {
  const [promptText, setPromptText] = useState("")
  const [topP, setTopP] = useState(0.8)
  const [temp, setTemp] = useState(0.8)
  const [resultText, setResultText] = useState("")
  const [promptInResult, setPromptInResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState("")

  const endpoint = "https://vm.eleuther.ai/complete"

  useEffect(() => {
    setResultText("")
    setErrorText("")
    setIsLoading(false)
  }, [])

  const onClickSendPromptButton = useCallback((promptText = "eleuther", topP, temp) => {
    setIsLoading(true)
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        context: promptText.trim(),
        top_p: topP,
        temp: temp
      })
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        setErrorText("")
        if (data && data.completion) {
          let finalText = data.completion
          if (finalText.search("<|endoftext|>") > -1) {
            finalText = finalText.split("<|endoftext|>")[0]
          }

          setPromptInResult(promptText)
          setResultText(finalText)
        }
      })
      .catch(error => {
        setIsLoading(false)
        console.error("Error:", error)
        setErrorText("Unable to connect to the model. Please try again.")
      })
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 13 && promptText.length > 0) {
        console.log("pressed enter")
        onClickSendPromptButton(promptText, topP, temp)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClickSendPromptButton, topP, temp, promptText])

  return (
    <div className="App">
      <header className="header-container">
        <div className="content-wrapper row">
          <a href="https://www.eleuther.ai/">
            <img id="logo" className="logo-image" src="img/eai_logo_small_exported.png" alt="Eleuther AI logo" />
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
                rows="3"
                onChange={evt => setPromptText(evt.currentTarget.value)}></textarea>
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
                    defaultValue="80"
                    onChange={({ target: { value: radius } }) => {
                      setTopP(radius / 100)
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
                    defaultValue="80"
                    onChange={({ target: { value: radius } }) => {
                      setTemp(radius / 100)
                    }}
                  />
                </p>
                <p className="slider-value">{temp}</p>
              </div>
            </div>
            <div className="button-container">
              <button
                onClick={e => {
                  e.preventDefault()
                  onClickSendPromptButton(promptText, topP, temp)
                }}
                className="button-primary">
                Run the model!
                <span className="button-icon">
                  <img src="img/lightning.svg" alt="lightning icon" />
                </span>
              </button>
            </div>
          </div>
          {isLoading && <Loader />}
          {errorText && !isLoading && <p className="error-text">{errorText}</p>}

          {resultText && !isLoading && (
            <div className="result-section">
              <h3 className="result-title">Result</h3>
              <div className="result-text">
                <span className="prompt-in-result">{promptInResult}</span>
                {resultText}
              </div>
              {!resultText && (
                <div className="send-result-button">
                  <button
                    className="button-primary"
                    onClick={() => onClickSendPromptButton(promptText + " " + resultText, topP, temp)}>
                    Send result as prompt
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <footer>
        <div className="footer-content">Eleuther AI 2021</div>
      </footer>
    </div>
  )
}

export default App
