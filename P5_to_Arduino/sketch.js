//* Arduino variables */
let serial; /* variable for the serial object */
let latestData = "waiting for data"; /* variable to hold the data */
let arduinoValues;

let but1Value = 0;
let red = 255;
let green = 255;

let joystickX;


//* ML5 handpose webcam variables */
let handpose;
let video;
let predictions = [];
let dims = {};
let averageX = 0;
let newAverageX;
let handSkeletonColor = "#FFFF00"


//* Code logic variables */
/* ML5 tests if calibration is done or not */
let ms;
let calibration = false;
let calibrationDone = false;
let msLeftStarted, msRightStarted;
/* ML5 calibration camera visual lines */
let lineLeftColor = '#FFFF00', lineRightColor = '#FFFF00';
let timerLeftStarted = false, timerRightStarted = false;
let lineLeftChecked = false, lineRightChecked = false;
/* variables that are responsable for the start of the game and which "controller" is being used */
let joyStick = true;
let gameStarted = false;
let gameLevel = 1;
/* movement related */
let goingLeft = false;
let goingRight = false;
/* shooting related */
let flowerSpeed = 5;
let flowerX, flowerY; // Posição do projétil
let isFiring = false;
let flowers = [];


//* Game scenario variables */
let lines = [1, 3, 5, 5, 7, 7, 7, 7, 5, 3, 1];
let rectangles = [];
let rectNbr = 0;
let rectW;
let rectH = window.innerHeight * 0.03;
let lineRect = 0;
let nbrRectPerLine = -1;
let rectColor;
let rectMarginTop;

let balls = [];
let isBallOut = false;

/* level 1 */
let sentences = [{
              txt: "O governo enfrenta críticas crescentes devido à sua política de medidas rigorosas contra a contestação.",
              censured: ["medidas", "rigorosas"]
            },
            {
              txt: "Os indivíduos exigem mais espaço para expressão e o fim da regulação estatal.",
              censured: ["indivíduos", "mais", "espaço", "para", "expressão", "regulação"]
            },
            {
              txt: "A autoridade policial deteve vários militantes que protestavam pacificamente contra o regime.",
              censured: ["autoridade", "policial", "militantes"]
            },
            {
              txt: "O líder da parte contrária denunciou publicamente questões controversas cometidas pelo Estado.",
              censured: ["parte", "contrária", "questões", "controversas"]
            },
            {
              txt: "Os pensadores organizam-se secretamente para expressar suas opiniões do regime.",
              censured: ["pensadores", "expressar", "suas", "opiniões"]
            },
]

let wordsCensuredAll = [];

let randomNbr1
let randomNbr2
let marginLeftLeft
let marginLeftTop
let marginRightLeft
let marginRightTop
let maxWidth

/* level 3 */
let flowerCircles = [];
let randomNbrCircles;
let randomX;
let randomY;
let max = 10;
let min = 5;
let randomSizePercentage;
let randomSize;

//* Game scenario images */
/* level 1 */
let isScenario1Created = false;
let imgBgLvl1;
let imgNews;
let imgPencil;
let imgPencilRotate = -90;

/* level 2 */
let restartLvl2 = false;
let isScenario2Created = false;
let counter = 0;
let randomNbr = 0;
let randomNbrs = [];
let slingshotX;

let bricksImgs = [];
let imgBrickEmpty;
let imgBrickComunismo;
let imgBrickDitadura;
let imgBrickExilio;
let imgBrickOpressao;
let imgBrickPIDE;
let imgBrickTop;
let imgBrickFloor;
let imgSlingshot;
let imgRock;

let imgBgLvl2;

/* level 3 */
let isScenario3Created = false;
let imgG3;
let imgG3Rotate = -90;
let imgFlower
let imgBgLvl3;

//* CUTSCENES */
let cutscenesPerLvl = 1;
let cutscenesCount = -1;
let cutscenes = [
/* 1-2 */         "O desespero e a escassez assombravam os habitantes. Nas ruas, pessoas tinham olhares que procuravam desesperadamente uma esperança que parecia fugir-lhes. Os mercados exibiam prateleiras vazias, testemunhas silenciosas da fome e da carência que afligiam a população. Enquanto o povo lutava contra a dura realidade da pobreza, o governo permanecia indiferente às suas necessidades desesperadas.",
/* 1-3 */         "A censura prevalecia como uma sombra sufocante. Um jornal, outrora uma voz de liberdade e expressão, agora encontrava-se obscurecido, os seus conteúdos ocultos e as suas vozes silenciadas. Observadores disfarçados vigiavam atentamente, garantindo que apenas a narrativa oficial fosse divulgada. Na escuridão da desinformação, a população era mantida na ignorância.",
/* 2-1 */         "Certo dia, um grupo de pessoas avança pelas ruas da cidade, determinado e exausto de viver sob o jugo de um regime tirânico. Marcham em direção a uma imponente muralha de tijolos, erguida pelo ditador para separá-los da liberdade e da mudança. Esta muralha, não apenas uma estrutura física, mas um símbolo da opressão que há décadas sufoca o povo, representa a barreira intransponível que os separa da esperança e do progresso.",
/* 2-2 */         "À medida que se aproximam da imponente parede de tijolos, deparam-se com símbolos tangíveis da opressão que enfrentam. Slogans de propaganda adornam a superfície, testemunhas de todo o sofrimento causado pelo regime. Alguns tijolos faltam ou danificados, indicando tentativas anteriores de desafiar a barreira que os aprisiona.",
/* 2-3 */         "Entram em ação, empunhando as suas fisgas e pedras com determinação enquanto se unem para derrubar os tijolos da parede. A cena irradia movimento e energia, com destroços que começam a voar e esperança resplandecendo nos corações dos que lutam pela liberdade. Começa a ver-se uma luz ao fundo.",
/* 3-1 */         "À medida que a parede foi destruída, as ruas do Porto que se mostravam do outro lado enchiam-se de alegres e animadas pessoas, no dia 25 de Abril de 1974.",
/* 3-2 */         "Um soldado coloca um cravo vermelho na arma, um gesto simbólico que marca a adesão das forças armadas à causa da democracia. Ao redor, a multidão irrompe em aplausos e vivas, demonstrando a aceitação e o entusiasmo pela mudança que se aproxima.",
/* 3-3 */         "As ruas do Porto transformaram-se num mar de cravos vermelhos, símbolo não apenas da celebração do 25 de Abril, mas também da união e esperança do povo português num futuro democrático e livre. Soldados e civis interagem harmoniosamente, refletindo o espírito de solidariedade e cooperação que definiu aquele momento histórico.",
];

/**
 * carregar imagens para aparecer no canvas
 */
function preload() {
  //* font */
  fontPX = loadFont('../font/VT323-Regular.ttf');

  //* level 1 */
  imgBgLvl1 = loadImage('../images/pixelart/cs1-3_blurry.png');
  imgNews = loadImage('../images/pixelart/jornal.png');
  imgPencil = loadImage('../images/pixelart/lapis_azul.png');

  //* level 2 */
  imgBrickEmpty = loadImage('../images/pixelart/tijolo_vazio.png');
  imgBrickComunismo = loadImage('../images/pixelart/tijolo_comunismo.png');
  imgBrickDitadura = loadImage('../images/pixelart/tijolo_ditadura.png');
  imgBrickExilio = loadImage('../images/pixelart/tijolo_exilio.png');
  imgBrickOpressao = loadImage('../images/pixelart/tijolo_opressao.png');
  imgBrickPIDE = loadImage('../images/pixelart/tijolo_PIDE.png');
  imgBrickTop = loadImage('../images/pixelart/tijolo_topo.png');
  imgBrickFloor = loadImage('../images/pixelart/tijolo_floor.png');
  imgSlingshot = loadImage('../images/pixelart/fisga.png');
  imgRock = loadImage('../images/pixelart/pedra.png');
  
  imgBgLvl2 = loadImage('../images/pixelart/bg_porto_casas_azuis_blurry.png');

  //* level 3 */
  imgG3 = loadImage('../images/pixelart/g3_portuguesa.png');
  imgFlower = loadImage('../images/pixelart/cravo_levantado.png');

  imgBgLvl3 = loadImage('../images/pixelart/bg_3.png');

  //* sound */  
  backgroundSound = loadSound("../sounds/ms_a_portuguesa_hino1.WAV")
}

/**
 * size and position of canvas + definiting the port being used to detect the arduino in use
 */
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);
  rectMode(CENTER);
  fill(0, 0, 0);

  //* default settings to rotate images */
  imageMode(CENTER);
  angleMode(DEGREES);  


  //* serial port used to detect the arduino */
  // XAU ARDUINO
  // setupSerial('COM3');


  //* ML5 */
  video = createCapture(VIDEO, webcamIsReady);

  // handpose = ml5.handpose(video, modelReady);
  // handpose.on("predict", results => {
  //   predictions = results;
  // });

  video.hide();

  //* game level 2 */
  slingshotX = width/2;

  bricksImgs = [{
                  img: imgBrickComunismo,
                  w: 0,
                  h: 0,
                  x: 0,
                  y: 0,
                  hasBeenHit: false
                },
                {
                  img: imgBrickDitadura,
                  w: 0,
                  h: 0,
                  x: 0,
                  y: 0,
                  hasBeenHit: false
                },
                {
                  img: imgBrickExilio,
                  w: 0,
                  h: 0,
                  x: 0,
                  y: 0,
                  hasBeenHit: false
                },
                {
                  img: imgBrickOpressao,
                  w: 0,
                  h: 0,
                  x: 0,
                  y: 0,
                  hasBeenHit: false
                },
                {
                  img: imgBrickPIDE,
                  w: 0,
                  h: 0,
                  x: 0,
                  y: 0,
                  hasBeenHit: false
                },
  ];

  // flowers = new Group();
  // flower = createSprite(-50,-50);
  // flower.remove();

  balls.push(new Ball(window.innerWidth*0.5, height*0.85, width*0.015));

  backgroundMusic();
}

function backgroundMusic() {
  backgroundSound.play();
  backgroundSound.loop();
  backgroundSound.setVolume(0.3);
  userStartAudio();
}

document.querySelector('#btnHand').addEventListener('click', e => {
  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });
})
 
function webcamIsReady() {
  dims.canvasWidth = window.innerWidth, dims.canvasHeight = window.innerHeight
  dims.videoWidth = video.width, dims.videoHeight = video.height
}

/* random line to say made by: Viviana :) */

/**
 * draw function
 */
function draw() {
  clear();
  noSmooth();
  strokeWeight(1);
  noStroke();

  //* PRE-GAME logics */
  if (!gameStarted) {
    if (document.querySelector('#calibrationScreen').style.display == 'flex') {
      calibration = true;
      ms = millis();

      // handpose = ml5.handpose(video, modelReady);
      // handpose.on("predict", results => {
      //   predictions = results;
      // });
      // video.hide();
    } else {
      calibration = false
    }
  }
  
  if (!gameStarted && document.querySelector('#calibrationScreen').style.display != 'flex' && document.querySelector('#mainMenu').style.display == 'none') {
    gameStarted = true;
  }


  //* ML5 calibration */
  
  // scale(-1, 1); /* inverts canvas so that the webcam hand captation mechanic is less confusion for the player */
  if (calibration) {
    push();
    translate(width/2, height/2);
    tint(255, 51);
    scale(-1, 1)
    image(video, 0, 0, width, height);
    pop();
  }

  if (calibration || (!joyStick && gameStarted)) {
    drawKeypoints();
  }

  //* GAME logics */
  if (gameStarted) {
    if (gameLevel == 1) {
      imgBgLvl1.resize(width, 0);
      image(imgBgLvl1, width-imgBgLvl1.width/2, height-(imgBgLvl1.height/2));
      imgNews.resize(0, height);
      image(imgNews, width/2, height-(imgNews.height/2));


      for (let i = flowers.length - 1; i >= 0; i--) {
        flowers[i].update();
        flowers[i].display();

        if (flowers[i].offscreen()) {
          flowers.splice(i, 1);
        }
      }


      let allWordsCensured = (currentValue) => currentValue.hasBeenHit == true;
  
      if (wordsCensuredAll.length == 0 || !wordsCensuredAll.every(allWordsCensured)) {
        newspaper();
        // console.log(wordsCensuredAll);
      } else { 
        gameStarted = false
        isBallOut = false
        gameLevel++
  
        document.querySelector('#csImg').src = `../images/cutscenes/cs${gameLevel}-${cutscenesPerLvl}.png`;
        document.querySelector('#csTxt').innerHTML = cutscenes[cutscenesCount];
        document.querySelector('#cutscenesScreen').style.display = 'flex';
      }

      
    } else if (gameLevel == 2) {
      imgBgLvl2.resize(width, 0);
      image(imgBgLvl2, width-imgBgLvl2.width/2, height-(imgBgLvl2.height/2));
  
      let brickDestroyed = (currentValue) => currentValue.hasBeenHit == true;
  
      if (!bricksImgs.every(brickDestroyed)) {
        bricks();
      } else {
        gameStarted = false
        isBallOut = false
        gameLevel++
  
        document.querySelector('#csImg').src = `../images/cutscenes/cs${gameLevel}-${cutscenesPerLvl}.png`;
        document.querySelector('#csTxt').innerHTML = cutscenes[cutscenesCount];
        document.querySelector('#cutscenesScreen').style.display = 'flex';
      }

    } else if (gameLevel == 3) {
      imgBgLvl3.resize(width, 0);
      image(imgBgLvl3, width-imgBgLvl3.width/2, height-(imgBgLvl3.height/2));
      
      for (let i = flowers.length - 1; i >= 0; i--) {
        flowers[i].update();
        flowers[i].display();
        if (flowers[i].offscreen()) {
          flowers.splice(i, 1);
        }
      }

      let circlesDestroyed = (currentValue) => currentValue.hasBeenHit == true;
  
      if (flowerCircles.length == 0 || !flowerCircles.every(circlesDestroyed)) {
        circles();
      } else {
        // COLOCAR O ECRÃ FINAL!!!
        document.querySelector('#csImg').src = `../images/cutscenes/cs3-3.png`;
        document.querySelector('#csTxt').innerHTML = cutscenes[cutscenes.length-1];
        document.querySelector('#cutscenesScreen').style.display = 'flex';
        document.querySelector('#cutscenesBtns').innerHTML = `
          <p id="btnEnd" style="margin: 0; padding-bottom: 20px; font-size: 25px;" class="fontPx btnCS">
            FIM
          </p>
        `;
      }
    }

    /** Draw rectangle sun */
    // for (let i = 0; i < rectangles.length; i++) {
    //   let rectangle = rectangles[i];
    //   rectangle.draw();
    // }

    /** Draw ball */
    if (!isBallOut) {
      for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.render();
      }
    } else {
      for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.draw();
      }

      if (gameLevel == 1) {
        projectileCollidesElement(wordsCensuredAll);
      } else if (gameLevel == 2) {
        ballCollidesElement(bricksImgs);
      } else if (gameLevel == 3) {
        projectileCollidesElement(flowerCircles);
      }

      for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        ball.afterBorder();
      }
    }

    movingRect(joyStick, gameStarted, newAverageX);
  }


  //* ARDUINO */
  // serialReceive();
  // if (joyStick && gameStarted) {
  //   serialReceive(); 
  // }

  keyPressedArduino(latestData.slice(0,1), latestData.slice(2,3), latestData.slice(1,2))

  if (calibration || (!joyStick && gameStarted)) {
    drawKeypoints();
  }
}

/**
 * ML5: function that draws ellipses and skeletons over the detected keypoints
 */
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i]; /* coords for every circle on every finger */
    averageX = 0;

    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j]; /* coords for every each circle */
 
      let newX = map(keypoint[0], 0, dims.videoWidth, 0, dims.canvasWidth)
      let newY = map(keypoint[1], 0, dims.videoHeight, 0, dims.canvasHeight)

      // only shows the circles of the hand-skeleton when in the calibration screen
      if (calibration) {
        fill(handSkeletonColor);
        noStroke();
        circle(newX, newY, 10);
      }
      
      averageX += keypoint[0]

      // only draws rectangle if the player chose the HAND DETECTION and if he is on the "play" screen
      if (j == prediction.landmarks.length-1 && calibration) {
        averageX = averageX / prediction.landmarks.length;
        // let newAverageX = map(averageX, 0, dims.videoWidth, 0, dims.canvasWidth)
        newAverageX = map(averageX, 0, dims.videoWidth, 0, width);

        if (calibration) {
          if (newAverageX < width*0.8 && newAverageX > width*0.6) {
            handSkeletonColor = '#00FF00';
            lineLeftColor = '#00FF00';
            
            if (!timerLeftStarted) {
              timerLeftStarted = true
              msLeftStarted = ms;
            }

            if (ms - msLeftStarted > 1000) {
              lineLeftChecked = true  
            }
          } else if (newAverageX < width*0.4 && newAverageX > width*0.2) {
            handSkeletonColor = '#00FF00';
            lineRightColor = '#00FF00';
            
            if (!timerRightStarted) {
              timerRightStarted = true
              msRightStarted = ms;
            }

            if (ms - msRightStarted > 1000) {
              lineRightChecked = true  
            }
          } else {
            handSkeletonColor = '#FFFF00'

            if (!lineLeftChecked) {
              lineLeftColor = '#FFFF00';
              timerLeftStarted = false; 
            }

            if (!lineRightChecked) {
              lineRightColor = '#FFFF00';
              timerRightStarted = false;
            }
          }
        }
      }
    }
    averageX = averageX / prediction.landmarks.length;
    newAverageX = map(averageX, 0, dims.videoWidth, 0, width);

  }

  if (calibration) {  
    noStroke();
    fill(lineLeftColor);

    if (!lineLeftChecked) {
      rect(width*0.8,height*0.9, width*0.2, 10); /* since the canvas is inverted horizontally, the X coords would originally be: width * 0.2 */ 
    }

    fill(lineRightColor);
    if (!lineRightChecked) {
      rect(width*0.2,height*0.9, width*0.2, 10); /* since the canvas is inverted horizontally, the X coords would originally be: width * 0.8 */
    }
    
    if (lineLeftChecked && lineRightChecked && !calibrationDone && document.querySelector('#btnJoystick').classList.contains("active")) {
      calibrationDone = true;
      joyStick = false;
      document.querySelector('#mainMenu').style.display = 'flex';
      document.querySelector('#calibrationScreen').style.display = 'none';
      document.querySelector('#btnHand').classList.add("active");
      document.querySelector('#btnJoystick').classList.remove("active");

    } else if (lineLeftChecked && lineRightChecked && calibrationDone && document.querySelector('#btnJoystick').classList.contains("active")) {
      calibrationDone = false;
      joyStick = true;

      lineLeftChecked = false;
      timerLeftStarted = false;
      lineLeftColor = '#FFFF00';

      lineRightChecked = false;
      timerRightStarted = false;
      lineRightColor = '#FFFF00';
    }
  }
}

function modelReady() {
  console.log("Model ready!");
}

/**
 * when data is received in the serial buffer
 * function that receives data from arduino serial monitor
 */ 
function serialReceive() {
  let currentString = serial.readLine(); /* store the data from arduino's serial monitor in a variable */
  trim(currentString); // get rid of whitespace
  
  if (!currentString) {  // if there's nothing in arduino's serial monitor
    //console.log("Nothing on arduino's serial monitor.");
    // movingRect(joyStick, gameStarted, joystickX);
  } else {
    arduinoValues = split(currentString, ' '); /* creates an array with data from arduino */
    latestData = currentString; // save it to the global variable
    console.log('latestData: '+latestData);

  //   // joystickX = map(arduinoValues[0], 0, 200, window.innerWidth*0.1, (window.innerWidth*0.9*200)/1023);
  //   // joystickX = map(arduinoValues[0], 200, 800, (window.innerWidth*0.9*200)/1023, (window.innerWidth*0.9*800)/1023);
  //   // joystickX = map(arduinoValues[0], 800, 1023, (window.innerWidth*0.9*800)/1023, window.innerWidth*0.9);

    joystickX = map(arduinoValues[0], 0, 1023, window.innerWidth*0.05, window.innerWidth*0.95);
    //movingRect(joyStick, gameStarted, joystickX);
    console.log(joystickX);
  }

  // but1Value = 0; // Reset value
  // but1Value = arduinoValues[1];
}

////////////////////////////////////////////////////////////////
function setupSerial(port){
  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open(port);
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  //serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose);
}

/////////////////////////////////////////
function serverConnected() {
  console.log("Connected to Server");
}

/////////////////////////////////////////
// list the ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

/////////////////////////////////////////
function gotOpen() {
  console.log("Serial Port is Open");
}

/////////////////////////////////////////
function gotClose() {
  console.log("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

/////////////////////////////////////////
function gotError(theerror) {
  console.log(theerror);
}
////////////////////////////////////////////////////////////////

function keyPressedArduino(btnLeft, btnRight, btnSpace) {
  //console.log("left: "+latestData.slice(0,1) +' right: '+ latestData.slice(2,3))

  /** BTNS LEFT / RIGHT */
  if (btnLeft == 1) {
    goingLeft = true;
  } else {
    goingLeft = false;
  }
  
  if (btnRight == 1) {
    goingRight = true;
  } else {
    goingRight = false;
  }

  /** BTN SPACE */
  if (btnSpace == 1) {
    isBallOut = true;
  }

  if (btnSpace == 1 && gameLevel == 1) { //isFlowerOut
    fill('#0099D6')
    flowers.push(new Flower(createVector(width/2, height-(imgPencil.width*0.2)), imgPencilRotate, imgPencil.height*0.2));
  }

  if (btnSpace == 1 && gameLevel == 3) { //isFlowerOut
    flowers.push(new Flower(createVector(width/2, height-(imgG3.width*0.2)), imgG3Rotate, (height*0.1)/2));
  }
}

function keyPressed() {
  if (key === ' ') {
    isBallOut = true;
  }

  if (keyCode === LEFT_ARROW) {
    goingLeft = true;
  }
  
  if (keyCode === RIGHT_ARROW) {
    goingRight = true;
  }

  /* if the player is holding both arrows down, then it will prioritaze the last one */
  if (keyCode === LEFT_ARROW && goingRight == true) {
    goingRight = false;
    goingLeft = true;
  }

  if (keyCode === RIGHT_ARROW && goingLeft == true) {
    goingLeft = false;
    goingRight = true;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    goingLeft = false;
  }

  if (keyCode === RIGHT_ARROW) {
    goingRight = false;
  }

  if (key === ' ' && gameLevel == 1) { //isFlowerOut
    fill('#0099D6')
    flowers.push(new Flower(createVector(width/2, height-(imgPencil.width*0.2)), imgPencilRotate, imgPencil.height*0.2));
  }

  if (key === ' ' && gameLevel == 3) { //isFlowerOut
    flowers.push(new Flower(createVector(width/2, height-(imgG3.width*0.2)), imgG3Rotate, (height*0.1)/2));
  }
}


function txtDimensions(sentence, sent, maxWidth, marginLeft, marginTop) {
  let words = sentences[sent].txt.split(' ');
  let line = '';
  let testLine;
  let lineHeight = textSize() * 1.2; // Line height
  let wordSpace = textSize() * 0.5;
  let textHeight = 0;
  let firstWord = true;
  let lastWordWidth;
  let lastWordHeight;
  let lastWordX;

  for (const word of words) {
    testLine = line + word + ' ';

    if (firstWord) {
      firstWord = false;

      text(word, marginLeft, marginTop);

      lastWordX = marginLeft;
      lastWordWidth = textWidth(word);
      lastWordHeight = marginTop;

    } else {
      if (textWidth(testLine) > maxWidth && line.length > 0) { // add a new line if width passes max width
        line = word + ' ';

        if (!sentences[sent].censured.includes(word)) {
          fill('#000');
        } else {
          fill('#0099d6');
          // saves the coordinates
          let wordPos = wordsCensuredAll.findIndex(item => item.sentence == sentence && item.word == word);
          wordsCensuredAll[wordPos].x = marginLeft+textWidth(word)/2;
          wordsCensuredAll[wordPos].y = lastWordHeight+lineHeight+lineHeight/2;
          wordsCensuredAll[wordPos].w = textWidth(word);
          wordsCensuredAll[wordPos].h = lineHeight;
        }

        text(word, marginLeft, lastWordHeight+lineHeight) // marginTop + lineHeight = new line

        lastWordX = marginLeft;
        lastWordWidth = textWidth(word);
        lastWordHeight = lastWordHeight+lineHeight;

      } else {
        if (!sentences[sent].censured.includes(word)) {
          fill('#000');
        } else {
          fill('#0099d6');
          let wordPos = wordsCensuredAll.findIndex(item => item.sentence == sentence && item.word == word);
          wordsCensuredAll[wordPos].x = lastWordX+lastWordWidth+wordSpace+textWidth(word)/2;
          wordsCensuredAll[wordPos].y = lastWordHeight+lineHeight/2;
          wordsCensuredAll[wordPos].w = textWidth(word);
          wordsCensuredAll[wordPos].h = lineHeight;
        }

        line = testLine;
        text(word, lastWordX+lastWordWidth+wordSpace, lastWordHeight);

        lastWordX = lastWordX+lastWordWidth+wordSpace;
        lastWordWidth = textWidth(word);
      }
    }

    // "for" to verify if the censuredWord was already hit by player
    for (const censuredWord of wordsCensuredAll) {
      if (censuredWord.sentence == sentence && censuredWord.word == word && censuredWord.hasBeenHit) {
        fill('#0099d6');
        rect(censuredWord.x, censuredWord.y, censuredWord.w, censuredWord.h);
      }
    }
  }

  return { w: maxWidth, h: textHeight };
}


function newspaper() {
  fill('#000');
  textFont(fontPX, 25);
  textAlign(LEFT, TOP);

  if (!isScenario1Created) {
    isScenario1Created = true;

    randomNbr1 = Math.floor(Math.random() * sentences.length);
    for (const word of sentences[randomNbr1].censured) {
      wordsCensuredAll.push({
        sentence: 1,
        word: word,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        hasBeenHit: false
      }) 
    }

    randomNbr2;
    for (let i = 0; i < 2; i++) {
      randomNbr2 = Math.floor(Math.random() * sentences.length);

      if (randomNbr2 == randomNbr1) {
        i--
      } else {
        i++
      }
    }
    for (const word of sentences[randomNbr2].censured) {
      wordsCensuredAll.push({
        sentence: 2,
        word: word,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        hasBeenHit: false
      }) 
    }

    marginLeftLeft = width/2-imgNews.width/2 + imgNews.width*0.1
    marginLeftTop = imgNews.height*0.35;

    marginRightLeft = width/2 + imgNews.width*0.08
    marginRightTop = imgNews.height*0.47
    maxWidth = marginRightLeft - marginLeftLeft - imgNews.width*0.11;
  }

  let {w, h} = txtDimensions(1, randomNbr1, maxWidth, marginLeftLeft, marginLeftTop)
  let {w2, h2} = txtDimensions(2, randomNbr2, maxWidth, marginRightLeft, marginRightTop)
}


function circles() {
  strokeWeight(10);
  stroke(255, 0, 0);
  fill(0, 0, 0, 0);

  if (!isScenario3Created) {
    isScenario3Created = true

    min = 2;
    max = 5;
    randomNbrCircles = Math.floor(Math.random() * (max - min + 1) + min)

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < randomNbrCircles; i++) {
        if (j == 0) {
          randomX = Math.floor(Math.random() * width*0.35) + width*0.05;
        } else {
          randomX = Math.floor(Math.random() * (width - width*0.6) + width*0.6) - width*0.05;
        }

        randomY = Math.floor(Math.random() * height*0.4) + height*0.05;

        randomSizePercentage = Math.floor(Math.random() * (max - min + 1) + min)
        randomSize = width * (randomSizePercentage/100);

        flowerCircles.push({
          randomX: randomX,
          randomY: randomY,
          randomSize: randomSize,
          hasBeenHit: false
        })
      }
    }
  }

  for (const circle of flowerCircles) {
    if (!circle.hasBeenHit) {
      ellipse(circle.randomX, circle.randomY, circle.randomSize, circle.randomSize);
    }
  }
}


function bricks() {
  imgBrickEmpty.resize(width*0.1, 0);
  imgBrickTop.resize(width*0.1, 0);
  imgBrickFloor.resize(width*0.1, 0);
  imgBrickComunismo.resize(width*0.1, 0);
  imgBrickDitadura.resize(width*0.1, 0);
  imgBrickExilio.resize(width*0.1, 0);
  imgBrickOpressao.resize(width*0.1, 0);
  imgBrickPIDE.resize(width*0.1, 0);

  let BH = imgBrickEmpty.height; //brick's height
  let BW = imgBrickEmpty.width; //brick's width
  let BWI = width-BW/2; //brick left position in the canvas
  let BHI = height-BH/2; //brick bottom position in the canvas

  let rowsOfBrick = Math.ceil(height / BH) - 5;
  let columnsOfBrick = Math.floor(width / BW);

  if (!isScenario2Created) {    
    isScenario2Created = true;

    counter = (rowsOfBrick-3) * columnsOfBrick;

    for (let i = 0; i < 5; i++) {
      randomNbr = Math.floor(Math.random() * counter) + 1;
  
      if (!randomNbrs.includes(randomNbr)) {
        randomNbrs.push(randomNbr); 
      } else {
        i--
      }
    }
    console.log(bricksImgs);
  }

  let counter2 = 0;
  for (let i = 0; i < rowsOfBrick; i++) {
    for (let j = 0; j < columnsOfBrick; j++) {
      counter2++

      if (i == 0 || i == 1) {
        counter2--
        image(imgBrickFloor, BWI-(BW*j), BHI-(BH*i));
      } else if (randomNbrs.includes(counter2)) {
        if (!bricksImgs[randomNbrs.indexOf(counter2)].hasBeenHit) {
          image(bricksImgs[randomNbrs.indexOf(counter2)].img, BWI-(BW*j), BHI-(BH*i)); 

          bricksImgs[randomNbrs.indexOf(counter2)].w = BW;
          bricksImgs[randomNbrs.indexOf(counter2)].h = BH;
          bricksImgs[randomNbrs.indexOf(counter2)].x = BWI-(BW*j)-BW/2;
          bricksImgs[randomNbrs.indexOf(counter2)].y = BHI-(BH*i)-BH/2;
        }
      }  else if (i == rowsOfBrick-1) {
        image(imgBrickTop, BWI-(BW*j), BHI-(BH*i));
      } else {
        image(imgBrickEmpty, BWI-(BW*j), BHI-(BH*i));
      }
    }  
  }
}


function movingRect(joyStick, gameStarted, x) {
  let rectangleW = width*0.1;
  let rectangleH = 30;
  let pinkW = rectangleW * 0.15;

  if (gameLevel == 1) {
    if (goingLeft == true && (imgPencilRotate >= -150)) {
      imgPencilRotate -= 5;
    }

    if (goingRight == true && (imgPencilRotate <= -20)) {
      imgPencilRotate += 5;
    }

    imgPencil.resize(width*0.15, 0);
    
    push()
    translate(width/2, height-(imgPencil.width*0.2));
    imageMode(CENTER);
    rotate(imgPencilRotate);
    image(imgPencil, 0, 0);
    pop()





    // if (!isBallOut) {
    //   x = window.innerWidth * 0.5;
    //     stroke('#036280');
    //     strokeWeight(3);
    //     fill('#000');
    //     smooth();
    //     rect(x, height*0.9, rectangleW, rectangleH);
        
    //     noStroke();
    //     fill('#FF01A4');
    //     rect(x-rectangleW*0.3, height*0.9, pinkW, rectangleH*0.5);

    //     noStroke();
    //     fill('#FF01A4');
    //     rect(x+rectangleW*0.3, height*0.9, pinkW, rectangleH*0.5);

    //     noStroke();
    //     fill('#A48A6C');
    //     rect(x, height*0.9, pinkW*2, rectangleH*0.5);
    // } else {
    //   if (!joyStick) {
    //     stroke('#036280');
    //     strokeWeight(3);
    //     fill('#000');
    //     smooth();
    //     rect(x, height*0.9, rectangleW, rectangleH);
        
    //     noStroke();
    //     fill('#FF01A4');
    //     rect(x-rectangleW*0.3, height*0.9, pinkW, rectangleH*0.5);

    //     noStroke();
    //     fill('#FF01A4');
    //     rect(x+rectangleW*0.3, height*0.9, pinkW, rectangleH*0.5);

    //     noStroke();
    //     fill('#A48A6C');
    //     rect(x, height*0.9, pinkW*2, rectangleH*0.5);

    //     ballMovingRectColision(x, rectangleW, rectangleH);

    //   } else {
    //     if (goingLeft == true && (rectX + rectangleW/2) <= width) {
    //       rectX += 10;
    //     }

    //     if (goingRight == true && (rectX - rectangleW/2) >= 0) {
    //       rectX -= 10;
    //     }

    //     stroke('#036280');
    //     strokeWeight(3);
    //     fill('#000');
    //     smooth();
    //     rect(rectX, height*0.9, rectangleW, rectangleH);
        
    //     noStroke();
    //     fill('#FF01A4');
    //     rect(rectX-rectangleW*0.3, height*0.9, pinkW, rectangleH*0.5);

    //     noStroke();
    //     fill('#FF01A4');
    //     rect(rectX+rectangleW*0.3, height*0.9, pinkW, rectangleH*0.5);

    //     noStroke();
    //     fill('#A48A6C');
    //     rect(rectX, height*0.9, pinkW*2, rectangleH*0.5);

    //     ballMovingRectColision(rectX, rectangleW, rectangleH);
    //   }
    // }

  } else if (gameLevel == 2) {
    if (isBallOut && goingLeft == true && (slingshotX - imgSlingshot.width/2) >= 0) {
      slingshotX -= 15;
    }

    if (isBallOut && goingRight == true && (slingshotX + imgSlingshot.width/2) <= width) {
      slingshotX += 15;
    }

    imgSlingshot.resize(0, height*0.15);
    image(imgSlingshot, slingshotX, height-imgSlingshot.height*0.6);
    ballMovingRectColision(slingshotX, imgSlingshot.width, imgSlingshot.height);

  } else if (gameLevel == 3) {
    if (goingLeft == true && (imgG3Rotate >= -150)) {
      imgG3Rotate -= 5;
    }

    if (goingRight == true && (imgG3Rotate <= -20)) {
      imgG3Rotate += 5;
    }

    imgG3.resize(width*0.25, 0);
    
    push()
    translate(width/2, height-(imgG3.width*0.2));
    imageMode(CENTER);
    rotate(imgG3Rotate);
    image(imgG3, 0, 0);
    pop()
  }
}

function ballMovingRectColision(rectangleX, rectangleW, rectangleH) {
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    // console.log("bola X: " + ball.bPos.x + "; retangulo X: " + rectangleX);
    if (ball.bPos.x > rectangleX - rectangleW / 2 && ball.bPos.x < rectangleX + rectangleW / 2 && ball.bPos.y + ball.bR > (height*0.9) - rectangleH / 2 && ball.bPos.y < height*0.9) {
      let newAngleX = map(ball.bPos.x, rectangleX - rectangleW / 2, rectangleX + rectangleW / 2, -1, 1);
      ball.bAngle.set(newAngleX * ball.bSpeed, -ball.bSpeed);
    }
  }
}


function ballCollidesElement(elements) {
  /** Detects collision between ball and rectangles */
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    // for (let i = 0; i < rectangles.length; i++) {
    //   let rectangle = rectangles[i];

    //   if (ball.collides(rectangle)) {
    //     ball.afterRectangle();
    //     // console.log('ball-x: '+ball.bPos.x+', rect-x: '+rectangle.rectX);
    //     // rectangles.splice(i, 1);
    //   }
    // }

    for (const element of elements) {
      if (ball.collides(element)) {
        ball.afterRectangle();
      }
    }
  }
}

function projectileCollidesElement(elements) {
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];

    for (const element of elements) {
      if (flower.collides(element)) {
        // ball.afterRectangle();
        flower.update()
      }
    }
  }
}

class Flower {
  constructor(pos, angle, hitbox) {
    this.pos = pos;
    this.vel = p5.Vector.fromAngle(radians(angle)).mult(10);
    this.moving = true;
    this.toRemove = false;
    this.radius = hitbox; //hitboxes flower
  }
  
  update() {
    if (this.moving || gameLevel == 1) {
      this.pos.add(this.vel); // moves flower projectile
    }
  }
  
  display() {
    if (this.toRemove) {
      fill(255, 0, 0, 0);
    } else {
      fill('#0099D6')
    }

    if (gameLevel == 1) {
      ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

    } else if (gameLevel == 3) {
      imgFlower.resize(0, height*0.1);

      push();
      translate(this.pos.x, this.pos.y);
      imageMode(CENTER);
      image(imgFlower, 0, 0);
      pop();
    }
  }
  
  offscreen() {
    // if flower left the screen
    return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
  }

  collides(element) {
    if (gameLevel == 1 && !this.toRemove) {
      let d = dist(this.pos.x, this.pos.y, element.x, element.y);

      if (this.pos.x + this.radius > element.x && this.pos.x - this.radius < element.x + element.w &&
          this.pos.y + this.radius > element.y && this.pos.y - this.radius < element.y + element.h && !element.hasBeenHit) {

        element.hasBeenHit = true;
        this.toRemove = true;
        return true;
      } else {
        return false;
      }
      
    } else {
      let d = dist(this.pos.x, this.pos.y, element.randomX, element.randomY);
      if (d <= this.radius + element.randomSize / 2 && !element.hasBeenHit) {
        element.hasBeenHit = true;
        this.moving = false;
        return true;
      } else {
        return false;
      }
    }
  }
}


class Ball {
  constructor(x, y, w) {
    this.bPos = createVector(x, y);
    this.bSpeed = 15;
    this.bAngle = createVector(this.bSpeed, -this.bSpeed);
    this.bR = w;
  }

  render() {
    if (gameLevel == 2) {
      imgRock.resize(this.bR, 0);
      image(imgRock, this.bPos.x, this.bPos.y);
    }
  }

  draw() {
    if (gameLevel == 2) {
      imgRock.resize(this.bR, 0);
      this.bPos.add(this.bAngle);
      image(imgRock, this.bPos.x, this.bPos.y);
    }
  }

  collides(element) {
    if (gameLevel == 2) {
        if (this.bPos.x + this.bR >= element.x
            //NOT to the left
            &&
            this.bPos.x <= element.x + element.w
            //NOT to the right
            &&
            this.bPos.y + this.bR >= element.y
            //NOT above
            &&
            this.bPos.y <= element.y + element.h
            //NOT below
            &&
            element.hasBeenHit == false) {
        /* they collide! */
        element.hasBeenHit = true;
        return true;
      }
    }
  }

  afterRectangle() {
    this.bAngle.x *= -1;
    this.bAngle.y *= -1;
    this.draw();

    // if (ball.collides(rectangle)) {
    //   this.vel.x *= -1;
    //   this.vel.y *= -1;
    // }
  }

  afterBorder() {
    if (this.bPos.x + this.bR > window.innerWidth) {
      this.bAngle.x *= -1;
    } else if (this.bPos.x + this.bR < window.innerWidth*0.01) {
      this.bAngle.x *= -1;
    } else if (this.bPos.y + this.bR < height*0.05) {
      this.bAngle.y *= -1;
    }
    
    if (this.bPos.y + this.bR > height*0.95) {
      // this.bAngle.y *= -1;
      noLoop();
      document.querySelector('#gameOver').style.display = 'flex';
    }
  }
}


class Rectangle {
  constructor(rectX, lineRect, rectW, rectH, rectColor, marginTop) {
      // Here are assigned the initial values of properties
      // this.rectX0 = width*0.5
      this.rectX = rectX;
      this.lineRect = lineRect;
      this.rectW = rectW;
      this.rectH = rectH;
      this.rectColor = rectColor;
      this.marginTop = marginTop;
      this.rectY = height*0.1+(this.rectH+6+marginTop)*this.lineRect;
  }


  draw() { /* method that draws the rectangles in shape of the sun */
    // [1, 3, 5, 5, 7, 7, 7, 7, 5, 4, 1];

    fill('#000');
    strokeWeight(3);
    stroke(this.rectColor);
  
    rect(this.rectX, this.rectY, this.rectW, this.rectH);
  }


  drive() { // method to move a car
    this.posX += this.speed;

    if (this.posX < -20) {
        this.posX = width;
    }
    if (this.posX > width) {
        this.posX = -20;
    }
  }
}

document.querySelector('#btnNext').addEventListener('click', e => {
  cutscenesCount++
  cutscenesPerLvl++

  document.querySelector('#csImg').src = `../images/cutscenes/cs${gameLevel}-${cutscenesPerLvl}.png`;
  if (cutscenesPerLvl == 4 ||
      (cutscenesCount == cutscenes.length - 1)) {
    cutscenesPerLvl = 1
    document.querySelector('#cutscenesScreen').style.display = 'none';
  }

  document.querySelector('#csTxt').innerHTML = cutscenes[cutscenesCount];
  console.log(cutscenesCount);
})

document.querySelector('#btnJump').addEventListener('click', e => {
  cutscenesPerLvl = 1

  if (gameLevel == 1) {
    cutscenesCount = 2;
  } else if (gameLevel == 2) {
    cutscenesCount = 5;
  } else if (gameLevel == 3) {
    cutscenesCount = 6;
  }

  document.querySelector('#cutscenesScreen').style.display = 'none';
})

document.querySelector('#btnTryAgain').addEventListener('click', e => {
  bricksImgs = [{
      img: imgBrickComunismo,
      w: 0,
      h: 0,
      x: 0,
      y: 0,
      hasBeenHit: false
    },
    {
      img: imgBrickDitadura,
      w: 0,
      h: 0,
      x: 0,
      y: 0,
      hasBeenHit: false
    },
    {
      img: imgBrickExilio,
      w: 0,
      h: 0,
      x: 0,
      y: 0,
      hasBeenHit: false
    },
    {
      img: imgBrickOpressao,
      w: 0,
      h: 0,
      x: 0,
      y: 0,
      hasBeenHit: false
    },
    {
      img: imgBrickPIDE,
      w: 0,
      h: 0,
      x: 0,
      y: 0,
      hasBeenHit: false
    },
  ];
  randomNbrs = [];

  restartLvl2 = true;
  gameStarted = false
  isBallOut = false
  isScenario2Created = false
  slingshotX = width/2;

  for (let ball of balls) {
    ball.bPos.x = window.innerWidth*0.5; // Resets ball position to center
    ball.bPos.y = height*0.85;           // Resets ball vertical position
    ball.bAngle = createVector(0, 0);    // Resets ball angle to no movement
  }
  document.querySelector('#gameOver').style.display = 'none';
  loop();
})

document.querySelector('#btnEnd').addEventListener('click', e => {
  window.location.reload();
})