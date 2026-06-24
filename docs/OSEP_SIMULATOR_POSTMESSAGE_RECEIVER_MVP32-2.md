# MVP-32-2｜建立模擬器 postMessage 接收端

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-2  
狀態：新增模擬器端 postMessage receiver  
更新日期：2026-06-24

---

## 一、任務目標

本版目標是在 LED 燈環模擬器頁面新增 `postMessage` 接收能力，讓未來 iframe parent 頁面可以傳送 LED command 給模擬器。

本版只處理「模擬器 iframe 端接收訊息」，不修改 Scratch Editor UI，也不修改 Extension。

---

## 二、本版新增檔案

```text
static/osep/simulator/led-postmessage-bridge.js
```

功能：

1. 監聽 `window.message` 事件。
2. 檢查訊息來源是否同源。
3. 檢查訊息格式是否為 OSEP message。
4. 支援 `ledCommand`。
5. 支援 `ledCommands`。
6. 支援 `getStatus`。
7. 將 LED command 轉交給既有 `window.dispatchLedCommand()` 或 `window.OSEPLedCommandAdapter.dispatchLedCommand()`。

---

## 三、本版修改檔案

```text
static/osep/simulator/index.html
```

在模擬器頁面底部載入：

```html
<script src="./led-postmessage-bridge.js"></script>
```

建議順序：

```html
<script src="./simulator.js"></script>
<script src="./led-command-adapter.js"></script>
<script src="./led-sync-channel.js"></script>
<script src="./led-postmessage-bridge.js"></script>
</body>
</html>
```

---

## 四、訊息格式

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

### 狀態查詢

```javascript
{
  source: "OSEP",
  type: "getStatus"
}
```

---

## 五、安全設計

本版先採同源限制：

```javascript
event.origin === window.location.origin
```

也就是 parent 頁與 iframe 頁必須同源。

目前 GitHub Pages 情境符合：

```text
https://tnjbox.github.io/osep-scratch-editor/osep/
https://tnjbox.github.io/osep-scratch-editor/osep/simulator/
```

兩者 origin 都是：

```text
https://tnjbox.github.io
```

本機開發時，例如：

```text
http://localhost:3000
```

只要 parent 與 iframe 都在同一個 origin，也可通過。

---

## 六、測試方式一：直接檢查模擬器 Console

開啟：

```text
https://tnjbox.github.io/osep-scratch-editor/osep/simulator/
```

Console 輸入：

```javascript
window.OSEPLedPostMessageBridge.getStatus()
```

預期看到：

```javascript
{
  version: "MVP-32-2",
  started: true,
  source: "OSEP",
  origin: "...",
  hasDispatchLedCommand: true,
  hasCommandAdapter: true
}
```

其中 `hasDispatchLedCommand` 或 `hasCommandAdapter` 至少應該有一個為 `true`。

---

## 七、測試方式二：先用臨時 iframe 測試碼

因為本版還沒有正式建立 iframe 測試頁，可以先在同源頁面 Console 建立 iframe 測試。

開啟：

```text
https://tnjbox.github.io/osep-scratch-editor/osep/
```

Console 輸入：

```javascript
const frame = document.createElement("iframe");
frame.src = "./simulator/";
frame.style.width = "420px";
frame.style.height = "420px";
frame.style.position = "fixed";
frame.style.right = "16px";
frame.style.bottom = "16px";
frame.style.zIndex = "9999";
frame.style.background = "white";
document.body.appendChild(frame);
```

等 iframe 載入後，再輸入：

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

預期結果：

```text
iframe 內的模擬器第 1 顆 LED 亮紅色
```

---

## 八、回測 BroadcastChannel

MVP-32-2 不應破壞原本 BroadcastChannel 功能。

請回測：

```javascript
const channel = new BroadcastChannel("osep-led-ring");

channel.postMessage({
  source: "OSEP",
  type: "ledCommand",
  command: {
    type: "setLed",
    index: 2,
    r: 0,
    g: 30,
    b: 0
  }
});
```

預期：

```text
模擬器第 2 顆 LED 亮綠色
```

---

## 九、Git 收尾

測試成功後：

```powershell
git status
git add static/osep/simulator/index.html static/osep/simulator/led-postmessage-bridge.js docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-2 add simulator postMessage receiver"
git push
git status
```

若也新增本文件：

```powershell
git add docs/OSEP_SIMULATOR_POSTMESSAGE_RECEIVER_MVP32-2.md
```

---

## 十、下一版建議

下一版建議進入：

```text
MVP-32-3｜建立獨立 iframe 測試頁
```

建議新增：

```text
static/osep/simulator-iframe-test.html
```

功能：

1. 同頁嵌入 LED 模擬器 iframe。
2. 提供測試按鈕。
3. 用 postMessage 傳送 LED command。
4. 驗證 iframe receiver 是否穩定。
