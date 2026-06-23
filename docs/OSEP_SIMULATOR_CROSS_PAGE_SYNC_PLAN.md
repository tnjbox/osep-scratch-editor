# MVP-31-10｜評估模擬器跨頁同步方式

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-31-10  
狀態：技術評估文件  
更新日期：2026-06-23

---

## 一、任務目標

本版目標是評估「線上 LED 燈環模擬器」與 OSEP Scratch Editor 之間的跨頁同步方式。

前一版 MVP-31-9 已確認：

1. OSEP Scratch Extension 未來可朝 `simulator-only` 模式發展。
2. 但目前模擬器與 Scratch Editor 不一定在同一個頁面。
3. 如果不在同一頁，Extension 無法直接呼叫 `window.dispatchLedCommand()`。
4. 因此必須先評估跨頁同步技術，再決定是否修改 Extension。

本版不直接修改：

- `extensionV22C17.js`
- `tw-security-manager.jsx`
- Scratch Editor UI
- WebSerial runtime
- ESP8266 韌體
- Blockly Lab

---

## 二、目前架構

### 1. OSEP Scratch Editor 任務頁

目前學生開啟任務時，網址形式大致為：

```text
/editor.html?extension=...&project_url=...
```

這個頁面負責：

- 載入 Scratch Editor
- 載入 OSEP Scratch Extension
- 載入 `.sb3` 任務檔
- 執行學生的 Scratch 積木

---

### 2. LED 燈環模擬器頁

目前模擬器是獨立頁面：

```text
/osep/simulator/
```

模擬器頁已具備：

- `window.OSEPLedRingSimulator`
- `window.OSEPLedCommandAdapter`
- `window.dispatchLedCommand(command)`

但這些 API 目前只存在於模擬器頁面自己的 `window` 中。

---

### 3. 核心問題

若 Scratch Editor 與模擬器是不同頁面：

```text
Scratch Editor window
模擬器 window
```

兩者的 `window` 不相同。

因此 Scratch Extension 不能直接呼叫模擬器頁面的：

```javascript
window.dispatchLedCommand(...)
```

必須透過跨頁同步機制傳遞 LED command。

---

## 三、評估方案總覽

本版評估四種方案：

1. iframe + postMessage
2. BroadcastChannel
3. localStorage event
4. 直接內嵌共用 JS 模組

比較表：

| 方案 | 適合情境 | 優點 | 缺點 | 建議程度 |
|---|---|---|---|---|
| iframe + postMessage | 模擬器嵌入 Editor 或 Blockly Lab | 穩定、可視覺整合、跨專案可用 | 需要 UI 嵌入與訊息協定 | 高 |
| BroadcastChannel | Editor 與模擬器開在不同分頁 | 不需嵌入 UI、同源分頁可同步 | 學生需開兩頁、同源限制 | 中高 |
| localStorage event | 備用跨頁同步 | 支援度廣 | 不適合高頻指令、資料格式較笨重 | 低 |
| 直接內嵌共用 JS 模組 | 同頁整合 | 整合度最高 | 對 Scratch Editor / Blockly Lab 建置流程影響較大 | 中 |

---

## 四、方案 A｜iframe + postMessage

### 1. 架構說明

將模擬器以 iframe 方式嵌入 Scratch Editor 或 Blockly Lab 頁面。

```html
<iframe
  id="osep-led-simulator-frame"
  src="./osep/simulator/"
  title="OSEP LED 燈環模擬器">
</iframe>
```

Scratch Editor 或 Extension 發出 LED command 時，透過 `postMessage` 傳給 iframe。

```javascript
const frame = document.getElementById("osep-led-simulator-frame");

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

模擬器頁面接收：

```javascript
window.addEventListener("message", event => {
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
});
```

---

### 2. 優點

1. 模擬器可以維持獨立頁面。
2. Scratch Editor 可以在同一畫面顯示模擬器。
3. Blockly Lab 也可用同一個 iframe 模擬器。
4. 使用者不需要手動開第二個分頁。
5. `postMessage` 是標準瀏覽器 API。
6. 可明確限制來源 `origin`，安全性較好。
7. 未來可實作 `hardware-and-simulator` 同步展示。

---

### 3. 缺點

1. 需要修改 Scratch Editor UI。
2. 需要決定 iframe 放在何處。
3. 需要處理 iframe 載入完成前的 command 暫存問題。
4. Extension 不一定容易直接取得 iframe DOM。
5. 若模擬器 iframe 與 Extension 權限隔離，需設計中介層。

---

### 4. 技術風險

主要風險不是 `postMessage` 本身，而是：

1. Scratch Editor 介面整合成本。
2. Extension 能否穩定把 command 傳到頁面層。
3. 是否要改 TurboWarp / Scratch GUI 介面。
4. GitHub Pages base path 需避免再次寫錯。

---

### 5. 適合程度

高。

此方案最適合未來正式整合，尤其是：

- 教師展示模式
- 無硬體模擬模式
- Scratch Editor 內嵌模擬器面板
- Blockly Lab 共用同一模擬器

---

## 五、方案 B｜BroadcastChannel

### 1. 架構說明

Scratch Editor 與模擬器分別開在兩個頁面，但只要同源，就可透過 BroadcastChannel 溝通。

Scratch Editor 端：

```javascript
const channel = new BroadcastChannel("osep-led-ring");

channel.postMessage({
  source: "OSEP",
  type: "ledCommand",
  command: {
    type: "setLed",
    index: 1,
    r: 30,
    g: 0,
    b: 0
  }
});
```

模擬器端：

```javascript
const channel = new BroadcastChannel("osep-led-ring");

channel.addEventListener("message", event => {
  const message = event.data;

  if (!message || message.source !== "OSEP") {
    return;
  }

  if (message.type === "ledCommand") {
    window.dispatchLedCommand(message.command);
  }
});
```

---

### 2. 優點

1. 不需要把模擬器嵌入 Scratch Editor。
2. 可以讓教師或學生開兩個分頁同步觀看。
3. 技術實作比修改 Scratch UI 簡單。
4. 很適合作為原型驗證。
5. OSEP Scratch Editor 與 Blockly Lab 都可使用相同 channel 名稱。

---

### 3. 缺點

1. 需要使用者同時開啟兩個頁面。
2. 對學生操作來說較不直覺。
3. 需要同源才能順利通訊。
4. 若模擬器頁沒開，command 不會有視覺效果。
5. 不適合作為低年級學生的主要操作流程。

---

### 4. 同源條件

GitHub Pages 上兩頁若同屬：

```text
https://tnjbox.github.io/osep-scratch-editor/
```

就屬於同源。

例如：

```text
https://tnjbox.github.io/osep-scratch-editor/editor.html
https://tnjbox.github.io/osep-scratch-editor/osep/simulator/
```

可使用 BroadcastChannel。

---

### 5. 適合程度

中高。

它非常適合作為下一階段原型：

```text
MVP-31-11｜建立 BroadcastChannel 同步原型
```

因為它不需要大改 Scratch Editor UI，也能先驗證跨頁 LED command 是否可行。

---

## 六、方案 C｜localStorage event

### 1. 架構說明

Scratch Editor 將 LED command 寫入 localStorage：

```javascript
localStorage.setItem(
  "osep-led-command",
  JSON.stringify({
    time: Date.now(),
    command: {
      type: "setLed",
      index: 1,
      r: 30,
      g: 0,
      b: 0
    }
  })
);
```

模擬器頁監聽 storage event：

```javascript
window.addEventListener("storage", event => {
  if (event.key !== "osep-led-command") {
    return;
  }

  const payload = JSON.parse(event.newValue);
  window.dispatchLedCommand(payload.command);
});
```

---

### 2. 優點

1. 支援度廣。
2. 不需要 iframe。
3. 不需要 BroadcastChannel。
4. 可作為舊瀏覽器備用方案。

---

### 3. 缺點

1. 不適合高頻 LED 動畫。
2. 每次傳送都要序列化 JSON。
3. 不適合即時大量指令。
4. storage event 不會在同一頁觸發，只會在其他同源頁面觸發。
5. 除錯體驗較差。
6. localStorage 不是即時訊息通道。

---

### 4. 適合程度

低。

不建議作為主方案，只適合作為備用方案或簡單測試。

---

## 七、方案 D｜直接內嵌共用 JS 模組

### 1. 架構說明

將模擬器核心與 Command Adapter 抽成共用 JS 模組，由 Scratch Editor 或 Blockly Lab 直接載入。

例如：

```text
shared/osep-led-ring-core.js
shared/osep-led-command-adapter.js
```

Scratch Editor 與 Blockly Lab 各自載入相同核心。

---

### 2. 優點

1. 整合度最高。
2. 不需要跨頁通訊。
3. 執行效率最好。
4. 適合長期維護。
5. OSEP Scratch Editor 與 Blockly Lab 可共享同一套邏輯。

---

### 3. 缺點

1. 初期重構成本高。
2. 需要處理兩個專案的建置流程。
3. Scratch Editor 與 Blockly Lab 架構不同。
4. 可能需要拆分 UI 與核心邏輯。
5. 不適合在目前 GitHub Pages 已穩定時立即大改。

---

### 4. 適合程度

中。

適合中長期重構，不建議作為下一個立即實作版本。

---

## 八、建議採用路線

建議採用「短期 BroadcastChannel、中期 iframe、長期共用核心」的三階段策略。

### 第一階段｜BroadcastChannel 原型

目標：

1. 不修改 Scratch Editor UI。
2. 先讓模擬器可接收跨頁 LED command。
3. 教師或開發者可同時開 Editor 與模擬器頁測試。
4. 驗證 LED command 格式是否穩定。

建議版本：

```text
MVP-31-11｜建立 BroadcastChannel 同步原型
```

---

### 第二階段｜iframe + postMessage

目標：

1. 將模擬器嵌入 Scratch Editor 或 Blockly Lab。
2. 使用者不需要開兩個分頁。
3. 建立正式教學用無硬體模式。
4. 預留 hardware-and-simulator 同步展示。

建議版本：

```text
MVP-31-12｜評估 iframe 內嵌模擬器面板
```

---

### 第三階段｜共用核心模組化

目標：

1. 將 LED 模擬器核心抽成共用模組。
2. OSEP Scratch Editor 與 Blockly Lab 共用同一套核心。
3. 避免兩個專案重複開發。
4. 建立長期維護架構。

建議版本：

```text
MVP-32-x｜抽離 OSEP LED Simulator 共用核心
```

---

## 九、MVP-31-10 建議結論

本版建議結論如下：

1. 不建議立即修改 OSEP Scratch Extension。
2. 不建議立即修改 Scratch Editor UI。
3. 不建議使用 localStorage event 作為主方案。
4. 可將 BroadcastChannel 作為下一階段最小風險原型。
5. 中期正式整合建議採 iframe + postMessage。
6. 長期維護建議抽出共用 JS 核心。
7. 下一步優先做 `MVP-31-11｜建立 BroadcastChannel 同步原型`。

---

## 十、MVP-31-11 預期範圍

下一版若採 BroadcastChannel 原型，建議只修改模擬器端。

可能新增：

```text
static/osep/simulator/led-sync-channel.js
```

並在：

```text
static/osep/simulator/index.html
```

加入：

```html
<script src="./led-sync-channel.js"></script>
```

功能：

1. 建立 BroadcastChannel。
2. 監聽 `osep-led-ring` channel。
3. 接收 LED command。
4. 呼叫 `window.dispatchLedCommand(command)`。
5. 不修改 Extension。
6. 不修改 Scratch Editor UI。
7. 可先用 Console 從另一頁送 command 測試。

---

## 十一、測試方式構想

MVP-31-11 可用兩個分頁測試。

### 分頁 A｜模擬器頁

開啟：

```text
https://tnjbox.github.io/osep-scratch-editor/osep/simulator/
```

模擬器會監聽 BroadcastChannel。

### 分頁 B｜任意同源頁面或 Editor 頁

開啟：

```text
https://tnjbox.github.io/osep-scratch-editor/osep/
```

按 F12 Console，輸入：

```javascript
const channel = new BroadcastChannel("osep-led-ring");

channel.postMessage({
  source: "OSEP",
  type: "ledCommand",
  command: {
    type: "setLed",
    index: 1,
    r: 30,
    g: 0,
    b: 0
  }
});
```

若分頁 A 的模擬器第 1 顆 LED 變紅，代表跨頁同步成功。

---

## 十二、風險控管

### 1. 不影響原本硬體功能

BroadcastChannel 原型先只修改模擬器端，不碰 Extension。

### 2. 不影響 GitHub Pages 任務連結

不修改首頁任務連結、不修改 base path 產生邏輯。

### 3. 不影響 unsandboxed mode

不修改 `tw-security-manager.jsx`。

### 4. 不影響 Blockly Lab

只先評估，未直接改 Blockly Lab。

### 5. 保留未來共用可能

BroadcastChannel channel 名稱建議固定：

```text
osep-led-ring
```

訊息格式固定：

```javascript
{
  source: "OSEP",
  type: "ledCommand",
  command: { ... }
}
```

---

## 十三、附錄：建議訊息格式

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

### 多筆 LED command

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

### 查詢狀態

未來可擴充：

```javascript
{
  source: "OSEP",
  type: "getSnapshot"
}
```

---

## 十四、結論

MVP-31-10 定案：

下一步建議採用 BroadcastChannel 作為最小風險跨頁同步原型。

理由：

1. 不需要立即修改 Scratch Editor UI。
2. 不需要立即修改 Extension。
3. 可直接驗證跨頁 LED command 是否可行。
4. 適合 OSEP Scratch Editor 與 Blockly Lab 未來共用。
5. 成功後再評估 iframe + postMessage 內嵌方案。
