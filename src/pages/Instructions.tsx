import React from 'react';
import { FileCode, Wifi, Settings, Terminal, AlertTriangle, CheckCircle, Cpu } from 'lucide-react';
import BackToTop from '../components/BackToTop';

const Instructions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Uputstva za podešavanje</h1>
          <p className="text-gray-600">Detaljan vodič za postavljanje ESP32 i povezivanje sa aplikacijom</p>
        </div>

        <div className="space-y-8">
          {/* ESP32 Setup Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileCode className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">1. Podešavanje ESP32</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Potrebni alati:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Arduino IDE</li>
                  <li>ESP32 razvojna ploča</li>
                  <li>USB kabl za programiranje</li>
                  <li>MOSFET modul (IRF520 ili sličan)</li>
                  <li>DC motor (12V)</li>
                  <li>Elektromagnetni ventil (12V)</li>
                  <li>Napajanje 12V</li>
                  <li>Žice za povezivanje</li>
                  <li>Relej modul (5V)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Koraci za instalaciju:</h3>
                <ol className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">1</span>
                    <div>
                      <p className="font-medium">Instalirajte Arduino IDE</p>
                      <p className="text-gray-600 mt-1">Preuzmite i instalirajte najnoviju verziju Arduino IDE sa službene stranice.</p>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">2</span>
                    <div>
                      <p className="font-medium">Dodajte ESP32 podršku</p>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium mb-2">U Arduino IDE:</p>
                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                          <li>Otvorite File → Preferences</li>
                          <li>U "Additional Boards Manager URLs" dodajte:</li>
                          <code className="block mt-2 p-2 bg-gray-100 rounded text-sm">
                            https://dl.espressif.com/dl/package_esp32_index.json
                          </code>
                        </ol>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">3</span>
                    <div>
                      <p className="font-medium">Instalirajte ESP32 board</p>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                          <li>Otvorite Tools → Board → Boards Manager</li>
                          <li>Pretražite "ESP32"</li>
                          <li>Instalirajte "ESP32 by Espressif Systems"</li>
                        </ol>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Hardware Connection Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Cpu className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold">2. Povezivanje hardvera</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-3">Povezivanje ESP32 sa MOSFET modulom:</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ESP32 Pin</th>
                      <th className="text-left py-2">MOSFET Pin</th>
                      <th className="text-left py-2">Opis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">GPIO13</td>
                      <td className="py-2">SIG (Signal)</td>
                      <td className="py-2">PWM kontrolni signal</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">GND</td>
                      <td className="py-2">GND</td>
                      <td className="py-2">Zajedničko uzemljenje</td>
                    </tr>
                    <tr>
                      <td className="py-2">3.3V</td>
                      <td className="py-2">VCC</td>
                      <td className="py-2">Napajanje za MOSFET logiku</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-3">Povezivanje elektroventila:</h3>
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ESP32 Pin</th>
                      <th className="text-left py-2">Relej Pin</th>
                      <th className="text-left py-2">Opis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">GPIO14</td>
                      <td className="py-2">IN (Signal)</td>
                      <td className="py-2">Kontrolni signal za relej</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">GND</td>
                      <td className="py-2">GND</td>
                      <td className="py-2">Zajedničko uzemljenje</td>
                    </tr>
                    <tr>
                      <td className="py-2">5V</td>
                      <td className="py-2">VCC</td>
                      <td className="py-2">Napajanje za relej</td>
                    </tr>
                  </tbody>
                </table>

                <h4 className="font-medium mb-2">Povezivanje elektroventila sa relejom:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Povežite pozitivan (+) terminal elektroventila na NO (Normally Open) pin releja</li>
                  <li>• Povežite COM pin releja na pozitivan (+) terminal 12V napajanja</li>
                  <li>• Povežite negativan (-) terminal elektroventila na negativan (-) terminal napajanja</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-3">Povezivanje motora:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Povežite pozitivan (+) terminal motora na V+ MOSFET modula</li>
                  <li>• Povežite negativan (-) terminal motora na V- MOSFET modula</li>
                  <li>• Povežite 12V napajanje na V+ i V- terminale MOSFET modula</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Važne napomene:</p>
                  <ul className="mt-2 space-y-1 text-yellow-800">
                    <li>• Proverite polaritet napajanja pre povezivanja</li>
                    <li>• Uverite se da je napajanje isključeno tokom povezivanja</li>
                    <li>• Koristite odgovarajuće debljine žica za motor i elektroventil</li>
                    <li>• Elektroventil mora biti odgovarajućeg napona (12V)</li>
                    <li>• Relej mora biti dimenzionisan za struju elektroventila</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ESP32 Code Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Terminal className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">3. Arduino kod za ESP32</h2>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto">
                  <code>{`#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <EEPROM.h>

// Access Point credentials
const char* ap_ssid = "ESP32-SoftAP";
const char* ap_password = "password123";

// Pin definitions
const int MOSFET_PIN = 13;  // GPIO13 for motor control
const int VALVE_PIN = 14;   // GPIO14 for valve control
const int PWM_CHANNEL = 0;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

// Control variables
int currentSpeed = 0;
bool isMotorRunning = false;
bool isValveOpen = false;
unsigned long valveTimer = 0;
unsigned long valveDuration = 0;  // Duration in milliseconds

WebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Initialize EEPROM
  EEPROM.begin(512);
  
  // Configure pins
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(MOSFET_PIN, PWM_CHANNEL);
  pinMode(VALVE_PIN, OUTPUT);
  digitalWrite(VALVE_PIN, LOW);  // Ensure valve is closed on startup
  
  // Start Access Point
  WiFi.softAP(ap_ssid, ap_password);
  Serial.println("Access Point Started");
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());
  
  // API endpoints
  server.enableCORS();
  
  server.on("/", HTTP_GET, handleRoot);
  server.on("/api/motor", HTTP_POST, handleMotorControl);
  server.on("/api/valve", HTTP_POST, handleValveControl);
  server.on("/api/status", HTTP_GET, handleStatus);
  server.on("/api/settings", HTTP_POST, handleSettings);
  
  server.begin();
  
  // Restore last states
  restoreStates();
}

void loop() {
  server.handleClient();
  
  // Check valve timer
  if (isValveOpen && valveTimer > 0 && millis() - valveTimer >= valveDuration) {
    closeValve();
  }
}

void handleRoot() {
  server.send(200, "text/plain", "ESP32 Controller");
}

void handleMotorControl() {
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (!error) {
      int speed = doc["speed"];
      bool isOn = doc["isOn"];
      
      // Update motor state
      currentSpeed = speed;
      isMotorRunning = isOn;
      
      // Control motor
      if (isOn) {
        ledcWrite(PWM_CHANNEL, speed);
      } else {
        ledcWrite(PWM_CHANNEL, 0);
      }
      
      // Save state to EEPROM
      saveStates();
      
      server.send(200, "application/json", "{\"status\":\"success\"}");
    } else {
      server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
    }
  }
}

void handleValveControl() {
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (!error) {
      bool open = doc["open"];
      int duration = doc["duration"] | 0;  // Duration in seconds, 0 for manual control
      
      if (open) {
        openValve(duration);
      } else {
        closeValve();
      }
      
      server.send(200, "application/json", "{\"status\":\"success\"}");
    } else {
      server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
    }
  }
}

void openValve(int duration) {
  digitalWrite(VALVE_PIN, HIGH);
  isValveOpen = true;
  
  if (duration > 0) {
    valveTimer = millis();
    valveDuration = duration * 1000UL;  // Convert to milliseconds
  } else {
    valveTimer = 0;
    valveDuration = 0;
  }
  
  saveStates();
}

void closeValve() {
  digitalWrite(VALVE_PIN, LOW);
  isValveOpen = false;
  valveTimer = 0;
  valveDuration = 0;
  saveStates();
}

void handleStatus() {
  StaticJsonDocument<200> doc;
  doc["connected"] = true;
  doc["ip"] = WiFi.softAPIP().toString();
  doc["motorRunning"] = isMotorRunning;
  doc["currentSpeed"] = currentSpeed;
  doc["valveOpen"] = isValveOpen;
  
  if (isValveOpen && valveTimer > 0) {
    unsigned long remaining = (valveDuration - (millis() - valveTimer)) / 1000;
    doc["valveRemainingTime"] = remaining;
  } else {
    doc["valveRemainingTime"] = 0;
  }
  
  String response;
  serializeJson(doc, response);
  server.send(200, "application/json", response);
}

void saveStates() {
  EEPROM.write(0, isMotorRunning);
  EEPROM.write(1, currentSpeed);
  EEPROM.write(2, isValveOpen);
  EEPROM.commit();
}

void restoreStates() {
  isMotorRunning = EEPROM.read(0);
  currentSpeed = EEPROM.read(1);
  isValveOpen = EEPROM.read(2);
  
  if (isMotorRunning) {
    ledcWrite(PWM_CHANNEL, currentSpeed);
  }
  
  if (isValveOpen) {
    digitalWrite(VALVE_PIN, HIGH);
  }
}`}</code>
                </pre>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Važne napomene:</p>
                  <ul className="mt-2 space-y-1 text-yellow-800">
                    <li>• Proverite da li je odabran ispravan port u Arduino IDE</li>
                    <li>• Podesite brzinu serijskog porta na 115200</li>
                    <li>• Promenite SSID i lozinku po potrebi</li>
                    <li>• Proverite da li su instalirane sve potrebne biblioteke</li>
                    <li>• Testirajte rad ventila sa malim protokom vode</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Instructions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Wifi className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">4. Povezivanje sa aplikacijom</h2>
            </div>

            <div className="space-y-4">
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium">1</span>
                  <div>
                    <p className="font-medium">Povežite se na ESP32 mrežu</p>
                    <p className="text-gray-600 mt-1">Na vašem uređaju pronađite WiFi mrežu "ESP32-SoftAP" i povežite se koristeći lozinku "password123"</p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium">2</span>
                  <div>
                    <p className="font-medium">Otvorite aplikaciju</p>
                    <p className="text-gray-600 mt-1">Pristupite aplikaciji kroz web pretraživač na adresi http://192.168.4.1</p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium">3</span>
                  <div>
                    <p className="font-medium">Testirajte kontrole</p>
                    <p className="text-gray-600 mt-1">Proverite rad motora i elektroventila kroz aplikaciju</p>
                  </div>
                </li>
              </ol>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Uspešno povezivanje</p>
                  <p className="mt-1 text-green-700">Nakon uspešnog povezivanja, možete pristupiti svim funkcijama aplikacije i upravljati vašim ESP32 uređajem.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <Settings className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold">5. Rešavanje problema</h2>
            </div>

            <div className="space-y-4">
              <div className="divide-y divide-gray-200">
                <div className="py-3">
                  <p className="font-medium text-gray-900">Motor se ne pokreće</p>
                  <p className="mt-1 text-gray-600">Proverite povezivanje MOSFET modula i napajanje. Uverite se da je GPIO13 pravilno povezan.</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-gray-900">Elektroventil se ne otvara</p>
                  <p className="mt-1 text-gray-600">Proverite povezivanje releja i napajanje ventila. Uverite se da je GPIO14 pravilno povezan.</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-gray-900">Ne mogu da pronađem ESP32 mrežu</p>
                  <p className="mt-1 text-gray-600">Proverite da li je ESP32 uključen i da li je kod uspešno učitan. Pokušajte resetovati uređaj.</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-gray-900">Aplikacija ne može da se poveže sa ESP32</p>
                  <p className="mt-1 text-gray-600">Uverite se da ste povezani na ispravnu WiFi mrežu i da je IP adresa tačna (default: 192.168.4.1).</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-gray-900">PWM kontrola ne radi ispravno</p>
                  <p className="mt-1 text-gray-600">Proverite frekvenciju PWM signala i rezoluciju. Možda je potrebno prilagoditi parametre za vaš motor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Instructions;