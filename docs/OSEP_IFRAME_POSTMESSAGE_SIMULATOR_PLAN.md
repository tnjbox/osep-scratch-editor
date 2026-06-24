# MVP-32-1｜規劃 iframe + postMessage 同框模擬器

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-1  
狀態：架構規劃文件  
更新日期：2026-06-24

---

## 一、任務目標

本版目標是規劃未來將「線上 LED 燈環模擬器」嵌入 OSEP Scratch Editor，形成同框教學介面。

目前已完成 BroadcastChannel 跨分頁同步原型：

```text
Scratch / 教材頁分頁
        ↓
BroadcastChannel
        ↓
LED 模擬器分頁
```

這個原型已證明：

1. LED command 格式可行。
2. 模擬器可接收跨頁指令。
3. Extension 可把 LED 積木動作同步到模擬器。
4. 無硬體時仍可透過模擬器觀察 LED 結果。

MVP-32-1 開始進入正式教學整合方向：

```text
Scratch Editor 同一頁
├── Scratch 積木與舞台
└── iframe LED 燈環模擬器
        ↑
        postMessage 接收 LED command
```

---

## 二、為什麼要從 BroadcastChannel 轉向 iframe + postMessage

BroadcastChannel 適合原型，因為不用改 Scratch Editor UI、可快速驗證跨頁同步、風險低。

但正式教學現場有幾個限制：

1. 學生需要同時開兩個分頁。
2. 教師說明時需要提醒學生切換分頁。
3. 學生容易忘記開模擬器頁。
4. 不適合正式課堂操作。

iframe + postMessage 的目標是：

```text
Scratch Editor 內直接看到 LED 模擬器
```

優點：

1. 學生不用開第二個分頁。
2. 教師投影畫面更完整。
3. Scratch 積木、角色舞台、LED 模擬器可同時觀察。
4. 更適合無硬體教學模式。
5. 未來可支援 `hardware-and-simulator` 教師展示模式。

---

## 三、目標畫面概念

未來 OSEP Scratch Editor 可以形成下列介面：

```text
┌──────────────────────────────────────────────┐
│ OSEP Scratch Editor                          │
├──────────────────────┬───────────────────────┤
│                      │ Scratch 舞台           │
│ Scratch 積木區       ├───────────────────────┤
│                      │ LED 燈環模擬器 iframe  │
│                      │                       │
└──────────────────────┴───────────────────────┘
```

或較保守的版本：

```text
┌──────────────────────────────────────────────┐
│ OSEP Scratch Editor                          │
├──────────────────────────────────────────────┤
│ Scratch 原本畫面                              │
├──────────────────────────────────────────────┤
│ 可展開 / 可收合 LED 燈環模擬器 iframe          │
└──────────────────────────────────────────────┘
```

---

## 四、技術架構

### 1. Parent 頁面

Parent 頁面是 Scratch Editor 所在頁面，例如：

```text
/editor.html?extension=...&project_url=...
```

Parent 負責：

1. 顯示 Scratch Editor。
2. 建立 LED 模擬器 iframe。
3. 接收 Extension 或中介層送出的 LED command。
4. 用 `iframe.contentWindow.postMessage()` 傳給模擬器 iframe。

### 2. iframe 子頁面

iframe 子頁面是現有模擬器：

```text
/osep/simulator/
```

iframe 負責：

1. 顯示 LED 燈環模擬器。
2. 接收 parent 傳來的 `postMessage`。
3. 驗證 message 來源。
4. 呼叫 `window.dispatchLedCommand(command)`。
5. 更新 LED 燈環畫面。

---

## 五、postMessage 訊息格式

建議沿用 BroadcastChannel 已驗證的 LED command 格式，只把傳輸方式改成 `postMessage`。

### 單一 LED command

```javascript
{
  source: "OSEP",
  type: "ledCommand",
  command: {
    type: "setLed",
    index: 1,
    r: 30,
    g: 0,
    b: 0
  }
}
```

### 多筆 LED commands

```javascript
{
  source: "OSEP",
  type: "ledCommands",
  commands: [
    {
      type: "setLed",
      index: 1,
      r: 30,
      g: 0,
      b: 0
    },
    {
      type: "setLed",
      index: 2,
      r: 0,
      g: 30,
      b: 0
    }
  ]
}
```

---

## 六、iframe 端接收設計

未來模擬器頁可新增：

```text
static/osep/simulator/led-postmessage-bridge.js
```

功能：

1. 監聽 `window.message` 事件。
2. 檢查 `event.origin`。
3. 檢查 `message.source === "OSEP"`。
4. 接收 `ledCommand` / `ledCommands`。
5. 呼叫 `window.dispatchLedCommand()`。

概念程式：

```javascript
window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) {
    return;
  }

  const message = event.data;

  if (!message || message.source !== "OSEP") {
    return;
  }

  if (message.type === "ledCommand") {
    window.dispatchLedCommand(message.command);
  }

  if (message.type === "ledCommands") {
    message.commands.forEach((command) => {
      window.dispatchLedCommand(command);
    });
  }
});
```

---

## 七、Parent 頁面發送設計

Parent 頁面需取得 iframe：

```javascript
const frame = document.getElementById("osep-led-simulator-frame");
```

並傳送訊息：

```javascript
frame.contentWindow.postMessage(
  {
    source: "OSEP",
    type: "ledCommand",
    command: {
      type: "setLed",
      index: 1,
      r: 30,
      g: 0,
      b: 0
    }
  },
  window.location.origin
);
```

---

## 八、Extension 與 Parent 頁面的關係

目前 Extension 已能直接用 BroadcastChannel 發送 LED command。

未來切換 iframe + postMessage 時，有兩種路線。

### 路線 A｜Extension 直接找 iframe 發送 postMessage

Extension 內部嘗試尋找：

```javascript
document.getElementById("osep-led-simulator-frame")
```

然後直接 postMessage。

優點是實作直觀；缺點是 Extension 與 Editor DOM 綁得太緊，長期維護風險較高。

### 路線 B｜建立 Parent 中介層

Parent 頁面建立一個全域函式：

```javascript
window.OSEPSimulatorBridge.sendLedCommand(command)
```

Extension 只呼叫：

```javascript
window.OSEPSimulatorBridge.sendLedCommand(command)
```

由 Parent 中介層負責找到 iframe 並 postMessage。

優點：

1. Extension 不直接依賴 iframe DOM。
2. 架構較乾淨。
3. 未來可以同時支援 iframe、BroadcastChannel、硬體同步模式。
4. 比較適合長期維護。

---

## 九、建議採用路線

建議採用：

```text
路線 B｜Parent 中介層
```

原因：

1. Extension 不應直接依賴 iframe DOM。
2. 未來 OSEP Scratch Editor 與 Blockly Lab 都可使用同一個中介層概念。
3. 可以保留 BroadcastChannel 作為備用。
4. 也可支援未來模式：
   - simulator-only
   - hardware-only
   - hardware-and-simulator

---

## 十、建議新增檔案規劃

未來可新增：

```text
static/osep/simulator/led-postmessage-bridge.js
static/osep/bridge/osep-simulator-bridge.js
docs/OSEP_IFRAME_POSTMESSAGE_SIMULATOR_PLAN.md
```

### `led-postmessage-bridge.js`

放在模擬器頁，負責接收 parent 傳來的 message。

### `osep-simulator-bridge.js`

放在 Scratch Editor / OSEP 頁面端，負責：

1. 找到 iframe。
2. 傳送 LED command。
3. 管理 iframe 載入狀態。
4. 必要時 fallback 到 BroadcastChannel。

---

## 十一、建議 MVP 實作路線

### MVP-32-1｜規劃 iframe + postMessage 同框模擬器

本版只做規劃文件。

### MVP-32-2｜建立模擬器 postMessage 接收端

新增：

```text
static/osep/simulator/led-postmessage-bridge.js
```

不改 Editor UI，只先讓模擬器支援 postMessage 接收。

### MVP-32-3｜建立獨立 iframe 測試頁

新增：

```text
static/osep/simulator-iframe-test.html
```

這個頁面只負責：

1. 嵌入模擬器 iframe。
2. 提供幾個測試按鈕。
3. 用 postMessage 傳送 LED command。
4. 驗證 iframe 接收成功。

### MVP-32-4｜規劃 Editor 內嵌位置

評估 Scratch Editor UI 哪裡適合放 LED 模擬器。

### MVP-32-5｜Editor 同框原型

正式嘗試把 iframe 加進 OSEP Scratch Editor。

---

## 十二、風險控管

1. MVP-32-1 不修改 `extensionV22C17.js`。
2. MVP-32-1 不修改 Scratch Editor UI。
3. 在真正嵌入 Editor 前，先用獨立測試頁驗證。
4. BroadcastChannel 仍保留作為開發測試與 fallback 備用通道。
5. iframe src 優先使用相對路徑或由工具函式產生，不硬寫錯誤路徑。

---

## 十三、與 Blockly Lab 的關係

本架構未來也可給 Blockly Lab 使用。

Blockly Lab 可採同樣模式：

```text
Blockly Lab 頁面
        ↓
iframe LED 模擬器
        ↓
postMessage 傳 LED command
```

因此 MVP-32 系列應避免把模擬器邏輯寫死在 Scratch Editor 專案中。

建議維持：

1. LED command 格式共用。
2. 模擬器頁面共用。
3. postMessage bridge 共用。
4. Scratch / Blockly 各自只負責產生 LED command。

---

## 十四、MVP-32-1 結論

1. BroadcastChannel 已完成跨分頁原型驗證。
2. 正式教學整合應轉向 iframe + postMessage。
3. 不建議 Extension 直接控制 iframe DOM。
4. 建議建立 Parent 中介層 `OSEPSimulatorBridge`。
5. 下一步先讓模擬器支援 postMessage 接收。
6. 再建立獨立 iframe 測試頁。
7. 最後才嵌入 Scratch Editor UI。

---

## 十五、下一版建議

下一版建議進入：

```text
MVP-32-2｜建立模擬器 postMessage 接收端
```

建議新增：

```text
static/osep/simulator/led-postmessage-bridge.js
```

並在模擬器 `index.html` 載入：

```html
<script src="./led-postmessage-bridge.js"></script>
```
