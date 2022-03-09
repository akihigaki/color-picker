
const int buttonPin = 22;
const int potPin = 12;
const int vryPin = 26;
const int vrxPin = 27;

int buttonValue = 0;
int potValue = 0;
int vryValue = 0;
int vrxValue = 0;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(potPin, INPUT);
  pinMode(vryPin, INPUT);
  pinMode(vrxPin, INPUT);

  Serial.begin(115200);
}

void loop() {
  buttonValue = digitalRead(buttonPin);
  potValue = analogRead(potPin);
  vryValue = analogRead(vryPin);
  vrxValue = analogRead(vrxPin);

  Serial.print("button:");
  Serial.print(buttonValue);
  Serial.print(",");

  Serial.print("pot:");
  Serial.print(potValue);
  Serial.print(",");

  Serial.print("joyy:");
  Serial.print(vryValue);
  Serial.print(",");

  Serial.print("joyx:");
  Serial.print(vrxValue);
  Serial.print(",\n");
}
