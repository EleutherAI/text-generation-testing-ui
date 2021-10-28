import React, { useState, useEffect, useCallback } from "react"

import { getModelCompletion } from "./api/requests"
import Header from "./components/Header"
import PlaygroundHeader from "./components/PlaygroundHeader"
import Footer from "./components/Footer"
import PlaygroundParameters from "./components/PlaygroundParameters"

import "./App.scss"
import TypeWriter from "./components/TypeWriter"

const DEFAULT_PARAMS = {
  TEMPERATURE: 0.8,
  TOP_P: 0.9
}

function App() {
  const [promptText, setPromptText] = useState("")
  const [topP, setTopP] = useState(DEFAULT_PARAMS.TOP_P)
  const [temperature, setTemperature] = useState(DEFAULT_PARAMS.TEMPERATURE)
  const [resultText, setResultText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [typedText, setTypedText] = useState("")

  function setTypedTextTest(testText) {
    setTypedText(testText)
  }

  useEffect(() => {
    setResultText("")
    setErrorText("")
    setIsLoading(false)
  }, [])

  const onClickSendPromptButton = useCallback(
    async (topP, temp) => {
      setIsLoading(true)
      let fullPrompt = promptText.trim()

      try {
        await getModelCompletion(fullPrompt, topP, temp).then((response) => {
          // TODO Sahar - use server response
          const data = response // await response.json()
          if (data) {
            let finalText = data[0]?.generated_text || data?.completion // the second one is for old API
            if (finalText.search("<|endoftext|>") > -1) {
              finalText = finalText.split("<|endoftext|>")[0]
            }

            setPromptText(fullPrompt + " " + finalText)
            setResultText(finalText)
          }
        })
      } catch (error) {
        console.error("Error:", error)
        setErrorText("Unable to connect to the model. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }, [promptText]
  )

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.shiftKey && e.keyCode === 13 && promptText.length > 0) {
        onClickSendPromptButton(topP, temperature)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClickSendPromptButton, topP, temperature, promptText])

  function presetSelected(e) {
    setPromptText(e.label)
  }

  return (
    <div className={isDarkMode ? "App dark" : "App"}>
      <div className="background-container">
        <Header toggleDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <div className="main">
          <div className="main-content">
            <div className="playground-header-section">
              <div className="internal-bar">
                <PlaygroundHeader isDarkMode={isDarkMode} presetSelected={presetSelected} />
              </div>
            </div>

            <div className="playground-body-section">
              <div className="playground-body">
                <div className="playground-body-wrapper">
                  <div className="playground-body-left-pane">
                    <PlaygroundParameters topP={topP} temp={temperature} setTemp={setTemperature}
                                          setTopP={setTopP} onClickSendPromptButton={onClickSendPromptButton}
                                          isLoading={isLoading} promptText={promptText} isDarkMode={isDarkMode}
                    />
                  </div>
                  <div className="playground-body-right-pane right-top">
                    <TypeWriter setPromptText={setPromptText} promptText={promptText} messageToType={resultText}
                                typedText={typedText} setTypedText={setTypedTextTest} />

                    <div className="run-model-container">
                      <button disabled={!!isLoading || !promptText.length}
                              className="button-primary run-btn"
                              onClick={e => {
                                e.preventDefault()
                                if (!isLoading) onClickSendPromptButton(topP, temperature)
                              }}>
                        Run ✨
                        {errorText && !isLoading && <p className="error-text">{errorText}</p>}
                      </button>
                      <div className="partner-promo-text">
                        Powered by <a href="https://hub.getneuro.ai/model/nlp/gpt-j-6B-text-generation">Neuro</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
