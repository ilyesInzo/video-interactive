
import styles from '../styles/InteractiveVideo.module.scss'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videoStyle from "./videoContainer.module.scss"
import 'videojs-disable-progress-bar/lib/DisableProgressBar'
import { useEffect, useState } from 'react';
import ParticleEffectButton from 'react-particle-effect-button'
//import anime from 'animejs/lib/anime.es.js';
export default function InteractiveVideo() {

  let player;
  const currentChoix = "Choix0"
  const [hidden, setHidden] = useState(false)
  const [choixX, setChoixX] = useState("Choix1")
  const [choixY, setChoixY] = useState("Choix2")

  const [width, setWidth] = useState(640 + "px")
  const [height, setHeight] = useState(267 + "px")

  const draw = () => {
    videojs.log('Awww...over so soon?!');
    console.log("Hi");
  }

  const executeChoixX = (e) => {
    console.log("tu as clicker sur " + choixX);
    setChoixX("choix3")
    setChoixY("choix4")
    console.log(getPlayer());
    getPlayer().currentTime(30)

  }

  const executeChoixY = (e) => {
    console.log("tu as clicker sur " + choixY);
    setChoixX("choix5")
    setChoixY("choix6")
    console.log(getPlayer());
    getPlayer().currentTime(60)
  }

  const getPlayer = () => videojs('myPlayer')

  useEffect(() => {

    
    /*
      const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: false,
        controls: false,
        responsive: true,
        fluid: true,
      }
    
      // player is ready this will be executed
      var player = videojs('myPlayer', videoJsOptions, (p) =>  {
        videojs.log('Your player is ready!');
    
        // In this context, `this` is the player that was created by Video.js.
        //this.play();
      
        // How about an event listener?
        player.on('ended', function() {
          draw()
        });
      });*/

    player = getPlayer();

    player.on('ready', () => {
      const bar = player.DisableProgressBar()
      bar.disable()

      player.on('ended', () => {
        console.log("ended")
      });

      player.on('timeupdate', () => {
        //console.log(player.currentTime());
      });

    });


  }, [

  ])

  useEffect(() => {
    console.log("log")
  }, [width, height

  ])



  return (
    <>


      <div className={videoStyle.outerContainer}>
        <div className={videoStyle.innerContainer}>

          <button  className ={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox}`} onClick={(e) => executeChoixX(e)}>{choixX}</button>

          <button  className ={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox2}`} onClick={(e) => executeChoixY(e)}>{choixY}</button>

          <button id="choixX" style={{display:"none"}} className={videoStyle.videoOverlay} onClick={(e) => executeChoixX(e)}>{choixX}</button>
          <button id="choixY" style={{display:"none"}} className={videoStyle.videoOverlay2} onClick={(e) => executeChoixY(e)}>{choixY}</button>
          <button id="ss" style={{display:"none"}} className={videoStyle.yellowbutton} 
 >{choixX}</button>
          <video id="myPlayer" className="video-js vjs-default-skin" width={width} height={height}
            controls preload="none" poster='/hamhama.jpg' style={{ objectFit: "cover" }}
            data-setup='{ 
           "responsive":true,
           "fluid":true,
           "controlBar": {
            "fullscreenToggle": true,
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
      <ParticleEffectButton
        hidden={false}
      >
          <button
            className="particle-effect-button"

          >
            {"sffefesgz"}
          </button>
      </ParticleEffectButton>

      <ParticleEffectButton
            color="#121019"
            type="triangle"
            hidden={hidden}
          >
            <div
              style={{
                background: "#121019",
                color: "#fff",
                padding: "1.5rem 3rem",
                border: "0",
                borderRadius: 5,
                cursor: "pointer",
                fontSize: "1.2em"
              }}
              onClick={()=>{}}
            >
              Click Me
            </div>
          </ParticleEffectButton>
    </>
  )
}

/*
        <div className={videoStyle.textBox} >
          <a href="#" className ={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate}`} onClick={(e) => executeChoixX(e)}>{choixX}</a>
        </div>
        */