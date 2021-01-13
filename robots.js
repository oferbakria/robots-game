var clickCount = 0;//count click mouse
var id = "";//save id of first robot
var srcImageName = "";//save srcImageName of first robot
var num = 1;//to add it to id (the id should be unique)
var points = 0;// for the label
var freqOfRobots = [];//array to count instances of same robots(max 2 robot with same img)
var robots = ['a', 'b', 'c', 'd', 'e'];//type of robots
var sumOfInstancesOfalllRobots = 0;
var hideMode = false;//true if the program in hide mode
var myDiv = document.querySelector('#div1');//div contains the robots;
var int;//using for setInterval
var labelForTime = document.querySelector('#time');
var timeMode = true//to check if game time equal to zero 
let saveTimeForRestartFunc;
let pairInDisplay;
function Add() {
    var randomNum = Math.floor(Math.random() * robots.length)
    sumOfInstancesOfalllRobots = 1;//init this varible all time when we call this func
    sumOfInstancesOfalllRobots += sumOfcellsAraay(freqOfRobots);
    // loop for prevent more than 2 robots from all type 
    for (; freqOfRobots[randomNum] >= 2 && sumOfInstancesOfalllRobots < (robots.length * 2) + 1;) {
        randomNum = Math.floor(Math.random() * robots.length)
    }

    if (sumOfInstancesOfalllRobots < (robots.length * 2) + 1) {
        freqOfRobots[randomNum]++;
       return `<div class="mydiv col-lg-3 col-md-4 col-sm-6" style="border-color:#5d54a4">
              <img
                id=${robots[randomNum]}${num++}
                src="https://robohash.org/${robots[randomNum]}" 
                imageName="https://robohash.org/${robots[randomNum]}"
                height= 200px
                width= 200px
                onclick="function2(event)"/>
                </div>`;
    }
    return "";//hide the undifinded words
}
function function2(myEvent) {
    var event = myEvent.target;
    if (hideMode && timeMode) {
        if (clickCount) {
            //check Imagename not src (warning:hide mode)
            if (srcImageName === event.getAttribute("imageName") && id !== event.getAttribute("id")) {
                console.log(`${id}/${event.getAttribute("id")}`);
                event.style.border = `10px solid purple`;
                hide2Imags(id, event.getAttribute("id"));
                document.querySelector(`#points`).innerHTML = ++points;
                pairInDisplay--;
                // console.log(pairInDisplay);
                if(pairInDisplay===0){
                    resetSetInterval();
                    labelForTime.innerHTML = `<p style="color:red;"> Excellent<br>,Your points is:${points} ,restart game to play again</p>`
                }
            }
            else {
                document.querySelector(`#${id}`).style.border = `10px solid red`
                document.querySelector(`#${event.getAttribute("id")}`).style.border = `10px solid red`
                setStyleBorderById(event.getAttribute("id"), 4, "purple");
                setStyleBorderById(id, 4, "purple");
				if(!(id === event.getAttribute("id"))){
					document.querySelector(`#points`).innerHTML = --points;
				}

            }
            swap(event.getAttribute("id"), event.getAttribute("imageName"));
            swap(id, srcImageName);
            clickCount = 0;
            id = "";

        } else {
            clickCount += 1;
            id = event.getAttribute("id");
            srcImageName = event.getAttribute("imageName");
            event.style.border = `10px solid purple`;
            event.src = srcImageName;
        }
    }
    if (!timeMode) {
        show();
        labelForTime.innerHTML = `<p style="color:red;"> Time ends ,Your points is:${points} ,restart game to play again</p>`
    }
}
function Hide() {
    hideMode = true;
    for (let index = 0; index < document.querySelectorAll(`img`).length; index++) {
        document.querySelectorAll(`img`)[index].src = "1.png"
    }
}
function show() {
    hideMode = false;
    for (let index = 0; index < document.querySelectorAll(`img`).length; index++) {
        document.querySelectorAll(`img`)[index].src = document.querySelectorAll(`img`)[index].getAttribute("imageName");
    }
}
function Restart(Default = 10) {
    pairInDisplay= Default/2;
    myDiv.innerHTML = "";
    document.querySelector(`#points`).innerHTML = "0";
    clickCount = 0;
    points = 0;
    initFreqOfRobots();
    sumOfInstancesOfalllRobots = 0;
    num = 1;
    labelForTime.innerHTML = "";
    resetSetInterval();
    // countDown((Default / 2) * 5);
    countDown(saveTimeForRestartFunc);
    timeMode=true;
	hideMode = false;
    mainFunctions(Default, false);
}
function sumOfcellsAraay(arr) {
    var sum = 0
    for (let index = 0; index < arr.length; index++) {
        sum += arr[index];
    }
    return sum;
}
function mainFunctions(Default = 10, restart = true) {
    restart ? Restart(Default) : "";//(init all varibales)if we call this func from html or from js code,this will prevent recursive loop;
    // var row;
    // var j = 0, z;
    for (let i = 0; i < Default ; i++) {
        myDiv.innerHTML+= Add();
    }
    document.querySelector('#hideButton').disabled = false;
    document.querySelector('#showButton').disabled = false;
    document.querySelector('#restartButton').disabled = false;
}
function swap(id, imageName, milsec = 1000) {
    document.querySelector(`#${id}`).src = imageName;
    setTimeout(() => {
        document.querySelector(`#${id}`).src = "1.png"
    }, milsec);
}
function hide2Imags(id1, id2) {
    setTimeout(() => {
        document.querySelector(`#${id1}`).style.display = "none";
        document.querySelector(`#${id2}`).style.display = "none";
    }, 2000);
}
function initFreqOfRobots() {
    //init initFreqOfRobots acoording to types of robots(max 2 robots of all types)
    for (let index = 0; index < robots.length; index++) {
        freqOfRobots[index] = 0;
    }
}
function countDown(i) {
    //time limit of the game
    int = setInterval(function () {
        labelForTime.innerHTML = i < 6 ? `<p style="color:red;">${i} seconds</p>` : `<p>${i} seconds</p>`;
        i-- || clearInterval(int);  //if i is 0, then stop the interval
        i === 0 ? timeMode = false : "";
    }, 1000);

}
function resetSetInterval() {
    clearInterval(int);
}
function setStyleBorderById(id, px, color) {
    //change border style using setTimeout
    setTimeout(() => {
        document.querySelector(`#${id}`).style.border = `${px}px solid ${color}`
    }, 1200);
}
function afterChooseLevel(Event){
    document.querySelector(`#mainDiv`).style.display="block";
    document.querySelector(`#diffH1`).style.display="none";
    let time=parseInt(Event.target.getAttribute(`time`));
    saveTimeForRestartFunc=time;
    myDiv.style.display=""
    document.querySelector(`#footer`).style.position="relative";
    Restart(Default = 10);
}

function chooseLevel(){
    document.querySelector(`#mainDiv`).style.display="none";
    document.querySelector(`#diffH1`).style.display="";
    myDiv.style.display="none"
    document.querySelector(`#footer`).style.position="absolute";
    // Restart(time,Default = 10);
}

