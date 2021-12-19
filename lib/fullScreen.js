export const toggleFullscreen = () => {
    let elem = document.querySelector("#container");
    elem.onfullscreenchange = handleFullscreenChange;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().then({}).catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function handleFullscreenChange(event) {
    let elem = event.target;
    let isFullscreen = document.fullscreenElement === elem;

    adjustMyControls(isFullscreen);
}

function adjustMyControls(bool) {
    /* if #container is fullscreen ... */
    if (bool) {
       /* ... additional overlay styling or 
          class swapping when in fullscreen */
    } else {
       /* ... revert to previous style/class etc */
    }
}
/* JavaScript */

export const fullScreenByElementIdHandler = (elementID) => {
    document.getElementById(elementID).addEventListener(
        "click", toggleFullscreen, !1
    );
}

export const fullScreenByElementHandler = (myButtonDom) => {


    myButtonDom.onclick =  () => {
        toggleFullscreen()
    }
    /*myButtonDom.addEventListener(
        "click", toggleFullscreen, !1
    );*/
}

