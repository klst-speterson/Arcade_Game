

//variables to be accessed
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 430;
var XY_AXIS = 0;
var ENEMY_WIDTH = 50;
var ENEMY_HEIGHT = 30;
var PLAYER_WIDTH = 20;
var PLAYER_HEIGHT = 50;
var ROW_HEIGHT = 83;
var ROW_WIDTH = 101;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    //this is the speed of the enemy: a random speed between 5-20
    this.speed = this.speed = Math.floor(Math.random() * 20 + 5);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //added bugLength so bugs leave screen completely before reset
    bugLength = 105;
    this.x = this.x + 10 * this.speed * dt;

    if (this.x > (CANVAS_WIDTH + bugLength)) {
        this.reset();
    }

};

Enemy.prototype.reset = function() {
    //but appears from off screen
    this.x = -100;
    // generate random y var between 60-240
    this.y = Math.floor(Math.random() * 181 + 60);
    //this is the speed of the enemy: a random speed between 20-5
    this.speed = Math.floor(Math.random() * 20 + 5);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = "images/char-cat-girl.png";
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    //move player to closest x/y variable to stay in game
    if (this.x < XY_AXIS) {
        this.x = XY_AXIS;

    } else if (this.x > CANVAS_WIDTH) {
        this.x = CANVAS_WIDTH;

    } else if (this.y > CANVAS_HEIGHT) {
        this.y = CANVAS_HEIGHT;
    } else if (this.y < XY_AXIS) {
        this.y = XY_AXIS;
        alert("You win!")
        this.reset();
    }

    //use bounding box algorithm to ensure there is no gap between any of the 4 sides of the rectangles. Any gap means a collision does not exist.

    for (var i = 0, len = allEnemies.length; i < len; i++)

        if (allEnemies[i].x < this.x + PLAYER_WIDTH &&
        allEnemies[i].x + ENEMY_WIDTH > this.x &&
        allEnemies[i].y < this.y + PLAYER_HEIGHT &&
        ENEMY_HEIGHT + allEnemies[i].y > this.y) {
        alert("You Died!")
        this.reset();
    	}
	};


Player.prototype.reset = function() {
    // reset the player along the x axis
    this.x = (CANVAS_WIDTH / 2); 
    this.y = (CANVAS_HEIGHT - (ROW_HEIGHT / 2));
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keys) {

    //move the player one block at a time based on input
    if ('left' == keys) {
        this.x -= ROW_WIDTH;
    };
    if ('up' == keys) {
        this.y -= ROW_HEIGHT;
    };
    if ('right' == keys) {
        this.x += ROW_WIDTH;
    };
    if ('down' == keys) {
        this.y += ROW_HEIGHT;
    };

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

for (var i = 0; i < 3; i++) {

   //set x axis
   x = XY_AXIS;

   //randomly generate y position between 60-220
   y = Math.floor(Math.random * 181 + 60);

   //create enemy object
   var enemy = new Enemy(x, y);

    //push enemy into array
    allEnemies.push(enemy);

}

// Place the player object in a variable called player

var player = new Player((CANVAS_WIDTH / 2), (CANVAS_HEIGHT - (ROW_HEIGHT / 2)));



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});