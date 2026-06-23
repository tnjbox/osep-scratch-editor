(function () {
  "use strict";

  const LED_COUNT = 12;
  const MAX_TEACHING_VALUE = 30;

  function clampNumber(value, min, max) {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return min;
    }

    return Math.min(max, Math.max(min, Math.round(numberValue)));
  }

  function teachingValueToCssValue(value) {
    const safeValue = clampNumber(value, 0, MAX_TEACHING_VALUE);
    return Math.round((safeValue / MAX_TEACHING_VALUE) * 255);
  }

  function createColor(r, g, b) {
    return {
      r: clampNumber(r, 0, MAX_TEACHING_VALUE),
      g: clampNumber(g, 0, MAX_TEACHING_VALUE),
      b: clampNumber(b, 0, MAX_TEACHING_VALUE)
    };
  }

  function normalizeBuffer(buffer, ledCount = LED_COUNT) {
    const safeBuffer = Array.isArray(buffer) ? buffer : [];

    return Array.from({ length: ledCount }, (_, index) => {
      const color = safeBuffer[index] || {};
      return createColor(color.r, color.g, color.b);
    });
  }

  function colorToCss(color) {
    const r = teachingValueToCssValue(color.r);
    const g = teachingValueToCssValue(color.g);
    const b = teachingValueToCssValue(color.b);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function isDarkColor(color) {
    const r = teachingValueToCssValue(color.r);
    const g = teachingValueToCssValue(color.g);
    const b = teachingValueToCssValue(color.b);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 95;
  }

  class LedRingCore {
    constructor(ledCount = LED_COUNT) {
      this.ledCount = ledCount;
      this.leds = Array.from({ length: ledCount }, () => createColor(0, 0, 0));
      this.buffer = Array.from({ length: ledCount }, () => createColor(0, 0, 0));
    }

    setLed(index, r, g, b) {
      const ledIndex = clampNumber(index, 1, this.ledCount) - 1;
      this.leds[ledIndex] = createColor(r, g, b);
      return this.getState();
    }

    setAll(r, g, b) {
      const color = createColor(r, g, b);
      this.leds = this.leds.map(() => ({ ...color }));
      return this.getState();
    }

    clear() {
      return this.setAll(0, 0, 0);
    }

    setBuffer(buffer) {
      this.buffer = normalizeBuffer(buffer, this.ledCount);
      return this.getBuffer();
    }

    setBufferLed(index, r, g, b) {
      const ledIndex = clampNumber(index, 1, this.ledCount) - 1;
      this.buffer[ledIndex] = createColor(r, g, b);
      return this.getBuffer();
    }

    setBufferAll(r, g, b) {
      const color = createColor(r, g, b);
      this.buffer = this.buffer.map(() => ({ ...color }));
      return this.getBuffer();
    }

    clearBuffer() {
      return this.setBufferAll(0, 0, 0);
    }

    showBuffer() {
      this.leds = this.buffer.map(color => ({ ...color }));
      return this.getState();
    }

    copyStateToBuffer() {
      this.buffer = this.leds.map(color => ({ ...color }));
      return this.getBuffer();
    }

    showProgress(value, r = 0, g = 20, b = 0) {
      const amount = clampNumber(value, 0, this.ledCount);
      this.clear();

      for (let i = 1; i <= amount; i += 1) {
        this.setLed(i, r, g, b);
      }

      return this.getState();
    }

    showScore(value) {
      const amount = clampNumber(value, 0, this.ledCount);
      this.clear();

      for (let i = 1; i <= amount; i += 1) {
        this.setLed(i, 30, 18, 0);
      }

      return this.getState();
    }

    showLife(value) {
      const amount = clampNumber(value, 0, 5);
      this.clear();

      for (let i = 1; i <= amount; i += 1) {
        this.setLed(i, 30, 0, 0);
      }

      return this.getState();
    }

    showPattern(patternName) {
      this.clear();

      if (patternName === "odd") {
        for (let i = 1; i <= this.ledCount; i += 2) {
          this.setLed(i, 30, 0, 0);
        }
      }

      if (patternName === "even") {
        for (let i = 2; i <= this.ledCount; i += 2) {
          this.setLed(i, 0, 0, 30);
        }
      }

      if (patternName === "alternate") {
        for (let i = 1; i <= this.ledCount; i += 1) {
          if (i % 2 === 1) {
            this.setLed(i, 30, 0, 0);
          } else {
            this.setLed(i, 0, 30, 0);
          }
        }
      }

      if (patternName === "blue-white") {
        for (let i = 1; i <= this.ledCount; i += 1) {
          if (i % 2 === 1) {
            this.setLed(i, 0, 0, 30);
          } else {
            this.setLed(i, 30, 30, 30);
          }
        }
      }

      if (patternName === "rainbow") {
        const colors = [
          createColor(30, 0, 0),
          createColor(30, 10, 0),
          createColor(30, 25, 0),
          createColor(0, 30, 0),
          createColor(0, 20, 20),
          createColor(0, 0, 30),
          createColor(15, 0, 30),
          createColor(30, 0, 20),
          createColor(30, 5, 0),
          createColor(10, 30, 0),
          createColor(0, 25, 30),
          createColor(20, 0, 30)
        ];

        this.leds = colors.map(color => ({ ...color }));
      }

      return this.getState();
    }

    getState() {
      return this.leds.map((color, index) => ({
        index: index + 1,
        r: color.r,
        g: color.g,
        b: color.b
      }));
    }

    getBuffer() {
      return this.buffer.map((color, index) => ({
        index: index + 1,
        r: color.r,
        g: color.g,
        b: color.b
      }));
    }
  }

  class LedRingSimulatorUi {
    constructor() {
      this.core = new LedRingCore(LED_COUNT);
      this.ringElement = document.getElementById("led-ring");
      this.stateOutputElement = document.getElementById("state-output");
      this.ledElements = [];

      this.createLedElements();
      this.bindEvents();
      this.render();
      this.exposePublicApi();
    }

    createLedElements() {
      this.ringElement.innerHTML = "";
      this.ledElements = [];

      const centerX = 50;
      const centerY = 50;
      const radius = 40;

      for (let i = 0; i < LED_COUNT; i += 1) {
        const ledNumber = i + 1;
        const angle = ((i / LED_COUNT) * Math.PI * 2) - Math.PI / 2;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const ledElement = document.createElement("div");
        ledElement.className = "led-item";
        ledElement.textContent = String(ledNumber);
        ledElement.style.left = `${x}%`;
        ledElement.style.top = `${y}%`;
        ledElement.setAttribute("aria-label", `LED ${ledNumber}`);

        this.ringElement.appendChild(ledElement);
        this.ledElements.push(ledElement);
      }
    }

    bindEvents() {
      document
        .getElementById("set-single-led")
        .addEventListener("click", () => {
          const index = document.getElementById("led-index").value;
          const r = document.getElementById("red-value").value;
          const g = document.getElementById("green-value").value;
          const b = document.getElementById("blue-value").value;

          this.core.setLed(index, r, g, b);
          this.render();
        });

      document.querySelectorAll("[data-action]").forEach(button => {
        button.addEventListener("click", () => {
          const action = button.dataset.action;

          if (action === "all-red") {
            this.core.setAll(30, 0, 0);
          }

          if (action === "all-green") {
            this.core.setAll(0, 30, 0);
          }

          if (action === "all-blue") {
            this.core.setAll(0, 0, 30);
          }

          if (action === "all-white") {
            this.core.setAll(30, 30, 30);
          }

          if (action === "clear") {
            this.core.clear();
          }

          this.render();
        });
      });

      document
        .getElementById("show-progress")
        .addEventListener("click", () => {
          const value = document.getElementById("progress-value").value;
          this.core.showProgress(value);
          this.render();
        });

      document
        .getElementById("show-score")
        .addEventListener("click", () => {
          const value = document.getElementById("score-value").value;
          this.core.showScore(value);
          this.render();
        });

      document
        .getElementById("show-life")
        .addEventListener("click", () => {
          const value = document.getElementById("life-value").value;
          this.core.showLife(value);
          this.render();
        });

      document.querySelectorAll("[data-pattern]").forEach(button => {
        button.addEventListener("click", () => {
          this.core.showPattern(button.dataset.pattern);
          this.render();
        });
      });

      document
        .getElementById("copy-state")
        .addEventListener("click", async () => {
          const text = this.stateOutputElement.textContent;

          try {
            await navigator.clipboard.writeText(text);
            document.getElementById("copy-state").textContent = "已複製";

            setTimeout(() => {
              document.getElementById("copy-state").textContent = "複製狀態";
            }, 1200);
          } catch (error) {
            window.alert("無法複製狀態，請手動選取內容。");
          }
        });
    }

    render() {
      const state = this.core.getState();
      const buffer = this.core.getBuffer();

      state.forEach(item => {
        const ledElement = this.ledElements[item.index - 1];
        const color = createColor(item.r, item.g, item.b);

        ledElement.style.background = colorToCss(color);
        ledElement.classList.toggle("is-dark", isDarkColor(color));
        ledElement.title = `LED ${item.index}: rgb(${item.r}, ${item.g}, ${item.b})`;
      });

      this.stateOutputElement.textContent = JSON.stringify(
        {
          state,
          buffer
        },
        null,
        2
      );
    }

    exposePublicApi() {
      const simulator = this;

      window.OSEPLedRingSimulator = {
        version: "MVP-31-7",
        ledCount: LED_COUNT,
        maxTeachingValue: MAX_TEACHING_VALUE,

        setLed(index, r, g, b) {
          simulator.core.setLed(index, r, g, b);
          simulator.render();
          return simulator.core.getState();
        },

        setAll(r, g, b) {
          simulator.core.setAll(r, g, b);
          simulator.render();
          return simulator.core.getState();
        },

        clear() {
          simulator.core.clear();
          simulator.render();
          return simulator.core.getState();
        },

        setBuffer(buffer) {
          simulator.core.setBuffer(buffer);
          simulator.render();
          return simulator.core.getBuffer();
        },

        setBufferLed(index, r, g, b) {
          simulator.core.setBufferLed(index, r, g, b);
          simulator.render();
          return simulator.core.getBuffer();
        },

        setBufferAll(r, g, b) {
          simulator.core.setBufferAll(r, g, b);
          simulator.render();
          return simulator.core.getBuffer();
        },

        clearBuffer() {
          simulator.core.clearBuffer();
          simulator.render();
          return simulator.core.getBuffer();
        },

        showBuffer() {
          simulator.core.showBuffer();
          simulator.render();
          return simulator.core.getState();
        },

        copyStateToBuffer() {
          simulator.core.copyStateToBuffer();
          simulator.render();
          return simulator.core.getBuffer();
        },

        showProgress(value) {
          simulator.core.showProgress(value);
          simulator.render();
          return simulator.core.getState();
        },

        showScore(value) {
          simulator.core.showScore(value);
          simulator.render();
          return simulator.core.getState();
        },

        showLife(value) {
          simulator.core.showLife(value);
          simulator.render();
          return simulator.core.getState();
        },

        showPattern(patternName) {
          simulator.core.showPattern(patternName);
          simulator.render();
          return simulator.core.getState();
        },

        getState() {
          return simulator.core.getState();
        },

        getBuffer() {
          return simulator.core.getBuffer();
        },

        getSnapshot() {
          return {
            state: simulator.core.getState(),
            buffer: simulator.core.getBuffer()
          };
        },

        teachingValueToCssValue(value) {
          return teachingValueToCssValue(value);
        }
      };
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new LedRingSimulatorUi();
  });
})();
