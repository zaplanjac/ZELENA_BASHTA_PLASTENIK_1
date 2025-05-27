import React, { useState } from 'react';
import { Power, Settings, RefreshCw, Clock } from 'lucide-react';

const Hardware = () => {
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [motorSpeed, setMotorSpeed] = useState(128); // 0-255
  const [duration, setDuration] = useState(10); // seconds
  const [temperature, setTemperature] = useState(25); // °C

  const handleAutoModeToggle = () => {
    setIsAutoMode(!isAutoMode);
    if (isMotorRunning) {
      setIsMotorRunning(false);
    }
  };

  const startMotor = () => {
    setIsMotorRunning(true);
    // If in auto mode, motor will stop after duration
    if (isAutoMode) {
      setTimeout(() => {
        setIsMotorRunning(false);
      }, duration * 1000);
    }
  };

  const stopMotor = () => {
    setIsMotorRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hardver</h1>
          <p className="text-gray-600">ESP32 Web Server sa MOSFET kontrolom</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Motor Control */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">MOSFET Kontrola Motora</h2>
            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Režim rada</h3>
                  <p className="text-sm text-gray-600">Izaberite način upravljanja motorom</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAutoModeToggle()}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      !isAutoMode 
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Ručno
                  </button>
                  <button
                    onClick={() => handleAutoModeToggle()}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isAutoMode 
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Automatski
                  </button>
                </div>
              </div>

              {/* Auto Mode Settings */}
              {isAutoMode && (
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Automatska kontrola
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vreme rada (sekunde)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">1s</span>
                      <span className="text-xs text-gray-500">{duration}s</span>
                      <span className="text-xs text-gray-500">60s</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brzina motora (PWM)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={motorSpeed}
                      onChange={(e) => setMotorSpeed(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">0</span>
                      <span className="text-xs text-gray-500">{motorSpeed}</span>
                      <span className="text-xs text-gray-500">255</span>
                    </div>
                  </div>

                  <button
                    onClick={startMotor}
                    disabled={isMotorRunning}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isMotorRunning
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <Power className="h-4 w-4" />
                    <span>Pokreni ({duration}s)</span>
                  </button>
                </div>
              )}

              {/* Manual Controls */}
              {!isAutoMode && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brzina motora (PWM)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={motorSpeed}
                      onChange={(e) => setMotorSpeed(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">0</span>
                      <span className="text-xs text-gray-500">{motorSpeed}</span>
                      <span className="text-xs text-gray-500">255</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={startMotor}
                      disabled={isMotorRunning}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isMotorRunning
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Power className="h-4 w-4" />
                      <span>Pokreni</span>
                    </button>
                    <button
                      onClick={stopMotor}
                      disabled={!isMotorRunning}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        !isMotorRunning
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <Power className="h-4 w-4" />
                      <span>Zaustavi</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Status Indicator */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="text-gray-700">Status motora:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  isMotorRunning
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isMotorRunning ? 'Aktivan' : 'Neaktivan'}
                </span>
              </div>
            </div>
          </div>

          {/* ESP32 Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">ESP32 Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="text-gray-700">Povezanost:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Povezan
                </span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="text-gray-700">IP Adresa:</span>
                <span className="font-mono">192.168.1.100</span>
              </div>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <RefreshCw className="h-4 w-4" />
                <span>Osveži status</span>
              </button>
            </div>
          </div>
        </div>

        {/* Arduino Code */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Arduino Kod za ESP32</h2>
          <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
{`#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);

// MOSFET Pin definitions
const int MOSFET_PIN = 13;  // GPIO13
const int PWM_CHANNEL = 0;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

void setup() {
  Serial.begin(115200);
  
  // Configure MOSFET PWM
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(MOSFET_PIN, PWM_CHANNEL);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());
  
  // API endpoints
  server.on("/", HTTP_GET, handleRoot);
  server.on("/api/motor", HTTP_POST, handleMotorControl);
  server.on("/api/status", HTTP_GET, handleStatus);
  
  server.enableCORS();
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
      int duration = doc["duration"];  // Duration in seconds
      float temperature = doc["temperature"];  // Optimal temperature
      
      if (isOn) {
        ledcWrite(PWM_CHANNEL, speed);
        if (duration > 0) {
          delay(duration * 1000);  // Convert to milliseconds
          ledcWrite(PWM_CHANNEL, 0);  // Turn off after duration
        }
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
  doc["ip"] = WiFi.localIP().toString();
  
  String response;
  serializeJson(doc, response);
  server.send(200, "application/json", response);
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Hardware;