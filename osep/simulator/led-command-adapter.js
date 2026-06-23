(function () {
  "use strict";

  const VERSION = "MVP-31-8";
  const LED_COUNT = 12;
  const MAX_TEACHING_VALUE = 30;

  function clampNumber(value, min, max) {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return min;
    }

    return Math.min(max, Math.max(min, Math.round(numberValue)));
  }

  function normalizeRgbColor(input = {}) {
    return {
      r: clampNumber(input.r, 0, MAX_TEACHING_VALUE),
      g: clampNumber(input.g, 0, MAX_TEACHING_VALUE),
      b: clampNumber(input.b, 0, MAX_TEACHING_VALUE)
    };
  }

  function normalizeBuffer(buffer) {
    const safeBuffer = Array.isArray(buffer) ? buffer : [];

    return Array.from({ length: LED_COUNT }, (_, index) => {
      return normalizeRgbColor(safeBuffer[index] || {});
    });
  }

  function normalizeCommand(command = {}) {
    if (!command || typeof command !== "object") {
      return { type: "unknown" };
    }

    const type = String(command.type || "unknown");

    switch (type) {
      case "setLed":
        return {
          type,
          index: clampNumber(command.index, 1, LED_COUNT),
          ...normalizeRgbColor(command)
        };

      case "setAll":
        return {
          type,
          ...normalizeRgbColor(command)
        };

      case "clear":
        return { type };

      case "showProgress":
        return {
          type,
          value: clampNumber(command.value, 0, LED_COUNT)
        };

      case "showScore":
        return {
          type,
          value: clampNumber(command.value, 0, LED_COUNT)
        };

      case "showLife":
        return {
          type,
          value: clampNumber(command.value, 0, 5)
        };

      case "showPattern":
        return {
          type,
          patternName: String(command.patternName || command.name || "")
        };

      case "setBuffer":
        return {
          type,
          buffer: normalizeBuffer(command.buffer)
        };

      case "setBufferLed":
        return {
          type,
          index: clampNumber(command.index, 1, LED_COUNT),
          ...normalizeRgbColor(command)
        };

      case "setBufferAll":
        return {
          type,
          ...normalizeRgbColor(command)
        };

      case "clearBuffer":
        return { type };

      case "showBuffer":
        return { type };

      case "copyStateToBuffer":
        return { type };

      case "getState":
        return { type };

      case "getBuffer":
        return { type };

      case "getSnapshot":
        return { type };

      default:
        return {
          type: "unknown",
          originalType: type
        };
    }
  }

  function getTargets(options = {}) {
    if (Array.isArray(options.targets) && options.targets.length > 0) {
      return options.targets;
    }

    return ["simulator"];
  }

  function sendLedCommandToSimulator(command) {
    const simulator = window.OSEPLedRingSimulator;

    if (!simulator) {
      return {
        ok: false,
        target: "simulator",
        reason: "OSEPLedRingSimulator not found"
      };
    }

    try {
      switch (command.type) {
        case "setLed":
          return {
            ok: true,
            target: "simulator",
            result: simulator.setLed(command.index, command.r, command.g, command.b)
          };

        case "setAll":
          return {
            ok: true,
            target: "simulator",
            result: simulator.setAll(command.r, command.g, command.b)
          };

        case "clear":
          return {
            ok: true,
            target: "simulator",
            result: simulator.clear()
          };

        case "showProgress":
          return {
            ok: true,
            target: "simulator",
            result: simulator.showProgress(command.value)
          };

        case "showScore":
          return {
            ok: true,
            target: "simulator",
            result: simulator.showScore(command.value)
          };

        case "showLife":
          return {
            ok: true,
            target: "simulator",
            result: simulator.showLife(command.value)
          };

        case "showPattern":
          return {
            ok: true,
            target: "simulator",
            result: simulator.showPattern(command.patternName)
          };

        case "setBuffer":
          if (typeof simulator.setBuffer !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "setBuffer is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.setBuffer(command.buffer)
          };

        case "setBufferLed":
          if (typeof simulator.setBufferLed !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "setBufferLed is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.setBufferLed(command.index, command.r, command.g, command.b)
          };

        case "setBufferAll":
          if (typeof simulator.setBufferAll !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "setBufferAll is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.setBufferAll(command.r, command.g, command.b)
          };

        case "clearBuffer":
          if (typeof simulator.clearBuffer !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "clearBuffer is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.clearBuffer()
          };

        case "showBuffer":
          if (typeof simulator.showBuffer !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "showBuffer is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.showBuffer()
          };

        case "copyStateToBuffer":
          if (typeof simulator.copyStateToBuffer !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "copyStateToBuffer is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.copyStateToBuffer()
          };

        case "getState":
          return {
            ok: true,
            target: "simulator",
            result: simulator.getState()
          };

        case "getBuffer":
          if (typeof simulator.getBuffer !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "getBuffer is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.getBuffer()
          };

        case "getSnapshot":
          if (typeof simulator.getSnapshot !== "function") {
            return {
              ok: false,
              target: "simulator",
              reason: "getSnapshot is not available"
            };
          }

          return {
            ok: true,
            target: "simulator",
            result: simulator.getSnapshot()
          };

        default:
          return {
            ok: false,
            target: "simulator",
            reason: `Unsupported command type: ${command.type}`
          };
      }
    } catch (error) {
      return {
        ok: false,
        target: "simulator",
        reason: error.message || String(error)
      };
    }
  }

  function sendLedCommandToHardware(command) {
    return {
      ok: false,
      target: "hardware",
      skipped: true,
      reason: "Hardware transport is not implemented in MVP-31-8",
      command
    };
  }

  function dispatchLedCommand(command, options = {}) {
    const normalizedCommand = normalizeCommand(command);
    const targets = getTargets(options);

    const results = targets.map(target => {
      if (target === "simulator") {
        return sendLedCommandToSimulator(normalizedCommand);
      }

      if (target === "hardware") {
        return sendLedCommandToHardware(normalizedCommand);
      }

      return {
        ok: false,
        target,
        reason: `Unknown target: ${target}`
      };
    });

    return {
      version: VERSION,
      command: normalizedCommand,
      targets,
      results
    };
  }

  function dispatchLedCommands(commands, options = {}) {
    const safeCommands = Array.isArray(commands) ? commands : [];

    return safeCommands.map(command => {
      return dispatchLedCommand(command, options);
    });
  }

  window.OSEPLedCommandAdapter = {
    version: VERSION,
    ledCount: LED_COUNT,
    maxTeachingValue: MAX_TEACHING_VALUE,
    normalizeCommand,
    dispatchLedCommand,
    dispatchLedCommands,
    sendLedCommandToSimulator,
    sendLedCommandToHardware
  };

  window.dispatchLedCommand = dispatchLedCommand;
})();
