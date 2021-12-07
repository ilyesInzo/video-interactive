
export const attachButtonToVideo = (player, callback) => {

    var myButton = player.controlBar.addChild("button");

    var myButtonDom = myButton.el();
    //"<img src=\"/favicon.ico\" width=\"400px\" height=\"150px\">"
    myButtonDom.innerHTML = "Hello";
    myButtonDom.innerHTML = "<img src=\"/fullscreen.png\" width=\"12px\" height=\"12px\" style=\"filter: invert(1)\">";
    //console.log(myButtonDom)
    callback(myButtonDom)
   /* myButtonDom.onclick =  () => {
        callback(myButtonDom)
    }*/
}