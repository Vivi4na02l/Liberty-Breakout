int btnLeft = 13;
int ledLeft = 8; //green

int btnRight = 2;
int ledRight = 4; //red

int btnSpace = 12;
int ledMiddle = 7; //yellow

int btnLeftValue = 0;
int btnRightValue = 0;
int btnSpaceValue = 0;

int savedLeftValue = 0;
int savedRightValue = 0;
int savedSpaceValue = 0;

void setup() {
  Serial.begin(9600);
  
  pinMode(btnLeft, INPUT_PULLUP);
  pinMode(ledLeft,OUTPUT);

  pinMode(btnRight, INPUT_PULLUP);
  pinMode(ledRight,OUTPUT);

  pinMode(btnSpace, INPUT_PULLUP);

  Serial.print("0");
  Serial.print("0");
  Serial.print("0");
  Serial.println();
}

void loop() {
  btnLeftValue = digitalRead(btnLeft);
  btnRightValue = digitalRead(btnRight);
  btnSpaceValue = digitalRead(btnSpace);

  // BOTÃO ESQUERDO
  // check if the left button is pressed. If it is then btnLeftValue is HIGH:
  if (btnLeftValue == HIGH) {
    digitalWrite(ledLeft, HIGH);

    if (savedLeftValue == 0) {
      savedLeftValue = 1;
      Serial.print(btnLeftValue);
      Serial.print(btnSpaceValue);
      Serial.print("0");
      Serial.println();
    }
    
  } else {
    digitalWrite(ledLeft, LOW);

    if (savedLeftValue == 1) {
      savedLeftValue = 0;
      Serial.print(btnLeftValue);
      Serial.print(btnSpaceValue);
      Serial.print(btnRightValue);
      Serial.println();
    }
  }

  //digitalWrite(ledLeft, LOW);

  // BOTÃO DIREITO
  // check if the right button is pressed. If it is then btnRightValue is HIGH:
  if (btnRightValue == HIGH) {
    digitalWrite(ledRight, HIGH);

    if (savedRightValue == 0) {
      savedRightValue = 1;
      Serial.print("0");
      Serial.print(btnSpaceValue);
      Serial.print(btnRightValue);
      Serial.println();
    }
  } else {
    digitalWrite(ledRight, LOW);

    if (savedRightValue == 1) {
      savedRightValue = 0;
      Serial.print(btnLeftValue);
      Serial.print(btnSpaceValue);
      Serial.print(btnRightValue);
      Serial.println();
    }
  }

  // BOTÃO EXTRA/ESPAÇO
  // check if the space button is pressed. If it is then btnRightSpace is HIGH:
  if ((btnSpaceValue == HIGH) && (savedSpaceValue == 0)) { //differently from the other buttons, I don't want this one to be able to just be pressed continuously
    if (savedSpaceValue == 0) {
      savedSpaceValue = 1;
      Serial.print(btnLeftValue);
      Serial.print(btnSpaceValue);
      Serial.print(btnRightValue);
      Serial.println();
    }
  } else if (btnSpaceValue == LOW) {
    if (savedSpaceValue == 1) {
      savedSpaceValue = 0;
      Serial.print(btnLeftValue);
      Serial.print("0");
      Serial.print(btnRightValue);
      Serial.println();
    }
  }

  //Serial.print(btnRightValue);
  //Serial.print(" ");
  //Serial.print(btnLeftValue);
  //Serial.println();

  // NENHUM BOTÃO
  if (btnLeftValue == LOW && btnRightValue == LOW) {
    digitalWrite(ledMiddle, HIGH);
  } else {
    digitalWrite(ledMiddle, LOW);  
  }
 }
