#include <FastLED.h>

#define DATA_PIN 4

#define BRIGHTNESS      255
#define COLOR_ORDER     GRB
#define LED_TYPE        WS2813

#define NUM_LEDS 14

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
  delay(500);

  FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS)
    .setCorrection(TypicalLEDStrip)
    .setDither(BRIGHTNESS < 255);

  FastLED.setBrightness(BRIGHTNESS);
}

void loop() {
  FastLED.clear();

  int sinBeat = beatsin8(100, 0, NUM_LEDS);   // 30 beats per minute, range 0-255

  int beatTop = beatsin8(150, 3, NUM_LEDS);
  int beatBottom = 3 - beatsin8(150, 0, 3);

  for (int i = 3; i < NUM_LEDS; i++) {
    if (i < beatTop) {
      int hue = map(i, 0, NUM_LEDS, 0, 255);
      leds[i] = CHSV(hue, 255, BRIGHTNESS);
    }
  }

  for (int i = 2; i >= 0; i--) {
    if (i > beatBottom) {
      int hue = map(i, 0, NUM_LEDS, 0, 255);
      leds[i] = CHSV(hue, 255, BRIGHTNESS);
    }
  }

  FastLED.show();
}
