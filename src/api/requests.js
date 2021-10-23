const ENDPOINT = !!process.env.REACT_APP_MODEL_ENDPOINT_URL
  ? process.env.REACT_APP_MODEL_ENDPOINT_URL
  : "http://localhost:8000/completion"

const finalUrl =
  process.env.REACT_APP_USE_PROXY === "true" ? `https://cors-proxy-janko.herokuapp.com/${ENDPOINT}` : ENDPOINT

export async function fetchTestApi() {
  // for testing requests
  return fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
}

export async function getModelCompletion(fullPrompt, topP, temp) {
  return fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      context: fullPrompt,
      top_p: topP,
      temp,
      response_length: 128,
      remove_input: true
    })
  })
}
