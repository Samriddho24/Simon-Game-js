var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level = 0

var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(event){
    var userColorChosen = this.id;
    userClickedPattern.push(userColorChosen);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userColorChosen);
    animatePress(userColorChosen);
});    

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColorChosen =  buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#" + randomColorChosen).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);

}   

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        
            userClickedPattern = [];
        }
        console.log("Success");
    }
    else{
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}