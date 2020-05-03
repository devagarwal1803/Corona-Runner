function load_images(){
    virus_image = new Image;
    virus_image.src = "Assets/v1.png"
}


function init(){
    // Getting canvas tag
    canvas = document.getElementById("canvas1")


    // Changing height and with using js
    height = 400
    width = 700
    canvas.width = width
    canvas.height = height


    // trying to work with canvas
    pen = canvas.getContext('2d')
    console.log(pen)

    // JSON objects
    bird = {
        x: 250,
        y: 50,
        w: 60,
        h: 60,
        speed: 20
    }
}

// Game Loop
function draw(){
    //Clear old screen
    pen.clearRect(0, 0, height, width)

    // Drawing a bird on screen
    pen.fillStyle = "red";
    // pen.fillRect(bird.x , bird.y , bird.w , bird.h);
    pen.drawImage(virus_image, bird.x , bird.y , bird.w , bird.h);

}

function update(){
    bird.y += bird.speed;
    
    if(bird.y>(height-bird.h) || bird.y<0)
        bird.speed *=-1;

    console.log(bird.y)
}

function gameloop(){
    console.log("In game loop")
    draw();
    update();
}

// Loading images befor start of game
load_images()

//Start of game
init();

//Repeated call gameloop after sine interval
setInterval(gameloop, 100)
