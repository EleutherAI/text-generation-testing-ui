import { useState, useEffect, useCallback } from "react"

import { getModelCompletion } from "./api/requests"
import Header from "./components/Header"
import TopContent from "./components/TopContent"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import PromptControls from "./components/PromptControls"
import PromptTextbox from "./components/PromptTextbox"
import PromptList from "./components/PromptList"
import ResultSection from "./components/ResultSection"
import ClassicPrompts from "./data/classicPrompts"

import "./App.scss"

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
  const [darkmode, setDarkmode] = useState(false)

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
    async (extraText, topP, temp) => {
      setIsLoading(true)
      let fullPrompt = promptText
      if (extraText !== "") fullPrompt = promptInResult + extraText

      fullPrompt = fullPrompt.trim()

      try {
        const response = await getModelCompletion(fullPrompt, topP, temp)
        const data = await response.json()
        if (data) {
          let finalText = data[0]?.generated_text || data?.completion // the second one is for old API
          if (finalText.search("<|endoftext|>") > -1) {
            finalText = finalText.split("<|endoftext|>")[0]
          }

          setPromptInResult(fullPrompt)
          setResultText(finalText)
          setErrorText("")
        }
      } catch (error) {
        console.error("Error:", error)
        setErrorText("Unable to connect to the model. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [promptText, promptInResult]
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
    <div className={darkmode ? "App dark" : "App"}>
      <div className="background-container">
        <Header toggleDarkMode={setDarkmode} isDarkMode={darkmode} />
        <div className="main">
          {showPromptList && (
            <PromptList
              close={() => setShowPromptList(false)}
              data={ClassicPrompts}
              selectItem={setInsertPrompt}
              isDarkMode={darkmode}
            />
          )}
          <h2 className="page-title">
            {!!process.env.REACT_APP_TITLE ? process.env.REACT_APP_TITLE : "TEST EAI LANGUAGE MODELS"}
          </h2>
          <TopContent toggleShowPromptList={setShowPromptList} isDarkMode={darkmode} />
          <div className="content-wrapper narrow">
            <div className="form-container">
              <PromptTextbox
                setInsertPrompt={setInsertPrompt}
                setPromptText={setPromptText}
                insertPrompt={insertPrompt}
                promptText={promptText}
              />
              <PromptControls
                topP={topP}
                temp={temp}
                setTemp={setTemp}
                setTopP={setTopP}
                onClickSendPromptButton={onClickSendPromptButton}
                isLoading={isLoading}
                promptText={promptText}
                isDarkMode={darkmode}
              />
            </div>
            {isLoading && <Loader />}
            {errorText && !isLoading && <p className="error-text">{errorText}</p>}
            {resultText && !isLoading && (
              <ResultSection
                resultText={resultText}
                promptInResult={promptInResult}
                onClickSendPromptButton={onClickSendPromptButton}
                topP={topP}
                temp={temp}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
