// Change the image of your sprite!
function setSprite () {
    var img = new Image();
    img.src = 'http://sohme.com/wp-content/uploads/2015/07/red.png';
    return img;
}

window.onload = () => {
    let flappy = new Game(document.getElementById("game"));

    flappy.start();
};
