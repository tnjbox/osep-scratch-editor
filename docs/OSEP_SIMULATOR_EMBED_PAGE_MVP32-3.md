# MVP-32-3｜建立 LED 模擬器 embed 精簡頁

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-3  
狀態：新增 iframe 專用精簡模擬器頁  
更新日期：2026-06-24

---

## 一、任務目標

本版目標是建立一個專門給 Scratch 練習頁 iframe 使用的 LED 模擬器精簡頁。

正式掛在 Scratch 練習頁時，模擬器的角色應該是：

```text
顯示裝置
```

控制來源應該是：

```text
Scratch OSEP 積木
```

因此 iframe 內不應該再提供測試按鈕、手動控制面板或大量說明，避免學生混淆控制來源。

---

## 二、本版新增檔案

```text
static/osep/simulator/embed.html
```

---

## 三、embed 精簡頁設計原則

### 保留

```text
WS2812 12 顆 LED 燈環
簡短標題
簡短狀態文字
postMessage 接收能力
```

### 移除

```text
手動測試按鈕
RGB 輸入控制項
BroadcastChannel 測試區
command log
大型說明段落
除錯面板
```

---

## 四、與完整模擬器頁的分工

### 完整測試頁

```text
/osep/simulator/
```

用途：

```text
開發測試
教師檢查
BroadcastChannel 測試
postMessage 測試
手動測試 command
```

### iframe 精簡頁

```text
/osep/simulator/embed.html
```

用途：

```text
嵌入 Scratch 練習頁
只顯示 LED 燈環
由 Scratch 積木控制
```

---

## 五、支援的 LED command

embed 頁支援下列 command：

```text
setLed
setAll
clear
showProgress
showScore
showLife
setBuffer
showBuffer
```

---

## 六、postMessage 訊息格式

### 單一指令

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

### 多筆指令

```javascript
frame.contentWindow.postMessage(
  {
    source: "OSEP",
    type: "ledCommands",
    commands: [
      {
        type: "setBuffer",
        buffer: [
          { r: 30, g: 0, b: 0 },
          { r: 0, g: 30, b: 0 }
        ]
      },
      {
        type: "showBuffer"
      }
    ]
  },
  window.location.origin
);
```

---

## 七、測試方式

### 1. 直接開啟 embed 頁

```text
https://tnjbox.github.io/osep-scratch-editor/osep/simulator/embed.html
```

應看到：

```text
SmartRing LED 模擬器
WS2812 × 12
12 顆 LED 燈環
等待 Scratch 指令
```

### 2. Console 檢查

```javascript
window.OSEPEmbedSimulator.getStatus()
```

預期：

```javascript
{
  version: "MVP-32-3",
  ready: true,
  mode: "embed"
}
```

### 3. 直接測試 command

在 embed 頁 Console：

```javascript
window.dispatchLedCommand({
  type: "setLed",
  index: 1,
  r: 30,
  g: 0,
  b: 0
});
```

預期：

```text
第 1 顆 LED 亮紅色
```

### 4. 從 parent 頁測試 iframe

開啟：

```text
https://tnjbox.github.io/osep-scratch-editor/osep/
```

Console 輸入：

```javascript
const frame = document.createElement("iframe");
frame.src = "./simulator/embed.html";
frame.style.width = "320px";
frame.style.height = "360px";
frame.style.position = "fixed";
frame.style.right = "16px";
frame.style.bottom = "16px";
frame.style.zIndex = "9999";
frame.style.border = "0";
frame.style.borderRadius = "16px";
frame.style.overflow = "hidden";
document.body.appendChild(frame);
```

等 iframe 載入後：

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

預期：

```text
iframe 內第 1 顆 LED 亮紅色
```

---

## 八、Git 收尾

```powershell
git status
git add static/osep/simulator/embed.html docs/OSEP_SIMULATOR_EMBED_PAGE_MVP32-3.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-3 add embed LED simulator page"
git push
git status
```

---

## 九、部署

```powershell
npm run deploy:osep -- "MVP-32-3 add embed LED simulator page"
```

---

## 十、下一版建議

下一版建議：

```text
MVP-32-4｜建立 iframe embed 測試頁
```

新增一個正式測試 parent 頁：

```text
static/osep/simulator-embed-test.html
```

用途：

1. 嵌入 `/osep/simulator/embed.html`
2. 提供測試按鈕
3. 驗證 parent → iframe → LED 顯示流程
4. 作為進入 Scratch Editor 同框前的中介測試頁
