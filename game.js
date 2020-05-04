function load_images(){
    virus_image = new Image;
    virus_image.src = "Assets/v1.png"


    player_image = new Image;
    player_image.src = "Assets/superhero.png"

    gem_image = new Image
    gem_image.src = "Assets/gemm.png"
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
    v1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	v2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	v3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 40,
	};
    // List of virus
    virus=[v1,v2,v3]


    // Creating player
    player = {
		x : 20,
		y : height/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : "false",
    }
    
    // Gem
	gem = {
		x : width-100,
		y : height/2,
		w : 60,
		h : 60,
	}
    
    score = 0
    game_over = false

    // Adding event listners for player
    canvas.addEventListener('mousedown',function(){
		// console.log("You pressed the mouse");
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function(){
		// console.log("You released the mouse");
		player.moving = false;
    });
    
    // For mobile
    canvas.addEventListener('touchstart',function(){
		player.moving = true;
	});
	canvas.addEventListener('touchend',function(){
        player.moving = false;
    });
    
    
    // Event listners for other buttons
    /*
    canvas.addEventListener('keydown',function(e){
        console.log("Key pressed");
        console.log(e);
    })
    window.addEventListener('keydown',check,false);
    function check(e) {
        var code = e.keyCode;
        switch (code) {
            case 37: alert("Left"); break; //Left key
            case 38: alert("Up"); break; //Up key
            case 39: alert("Right"); break; //Right key
            case 40: alert("Down"); break; //Down key
            default: alert(code); //Everything else
        }
    }
    */
}

// Game Loop
function draw(){
    //Clear old screen
    pen.clearRect(0, 0, width, height)

    // Drawing player on screen
    pen.drawImage(player_image, player.x , player.y , player.w , player.h);
    
    // Drawing gem on screen
    pen.drawImage(gem_image, gem.x , gem.y , gem.w , gem.h);

    // Drawing a virus on screen
    pen.fillStyle = "red";
    // pen.fillRect(virus.x , virus.y , virus.w , virus.h);
    for(let i=0; i<virus.length; i++){
        pen.drawImage(virus_image, virus[i].x , virus[i].y , virus[i].w , virus[i].h);
    }
    pen.fillStyle = "white"
    pen.fillText('Score: ' + score, 10, 20)
}

function update(){
    
    // Check player state
    if(player.moving == true){
        player.x += player.speed;
        score += 10
    }

    for(let i=0; i<virus.length; i++){
        if(isColliding(virus[i],player)){
            game_over =  true
            alert('Game Over!\nYou touched corona\n Score='+score)
        }
    }
    
    //Check collision
    if(isColliding(player,gem)){
        game_over = true
        alert('Congrats! You won the game')
    }

    for(let i=0; i<virus.length; i++){
        virus[i].y += virus[i].speed;

        if(virus[i].y>(height-virus[i].h) || virus[i].y<0)
            virus[i].speed *=-1;

    }

}

function isColliding( obj1, obj2 ){
    if(Math.abs(obj1.x-obj2.x)<=obj2.w && Math.abs(obj1.y-obj2.y)<=obj2.h)
        return true;
    return false;
}

function gameloop(){
    if(game_over==true)
        clearInterval(intrvl)

    draw();
    update();
}

// Loading images befor start of game
load_images()

//Start of game
init();

//Repeated call gameloop after sine interval
var intrvl = setInterval(gameloop, 100)
