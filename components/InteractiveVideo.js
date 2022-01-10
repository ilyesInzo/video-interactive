
import styles from '../styles/InteractiveVideo.module.scss'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videoStyle from "./videoContainer.module.scss"
import  "../styles/spinnerButton.module.scss"
import choiceStyle from "./choice.module.scss"
import 'videojs-disable-progress-bar/lib/DisableProgressBar'
import { useEffect, useState } from 'react';
import { attacheParticule, desintegrate, exploseElement } from '../lib/particle'
import { displaySpinner, hideSpinner, reverseSpinner } from '../lib/spinner'
import { fullScreenByElementIdHandler, fullScreenByElementHandler, toggleFullscreen } from '../lib/fullScreen'
import { attachButtonToVideo } from '../lib/videoButton'
import { jsonToMap } from '../lib/ObjectMap'
//import setting from '../data/settings.json'
import setting from '../data/settings'
import scenaries from '../data/scenaries.json'
//import {usersRepo} from '../lib/manageSettings'
//import anime from 'animejs/lib/anime.es.js';
let currentChoix = {}
let player
export default function InteractiveVideo() {

  // preceision en seconde
  const precison = 0.3;
  let breackPointToScenarios = new Map()

  const [choixX, setChoixX] = useState([])
  const [choixY, setChoixY] = useState([])

  const executeChoixX = (e) => {
    loadAudio("clickSound")
    player.currentTime(choixX.startTime)
    hideSpinner()
    getChoiceButton("choixX").style.display = "none"
    getChoiceButton("choixY").style.display = "none"
    currentChoix = choixX
  }

  const executeChoixY = (e) => {
    loadAudio("clickSound")
    player.currentTime(choixY.startTime)
    hideSpinner()
    getChoiceButton("choixX").style.display = "none"
    getChoiceButton("choixY").style.display = "none"
    currentChoix = choixY
  }

  const executeReplay = (e) => {
    loadAudio("clickSound")
    loadAudio("videoSound")
    player.currentTime(0)
    player.play()
    resetSettings()
  }

  const executeSkipIntro = (e) => {
    loadAudio("clickSound")
    player.currentTime(currentChoix.endTime)
    getChoiceButton("skipIntro").style.display = "none"
    currentChoix = scenaries['1']
  }
  
  const getChoiceButton = (buttonId) => {
    return document.getElementById(buttonId)
  }

  const getBlock = (blockID) => {
    return document.getElementById(blockID)
  }

  const getAudioComponent = (audioId) => {
    return document.getElementById(audioId)
  }

  const loadAudio = (audioId) => {
    const currentAudio = getAudioComponent(audioId)
    currentAudio.load()
    currentAudio.play()
  }

  const pauseAudio = (audioId) => {
    const currentAudio = getAudioComponent(audioId)
    currentAudio.pause()
  }

  const continueAudio = (audioId) => {
    const currentAudio = getAudioComponent(audioId)
    currentAudio.play()
  }

  const getPlayer = () => videojs('myPlayer', {
    responsive:true,
    fluid:true,
    muted:true,
    controlBar: {
     fullscreenToggle: false,
     currentTimeDisplay: false,
     timeDivider: false,
     durationDisplay: false,
     pictureInPictureToggle:false,
     remainingTimeDisplay: false,
     volumePanel:false
    },
    userActions: {
      doubleClick: () => {toggleFullscreen()}
    }
  })

  const resetSettings = () => {
    getChoiceButton("choixX").style.display = "none"
    getChoiceButton("choixY").style.display = "none"
    hideSpinner()
    currentChoix = scenaries.intro
  }

  useEffect(() => {
    player = getPlayer();
    //desintegrate("choixX")
    breackPointToScenarios = jsonToMap(setting())
    currentChoix = scenaries.intro
    var choixXBtn = getChoiceButton("choixX");
    var choixYBtn = getChoiceButton("choixY");
    choixXBtn.style.display = "block"
    choixYBtn.style.display = "block"
    //attacheParticule(choixXBtn)
    //attacheParticule(choixYBtn)
    choixXBtn.style.display = "none"
    choixYBtn.style.display = "none"

    fullScreenByElementIdHandler("go_fullscreen")

    player.on('ready', () => {
      const bar = player.DisableProgressBar()
      bar.disable()
      attachButtonToVideo(player, fullScreenByElementHandler)

      player.on('ended', () => {
        resetSettings()
        pauseAudio("videoSound")
        console.log("ended")
      });

      let executed = false

      player.on('timeupdate', () => {

        let currentTime = player.currentTime()

        //check the current choice if it is final
        // if it is final go to the outro (outro start)
        if (currentChoix.isFinal) {
          if (((currentChoix.endTime - precison / 2) < currentTime) && (currentTime < (currentChoix.endTime + precison / 2))) {
            if (!currentChoix.isContinue) {
              player.currentTime(scenaries.outro.startTime)
            }
          }
        } else {

          if(currentChoix.idDisplayJumpButton){
            if (((currentChoix.endTime - precison / 2) < currentTime) && (currentTime < (currentChoix.endTime + precison / 2))) {
              getChoiceButton("skipIntro").style.display = "none"
            }
          }else {
            getChoiceButton("skipIntro").style.display = "none"
          }

          breackPointToScenarios.forEach((value, key) => {
            if (((key - precison / 2) < currentTime) && (currentTime < (key + precison / 2))) {
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
                let nextChoice = value[value.default]
                if (!currentChoix.isContinue) {
                  player.currentTime(nextChoice.startTime)
                }
                currentChoix = nextChoice
              }, value.choiceMaxTime)
            }
          })

        }

      });

      player.on("pause", () => {
        //getBlock("block2").style.display = "block"
        reverseSpinner()
        getBlock("block1").style.display = "block"
        getChoiceButton("replay").style.display = "block";
        pauseAudio("videoSound")
      });

      player.on("play", () => {
        if (currentChoix.idDisplayJumpButton)
        {
          getChoiceButton("skipIntro").style.display = "block"
        }
        reverseSpinner()
        getBlock("block1").style.display = "none"
        getChoiceButton("replay").style.display = "none"
        continueAudio("videoSound")
        //getBlock("block2").style.display = "none"
      });

    });
  }, [])

  return (

    <div className={videoStyle.centerContant}>
      <audio id="clickSound" src="/audios/sound1.wav" type="audio/mpeg"></audio>
      <audio id="videoSound" src="/audios/videoSound.mp3" type="audio/mpeg" loop></audio>
      <button id="go_fullscreen" style={{ display: "none" }}>Go FullScreen</button>
      <div className={videoStyle.outerContainer}>
        <div id="container" className={videoStyle.innerContainer}>
          <div id='block1' style={{ display: "none" }} className={videoStyle.block}>
          </div>
          <button id="skipIntro" style={{ display: "none" }} className={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox4}`} onClick={(e) => executeSkipIntro(e)}>Play</button>
          <button id="replay" style={{ display: "none" }} className={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox3}`} onClick={(e) => executeReplay(e)}>Replay</button>
          <button id="choixX"  className={`${choiceStyle.choice1}`} onClick={(e) => executeChoixX(e)}></button>
          <button id="choixY"  className={`${choiceStyle.choice2}`} onClick={(e) => executeChoixY(e)}></button>
          <div className={videoStyle.spinner} id="app"></div>
          <video id="myPlayer" className="video-js vjs-default-skin"
            controls preload="none" poster='/cover.jpg'
           >
            <source id="mySource" src="/videos/vid.mp4" type='video/mp4' />
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
/*
 <div id='block2' style={{ display: "none" }} className={videoStyle.clickableBlock}></div>

          <button id="choixX" style={{ display: "none" }} className={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox}`} onClick={(e) => executeChoixX(e)}>{choixX.text}</button>
          <button id="choixY" style={{ display: "none" }} className={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox2}`} onClick={(e) => executeChoixY(e)}>{choixY.text}</button>

 */

