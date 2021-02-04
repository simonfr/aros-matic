#include <ArduinoJson.h>

//AJOUT DE LIBRAIRIE
//dht sensor library
//ArduinoJSON
int incomingByte = 0; // variable pour lecture de l'octet entrant
const int RELAY_PIN = 25;  // the Arduino pin, which connects to the IN pin of relay

#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

const int AirValue = 620;   //you need to replace this value with Value_1
const int WaterValue = 310;  //you need to replace this value with Value_2
int soilMoistureValue = 0;
int soilmoisturepercent = 0;
const int wait = 2000;
void setup()
{
  Serial.begin(9600);
  dht.begin();
  pinMode(RELAY_PIN, OUTPUT);
}
void loop()
{
  StaticJsonDocument<200> doc;

  //luminosity
  int luminosity;
  luminosity = analogRead(32); //connect grayscale sensor to Analog 0
  if (isnan(luminosity)) {
    doc["luminosity"] = "null";
  } else {
    doc["luminosity"] = luminosity;

  }
  //humidity
  soilMoistureValue = analogRead(33);  //put Sensor insert into soil
  soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  if (isnan(soilMoistureValue)) {
    doc["humidity"] = "null";
  } else {
    doc["humidity"] = soilmoisturepercent;
  }
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  if (isnan(t)) {
    doc["temperature"] = "null";
  } else {
    doc["temperature"] = t;
  }
  
  if (Serial.available() > 0) { // si données disponibles sur le port série
    // lit l'octet entrant
    incomingByte = Serial.read();

    if (incomingByte == 48 && digitalRead(RELAY_PIN)==LOW){
      digitalWrite(RELAY_PIN, HIGH);
    }
    else if (incomingByte == 49 && digitalRead(RELAY_PIN)==HIGH){
      digitalWrite(RELAY_PIN, LOW);
    }
  }


  //JSON
  serializeJson(doc, Serial);
  Serial.println();
  delay(wait);
}
