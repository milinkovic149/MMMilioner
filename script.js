const startButton = document.getElementById('start-btn')
const tryAgain = document.getElementById('try-again-container')
const wrongAnswer = document.getElementById('wrong-answer')
const gameWinner = document.getElementById('game-winner')
const tryAgainBtn = document.getElementById('try-again-btn')
const playAgainMilionaire = document.getElementById('play-again-milionaire')
const logo = document.getElementById('logo-game')
const startText = document.getElementById('start-container')
const gameContainer = document.getElementById('game-container')
const trueAnsw = document.getElementById('true-answ')
const questionElement = document.getElementById('question')
const answersButtonsElement = document.getElementById('answers')
const googleText = document.getElementById('google-text')
const body = document.getElementById('body')
const shape = document.getElementById('shape')
var tryAgainGame = document.getElementById('try-again')
let shuffledQuestions, currentQuestionIndex
let awards = document.getElementsByClassName('awards-div')
var time = document.getElementById('timer')
var timeSec = document.getElementById('timer2')
var forIframe = document.getElementById('forIframe')
var sound = document.getElementById('sound')
var sound1 = document.getElementById('sound1')
var sound2 = document.getElementById('sound2')
var audioWhileAnswering = new Audio('audio/whileAnswering.mp3');
var awardUp = new Audio('audio/awardEffect.mp3');
var click = new Audio('audio/clicked.mp3');
var timesUp = new Audio('audio/TimesUp.mp3');
var tictac = new Audio('audio/tictac.mp3');
var lose = new Audio('audio/lose.mp3');
var correctAnswer = new Audio('audio/correct.mp3');
var money = new Audio('audio/money.mp3');
const changeQuestionButton = document.getElementById("change-question")
const halfChoiceButton = document.getElementById("half-choice")
const openGoogleButton = document.getElementById("google")
var time1
var time2
var ifr

//Mute all function
var muted = false
sound.addEventListener('click', function muteAll() {
    if(muted === false){
        audioWhileAnswering.pause()
        tictac.pause()
        muted = true
        sound1.classList.add('hide')
        sound2.classList.remove('hide')
    }else{
        audioWhileAnswering.play()
        muted=false
        sound1.classList.remove('hide')
        sound2.classList.add('hide')
    }
  })

  function mute (audio){
    if(muted === false){
        audio.play()
        
    }else{
        audio.pause()
    }
  }

openGoogleButton.addEventListener('click', openGoogle)
var clicked = false
function openGoogle(){
    clicked = true
    tictac.volume=0.3
    mute(tictac)
    mute(click)
    googleText.classList.add('hide')
    timeSec.classList.remove('hide')
    time2=21
    stopTimer()
    startTimer2()
    openGoogleButton.style.pointerEvents = "none"
    forIframe.innerHTML='<iframe src="https://www.google.com/search?igu=1 " style="margin:0; padding:0; width:1150px; height:500px" id="_iframe" name="_iframe-"></iframe>'
    forIframe.classList.add('forIframe')
    timesUp.volume=0.1
    setTimeout(() => {
         ifr = document.getElementById('_iframe').classList.add('hide')
        
        
        tictac.pause()
        forIframe.classList.remove('forIframe')
      }, "21000")
}

var changeQuestionClicked = false
changeQuestionButton.addEventListener('click',changeQuestion)
function changeQuestion(){
    mute(click)
    currentQuestionIndex++
    setNextQuestion()
    changeQuestionButton.classList.add("disabled")
    changeQuestionClicked = true
}

function generateRandom(maxLimit = 3){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); 
    return rand;
  }
 var number1 = generateRandom(); 
 var number2 = generateRandom();
 number1 = Math.ceil(number1)
 number2 = Math.ceil(number2)
 areNumbersEquals()
function areNumbersEquals(){
    while(number1 === number2){
        number2=generateRandom()
        number2 = Math.ceil(number2)
    }
}

halfChoiceButtonClicked = false
halfChoiceButton.addEventListener('click',()=>{
    halfChoiceButtonClicked=true
    mute(click)
    currentQuestion = shuffledQuestions[currentQuestionIndex]
    Array.from(list2)[number1].classList.add('hide')
    Array.from(list2)[number2].classList.add('hide')
    halfChoiceButton.classList.add("disabled") 
})

tryAgainGame.addEventListener('click', startGame)
startButton.addEventListener('click', startGame)
tryAgainBtn.addEventListener('click', startGame)
playAgainMilionaire.addEventListener('click', startGame)

function startGame(){
    clicked=false
    halfChoiceButtonClicked = false
    changeQuestionClicked = false
    openGoogleButton.style.pointerEvents = "auto"
    mute(click)
    if(muted === false){  
        audioWhileAnswering.volume=0.1;
        audioWhileAnswering.play();
    }
    setTimeout(() => {
        audioWhileAnswering.volume=0.1;
        audioWhileAnswering.play();
    },167000)
    halfChoiceButton.classList.remove("disabled") 
    changeQuestionButton.classList.remove("disabled")
    openGoogleButton.classList.remove("disabled")
    score = 14
    time1=21
    startTimer()
    Array.from(awards).forEach(awd => awd.classList.remove('active'));
    Array.from(awards)[14].classList.add('active')
    wrongAnswer.classList.add('hide')
    startButton.classList.add('hide')
    startText.classList.add('hide')
    tryAgain.classList.add('hide')
    gameWinner.classList.add('hide')
    gameContainer.classList.remove('hide')
    shuffledQuestions = questionsEasy.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
    
}

function setNextQuestion(){

    if(changeQuestionClicked){
        changeQuestionButton.style.pointerEvents = "none" ;
    }else{
        changeQuestionButton.style.pointerEvents = "auto" ;
    }
    if(clicked){
        openGoogleButton.style.pointerEvents = "none"
    }else{
        openGoogleButton.style.pointerEvents = "auto"
    }
    if(halfChoiceButtonClicked){
        halfChoiceButton.style.pointerEvents = "none"
    }else{
        halfChoiceButton.style.pointerEvents = "auto"
    }
    
    time1=21
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
}

   

const list = []
let list2 = []
function showQuestion(question){
    /* asd*/
    list2 = []
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer')
        list.push(button)
        button.addEventListener('click', () => {
            Array.from(list).forEach(btn => {
                btn.style.pointerEvents = "none"
            })
        })
        if (answer.correct){
            button.dataset.correct = answer.correct
        }else{
            list2.push(button)
        }
        button.addEventListener('click', selectAnswer)
        answersButtonsElement.appendChild(button)
    })
}




function resetState(){
    while (answersButtonsElement.firstChild){
        answersButtonsElement.removeChild(answersButtonsElement.firstChild)
    }
}

function closeIfr(){
    ifr = document.getElementById('_iframe').classList.add('hide')
    forIframe.classList.remove('forIframe')
    openGoogleButton.classList.add('disabled')
}

function selectAnswer(e){
    if(clicked){
        closeIfr()
    }
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setTrueAndFalseColor(selectedButton, correct);
    stopTimer()
    //Bojenje tacnog i netacnih odgovora
    Array.from(answersButtonsElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct)
             })
}

function winGame () {
    win=true
    stopTimer()
    audioWhileAnswering.pause()
    gameWinner.classList.remove('hide')
    gameContainer.classList.add('hide')
    if(muted === false){
        money.volume=0.1
        money.play()
    }else{
    money.pause()
    }
}

var win = false
function setTrueAndFalseColor(element, correct){
    if(correct){
        stopTimer2()
        googleText.classList.remove('hide')
        timeSec.classList.add('hide')
        tictac.pause()
        correctAnswer.volume=0.4
        mute(correctAnswer)
        mute(lose)
        lose.pause()
        textAnimations()
        openGoogleButton.style.pointerEvents = "none"
        changeQuestionButton.style.pointerEvents = "none"
        halfChoiceButton.style.pointerEvents = "none"
        //prelazak na sledece pitanje i povecavanje nagrade
        setTimeout(function(){
            currentQuestionIndex++
            //staviti unclickable na iteme dok se ne pojavi sledece pitanje
            changeQuestionButton.style.pointerEvents = "auto"
                openGoogleButton.style.pointerEvents = "auto"
                halfChoiceButton.style.pointerEvents = "auto"
                if(changeQuestionClicked){
                    if(currentQuestionIndex == 16){
                        winGame()
                    }else{
                        win=false
                    }
                }else{
                    if(currentQuestionIndex == 15){
                        winGame()
                    }else{
                        win=false
                    }
                }
            
            if(win === false){
                setNextQuestion()      
            }
            trueAnsw.classList.add('hide')
            Array.from(awards).forEach(awd => awd.classList.remove('active'));
            score--
            awardGoUp(score,awards)
            startTimer()
         },1500);
    }else{
        openGoogleButton.style.pointerEvents = "none"
        changeQuestionButton.style.pointerEvents = "none"
        halfChoiceButton.style.pointerEvents = "none"
        if(muted === false){
            lose.volume=0.4
            lose.play()
        }else{
            lose.pause()
        }
        setTimeout(() => {
            wrongAnswer.classList.remove('hide')
            gameContainer.classList.add('hide')

        },3000)
        //restartuj tajmer za google, mutiraj zvuk tiktak i timesup
        stopTimer2()
        
        googleText.classList.remove('hide')
        timeSec.classList.add('hide')
        tictac.pause()
    }
}


var go2=true
function timer2(){
        if(!go2)
        return;
        time2= time2-1;
        if(time2 < 21){
            timeSec.innerHTML = time2
            stopTimer()
            startTimer2()
            googleText.classList.add('hide')
            timeSec.classList.remove('hide')
            
        }
        if(time2<1){
            //kada se zavrsi odbrojavanje 
            mute(timesUp)
            startTimer()
            stopTimer2()
            googleText.classList.remove('hide')
            timeSec.classList.add('hide')
            openGoogleButton.classList.add("disabled")
        }
        if(time2==3 || time2==2 || time2==1){
            timeSec.style.color = "red"
        }else{
            timeSec.style.color = "#C87F00"
        }
}
function stopTimer2(){
    go2=false
    timer()
}
function startTimer2(){
    go2=true
    timer()
}

var go=true
function timer(){
        if(!go)
        return;
        time1= time1-1;
        if(time1 < 21){
            time.innerHTML = time1
        }
        if(time1<1){
            stopTimer()
            if(muted === false){  
                timesUp.volume=0.1
                timesUp.play()
            }else{
                timesUp.pause()
            }
            
            tryAgain.classList.remove('hide')
            gameContainer.classList.add('hide')
        }

        if(time1==3 || time1==2 || time1==1){
            time.style.color = "red"
        }else{
            time.style.color = "#C87F00"
        }
}

function stopTimer(){
    go=false
    timer()
}
function startTimer(){
    go=true
    timer()
}
update = setInterval("timer()",1000)
update1 = setInterval("timer2()",1000)

function textAnimations(){
    trueAnsw.classList.remove('hide')
    trueAnsw.classList.remove("ml2")
    trueAnsw.classList.add("ml2");

}

function awardGoUp(awindex, awards){
    mute(awardUp)
    Array.from(awards)[awindex].classList.add('active')
}



function setStatusClass(element, correct){
    clearStatusClass(element)
    
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questionsEasy = [
    {
        question: 'Car Dušan je zapamćen i kao:',
        answers: [
            {text: 'Dušan Silni', correct: true},
            {text: 'Dušan Mudri', correct: false},
            {text: 'Dušan Hrabri', correct: false},
            {text: 'Dušan Nejaki', correct: false}
        ]
    },
    {
        question: 'Na prostoru koje današnje države se nalazio logor Aušvic',
        answers: [
            {text: 'Italije', correct: false},
            {text: 'Austrije', correct: false},
            {text: 'Češke', correct: false},
            {text: 'Poljske', correct: true}
        ]
    },
    {
        question: 'Koje od ovih država su na obalama istog okeana?',
        answers: [
            {text: 'Brazil i Peru', correct: false},
            {text: 'Španija i Peru', correct: false},
            {text: 'Brazil i Francuska', correct: true},
            {text: 'Indija i Maroko', correct: false}
        ]
    },
    {
        question: 'Šta je "protagonist"?',
        answers: [
            {text: 'Glavna ličnost ', correct: true},
            {text: 'Naučnik', correct: false},
            {text: 'Nosač', correct: false},
            {text: 'Nametljivac', correct: false}
        ]
    },
    {
        question: 'Šta je "bela kuga"?',
        answers: [
            {text: 'Hlađenje okeana i mora', correct: false},
            {text: 'Osiromašenje građana', correct: false},
            {text: 'Smanjenje nataliteta ', correct: true},
            {text: 'Otapanje leda', correct: false}
        ]
    },
    {
        question: 'Tokom evolucije, ko su bili najbliži preci ptica?',
        answers: [
            {text: 'Gmizavci', correct: true},
            {text: 'Papkari', correct: false},
            {text: 'Kljunari', correct: false},
            {text: 'Zglavkari', correct: false}
        ]
    },
    {
        question: 'Šta od sledećeg predstavlja krvno srodstvo?',
        answers: [
            {text: 'Zaova', correct: false},
            {text: 'Zet', correct: false},
            {text: 'Ujak', correct: true},
            {text: 'Jetrva', correct: false}
        ]
    },
    {
        question: 'Čime se hrani svilena buba?',
        answers: [
            {text: 'Smolom', correct: false},
            {text: 'Dudovim lišćem', correct: true},
            {text: 'Larvama mrava ', correct: false},
            {text: 'Lišajevima', correct: false}
        ]
    },
    {
        question: 'Koja država je 1908. godine prisajedinila Bosnu svojoj teritoriji?',
        answers: [
            {text: 'Hrvatska', correct: false},
            {text: 'Nemačka', correct: false},
            {text: 'Srbija', correct: false},
            {text: 'Austro-Ugarska', correct: true}
        ]
    },
    {
        question: 'Kratkoročno potraživanje koje glasi na stranu valutu je:',
        answers: [
            {text: 'Deviza', correct: true},
            {text: 'Poverilački kredit', correct: false},
            {text: 'Platni deficit', correct: false},
            {text: 'Poverilački kredit', correct: false}
        ]
    },
    {
        question: 'Šta ne predstavlja par suprotnosti?',
        answers: [
            {text: 'Altruista - Egoista ', correct: false},
            {text: 'Konkavan - Konveksan', correct: false},
            {text: 'Neskladan - Disharmoničan', correct: true},
            {text: 'Jednostavan - Kompleksan ', correct: false}
        ]
    },
    {
        question: 'Eros i Amor su jedan drugome:',
        answers: [
            {text: 'Kontrast', correct: false},
            {text: 'Unikat', correct: false},
            {text: 'Pandan', correct: true},
            {text: 'Raritet', correct: false}
        ]
    },
    {
        question: 'Koji grad je, po Bibliji, uništen zbog grehova njegovih stanovnika?',
        answers: [
            {text: 'Jerusalim', correct: false},
            {text: 'Gomora', correct: true},
            {text: 'Vavilon', correct: false},
            {text: 'Persepolis', correct: false}
        ]
    },
    {
        question: 'U kom gradu se nalazi Zabranjeni grad?',
        answers: [
            {text: ' u Kairu', correct: false},
            {text: 'u Moskvi', correct: false},
            {text: 'u Nju Delhiju ', correct: false},
            {text: 'u Pekingu ', correct: true}
        ]
    },
    {
        question: 'Dijapazon je:',
        answers: [
            {text: 'Opseg', correct: true},
            {text: 'Geometrijsko telo ', correct: false},
            {text: 'preteča foto-aparata', correct: false},
            {text: 'Čaša', correct: false}
        ]
    },
    {
        question: 'Kad se kaže da je neka biljna vrsta autohtona, to znači da je ona:',
        answers: [
            {text: 'Samonikla', correct: true},
            {text: 'Istrebljena', correct: false},
            {text: 'Dragocena', correct: false},
            {text: 'Nova vrsta', correct: false}
        ]
    }
]





