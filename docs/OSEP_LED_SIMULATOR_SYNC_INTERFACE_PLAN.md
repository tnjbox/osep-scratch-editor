# MVP-31-6｜規劃模擬器與 Extension / Blockly Lab 的同步介面

專案：OSEP Scratch Editor / Blockly Lab / SmartRingController  
版本：MVP-31-6  
狀態：規劃文件  
更新日期：2026-06-23

---

## 一、任務目標

本版目標是規劃「線上 LED 燈環模擬器」與下列兩個平台的同步介面：

1. OSEP Scratch Editor
2. Blockly Lab

最終目標是讓兩個平台都能透過同一套 LED 指令介面，同步控制：

1. 實體 SmartRingController LED 燈環
2. 線上 LED 燈環模擬器

也就是未來要逐步達成：

```text
OSEP Scratch Editor LED 積木
        ↓
共用 LED 指令介面
        ↓
實體硬體 WebSerial + 線上模擬器同步顯示

Blockly Lab LED 積木
        ↓
共用 LED 指令介面
        ↓
實體硬體 WebSerial + 線上模擬器同步顯示
```

---

## 二、目前狀態

### 1. OSEP Scratch Editor

OSEP Scratch Editor 目前主要透過 Extension 控制 SmartRingController。

已具備：

- OSEP Scratch Extension
- WebSerial 連線
- SmartRing LED 控制積木
- 12 顆 LED 控制邏輯
- 進度條、分數、生命值等積木概念

### 2. Blockly Lab

Blockly Lab 目前也已具備 SmartRingController 相關積木與 WebSerial 控制能力。

已具備：

- Blockly 積木
- SmartRing WebSerial runtime
- SmartRing LED 控制積木
- 課程任務與評分模式
- 韌體燒錄頁面

### 3. LED 燈環模擬器

MVP-31-5 建議已建立第一版獨立 LED 燈環模擬器。

第一版模擬器應預留：

```javascript
window.OSEPLedRingSimulator
```

供未來其他平台呼叫。

---

## 三、核心設計原則

### 原則一：模擬器核心要能共用

模擬器不應只服務 OSEP Scratch Editor，也應考量 Blockly Lab。

因此未來應逐步抽出共用核心，例如：

```text
shared/osep-led-ring-simulator-core.js
```

或在兩個專案中維持相同 API 規格。

### 原則二：教學 RGB 範圍統一為 0～30

雖然 WS2812 / NeoPixel 真實 RGB 訊號可使用 0～255，但目前 OSEP Scratch Editor 與 Blockly Lab 的教學積木都採用：

```text
RGB：0～30
```

因此同步介面也應統一使用 0～30。

模擬器畫面顯示時才轉換成 CSS 使用的 0～255：

```javascript
cssValue = Math.round((teachingValue / 30) * 255)
```

### 原則三：先定 API，再做連動

MVP-31-6 不直接修改 Extension 或 Blockly Lab runtime。

本版只定義：

1. LED 指令格式
2. 共用 API
3. 模擬器同步方式
4. 軟硬體同步策略
5. 後續實作分階段路線

### 原則四：實體硬體與線上模擬器要解耦

實體硬體與模擬器應該是兩個可獨立存在的輸出目標。

未來 LED 指令可以送到：

1. 只送硬體
2. 只送模擬器
3. 同時送硬體與模擬器

不應把模擬器綁死在 WebSerial 內部，也不應把硬體通訊寫死在模擬器內。

---

## 四、建議同步架構

建議採用「LED 指令中介層」架構。

```text
Scratch Extension / Blockly Runtime
              ↓
       LED Command Adapter
              ↓
 ┌────────────┴────────────┐
 │                         │
Hardware Transport     Simulator Transport
WebSerial              OSEPLedRingSimulator API
 │                         │
ESP8266 LED Ring       Online LED Ring
```

### 角色分工

#### 1. Scratch Extension / Blockly Runtime

負責接收學生積木指令，例如：

- 設定單顆 LED
- 設定全部 LED
- 清除全部
- 顯示進度條
- 顯示分數
- 顯示生命值
- 顯示暫存陣列

#### 2. LED Command Adapter

負責把不同平台的積木指令轉成統一 LED 指令。

#### 3. Hardware Transport

負責把 LED 指令轉成 WebSerial 訊息，送給 ESP8266。

#### 4. Simulator Transport

負責把 LED 指令轉成模擬器 API 呼叫。

#### 5. OSEPLedRingSimulator

負責顯示線上 LED 燈環狀態。

---

## 五、建議共用 API

模擬器應提供以下全域 API：

```javascript
window.OSEPLedRingSimulator = {
  version: "MVP-31-5",
  ledCount: 12,
  maxTeachingValue: 30,

  setLed(index, r, g, b) {},
  setAll(r, g, b) {},
  clear() {},

  showProgress(value) {},
  showScore(value) {},
  showLife(value) {},

  showPattern(patternName) {},

  setBuffer(buffer) {},
  showBuffer() {},

  getState() {}
};
```

---

## 六、API 詳細規格

### 1. setLed(index, r, g, b)

設定單顆 LED。

```javascript
window.OSEPLedRingSimulator.setLed(1, 30, 0, 0);
```

#### 參數

| 參數 | 範圍 | 說明 |
|---|---:|---|
| index | 1～12 | LED 編號 |
| r | 0～30 | 紅色亮度 |
| g | 0～30 | 綠色亮度 |
| b | 0～30 | 藍色亮度 |

#### 對應積木

- 設定第 N 顆 LED RGB
- 設定第 N 顆 LED 顏色

---

### 2. setAll(r, g, b)

設定全部 LED 顏色。

```javascript
window.OSEPLedRingSimulator.setAll(0, 0, 30);
```

#### 參數

| 參數 | 範圍 | 說明 |
|---|---:|---|
| r | 0～30 | 紅色亮度 |
| g | 0～30 | 綠色亮度 |
| b | 0～30 | 藍色亮度 |

#### 對應積木

- 設定全部顏色
- 全部 LED 亮紅色
- 全部 LED 亮綠色
- 全部 LED 亮藍色
- 全部 LED 亮白色

---

### 3. clear()

清除全部 LED。

```javascript
window.OSEPLedRingSimulator.clear();
```

#### 對應積木

- 清除全部
- 全部熄滅

---

### 4. showProgress(value)

顯示進度條。

```javascript
window.OSEPLedRingSimulator.showProgress(6);
```

#### 參數

| 參數 | 範圍 | 說明 |
|---|---:|---|
| value | 0～12 | 亮起的 LED 數量 |

#### 對應積木

- 顯示進度條
- 顯示目前進度

---

### 5. showScore(value)

顯示分數。

```javascript
window.OSEPLedRingSimulator.showScore(8);
```

#### 參數

| 參數 | 範圍 | 說明 |
|---|---:|---|
| value | 0～12 | 分數或亮燈數量 |

#### 對應積木

- 分數 LED
- 顯示分數

---

### 6. showLife(value)

顯示生命值。

```javascript
window.OSEPLedRingSimulator.showLife(3);
```

#### 參數

| 參數 | 範圍 | 說明 |
|---|---:|---|
| value | 0～5 | 生命值數量 |

#### 對應積木

- 生命值 LED
- 顯示生命值

---

### 7. showPattern(patternName)

顯示預設圖樣。

```javascript
window.OSEPLedRingSimulator.showPattern("alternate");
```

#### 建議 patternName

| 名稱 | 說明 |
|---|---|
| odd | 奇數 LED |
| even | 偶數 LED |
| alternate | 紅綠交錯 |
| blue-white | 藍白交錯 |
| rainbow | 彩虹示意 |

---

### 8. setBuffer(buffer)

設定暫存陣列，但不一定立即顯示。

```javascript
window.OSEPLedRingSimulator.setBuffer([
  { "r": 30, "g": 0, "b": 0 },
  { "r": 0, "g": 30, "b": 0 },
  { "r": 0, "g": 0, "b": 30 }
]);
```

#### buffer 規格

```javascript
[
  { "r": 30, "g": 0, "b": 0 },
  { "r": 0, "g": 30, "b": 0 },
  { "r": 0, "g": 0, "b": 30 },
  ...
]
```

#### 說明

- 最多 12 筆
- 少於 12 筆時，後面補黑色
- 超過 12 筆時，只取前 12 筆
- RGB 範圍統一為 0～30

---

### 9. showBuffer()

顯示目前暫存陣列。

```javascript
window.OSEPLedRingSimulator.showBuffer();
```

#### 對應積木

- 顯示暫存陣列
- 顯示 LED Buffer

---

### 10. getState()

取得目前 LED 狀態。

```javascript
const state = window.OSEPLedRingSimulator.getState();
```

#### 回傳格式

```javascript
[
  { "index": 1, "r": 30, "g": 0, "b": 0 },
  { "index": 2, "r": 0, "g": 30, "b": 0 },
  { "index": 3, "r": 0, "g": 0, "b": 30 }
]
```

---

## 七、LED 指令資料格式

除了直接呼叫 API，也建議定義一種平台無關的 LED 指令格式。

### setLed 指令

```javascript
{
  "type": "setLed",
  "index": 1,
  "r": 30,
  "g": 0,
  "b": 0
}
```

### setAll 指令

```javascript
{
  "type": "setAll",
  "r": 0,
  "g": 0,
  "b": 30
}
```

### clear 指令

```javascript
{
  "type": "clear"
}
```

### showProgress 指令

```javascript
{
  "type": "showProgress",
  "value": 6
}
```

### showScore 指令

```javascript
{
  "type": "showScore",
  "value": 8
}
```

### showLife 指令

```javascript
{
  "type": "showLife",
  "value": 3
}
```

### setBuffer 指令

```javascript
{
  "type": "setBuffer",
  "buffer": [
    { "r": 30, "g": 0, "b": 0 },
    { "r": 0, "g": 30, "b": 0 },
    { "r": 0, "g": 0, "b": 30 }
  ]
}
```

### showBuffer 指令

```javascript
{
  "type": "showBuffer"
}
```

---

## 八、建議中介函式

未來可建立一個共用函式：

```javascript
function dispatchLedCommand(command, options = {}) {
  const targets = options.targets || ["hardware", "simulator"];

  if (targets.includes("hardware")) {
    sendLedCommandToHardware(command);
  }

  if (targets.includes("simulator")) {
    sendLedCommandToSimulator(command);
  }
}
```

### 呼叫範例

```javascript
dispatchLedCommand(
  {
    type: "setLed",
    index: 1,
    r: 30,
    g: 0,
    b: 0
  },
  {
    targets: ["hardware", "simulator"]
  }
);
```

---

## 九、Simulator Transport 設計

負責把 LED 指令轉成模擬器 API 呼叫。

```javascript
function sendLedCommandToSimulator(command) {
  const simulator = window.OSEPLedRingSimulator;

  if (!simulator) {
    return false;
  }

  switch (command.type) {
    case "setLed":
      simulator.setLed(command.index, command.r, command.g, command.b);
      return true;

    case "setAll":
      simulator.setAll(command.r, command.g, command.b);
      return true;

    case "clear":
      simulator.clear();
      return true;

    case "showProgress":
      simulator.showProgress(command.value);
      return true;

    case "showScore":
      simulator.showScore(command.value);
      return true;

    case "showLife":
      simulator.showLife(command.value);
      return true;

    case "setBuffer":
      if (typeof simulator.setBuffer === "function") {
        simulator.setBuffer(command.buffer);
        return true;
      }
      return false;

    case "showBuffer":
      if (typeof simulator.showBuffer === "function") {
        simulator.showBuffer();
        return true;
      }
      return false;

    default:
      return false;
  }
}
```

---

## 十、Hardware Transport 設計方向

Hardware Transport 負責將 LED 指令轉換成目前 ESP8266 韌體可接受的 WebSerial 指令。

本版先不修改硬體通訊協定，只定義概念：

```javascript
function sendLedCommandToHardware(command) {
  // 依照目前 OSEP Scratch Editor 或 Blockly Lab 的 WebSerial runtime 實作
  // 將 command 轉成現有 ESP8266 韌體可接受的訊息格式
}
```

### 注意事項

1. MVP-31-6 不修改韌體。
2. MVP-31-6 不修改 WebSerial runtime。
3. 本版只規劃未來的抽象介面。
4. 未來若要重構，需先比對 OSEP Scratch Editor 與 Blockly Lab 目前 LED 指令格式。

---

## 十一、同步模式規劃

未來可支援三種模式。

### 1. hardware-only

只控制實體硬體。

```javascript
dispatchLedCommand(command, {
  targets: ["hardware"]
});
```

適用情境：

- 正式硬體課堂
- 不需要投影模擬器
- 降低系統負擔

---

### 2. simulator-only

只控制線上模擬器。

```javascript
dispatchLedCommand(command, {
  targets: ["simulator"]
});
```

適用情境：

- 無硬體
- 線上教學
- 學生預習
- 硬體尚未連線

---

### 3. hardware-and-simulator

實體硬體與線上模擬器同步顯示。

```javascript
dispatchLedCommand(command, {
  targets: ["hardware", "simulator"]
});
```

適用情境：

- 教師展示
- 課堂投影
- 除錯
- 學生比較線上模擬與實體輸出

---

## 十二、OSEP Scratch Editor 整合構想

未來整合時，OSEP Scratch Extension 的 LED 積木不應直接寫死只送 WebSerial。

建議流程：

```text
Scratch LED 積木
      ↓
Extension LED 函式
      ↓
dispatchLedCommand()
      ↓
Hardware Transport + Simulator Transport
```

### 可能整合方式

1. 在 Extension 內保留原本硬體控制。
2. 逐步加入可選的 simulator target。
3. 若模擬器不存在，不影響原本硬體功能。
4. 若硬體未連線，可允許 simulator-only 模式。
5. 若硬體已連線，可允許 hardware-and-simulator 模式。

### 最低風險做法

先讓 Extension 嘗試呼叫模擬器，但失敗時不報錯：

```javascript
try {
  if (window.OSEPLedRingSimulator) {
    window.OSEPLedRingSimulator.setLed(index, r, g, b);
  }
} catch (error) {
  // 不影響硬體控制
}
```

---

## 十三、Blockly Lab 整合構想

Blockly Lab 目前有自己的 SmartRing runtime。

未來應避免重新寫一套模擬器，而是透過同一套 API：

```javascript
window.OSEPLedRingSimulator.setLed(index, r, g, b);
```

或共用指令：

```javascript
dispatchLedCommand(command, {
  targets: ["hardware", "simulator"]
});
```

### Blockly Lab 整合重點

1. 保留現有 SmartRing runtime。
2. 新增 simulator target。
3. 積木產生的 LED 指令可同時送硬體與模擬器。
4. RGB 範圍維持 0～30。
5. 可在平台側設定硬體模式、模擬模式或同步模式。

---

## 十四、模擬器嵌入方式

未來若要讓 Scratch Editor 或 Blockly Lab 顯示模擬器，可評估三種方式。

### 方案 A｜新分頁開啟模擬器

最簡單，風險最低。

缺點是跨分頁同步較麻煩，可能需要 `postMessage` 或 BroadcastChannel。

### 方案 B｜iframe 內嵌模擬器

平台頁面以 iframe 載入模擬器：

```html
<iframe src="./simulator/" title="OSEP LED 燈環模擬器"></iframe>
```

可用 `postMessage` 傳送 LED 指令。

優點是模擬器可獨立維護。

### 方案 C｜直接載入共用 JS 模組

將模擬器核心抽成 JS 模組，由 Scratch Editor 或 Blockly Lab 直接引用。

優點是整合度高。

缺點是兩邊建置流程不同，初期風險較高。

---

## 十五、跨頁同步建議

如果未來模擬器與控制平台不在同一個頁面，需要跨頁同步。

可評估：

### 1. window.postMessage

適合 iframe。

```javascript
iframe.contentWindow.postMessage({
  source: "OSEP",
  type: "ledCommand",
  command
}, "*");
```

### 2. BroadcastChannel

適合同網域不同分頁。

```javascript
const channel = new BroadcastChannel("osep-led-ring");

channel.postMessage({
  type: "ledCommand",
  command
});
```

### 3. localStorage event

可作為備用方案，但不建議優先使用。

---

## 十六、安全與穩定性原則

### 1. 模擬器不存在時不得中斷硬體控制

如果沒有模擬器，LED 指令仍應正常送到實體硬體。

### 2. 硬體未連線時模擬器仍可運作

無硬體情境下，學生仍可使用模擬器學習。

### 3. 指令範圍自動修正

所有 RGB 應限制在 0～30。

所有 LED index 應限制在 1～12。

### 4. 不修改已穩定的 WebSerial 協定

MVP-31-6 不調整韌體與 WebSerial 協定。

### 5. 避免硬編碼 GitHub Pages 路徑

整合模擬器時，仍應避免：

```text
/osep/...
https://tnjbox.github.io/osep/...
```

應優先使用相對路徑或動態 base path。

---

## 十七、MVP-31-6 結論

MVP-31-6 定案如下：

1. 模擬器最終方向是軟硬體同步。
2. OSEP Scratch Editor 與 Blockly Lab 應共用同一套 LED 模擬器 API。
3. RGB 教學範圍統一維持 0～30。
4. 未來透過 LED Command Adapter 將積木指令轉成平台無關的 LED command。
5. LED command 可分別送到 Hardware Transport 與 Simulator Transport。
6. 未來支援三種模式：
   - hardware-only
   - simulator-only
   - hardware-and-simulator
7. MVP-31-6 不直接修改 Extension、Blockly Lab 或 WebSerial runtime。
8. 下一步可進入 MVP-31-7 或 MVP-32，開始評估最小風險的同步實作方式。

---

## 十八、後續版本建議

### MVP-31-7｜補強模擬器 setBuffer / showBuffer

讓第一版模擬器支援暫存陣列。

### MVP-31-8｜建立 LED command adapter 原型

先在模擬器頁面內測試 command dispatch。

### MVP-31-9｜評估 OSEP Scratch Extension simulator-only 模式

不影響硬體控制的前提下，讓 Extension 可嘗試呼叫模擬器。

### MVP-32-1｜Blockly Lab 模擬器共用介面評估

整理 Blockly Lab 現有 SmartRing runtime，評估與 OSEP 模擬器 API 共用的方式。
