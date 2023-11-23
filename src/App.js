import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuote] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuote(data);
      let randomNum = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randomNum]);
    }
    fetchData();
    fetchNewColor();
  }, []);

  const fetchNewQuote = () => {
    let randomNum = Math.floor(Math.random() * quotes.length);
    if (randomQuote == quotes[randomNum]) {
      fetchNewQuote();
    } else {
      setRandomQuote(quotes[randomNum]);
    }
  };

  const colorList = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const fetchNewColor = () => {
    let currColor = "#";
    for (let i = 0; i < 6; i++) {
      currColor = currColor.concat(
        colorList[Math.floor(Math.random() * colorList.length)]
      );
    }
    setColor(currColor);
  };

  const getNewQuote = () => {
    fetchNewQuote();
    fetchNewColor();
  };

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="card text-start">
          <div className="card-body ">
            <h2 className="card-title text-center ">Random Quote Machine</h2>
            <p className="card-text text-center">
              Click the button to recieve a new quote
            </p>
          </div>
        </div>

        <div id="wrapper">
          {randomQuote ? (
            <div id="quote-box">
              <div className="quote-text text-wrap">
                <i style={{ color: color }} class="fas fa-quote-left fa-2x"></i>
                <span style={{ color: color }} id="text">
                  {randomQuote.text}
                </span>
              </div>
              <div className="quote-author">
                <span style={{ color: color }} id="author">
                  {" "}
                  - {randomQuote.author || "No author"}
                </span>
              </div>
              <div className="button">
                <button
                  id="new-quote"
                  type="button"
                  className="btn"
                  style={{ backgroundColor: color, color: "white" }}
                  onClick={getNewQuote}
                >
                  New Quote
                </button>
                <a href="https://twitter.com/intent/tweet" id="tweet-quote" className="btn" style={{backgroundColor: color, color: "white"}}><i className="fa-brands fa-twitter"></i></a>
                <a href="" id="tumblr-quote" className="btn " style={{backgroundColor: color, color: "white"}}><i className="fa-brands fa-tumblr"></i></a>
              </div>
            </div>
          ) : (
            <h2 className="text-center">Loading</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
