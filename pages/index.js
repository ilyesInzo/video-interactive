import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/InteractiveVideo.module.scss'
import InteractiveVideo from '../components/InteractiveVideo'
import '../styles/spinnerButton.module.scss'
export default function Main() {
  return (
    <>

      <InteractiveVideo></InteractiveVideo>
      <style jsx global>{`
.video-js .vjs-control-bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3em;
  background: rgb(66,65,78);
  background: linear-gradient(0deg, rgba(66,65,78,1) 0%, rgba(9,109,177,0) 100%);
}

.base-timer {
  position: relative;
  width: 50px;
  height: 300px;
  z-index: 1;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 50px;

  top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
.video-js .vjs-progress-holder {
  flex: auto;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  height: 0.3em;
  display: none;
}
      `}</style>
    </>
  )
}
