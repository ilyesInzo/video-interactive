
import styles from '../styles/InteractiveVideo.module.scss'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videoStyle from "./videoContainer.module.scss"
import 'videojs-disable-progress-bar/lib/DisableProgressBar'
import { useEffect, useState } from 'react';
export default function InteractiveVideo() {

  let player;
  const currentChoix = "Choix0"
  const [choixX, setChoixX] = useState("Choix1")
  const [choixY, setChoixY] = useState("Choix2")

  const [width, setWidth] = useState(640+"px")
  const [height, setHeight] = useState(267+"px")

  const draw = () => {
    videojs.log('Awww...over so soon?!');
    console.log("Hi");
  }

  const executeChoixX = (e) => {
    console.log("tu as clicker sur " + choixX);
    setChoixX("choix3")
    setChoixY("choix4")
    console.log(getPlayer());
    getPlayer().currentTime(60)

  }

  const executeChoixY = (e) => {
    console.log("tu as clicker sur " + choixY);
    setChoixX("choix5")
    setChoixY("choix6")
    console.log(getPlayer());
    getPlayer().currentTime(120)
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
      <button id="choixX" onClick={(e) => executeChoixX(e)}>{choixX}</button>
      <button id="choixY" onClick={(e) => executeChoixY(e)}>{choixY}</button>

    
        <div className={videoStyle.outerContainer}>
          <div className={videoStyle.innerContainer}>
            <div id="myChoice" className={videoStyle.videoOverlay}>Bug Buck Bunny - Trailer</div>
            <video id="myPlayer" className="video-js vjs-default-skin" width={width} height={height}
              controls preload="none" poster='/hamhama.jpg' style={{objectFit:"cover"}}
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
    
    </>
  )
}