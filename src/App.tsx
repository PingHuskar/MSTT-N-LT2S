import { useState } from "react";
import "./App.css";
import axios from "axios";
import LangDict from "./LangDict";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const arrowright = `➡️`

function App() {
  //*
  const [key, setKey] = useState(
    localStorage.getItem(`key `)|| ``
  );
  /*/
  const key = ``
  //*/
  // const [audio, setAudio] = useState(``);
  const [jobId, setJobId] = useState(``);
  const [downloadLink, setDownloadLink] = useState(``);
  const [text, setText] = useState(`Hello`);
  const [toLang, setToLang] = useState(`th`);
  const [detectedLanguage, setDetectedLanguage] = useState(``);
  const [detectedLanguageScore, setDetectedLanguageScore] = useState(0);
  const [translationsTo, setTranslationsTo] = useState(``);
  const [translationsText, setTranslationsText] = useState(``);
  function ooptions() {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": toLang,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: text,
        },
      ],
    };
    // console.log(options)
    return options;
  }
  // function t2soptions() {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://text-to-speech27.p.rapidapi.com/speech',
  //     params: {
  //       text: text,
  //       lang: 'en-us'
  //     },
  //     headers: {
  //       'X-RapidAPI-Key': key,
  //       'X-RapidAPI-Host': 'text-to-speech27.p.rapidapi.com'
  //     }
  //   };
  //   return options
  // }
  function LT2S() {
    const options = {
      method: 'POST',
      url: 'https://large-text-to-speech.p.rapidapi.com/tts',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
      },
      data: {
        text: text
      }
    };
    return options
  }
  function DLT2S() {
    const options = {
      method: 'GET',
      url: 'https://large-text-to-speech.p.rapidapi.com/tts',
      params: {
        id: jobId
      },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
      }
    };
    return options
  }
  function Fire() {
    axios
      .request(ooptions())
      .then((res) => res.data.at(0))
      .then((data) => {
        console.log(data);
        setDetectedLanguage(data.detectedLanguage.language);
        setDetectedLanguageScore(data.detectedLanguage.score);
        setTranslationsTo(data.translations.at(0).to);
        setTranslationsText(data.translations.at(0).text);
      })
      .catch((err) => console.log(err));
  }
  // function t2s() {
  //   axios.request(t2soptions())
  //   .then(res => res.data)
  //   .then(data => {
  //     setAudio(data)
  //     URL.createObjectURL(data)
  //   })
  // }
  function upLT2S() {
    axios.request(LT2S())
    .then(res => res.data)
    .then(data => {
      setJobId(data.id)
      toast(`sent job`)
    })
  }
  function downLT2S() {
    axios.request(DLT2S())
    .then(res => res.data)
    .then(data => {
      toast(`${data.status}`)
      // console.log()
      
      setDownloadLink(data.url)
    })
  }

  return (
    <>
      <div className="">
        {detectedLanguage && <p>
          {detectedLanguage.toLocaleUpperCase()} {arrowright} {translationsTo.toLocaleUpperCase()}</p>
        }
        {/* <p>detectedLanguage: {detectedLanguage}</p>
        <p>translationsTo: {translationsTo}</p> */}
        {detectedLanguageScore !== 1 && (
          <p>detectedLanguageScore: {detectedLanguageScore}</p>
        )}
        <p>translationsText: {translationsText}</p>
      </div>
      <div className="">
        <label htmlFor="text">Text to Translate</label>
        <div className="">

        <textarea
          name=""
          id="text"
          value={text}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
          }}
          />
          </div>
      </div>
      <div className="">
        <label htmlFor="toLang">To</label>
        <select
          name=""
          id="toLang"
          value={toLang}
          onChange={(e) => {
            e.preventDefault();
            setToLang(e.target.value);
            toast(`set lang to ${e.target.value}`)
          }}
        >
          <option value="af">Afrikaans</option>
          <option value="ar">Arabic</option>
          <option value="bn">Bangla</option>
          <option value="bs">Bosnian (Latin)</option>
          <option value="bg">Bulgarian</option>
          <option value="ca">Catalan</option>
          <option value="zh-Hans">Chinese Simplified</option>
          <option value="hr">Croatian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="nl">Dutch</option>
          <option value="en">English</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="ht">Haitian Creole</option>
          <option value="he">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="mww">Hmong Daw (Latin)</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="id">Indonesian</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="tlh-Latn">Klingon</option>
          <option value="ko">Korean</option>
          <option value="lv">Latvian</option>
          <option value="lt">Lithuanian</option>
          <option value="ms">Malay (Latin)</option>
          <option value="mt">Maltese</option>
          <option value="nb">Norwegian</option>
          <option value="fa">Persian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese (Brazil)</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="sr-Latn">Serbian (Latin)</option>
          <option value="sk">Slovak</option>
          <option value="sl">Slovenian</option>
          <option value="es">Spanish</option>
          <option value="sw">Swahili (Latin)</option>
          <option value="sv">Swedish</option>
          <option value="ta">Tamil</option>
          <option value="th">ไทย</option>
          <option value="tr">Turkish</option>
          <option value="uk">Ukrainian</option>
          <option value="ur">Urdu</option>
          <option value="vi">Vietnamese</option>
          <option value="cy">Welsh</option>
        </select>
      </div>
      <div className="">

      <button onClick={Fire}>
        Translate to {" "}
        {/* {toLang && <img src={`https://flagsapi.com/${toLang.toLocaleUpperCase()}/shiny/64.png`} /> } */}
        {LangDict.find((lang) => lang.abbr == toLang)?.name || `not found`}
      </button>
      <button onClick={upLT2S}>Text to Speech</button>
      <button onClick={downLT2S}>Check Download</button>
      {downloadLink && 
        <button onClick={() => open(downloadLink)}>Download</button>
      }
      </div>
      <div className="">
        <input type="text" value={key} onChange={(e) => {
          e.preventDefault()
          localStorage.setItem(`key`, e.currentTarget.value)
          setKey(e.currentTarget.value)
        }} />
      </div>
      {/* {audio && 
      <audio ref={audio} controls></audio>
      } */}
      <ToastContainer />
    </>
  );
}
export default App;
