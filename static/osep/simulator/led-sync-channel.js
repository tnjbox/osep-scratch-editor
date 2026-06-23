(function () {
  "use strict";

  const VERSION = "MVP-31-11";
  const CHANNEL_NAME = "osep-led-ring";
  const SOURCE_NAME = "OSEP";

  let channel = null;
  let receivedCount = 0;
  let lastMessage = null;

  function isSupported() {
    return typeof window !== "undefined" && typeof window.BroadcastChannel === "function";
  }

  function isOsepMessage(message) {
    return Boolean(message && typeof message === "object" && message.source === SOURCE_NAME);
  }

  function dispatchSingleCommand(command) {
    if (typeof window.dispatchLedCommand !== "function") {
      return {
        ok: false,
        reason: "window.dispatchLedCommand is not available"
      };
    }

    return window.dispatchLedCommand(command, {
      targets: ["simulator"]
    });
  }

  function dispatchMultipleCommands(commands) {
    const safeCommands = Array.isArray(commands) ? commands : [];

    if (
      typeof window.OSEPLedCommandAdapter !== "undefined" &&
      typeof window.OSEPLedCommandAdapter.dispatchLedCommands === "function"
    ) {
      return window.OSEPLedCommandAdapter.dispatchLedCommands(safeCommands, {
        targets: ["simulator"]
      });
    }

    return safeCommands.map(command => dispatchSingleCommand(command));
  }

  function handleMessage(message) {
    if (!isOsepMessage(message)) {
      return {
        ok: false,
        ignored: true,
        reason: "Message source is not OSEP"
      };
    }

    receivedCount += 1;
    lastMessage = message;

    if (message.type === "ledCommand") {
      return {
        ok: true,
        messageType: message.type,
        result: dispatchSingleCommand(message.command)
      };
    }

    if (message.type === "ledCommands") {
      return {
        ok: true,
        messageType: message.type,
        result: dispatchMultipleCommands(message.commands)
      };
    }

    if (message.type === "getSnapshot") {
      if (
        window.OSEPLedRingSimulator &&
        typeof window.OSEPLedRingSimulator.getSnapshot === "function"
      ) {
        return {
          ok: true,
          messageType: message.type,
          result: window.OSEPLedRingSimulator.getSnapshot()
        };
      }

      return {
        ok: false,
        messageType: message.type,
        reason: "getSnapshot is not available"
      };
    }

    return {
      ok: false,
      messageType: message.type,
      reason: `Unsupported message type: ${message.type}`
    };
  }

  function start() {
    if (!isSupported()) {
      return false;
    }

    if (channel) {
      return true;
    }

    channel = new BroadcastChannel(CHANNEL_NAME);

    channel.addEventListener("message", event => {
      const result = handleMessage(event.data);

      if (window.OSEP_LED_SYNC_DEBUG === true) {
        console.log("[OSEP LED Sync]", result);
      }
    });

    return true;
  }

  function stop() {
    if (channel) {
      channel.close();
      channel = null;
    }
  }

  function postMessage(message) {
    if (!isSupported()) {
      return {
        ok: false,
        reason: "BroadcastChannel is not supported"
      };
    }

    if (!channel) {
      start();
    }

    channel.postMessage(message);

    return {
      ok: true,
      channelName: CHANNEL_NAME,
      message
    };
  }

  function sendCommand(command) {
    return postMessage({
      source: SOURCE_NAME,
      type: "ledCommand",
      command
    });
  }

  function sendCommands(commands) {
    return postMessage({
      source: SOURCE_NAME,
      type: "ledCommands",
      commands
    });
  }

  function sendTestCommand() {
    return sendCommand({
      type: "setLed",
      index: 1,
      r: 30,
      g: 0,
      b: 0
    });
  }

  function getStatus() {
    return {
      version: VERSION,
      channelName: CHANNEL_NAME,
      supported: isSupported(),
      started: Boolean(channel),
      receivedCount,
      lastMessage
    };
  }

  window.OSEPLedSyncChannel = {
    version: VERSION,
    channelName: CHANNEL_NAME,
    supported: isSupported(),
    start,
    stop,
    postMessage,
    sendCommand,
    sendCommands,
    sendTestCommand,
    handleMessage,
    getStatus
  };

  start();
})();
