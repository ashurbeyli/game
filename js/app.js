// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";

    this.yPositions = [150];

    this.x = 0;
    this.y = this.yPositions[Math.floor(Math.random() * this.yPositions.length)];
    this.speed = Math.floor(500 - Math.random()*(500-120));

    //reset position
    this.reset = function(){
        this.x = 0;
        this.y = this.yPositions[Math.floor(Math.random() * this.yPositions.length)];
        this.speed = Math.floor(500 - Math.random()*(500-120));        
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.speed;
    if(this.x >= 505){
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    /*global ctx*/
    /*global Resources*/
    /*eslint no-undef: "error"*/
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){

    this.sprite = "images/char-cat-girl.png";

    //location
    this.x = 0;
    this.y = 0;

    this.horizontalStep = 100;
    this.verticalStep = 80;
    //more
    this.isCollided = false;
    this.won = false;
    this.score = 0;
};
// This class requires an update(), render() and
Player.prototype.setInitial = function(){
    this.x = 200;
    this.y = 400;

    var _this = this;
    setTimeout(function(){
        _this.setScore(_this.score);
    },100);
};
// This class requires an update(), render() and
Player.prototype.update = function(){

    if(this.y > 400){
        this.y -= this.verticalStep;
    }else if(this.y <=50 ){
        this.win();
    }else if(this.x < 0){
        this.x += this.horizontalStep;
    }else if(this.x > 400){
        this.x -= this.horizontalStep;
    }

};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(direction){
    switch(direction){

    case "left":
        this.x -= this.horizontalStep;
        break;
    case "up":
        this.y -= this.verticalStep;
        break;
    case "right":
        this.x += this.horizontalStep;
        break;
    case "down":
        this.y += this.verticalStep;
        break;

    }
};
Player.prototype.checkCollisions = function(){
    allEnemies.forEach(function(item){
        if(
            player.x < item.x + 100  && player.x + 70  > item.x &&
            player.y < item.y + 78 && player.y + 50 > item.y

        ){
            player.lose();
        }
    });
};
Player.prototype.win = function(){
    var _this = this;
    if(!this.won)
        setTimeout(function(){
            _this.setInitial();
            _this.won = false;
            _this.setScore(++_this.score);
        },200);
    this.won = true;
};
Player.prototype.lose = function(){
    player.setInitial();
};
Player.prototype.setScore = function(score){
    this.score = score;
    ctx.font = "30px Arial";
    ctx.strokeText(score,10,50);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i=1;i<=3;i++){
    allEnemies.push(new Enemy());
}
// Place the player object in a variable called player
var player = new Player();
player.setInitial();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
