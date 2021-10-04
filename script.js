const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    // Normally, don't write out API Keys like this, but an exception made here because it's free.
    key: "9d95c90655f4467f8e6e675caf7d28e1",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Jokes from Joke API:
const getJokes = async () => {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to speech
    tellMe(joke);
    // disable Button
    toggleButton();
  } catch (error) {
    console.log(`Whoops, ${error}`);
  }
};

// Event Listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
