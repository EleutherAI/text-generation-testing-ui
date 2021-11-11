import React, { useState } from "react"

import { getModelCompletion } from "./api/requests"
import Header from "./components/Header"
import PlaygroundHeader from "./components/PlaygroundHeader"
import Footer from "./components/Footer"
import PlaygroundParameters from "./components/PlaygroundParameters"

import "./App.scss"
import PromptInput from "./components/PromptInput"
import RunButton from "./components/RunButton"

const DEFAULT_PARAMS = {
  TEMPERATURE: 0.8,
  TOP_P: 0.9
}

const TYPING_SPEED_CHARS_PER_BATCH = 8

function App() {
  const [promptText, setPromptText] = useState("")
  const [topP, setTopP] = useState(DEFAULT_PARAMS.TOP_P)
  const [temperature, setTemperature] = useState(DEFAULT_PARAMS.TEMPERATURE)
  const [resultText, setResultText] = useState("")
  const [step, setStep] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [typedText, setTypedText] = useState("")

  React.useEffect(() => {
    const addToText = (newText) => {
      setPromptText((prev) => `${prev}${newText}`)
    }
    const parts = resultText.match(new RegExp(".{1," + TYPING_SPEED_CHARS_PER_BATCH + "}", "g"))
    if (step !== null) {
      addToText(parts[step])
      if (step === parts.length - 1) {
        setStep(null)
        setIsLoading(false)
      }
    }
  }, [step, resultText])


  const handleClick = (resultToAppend) => {
    for (let i = 0; i < Math.max((resultToAppend.length / TYPING_SPEED_CHARS_PER_BATCH), 1); i++) {
      setTimeout(() => {
        setStep(i)
      }, i * 300) // interval at which to add more text
    }
  }

  function setTypedTextTest(testText) {
    setTypedText(testText)
  }


  async function onClickSendPromptButton(topP, temp) {
    setIsLoading(true)
    setErrorText("")
    setResultText("")
    await getModelCompletion(promptText.trim(), topP, temp).then(async (response) => {
      const data = await response.json()
      if (data) {
        let finalText = data[0]?.generated_text || data?.completion // the second one is for old API
        if (finalText.search("<|endoftext|>") > -1) {
          finalText = finalText.split("<|endoftext|>")[0]
        }

        setResultText(finalText)
        handleClick(finalText)
      }
    }).catch((error) => {
      console.error("Error:", error)
      setErrorText("Unable to connect to the model. Please try again.")
    })
  }

  function handleKeyDown(e) {
    if (e.shiftKey && e.which === 13 /* Enter */) {
      e.preventDefault()
      if (promptText.length > 0) {
        onClickSendPromptButton(topP, temperature)
      }
    }
  }

  function presetSelected(e) {
    setPromptText(e.label)
  }

  return (
    <div className={isDarkMode ? "App dark" : "App"}>
      <div className="background-container">
        <Header toggleDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <div className="main content-wrapper">
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
                    <PromptInput setPromptText={setPromptText} promptText={promptText} messageToType={resultText}
                                 typedText={typedText} setTypedText={setTypedTextTest} onKeyDown={handleKeyDown} />

                    <RunButton isDisabled={isLoading || promptText.length === 0} errorText={errorText}
                               onClick={e => {
                                 e.preventDefault()
                                 if (!isLoading && promptText.length > 0) onClickSendPromptButton(topP, temperature)
                               }} />
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
