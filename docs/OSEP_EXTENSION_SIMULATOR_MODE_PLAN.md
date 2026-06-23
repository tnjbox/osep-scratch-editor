# MVP-31-9｜評估 OSEP Scratch Extension simulator-only 模式

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-31-9  
狀態：規劃文件  
更新日期：2026-06-23

---

## 一、任務目標

本版目標是評估 OSEP Scratch Extension 是否能支援 `simulator-only` 模式。

所謂 `simulator-only`，是指學生沒有 SmartRingController 實體硬體時，Scratch LED 積木仍可透過線上 LED 燈環模擬器顯示結果。

最終目標不是取代硬體，而是讓 OSEP Scratch Editor 支援三種 LED 輸出模式：

1. `hardware-only`：只控制實體硬體。
2. `simulator-only`：只控制線上模擬器。
3. `hardware-and-simulator`：實體硬體與線上模擬器同步顯示。

---

## 二、目前狀態

### 1. 已完成項目

目前已完成下列基礎：

- GitHub Pages 教材入口穩定。
- C01 課前連線測試可正常開啟。
- OSEP Scratch Extension 可在 GitHub Pages 以 unsandboxed mode 載入。
- 第一版線上 LED 燈環模擬器已建立。
- 模擬器支援 12 顆 LED 顯示。
- 模擬器支援 RGB 教學數值 0～30。
- 模擬器已支援 `setBuffer()` / `showBuffer()`。
- 已建立 `LED Command Adapter` 原型。
- 已建立 `window.dispatchLedCommand(command)`。

### 2. 目前模擬器 API

模擬器目前已具備：

```javascript
window.OSEPLedRingSimulator.setLed(index, r, g, b);
window.OSEPLedRingSimulator.setAll(r, g, b);
window.OSEPLedRingSimulator.clear();
window.OSEPLedRingSimulator.showProgress(value);
window.OSEPLedRingSimulator.showScore(value);
window.OSEPLedRingSimulator.showLife(value);
window.OSEPLedRingSimulator.setBuffer(buffer);
window.OSEPLedRingSimulator.showBuffer();
window.OSEPLedRingSimulator.getSnapshot();
```

### 3. 目前 Command Adapter

目前已具備：

```javascript
window.dispatchLedCommand({
  type: "setLed",
  index: 1,
  r: 30,
  g: 0,
  b: 0
});
```

Command Adapter 目前預設只送到 simulator target。

---

## 三、為什麼 MVP-31-9 先不直接修改 Extension

`extensionV22C17.js` 是目前 OSEP Scratch Editor 連接 SmartRingController 的核心檔案。

它牽涉到：

1. Scratch Extension 積木定義。
2. WebSerial 連線。
3. ESP8266 JSON 通訊。
4. LED 指令送出。
5. 按鍵狀態讀取。
6. unsandboxed mode。
7. GitHub Pages trusted path。

因此 MVP-31-9 不建議直接修改 Extension。

本版先評估：

1. 哪些 Extension LED 積木可以轉成 LED command。
2. simulator-only 模式應放在哪一層。
3. 如何避免影響硬體模式。
4. 如何讓模擬器不存在時不報錯。
5. 未來最小修改範圍。

---

## 四、Extension 與模擬器的整合目標

未來理想流程：

```text
Scratch LED 積木
      ↓
OSEP Scratch Extension LED 函式
      ↓
LED Command Adapter
      ↓
Simulator Transport
      ↓
OSEP LED 燈環模擬器
```

若有硬體，則可擴充為：

```text
Scratch LED 積木
      ↓
OSEP Scratch Extension LED 函式
      ↓
LED Command Adapter
      ↓
Hardware Transport + Simulator Transport
      ↓
ESP8266 LED + 線上模擬器同步顯示
```

---

## 五、建議模式設計

### 1. hardware-only

只控制實體硬體。

這是目前 OSEP Scratch Extension 的主要模式。

```text
Scratch LED 積木
      ↓
Extension
      ↓
WebSerial
      ↓
ESP8266 SmartRingController
```

適用情境：

- 正式課堂
- 學生有實體硬體
- 不需要線上模擬器
- 保持目前穩定行為

---

### 2. simulator-only

只控制線上模擬器。

```text
Scratch LED 積木
      ↓
Extension
      ↓
LED Command Adapter
      ↓
OSEP LED 燈環模擬器
```

適用情境：

- 學生沒有硬體
- 線上教學
- 課前預習
- 硬體數量不足
- 教師示範 LED 陣列概念

---

### 3. hardware-and-simulator

實體硬體與線上模擬器同步顯示。

```text
Scratch LED 積木
      ↓
Extension
      ↓
LED Command Adapter
      ↓
Hardware Transport + Simulator Transport
      ↓
ESP8266 LED + 線上模擬器
```

適用情境：

- 教師投影展示
- 課堂示範
- 除錯
- 學生比較實體硬體與線上模擬是否一致

---

## 六、建議先採用的最低風險模式

MVP-31-9 建議先評估 `simulator-only`，不要立刻做 `hardware-and-simulator`。

原因：

1. `simulator-only` 不必接觸 WebSerial。
2. `simulator-only` 不會改變硬體控制邏輯。
3. 可以先驗證 Scratch LED 積木能否轉成 LED command。
4. 成功後再逐步擴充同步硬體。

---

## 七、Extension 可能需要新增的模式變數

未來 Extension 可考慮新增一個內部模式變數：

```javascript
let osepOutputMode = "hardware-only";
```

可接受值：

```javascript
"hardware-only"
"simulator-only"
"hardware-and-simulator"
```

### 預設值建議

預設值應維持：

```javascript
"hardware-only"
```

原因是避免影響目前已穩定的實體硬體教學。

---

## 八、Extension 可能新增的積木

未來可以考慮新增一個模式切換積木：

```text
設定 OSEP 輸出模式為 [硬體 / 模擬器 / 硬體+模擬器]
```

但 MVP-31-9 不建議立即新增積木。

較安全做法是先在程式內部測試模式變數，確認穩定後再決定是否公開成積木。

---

## 九、Extension LED 積木對應 LED command

### 1. 設定單顆 LED

Scratch 積木概念：

```text
設定第 N 顆 LED RGB 為 R G B
```

可轉成：

```javascript
{
  type: "setLed",
  index: N,
  r: R,
  g: G,
  b: B
}
```

---

### 2. 設定全部 LED

Scratch 積木概念：

```text
設定全部 LED 為 R G B
```

可轉成：

```javascript
{
  type: "setAll",
  r: R,
  g: G,
  b: B
}
```

---

### 3. 清除全部

Scratch 積木概念：

```text
清除全部 LED
```

可轉成：

```javascript
{
  type: "clear"
}
```

---

### 4. 顯示進度條

Scratch 積木概念：

```text
顯示進度條 value
```

可轉成：

```javascript
{
  type: "showProgress",
  value: value
}
```

---

### 5. 顯示分數

Scratch 積木概念：

```text
顯示分數 value
```

可轉成：

```javascript
{
  type: "showScore",
  value: value
}
```

---

### 6. 顯示生命值

Scratch 積木概念：

```text
顯示生命值 value
```

可轉成：

```javascript
{
  type: "showLife",
  value: value
}
```

---

### 7. 設定暫存陣列單顆 LED

Scratch 積木概念：

```text
暫存陣列設定第 N 顆 LED RGB 為 R G B
```

可轉成：

```javascript
{
  type: "setBufferLed",
  index: N,
  r: R,
  g: G,
  b: B
}
```

---

### 8. 清除暫存陣列

Scratch 積木概念：

```text
清除暫存陣列
```

可轉成：

```javascript
{
  type: "clearBuffer"
}
```

---

### 9. 顯示暫存陣列

Scratch 積木概念：

```text
顯示暫存陣列
```

可轉成：

```javascript
{
  type: "showBuffer"
}
```

---

## 十、建議新增 Extension 內部輔助函式

未來若要實作，Extension 可新增一個內部函式：

```javascript
function dispatchOsepLedCommand(command) {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.dispatchLedCommand !== "function") {
    return false;
  }

  try {
    window.dispatchLedCommand(command, {
      targets: ["simulator"]
    });

    return true;
  } catch (error) {
    return false;
  }
}
```

### 設計重點

1. 如果 `window.dispatchLedCommand` 不存在，直接 return false。
2. 不拋出錯誤。
3. 不影響原本硬體控制。
4. 不影響 Scratch 執行。
5. 不影響 unsandboxed mode。

---

## 十一、模擬器與 Scratch Editor 是否在同一頁的問題

目前 LED 模擬器是獨立頁面：

```text
/osep/simulator/
```

而 Scratch Editor 任務頁通常是：

```text
/editor.html?...project_url=...
```

這代表兩者不一定在同一個頁面。

若要讓 Extension 呼叫：

```javascript
window.dispatchLedCommand(...)
```

必須考慮模擬器是否存在於同一頁。

### 情境 A：模擬器與 Extension 同頁

若未來將模擬器嵌入 Scratch Editor，則 Extension 可以直接呼叫 `window.dispatchLedCommand()`。

優點：

- 最直接
- 技術複雜度低
- 不需要跨頁通訊

缺點：

- 需要修改 Scratch Editor UI
- 風險較高

### 情境 B：模擬器在 iframe

若 Scratch Editor 內嵌 iframe 模擬器，可用 `postMessage` 傳送 LED command。

優點：

- 模擬器可維持獨立頁
- UI 可整合在 Editor 中
- 未來 Blockly Lab 也可使用 iframe

缺點：

- 需要設計 `postMessage` 協定
- 需要處理 iframe 載入狀態

### 情境 C：模擬器在另一個分頁

可使用 `BroadcastChannel`。

優點：

- 不需大幅修改 Editor UI
- 教師可開兩個分頁展示

缺點：

- 教學操作較複雜
- 需要確認瀏覽器支援與同源限制

---

## 十二、MVP-31-9 建議結論

MVP-31-9 不直接進入 Extension 程式修改。

本版結論如下：

1. `simulator-only` 模式可行，但需要先解決模擬器與 Scratch Editor 是否同頁的問題。
2. 若模擬器不在同一頁，Extension 無法直接呼叫目前的 `window.dispatchLedCommand()`。
3. 最低風險路線是先不改 Extension，下一版先評估跨頁同步方式。
4. 若要最終整合，建議優先考慮 iframe 或 BroadcastChannel。
5. Extension 端未來應新增安全輔助函式，嘗試呼叫模擬器，但不得影響硬體控制。
6. 預設模式仍應維持 `hardware-only`。
7. `simulator-only` 可作為未來無硬體教學模式。
8. `hardware-and-simulator` 可作為後續教師展示與除錯模式。

---

## 十三、下一版建議

下一版建議進入：

```text
MVP-31-10｜評估模擬器跨頁同步方式
```

重點比較：

1. iframe + postMessage
2. BroadcastChannel
3. localStorage event
4. 直接內嵌共用 JS 模組

建議先做技術評估，再決定是否進入 Extension 程式修改。

---

## 十四、暫不實作項目

MVP-31-9 暫不實作：

- 不修改 `extensionV22C17.js`
- 不修改 `tw-security-manager.jsx`
- 不修改 WebSerial runtime
- 不修改 ESP8266 韌體
- 不修改 Blockly Lab
- 不修改 Scratch Editor UI
- 不新增積木
- 不改首頁
