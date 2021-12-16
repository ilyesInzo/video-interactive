
import styles from '../styles/InteractiveVideo.module.scss'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videoStyle from "./videoContainer.module.scss"
import 'videojs-disable-progress-bar/lib/DisableProgressBar'
import { useEffect, useState } from 'react';
import { attacheParticule, desintegrate, exploseElement } from '../lib/particle'
import { displaySpinner, hideSpinner, reverseSpinner } from '../lib/spinner'
import { fullScreenByElementIdHandler, fullScreenByElementHandler } from '../lib/fullScreen'
import { attachButtonToVideo } from '../lib/videoButton'
import { jsonToMap } from '../lib/ObjectMap'
//import setting from '../data/settings.json'
import setting from '../data/settings'
//import {usersRepo} from '../lib/manageSettings'
//import anime from 'animejs/lib/anime.es.js';
export default function InteractiveVideo() {
  

  // normal enchainment
  /*let scenarios = new Map([
    ['choice1', 20],
    ['choice2', 40],
    ['choice3', 60],
    ['choice4', 90],
    ['choice5', 120],
  ]
  )*/
  // preceision en seconde
  const precison = 0.5;
  let breackPointToScenarios = new Map()

  let player;
  let currentChoix = {}
  const [choixX, setChoixX] = useState([])
  const [choixY, setChoixY] = useState([])

  const executeChoixX = (e) => {
    //console.log("tu as clicker sur " + choixX);
    loadAudio("clickSound")
    getPlayer().currentTime(choixX.startTime)
    hideSpinner()
    getChoiceButton("choixY").style.display = "none"
    currentChoix = choixX
  }

  const executeChoixY = (e) => {
    //console.log("tu as clicker sur " + choixY);
    loadAudio("clickSound")
    getPlayer().currentTime(choixY.startTime)
    hideSpinner()
    getChoiceButton("choixX").style.display = "none"
    currentChoix = choixY
  }

  const runSpinner = (e) => {
    displaySpinner()
  }

  const stopSpinner = (e) => {
    hideSpinner()
  }

  const pauseSpinner = (e) => {
    reverseSpinner()
  }

  const getChoiceButton = (buttonId) => {
    return document.getElementById(buttonId)
  }

  const getAudioComponent = (audioId) => {
    return document.getElementById(audioId)
  }

  const loadAudio = (audioId) => {
    const currentAudio = getAudioComponent(audioId)
    currentAudio.load()
    currentAudio.play()
  }

  const stopAudio = (audioId) => {
    const currentAudio = getAudioComponent(audioId)
    currentAudio.pause()
    currentAudio.currentTime = 0;
  }

  const getPlayer = () => videojs('myPlayer')

  useEffect(() => {
    player = getPlayer();
    //desintegrate("choixX")
    breackPointToScenarios = jsonToMap(setting())
    /*console.log(breackPointToScenarios.get(10))*/
    /*
    runSpinner()
    pauseSpinner()
    */
    
    var choixXBtn = getChoiceButton("choixX");
    var choixYBtn = getChoiceButton("choixY");
    choixXBtn.style.display = "block"
    choixYBtn.style.display = "block"
    attacheParticule(choixXBtn)
    attacheParticule(choixYBtn)
    choixXBtn.style.display = "none"
    choixYBtn.style.display = "none"


    fullScreenByElementIdHandler("go_fullscreen")
    player.on('ready', () => {
      const bar = player.DisableProgressBar()
      bar.disable()
      attachButtonToVideo(player, fullScreenByElementHandler)

      player.on('ended', () => {
        console.log("ended")
      });

      let executed = false

      player.on('timeupdate', () => {
        //console.log(player.currentTime());
        //if()

        let currentTime = player.currentTime()

        //check the current choice if it is final
        // if it is final go to the outro (outro start)

        breackPointToScenarios.forEach((value, key) => {
          if (((key - precison / 2)  < currentTime) && (currentTime < (key + precison / 2))) {
            console.log("errr");
            setChoixX(value.choix1)
            setChoixY(value.choix2)
            var choixXBtn = getChoiceButton("choixX");
            var choixYBtn = getChoiceButton("choixY");
            choixXBtn.style.display = "block";
            choixYBtn.style.display = "block";
            displaySpinner(() => {
              // we have to add currentChoice in case no choice made
              choixXBtn.style.display = "none";
              choixYBtn.style.display = "none";
            }, value.choiceMaxTime)
          }
        })



      });

      player.on("pause", () => {
        console.log("pause");
        pauseSpinner()
      });

      player.on("play", () => {
        pauseSpinner()
        console.log("play");
      });

    });
  }, [])

  return (

    <div className={videoStyle.centerContant}>
      
      <audio id="clickSound" src="/audios/sound1.wav" type="audio/mpeg"></audio>
      <button id="go_fullscreen" style={{ display: "none" }}>Go FullScreen</button>
      <button onClick={(e) => runSpinner(e)}>Run Spinner</button>
      <button onClick={(e) => stopSpinner(e)}>Stop Spinner</button>
      <button onClick={(e) => pauseSpinner(e)}>Pause Spinner</button>
      <div className={videoStyle.outerContainer}>
        <div id="container" className={videoStyle.innerContainer}>

          <button id="choixX" style={{ display: "none" }} className={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox}`} onClick={(e) => executeChoixX(e)}>{choixX.text}</button>
          <button id="choixY" style={{ display: "none" }} className={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox2}`} onClick={(e) => executeChoixY(e)}>{choixY.text}</button>
          
          <div className={videoStyle.spinner} id="app"></div>
          <button style={{ display: "none" }} className={videoStyle.videoOverlay} onClick={(e) => executeChoixX(e)}>{choixX.text}</button>
          <button style={{ display: "none" }} className={videoStyle.videoOverlay2} onClick={(e) => executeChoixY(e)}>{choixY.text}</button>

          <button id="ss" style={{ display: "none" }} className={videoStyle.yellowbutton}
          >{choixX.text}</button>
          <video id="myPlayer" className="video-js vjs-default-skin"
            controls preload="none" poster='/hamhama.jpg'
            data-setup='{ 
           "responsive":true,
           "fluid":true,
           "controlBar": {
            "fullscreenToggle": false,
            "currentTimeDisplay": false,
            "timeDivider": false,
            "durationDisplay": false,
            "pictureInPictureToggle":false,
            "remainingTimeDisplay": false
          }
          
          }'>
            <source id="mySource" src="/videos/attaque.mp4" type='video/mp4' />
          </video>
        </div>
      </div>

      <style jsx global>{`
        particle {
          position: fixed;
          top: 0;
          left: 0;
          opacity: 0;
          pointer-events: none;
          background-repeat: no-repeat;
          background-size: contain;
        }
      `}</style>

    </div>
  )
}
