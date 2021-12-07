
import styles from '../styles/InteractiveVideo.module.scss'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videoStyle from "./videoContainer.module.scss"
import 'videojs-disable-progress-bar/lib/DisableProgressBar'
import { useEffect, useState } from 'react';
import {attacheParticule} from '../lib/particle'
import {fullScreenByElementIdHandler, fullScreenByElementHandler} from '../lib/fullScreen'
import {attachButtonToVideo} from '../lib/videoButton'
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
    getPlayer().currentTime(30)

  }

  const executeChoixY = (e) => {
    console.log("tu as clicker sur " + choixY);
    setChoixX("choix5")
    setChoixY("choix6")
    getPlayer().currentTime(60)
  }

  const getPlayer = () => videojs('myPlayer')

  useEffect(() => {

    player = getPlayer();

    attachButtonToVideo(player, fullScreenByElementHandler)
    attacheParticule("choixX")
    attacheParticule("choixY")
    fullScreenByElementIdHandler("go_fullscreen")
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


  return (
    <>
<button id="go_fullscreen">Go FullScreen</button>

      <div  className={videoStyle.outerContainer}>
        <div id="container" className={videoStyle.innerContainer}>

          <button id="choixX"  className ={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox}`} onClick={(e) => executeChoixX(e)}>{choixX}</button>

          <button id="choixY" className ={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate} ${videoStyle.textBox2}`} onClick={(e) => executeChoixY(e)}>{choixY}</button>

          <button  style={{display:"none"}} className={videoStyle.videoOverlay} onClick={(e) => executeChoixX(e)}>{choixX}</button>
          <button  style={{display:"none"}} className={videoStyle.videoOverlay2} onClick={(e) => executeChoixY(e)}>{choixY}</button>
          <button id="ss" style={{display:"none"}} className={videoStyle.yellowbutton} 
 >{choixX}</button>
          <video id="myPlayer" className="video-js vjs-default-skin" width={width} height={height}
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



    </>
  )
}

/*
        <div className={videoStyle.textBox} >
          <a href="#" className ={`${videoStyle.btn} ${videoStyle.btnWhite} ${videoStyle.btnAnimate}`} onClick={(e) => executeChoixX(e)}>{choixX}</a>
        </div>
        */


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