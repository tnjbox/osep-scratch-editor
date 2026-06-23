# MVP-31-12｜評估 Extension 發送 BroadcastChannel 指令

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-31-12  
狀態：規劃文件  
更新日期：2026-06-24

---

## 一、任務目標

本版目標是評估 OSEP Scratch Extension 是否能在不影響實體硬體控制的前提下，將 LED 積木指令透過 BroadcastChannel 發送給線上 LED 燈環模擬器。

前一版 MVP-31-11 已完成：

1. 模擬器端建立 `BroadcastChannel` 監聽。
2. 頻道名稱固定為 `osep-led-ring`。
3. 模擬器可接收同源頁面送出的 LED command。
4. 模擬器可根據 command 更新 LED 顯示。

本版要評估下一步：

```text
OSEP Scratch Extension LED 積木
        ↓
轉成 LED command
        ↓
BroadcastChannel("osep-led-ring")
        ↓
線上 LED 燈環模擬器
```

---

## 二、目前已完成基礎

### 1. 模擬器端 API

目前模擬器已支援：

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

### 2. LED Command Adapter

目前模擬器已支援：

```javascript
window.dispatchLedCommand({
  type: "setLed",
  index: 1,
  r: 30,
  g: 0,
  b: 0
});
```

### 3. BroadcastChannel 同步接收

目前模擬器已支援接收：

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

---

## 三、BroadcastChannel 在本專案中的定位

BroadcastChannel 不是 UDP，也不是硬體通訊。

它是瀏覽器內部同源分頁之間的訊息通道。

本專案中，BroadcastChannel 的角色是短期原型：

```text
Scratch Editor 分頁
        ↓
BroadcastChannel
        ↓
模擬器分頁
```

它用來驗證：

1. LED command 格式是否穩定。
2. Extension 是否能產生模擬器可理解的 command。
3. 模擬器是否能跨頁接收並顯示。
4. 未來是否可進一步改成 iframe + postMessage 同框顯示。

正式教學整合的中期方向仍建議是：

```text
Scratch Editor + iframe 模擬器同框
        ↓
postMessage 傳送 LED command
```

---

## 四、MVP-31-12 不直接修改 Extension 的原因

`extensionV22C17.js` 是目前已穩定的核心檔案，負責：

1. Scratch Extension 積木定義。
2. OSEP SmartRing 硬體控制。
3. WebSerial 資料送出。
4. LED 指令處理。
5. 按鍵狀態讀取。
6. GitHub Pages unsandboxed mode。

若直接修改，可能造成：

1. Extension 無法載入。
2. WebSerial 失效。
3. 硬體控制失效。
4. GitHub Pages unsandboxed mode 出錯。
5. 學生任務檔無法開啟。

因此本版只做設計規劃，下一版才進入最小實作。

---

## 五、Extension 發送 BroadcastChannel 的設計原則

### 原則一：不影響硬體控制

即使 BroadcastChannel 失敗，原本硬體 LED 控制仍須正常。

### 原則二：模擬器沒開也不能報錯

如果學生沒有打開模擬器分頁，Extension 不應中斷 Scratch 執行。

### 原則三：瀏覽器不支援時直接略過

如果瀏覽器不支援 BroadcastChannel，直接 return false。

### 原則四：RGB 範圍仍維持 0～30

Extension 送出的 command 應使用教學範圍：

```text
RGB：0～30
```

### 原則五：先不新增積木

第一階段不新增「模式切換積木」，先用內部函式測試。

---

## 六、建議 Extension 內部新增函式

未來可在 `extensionV22C17.js` 內部新增：

```javascript
function sendLedCommandToSimulator(command) {
  if (typeof BroadcastChannel !== "function") {
    return false;
  }

  try {
    const channel = new BroadcastChannel("osep-led-ring");

    channel.postMessage({
      source: "OSEP",
      type: "ledCommand",
      command
    });

    channel.close();

    return true;
  } catch (error) {
    return false;
  }
}
```

### 設計說明

1. 每次需要發送時建立 channel。
2. 發送後立即 close。
3. 不長期持有 channel，降低狀態管理風險。
4. 若失敗，回傳 false。
5. 不丟出錯誤。
6. 不影響原有硬體控制。

---

## 七、LED 積木對應 command

### 1. 設定單顆 LED

Extension 積木概念：

```text
設定第 N 顆 LED RGB 為 R G B
```

對應 command：

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

Extension 積木概念：

```text
設定全部 LED 為 R G B
```

對應 command：

```javascript
{
  type: "setAll",
  r: R,
  g: G,
  b: B
}
```

---

### 3. 清除全部 LED

Extension 積木概念：

```text
清除全部 LED
```

對應 command：

```javascript
{
  type: "clear"
}
```

---

### 4. 顯示進度條

Extension 積木概念：

```text
顯示進度條 value
```

對應 command：

```javascript
{
  type: "showProgress",
  value: value
}
```

---

### 5. 顯示分數

Extension 積木概念：

```text
顯示分數 value
```

對應 command：

```javascript
{
  type: "showScore",
  value: value
}
```

---

### 6. 顯示生命值

Extension 積木概念：

```text
顯示生命值 value
```

對應 command：

```javascript
{
  type: "showLife",
  value: value
}
```

---

### 7. 暫存陣列設定單顆

Extension 積木概念：

```text
暫存陣列設定第 N 顆 LED RGB 為 R G B
```

對應 command：

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

Extension 積木概念：

```text
清除暫存陣列
```

對應 command：

```javascript
{
  type: "clearBuffer"
}
```

---

### 9. 顯示暫存陣列

Extension 積木概念：

```text
顯示暫存陣列
```

對應 command：

```javascript
{
  type: "showBuffer"
}
```

---

## 八、建議最小實作範圍

下一版 MVP-31-13 若要進入實作，建議只同步最安全的三個指令：

1. `setAll`
2. `clear`
3. `showProgress`

不建議一開始就同步所有 LED 積木。

### 原因

1. `setAll` 最容易觀察。
2. `clear` 最容易驗證。
3. `showProgress` 能測試參數轉換。
4. 不會立刻碰到 buffer 細節。
5. 失敗時容易還原。

---

## 九、建議 MVP-31-13 實作位置

未來若要實作，修改範圍應限制在：

```text
static/osep/extensions/extensionV22C17.js
```

先只新增：

1. `sendLedCommandToSimulator(command)`
2. 在 `setAll` 類 LED 函式中補送 command
3. 在 `clear` 類函式中補送 command
4. 在 `showProgress` 類函式中補送 command

不要修改：

1. trusted path
2. WebSerial core
3. Scratch Editor UI
4. 韌體
5. Blockly Lab

---

## 十、未來模式切換設計

長期可設計三種輸出模式：

```javascript
let osepLedOutputMode = "hardware-only";
```

可選：

```javascript
"hardware-only"
"simulator-only"
"hardware-and-simulator"
```

### 但 MVP-31-13 不建議加入模式切換

下一版若要最小實作，可先採「不影響硬體的旁路同步」：

```text
硬體照原本方式送出
同時嘗試送一份 command 到 BroadcastChannel
送失敗也不影響硬體
```

這比較接近：

```text
hardware-and-simulator 的原型
```

但沒有模式切換 UI。

---

## 十一、風險控管

### 1. 修改前先備份 Extension

修改 `extensionV22C17.js` 前，應先另存備份或確認 Git 狀態乾淨。

### 2. 只做小範圍插入

不要整個重寫 Extension。

### 3. 每接一個 command 就測一次

順序建議：

1. `clear`
2. `setAll`
3. `showProgress`

### 4. 保持硬體可用

每次測試都要確認：

1. Scratch Extension 可載入。
2. C01 任務可開啟。
3. 有硬體時 WebSerial 不受影響。
4. 沒硬體時 Scratch 不報錯。
5. 模擬器開啟時可同步。

---

## 十二、測試設計

### 測試環境

開兩個分頁：

#### 分頁 A：模擬器

```text
https://tnjbox.github.io/osep-scratch-editor/osep/simulator/
```

#### 分頁 B：Scratch 任務

```text
https://tnjbox.github.io/osep-scratch-editor/editor.html?extension=...&project_url=...
```

### 測試項目

1. 模擬器分頁開啟。
2. Scratch 任務開啟。
3. Extension 成功載入。
4. 執行 LED 清除積木。
5. 模擬器同步清除。
6. 執行設定全部顏色積木。
7. 模擬器同步變色。
8. 執行進度條積木。
9. 模擬器同步顯示進度條。
10. Scratch 不報錯。
11. 硬體控制不受影響。

---

## 十三、MVP-31-12 結論

本版結論如下：

1. Extension 發送 BroadcastChannel 指令技術上可行。
2. 下一版可先做最小實作，不需要一次同步所有 LED 積木。
3. 建議 MVP-31-13 只同步 `setAll`、`clear`、`showProgress`。
4. 發送函式必須採安全失敗設計。
5. 模擬器沒開時不能影響 Scratch。
6. BroadcastChannel 不應取代 WebSerial。
7. 中期正式整合仍以 iframe + postMessage 為方向。
8. 長期目標是 OSEP Scratch Editor 與 Blockly Lab 共用 LED 指令核心。

---

## 十四、下一版建議

下一版建議：

```text
MVP-31-13｜Extension 最小同步原型：setAll / clear / showProgress
```

建議實作原則：

1. 修改範圍只限 `extensionV22C17.js`。
2. 新增安全發送函式。
3. 只接三個最容易測試的 LED 指令。
4. 不新增積木。
5. 不改 WebSerial。
6. 不改 Scratch Editor UI。
7. 不改韌體。
