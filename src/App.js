import { useState, useEffect, useCallback } from "react"
import "./App.css"

import Loader from "./components/Loader"
import PromptList from "./components/PromptList"
import ClassicPrompts from "./data/classicPrompts"

function App() {
  const [promptText, setPromptText] = useState("")
  const [topP, setTopP] = useState(0.9)
  const [temp, setTemp] = useState(0.8)
  const [resultText, setResultText] = useState("")
  const [promptInResult, setPromptInResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [insertPrompt, setInsertPrompt] = useState("")
  const [showPromptList, setShowPromptList] = useState(false)

  useEffect(() => {
    setResultText("")
    setErrorText("")
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (insertPrompt) {
      setPromptText(insertPrompt)
    }
  }, [insertPrompt])

  const onClickSendPromptButton = useCallback(
    (extraText, topP, temp) => {
      const ENDPOINT = !!process.env.REACT_APP_MODEL_ENDPOINT_URL
        ? process.env.REACT_APP_MODEL_ENDPOINT_URL
        : "http://localhost:8000/completion"
      const finalUrl =
        process.env.REACT_APP_USE_PROXY === "true" ? `https://cors-proxy-janko.herokuapp.com/${ENDPOINT}` : ENDPOINT

      setIsLoading(true)
      let fullPrompt = promptText
      if (extraText !== "") fullPrompt = fullPrompt + extraText
      fetch(finalUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          context: fullPrompt.trim(),
          top_p: topP,
          temp: temp,
          response_length: 128,
          remove_input: true
        })
      })
        .then(response => response.json())
        .then(data => {
          setIsLoading(false)
          setErrorText("")
          if (data) {
            let finalText = data[0]?.generated_text
            if (finalText.search("<|endoftext|>") > -1) {
              finalText = finalText.split("<|endoftext|>")[0]
            }

            setPromptInResult(promptText)

            let combinedResult = ""
            if (extraText !== "") combinedResult = extraText
            combinedResult = combinedResult + finalText
            setResultText(combinedResult)
          }
        })
        .catch(error => {
          setIsLoading(false)
          console.error("Error:", error)
          setErrorText("Unable to connect to the model. Please try again.")
        })
    },
    [promptText]
  )

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.shiftKey && e.keyCode === 13 && promptText.length > 0) {
        onClickSendPromptButton("", topP, temp)
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
            <img id="logo" className="logo-image" src="img/eai_logo_small_exported.png" alt="EleutherAI logo" />
          </a>
          <h1 className="logo-text">
            <a href="/">EleutherAI</a>
          </h1>
        </div>
      </header>
      <div className="main">
        {showPromptList && (
          <PromptList close={() => setShowPromptList(false)} data={ClassicPrompts} selectItem={setInsertPrompt} />
        )}
        <h2 className="page-title">
          {!!process.env.REACT_APP_TITLE ? process.env.REACT_APP_TITLE : "TEST EAI LANGUAGE MODELS"}
        </h2>
        <div className="content-wrapper narrow top-content">
          <div className="left-top">
            <div className="model-choice-section">
              <span className="model-text">MODEL: </span>
              <span className="model-name">
                {!!process.env.REACT_APP_MODEL_NAME ? process.env.REACT_APP_MODEL_NAME : "GPT-J-6B"}
              </span>
              <span className="model-icon">
                <img src="img/eai_brain.svg" alt="model icon" />
              </span>
            </div>
            {process.env.REACT_APP_GITHUB_LINK === "true" && (
              <div className="model-choice-section">
                <span className="model-link">
                  <a className="link" href="https://github.com/kingoflolz/mesh-transformer-jax/#gpt-j-6b">
                    Model on Github
                  </a>
                </span>
              </div>
            )}
          </div>
          {process.env.REACT_APP_PROMPT_SUGGESTIONS === "true" && (
            <div className="right-top">
              <button className="prompt-list-button" onClick={() => setShowPromptList(true)}>
                Prompt List
                <span className="prompt-list-button-icon">
                  <img src="img/prompt_list.svg" alt="Prompt List Icon" />
                </span>
              </button>
              <p className="description-text">Try a classic prompt evaluated on other models </p>
            </div>
          )}
        </div>
        <div className="content-wrapper narrow">
          <div className="form-container">
            <div className="prompt-input">
              <textarea
                className="prompt-textarea"
                placeholder="Write some prompt..."
                rows={promptText.length ? 3 + Math.round(promptText.length / 100) : 3}
                value={insertPrompt || promptText}
                onChange={evt => {
                  setInsertPrompt("")
                  setPromptText(evt.currentTarget.value)
                }}></textarea>
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
                    defaultValue="90"
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
                    min="0"
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
                  if (!isLoading) onClickSendPromptButton("", topP, temp)
                }}
                disabled={!!isLoading || !promptText.length}
                className="button-primary">
                Run the model!
                <span className="button-icon">
                  <img src="img/lightning.svg" alt="lightning icon" />
                </span>
              </button>
              <div className="partner-promo-text">
                Powered by <a href="https://hub.getneuro.ai/model/nlp/gpt-j-6B-text-generation">Neuro</a>
              </div>
            </div>
          </div>
          {isLoading && <Loader />}
          {errorText && !isLoading && <p className="error-text">{errorText}</p>}
          {resultText && !isLoading && (
            <div className="result-section">
              <h3 className="result-title">Result</h3>
              <div className="result-text">
                <span className="prompt-in-result-bold">{promptInResult}</span>
                {resultText}
              </div>
              {resultText && (
                <div className="send-result-button">
                  <button
                    className="button-primary"
                    disabled={!!isLoading}
                    onClick={() => onClickSendPromptButton(resultText, topP, temp)}>
                    Send result as prompt
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <footer>
        <div className="content-wrapper">
          <div className="footer-content">
            <div className="footer-text-center">EleutherAI 2021</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
