import React from 'react';
import { FileCode, Wifi, Settings, Terminal, AlertTriangle, CheckCircle } from 'lucide-react';
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

          {/* ESP32 Code Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Terminal className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">2. Arduino kod za ESP32</h2>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto">
                  <code>{`#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

// Access Point credentials
const char* ap_ssid = "ESP32-SoftAP";
const char* ap_password = "password123";

// MOSFET Pin
const int MOSFET_PIN = 13;  // GPIO13
const int PWM_CHANNEL = 0;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

WebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Configure MOSFET PWM
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(MOSFET_PIN, PWM_CHANNEL);
  
  // Start Access Point
  WiFi.softAP(ap_ssid, ap_password);
  Serial.println("Access Point Started");
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());
  
  // API endpoints
  server.enableCORS();
  server.on("/", HTTP_GET, handleRoot);
  server.on("/api/motor", HTTP_POST, handleMotorControl);
  server.on("/api/status", HTTP_GET, handleStatus);
  
  server.begin();
}

void loop() {
  server.handleClient();
}

void handleRoot() {
  server.send(200, "text/plain", "ESP32 Motor Controller");
}

void handleMotorControl() {
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (!error) {
      int speed = doc["speed"];
      bool isOn = doc["isOn"];
      
      if (isOn) {
        ledcWrite(PWM_CHANNEL, speed);
      } else {
        ledcWrite(PWM_CHANNEL, 0);
      }
      
      server.send(200, "application/json", "{\"status\":\"success\"}");
    } else {
      server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
    }
  } else {
    server.send(400, "application/json", "{\"error\":\"No data received\"}");
  }
}

void handleStatus() {
  StaticJsonDocument<200> doc;
  doc["connected"] = true;
  doc["ip"] = WiFi.softAPIP().toString();
  
  String response;
  serializeJson(doc, response);
  server.send(200, "application/json", response);
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
              <h2 className="text-xl font-semibold">3. Povezivanje sa aplikacijom</h2>
            </div>

            <div className="space-y-4">
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium">1</span>
                  <div>
                    <p className="font-medium">Povežite se na ESP32 mrežu</p>
                    <p className="text-gray-600 mt-1">Na vašem uređaju pronađite WiFi mrežu "ESP32-SoftAP" i povežite se koristeći lozinku "po2li8o5peri"</p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium">2</span>
                  <div>
                    <p className="font-medium">Otvorite aplikaciju</p>
                    <p className="text-gray-600 mt-1">Pristupite aplikaciji kroz web pretraživač</p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium">3</span>
                  <div>
                    <p className="font-medium">Prijavite se na sistem</p>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">Pristupni podaci:</p>
                      <div className="space-y-1 text-gray-600">
                        <p>Korisničko ime: <code className="px-2 py-1 bg-gray-100 rounded">zaplanje</code></p>
                        <p>Lozinka: <code className="px-2 py-1 bg-gray-100 rounded">po2li8o5peri</code></p>
                      </div>
                    </div>
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
              <h2 className="text-xl font-semibold">4. Rešavanje problema</h2>
            </div>

            <div className="space-y-4">
              <div className="divide-y divide-gray-200">
                <div className="py-3">
                  <p className="font-medium text-gray-900">Ne mogu da pronađem ESP32 mrežu</p>
                  <p className="mt-1 text-gray-600">Proverite da li je ESP32 uključen i da li je kod uspešno učitan. Pokušajte resetovati uređaj.</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-gray-900">Aplikacija ne može da se poveže sa ESP32</p>
                  <p className="mt-1 text-gray-600">Uverite se da ste povezani na ispravnu WiFi mrežu i da je IP adresa tačna (default: 192.168.4.1).</p>
                </div>
                <div className="py-3">
                  <p className="font-medium text-gray-900">Komande ne rade</p>
                  <p className="mt-1 text-gray-600">Proverite serijsku konzolu za moguće greške. Uverite se da su pinovi pravilno povezani.</p>
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
