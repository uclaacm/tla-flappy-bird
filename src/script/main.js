window.onload = () => {
    let flappy = new Game(document.getElementById("game"));

    window.addEventListener("resize" , () => {
        flappy.resize(window.innerWidth * .9 , window.innerHeight * .9);
    });

    flappy.resize(window.innerWidth * .9 , window.innerHeight * .9);
    flappy.start();
};