'use client';
import React from 'react';
import { useRef } from 'react';

const Page = () => {
  const inputEl = useRef();
  const infoTextEl = useRef();
  const meaningContainerEl = useRef();
  const titleEl = useRef();
  const meaningEl = useRef();

  async function fetchAPI(word) {
    try {
      infoTextEl.current.style.display = "block";
      meaningContainerEl.current.style.display = "none";
      infoTextEl.current.innerText = `Searching the meaning of "${word}"`;
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const result = await fetch(url).then((res) => res.json());

      if (result.title) {
        meaningContainerEl.current.style.display = "block";
        infoTextEl.current.style.display = "none";
        titleEl.current.innerText = word;
        meaningEl.current.innerText = "N/A";
      } else {
        infoTextEl.current.style.display = "none";
        meaningContainerEl.current.style.display = "block";
        titleEl.current.innerText = result[0].word;
        meaningEl.current.innerText = result[0].meanings[0].definitions[0].definition;
      }
    } catch (error) {
      console.log(error);
      infoTextEl.current.innerText = `an error happened, try again later`;
    }
  }

  React.useEffect(() => {
    const inputElement = inputEl.current;
    const handleKeyUp = (e) => {
      if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
      }
    };

    inputElement.addEventListener("keyup", handleKeyUp);

    return () => {
      inputElement.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="heading">English Dictionary</h1>
      <input
        placeholder="Search a word"
        type="text"
        className="input"
        id="input"
        ref={inputEl}
      />
      <p className="info-text" id="info-text" ref={infoTextEl}>
        Type a word and press enter
      </p>
      <div className="meaning-container" id="meaning-container" ref={meaningContainerEl}>
        <p>
          Word Title: <span className="title" id="title" ref={titleEl}>___</span>
        </p>
        <p>
          Meaning: <span className="meaning" id="meaning" ref={meaningEl}>___</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
