// =====================================================
// OSEP LED Simulator postMessage Bridge
// MVP-32-2｜建立模擬器 postMessage 接收端
// -----------------------------------------------------
// 目的：讓 LED 模擬器可以被 iframe parent 頁面用
// window.postMessage() 傳入 LED command。
// 本檔只負責「接收訊息」與「轉交給既有 LED command adapter」。
// 不改變既有 BroadcastChannel 功能，也不影響模擬器本身操作。
// =====================================================

(function() {
  "use strict";

  const VERSION = "MVP-32-2";
  const SOURCE_NAME = "OSEP";

  let started = false;

  function isAllowedOrigin(origin) {
    // MVP-32-2 先限制同源，符合目前 GitHub Pages 與本機開發情境。
    // 例如：
    // parent: https://tnjbox.github.io
    // iframe: https://tnjbox.github.io/osep-scratch-editor/osep/simulator/
    return origin === window.location.origin;
  }

  function isValidMessage(message) {
    return !!message && typeof message === "object" && message.source === SOURCE_NAME;
  }

  function dispatchCommand(command) {
    if(!command || typeof command !== "object") {
      return false;
    }

    try {
      if(typeof window.dispatchLedCommand === "function") {
        window.dispatchLedCommand(command, {
          source: "postMessage",
          version: VERSION
        });
        return true;
      }

      if(
        window.OSEPLedCommandAdapter &&
        typeof window.OSEPLedCommandAdapter.dispatchLedCommand === "function"
      ) {
        window.OSEPLedCommandAdapter.dispatchLedCommand(command, {
          source: "postMessage",
          version: VERSION
        });
        return true;
      }
    } catch(e) {
      console.warn("[OSEP postMessage] dispatch command failed:", e);
      return false;
    }

    console.warn("[OSEP postMessage] LED command dispatcher is not ready.");
    return false;
  }

  function dispatchCommands(commands) {
    if(!Array.isArray(commands)) {
      return false;
    }

    let ok = true;

    for(const command of commands) {
      const result = dispatchCommand(command);
      if(!result) ok = false;
    }

    return ok;
  }

  function replyToParent(event, message) {
    if(!event || !event.source || typeof event.source.postMessage !== "function") {
      return;
    }

    try {
      event.source.postMessage(
        {
          source: SOURCE_NAME,
          type: "postMessageBridgeReply",
          version: VERSION,
          ...message
        },
        event.origin
      );
    } catch(e) {
      console.warn("[OSEP postMessage] reply failed:", e);
    }
  }

  function handleMessageEvent(event) {
    if(!isAllowedOrigin(event.origin)) {
      return;
    }

    const message = event.data;

    if(!isValidMessage(message)) {
      return;
    }

    if(message.type === "ledCommand") {
      const ok = dispatchCommand(message.command);

      replyToParent(event, {
        requestType: "ledCommand",
        ok: ok
      });

      return;
    }

    if(message.type === "ledCommands") {
      const ok = dispatchCommands(message.commands);

      replyToParent(event, {
        requestType: "ledCommands",
        ok: ok
      });

      return;
    }

    if(message.type === "getStatus") {
      replyToParent(event, {
        requestType: "getStatus",
        ok: true,
        status: getStatus()
      });

      return;
    }
  }

  function start() {
    if(started) {
      return true;
    }

    window.addEventListener("message", handleMessageEvent);
    started = true;

    console.log("[OSEP postMessage] LED simulator bridge started:", VERSION);
    return true;
  }

  function stop() {
    if(!started) {
      return true;
    }

    window.removeEventListener("message", handleMessageEvent);
    started = false;

    console.log("[OSEP postMessage] LED simulator bridge stopped.");
    return true;
  }

  function getStatus() {
    return {
      version: VERSION,
      started: started,
      source: SOURCE_NAME,
      origin: window.location.origin,
      hasDispatchLedCommand: typeof window.dispatchLedCommand === "function",
      hasCommandAdapter: !!(
        window.OSEPLedCommandAdapter &&
        typeof window.OSEPLedCommandAdapter.dispatchLedCommand === "function"
      )
    };
  }

  window.OSEPLedPostMessageBridge = {
    version: VERSION,
    start: start,
    stop: stop,
    getStatus: getStatus,
    handleMessageEvent: handleMessageEvent
  };

  start();
})();
