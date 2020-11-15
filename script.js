const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

const apiKey = "54c9874c1efc47d78c4a6da6f2389db7";

// Passing Joke to VoiceRSS API
function textToSpeech(joke) {
  VoiceRSS.speech({
    key: `54c9874c1efc47d78c4a6da6f2389db7`,
    src: joke,
    hl: "en-us",
    v: "Amy",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://sv443.net/jokeapi/v2/joke/Any";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.setup
      ? (joke = `${data.setup} ... ${data.delivery}`)
      : (joke = data.joke);

    textToSpeech(joke);
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

function toggleButton() {
  button.disabled = !button.disabled;
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
