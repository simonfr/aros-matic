#include <ArduinoJson.h>

//AJOUT DE LIBRAIRIE
//dht sensor library
//ArduinoJSON


#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11
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

}
void loop()
{
  StaticJsonDocument<200> doc;

  //luminosity
  int luminosity;
  luminosity = analogRead(0); //connect grayscale sensor to Analog 0
  if (isnan(luminosity)) {
    doc["luminosity"] = "null";
  } else {
    doc["luminosity"] = luminosity;

  }
  //humidity
  soilMoistureValue = analogRead(1);  //put Sensor insert into soil
  soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  if (isnan(soilMoistureValue)) {
    doc["humidity"] = "null";
  }else{
    doc["humidity"] = soilmoisturepercent;
  }
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  if (isnan(t)) {
    doc["temperature"] = "null";
  } else {
    doc["temperature"] = t;
  }

  //JSON
  serializeJson(doc, Serial);
  Serial.println();
  delay(wait);
}
