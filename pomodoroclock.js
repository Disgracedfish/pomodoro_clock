var sessionTime = 1500;
var breakTime = 300;
var timerOn = false;
var stage = 'session';
currentTime = sessionTime;
var timer;
var snd = new Audio('salamisound-7587855-double-beep-beep-as-e-g.mp3');

const pauseBtn = document.getElementById('pause-button');
const starBtn = document.getElementById('start-button');
const stopBtn = document.getElementById('stop-button');
const increaseSessionBtn = document.getElementById('increaseSession');
const decreaseSessionBtn = document.getElementById('decreaseSession');
const increaseBreakBtn = document.getElementById('increaseBreak');
const decreaseBreakBtn = document.getElementById('decreaseBreak');


function increaseSessionTime() {
    if (timerOn) {return;}
    sessionTime +=60;
    currentTime = sessionTime;
    updateDisplay();
}

function decreaseSessionTime() {
    if (timerOn) {return;}
    if (sessionTime >60){
        sessionTime -=60;
        currentTime = sessionTime;
        updateDisplay();
    }
}

function increaseBreakTime() {
    if (timerOn) {return;}
    breakTime +=60;
    updateDisplay();
}

function decreaseBreakTime() {
    if (timerOn) {return;}
    if (breakTime > 60) {
        breakTime -= 60;
        updateDisplay();
    }
}

function updateDisplay() {
    min = Math.floor(currentTime/60);
    sec = currentTime%60;

    if(min < 10) { min = '0' + min};
    if (sec < 10) {sec = '0' + sec};
    
    if (!timerOn) {
        document.getElementById('session').textContent = sessionTime/60;
        document.getElementById('break').textContent = breakTime/60;
    }

    document.getElementById('timer').textContent = 
        `${min}:${sec}`;
  
}

function play() {
    if (timerOn) {return;}
    timerOn = true;
    timer =  setInterval(timingFunction,1000);
   document.getElementById('timer').style.color = '#ff7f00';
}

function timingFunction() {
    
    if (stage === 'session'){
        if (currentTime == 0 ) {
            stage = 'break'
            snd.play();
            currentTime = breakTime;
            document.getElementById('current-mode').textContent='Break';
            document.getElementById('timer').style.color = '#00ffff';
            //TODO: play sound
        } else {
            currentTime --;
            updateDisplay();
        }
    }

    if (stage == 'break') {
        if (currentTime == 0 ) {
            stage = 'session';
            snd.play();
            currentTime = sessionTime;
            document.getElementById('current-mode').textContent='Session';
            document.getElementById('timer').style.color = '#ff7f00';
            //TODO: play sound
        }
        else {
            currentTime --;
            updateDisplay();
        }
    }
    

}

function stop() {
    stopTimingFunction()
    document.getElementById('timer').style.color = '#ff007f';
    currentTime = sessionTime;
    timerOn = false;
    document.getElementById('current-mode').textContent='Session';
    updateDisplay();
}

function pause() {
    stopTimingFunction()
    timerOn = false;
}

function stopTimingFunction() {
    clearInterval(timer);
  }


increaseSessionBtn.addEventListener('click', increaseSessionTime);
decreaseSessionBtn.addEventListener('click', decreaseSessionTime);
increaseBreakBtn.addEventListener('click', increaseBreakTime);
decreaseBreakBtn.addEventListener('click', decreaseBreakTime);
starBtn.addEventListener('click', play);
stopBtn.addEventListener('click', stop);
pauseBtn.addEventListener('click', pause);


