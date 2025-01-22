const order = [];
const playerInput = [];
var score;
var topScore = 0;
//var time = 5;
document.getElementById("Start").addEventListener("click", start);
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");

var tlc, trc, blc, brc;

tlc = document.getElementById("b1").style.backgroundColor;
trc = document.getElementById("b2").style.backgroundColor;
blc = document.getElementById("b3").style.backgroundColor;
brc = document.getElementById("b4").style.backgroundColor;

var paused = true;

function start() {
    document.getElementById("Power").style.backgroundColor = "#6cff52";
    score = 0;
    document.getElementById("Score").textContent = score;
    playerInput.length = 0;
    order.length = 0;
    setTimeout(function(){
        console.log("Start");
        document.getElementById("Start").removeEventListener("click", start);
        enableButtons();
        Update();
    },3000)
}

function Update(){
    if(paused){
        disableButtons();
        gameLoop();
    } else {
        enableButtons();
        //time = 5;
        //timedOut();
        for(let i = 0; i < playerInput.length; i++){
            if(playerInput[i] !== order[i]){
                console.log("Incorrect input!");
                document.getElementById("Start").addEventListener("click", start);
                document.getElementById("Power").style.backgroundColor = "red"; 
                document.getElementById("TopScore").textContent = Math.max(score,topScore);
                disableButtons();
                paused = true;
                for(let j = 0; j < 3; j++){
                    setTimeout(function(){
                        stages(0);
                        stages(1);
                        stages(2);
                        stages(3);
                    },550*j);
                }
                return;
            }
        }
        if(playerInput.length === order.length) {
            score++;
            document.getElementById("Score").textContent = score;
            playerInput.length = 0;
            paused = true;
            disableButtons();
            setTimeout(gameLoop,1000);
        }
    }
}


function gameLoop() {
    var i = 0;
    var pick = Math.floor(Math.random() * 4);
    order.push(pick);
    for (i; i < order.length; i++) {
        (function (flash) {
            setTimeout(function () {
                stages(flash);
            }, 950 * i);
        })(order[i]);
    }
    setTimeout(function(){
        paused = false;
        Update();
    },950*i);
}

function stages(flash) {
    switch (flash) {
        case 0:
            setTimeout(function () {
                document.getElementById("b1").style.backgroundColor = tlc;
            }, 350);
            document.getElementById("b1").style.backgroundColor = "white";
            break;
        case 1:
            setTimeout(function () {
                document.getElementById("b2").style.backgroundColor = trc;
            }, 350);
            document.getElementById("b2").style.backgroundColor = "white";
            break;
        case 2:
            setTimeout(function () {
                document.getElementById("b3").style.backgroundColor = blc;
            }, 350);
            document.getElementById("b3").style.backgroundColor = "white";
            break;
        case 3:
            setTimeout(function () {
                document.getElementById("b4").style.backgroundColor = brc;
            }, 350);
            document.getElementById("b4").style.backgroundColor = "white";
            break;
        default:
            console.log("ERROR");
    }
}

function calloutbutton(n) {
    console.log("Pressed : ", n);
}

function enableButtons(){
    b1.addEventListener("click",handleButton1);
    b2.addEventListener("click",handleButton2);
    b3.addEventListener("click",handleButton3);
    b4.addEventListener("click",handleButton4);
}

function pushValue(val){
    playerInput.push(val);
    stages(val);
    Update();
}

function disableButtons(){
    b1.removeEventListener("click",handleButton1);
    b2.removeEventListener("click",handleButton2);
    b3.removeEventListener("click",handleButton3);
    b4.removeEventListener("click",handleButton4);
}

/*function timedOut(){
    setTimeout(function(){
        while(true){
            time--;
            if(time == 0){
                Update();
                return;
            }
        }
    },1000);
}*/

function handleButton1() { pushValue(0); }
function handleButton2() { pushValue(1); }
function handleButton3() { pushValue(2); }
function handleButton4() { pushValue(3); }