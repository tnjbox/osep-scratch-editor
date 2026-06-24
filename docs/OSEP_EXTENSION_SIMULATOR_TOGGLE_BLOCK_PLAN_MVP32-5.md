# MVP-32-5｜規劃 Extension 端開關模擬器積木與手動關閉機制

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-5  
狀態：架構規劃文件  
更新日期：2026-06-24

---

## 一、任務背景

MVP-32-1～MVP-32-4 已完成 iframe + postMessage 同框模擬器的技術驗證：

```text
MVP-32-1：規劃 iframe + postMessage 同框模擬器
MVP-32-2：建立模擬器 postMessage 接收端
MVP-32-3：建立 LED 模擬器 embed 精簡頁
MVP-32-4：建立 iframe embed 測試頁
```

接下來要回到正式 Scratch 練習頁的使用情境。

正式設計原則：

```text
一般 Scratch 任務維持原本介面。
只有載入 SmartRingController / OSEP 擴充後，才提供開啟模擬硬體的能力。
```

---

## 二、任務目標

本版規劃 Extension 端新增一個「開啟 / 關閉模擬硬體」積木，讓學生可以在 Scratch 練習頁中自行控制 SmartRing 模擬器面板。

預期行為：

```text
第一次執行積木
        ↓
開啟模擬器浮動視窗

第二次執行積木
        ↓
關閉模擬器浮動視窗

按模擬器視窗右上角 X
        ↓
手動關閉模擬器浮動視窗
```

---

## 三、為什麼採用 Extension 積木，而不是先改工具列

### 1. 工具列按鈕優點

```text
使用體驗直覺
不用拖曳積木
適合正式平台
```

### 2. 工具列按鈕風險

```text
需要修改 Scratch Editor / TurboWarp GUI
需要找到工具列元件位置
UI 結構較複雜
改版風險高
```

### 3. Extension 積木優點

```text
只需修改 extensionV22C17.js
不需大改 Scratch Editor UI
測試風險低
失敗時容易回復
符合目前 MVP 小步迭代策略
```

### 4. 本階段建議

本階段先採用：

```text
Extension 積木：開啟 / 關閉模擬硬體
```

工具列按鈕保留到後續正式版再評估。

---

## 四、建議新增積木

### 積木名稱

建議名稱：

```text
開啟 / 關閉模擬硬體
```

候選名稱比較：

| 名稱 | 優點 | 缺點 | 建議 |
|---|---|---|---|
| 開啟 / 關閉模擬硬體 | 學生容易理解 | 字稍長 | 建議採用 |
| 切換 SmartRing 模擬器 | 專案名稱清楚 | 「切換」對低年級較抽象 | 可作備用 |
| 開啟 LED 模擬器 | 簡短 | 第二次會關閉，語意不完整 | 不建議 |

---

## 五、建議放置位置

建議放在 OSEP Extension 的「共同積木區」靠近連線積木的位置：

```text
共同積木區：連線、輸入、角色控制與循環計數
├── 連接 ESP8266
├── ESP8266 已連線？
├── 開啟 / 關閉模擬硬體
└── ...
```

理由：

1. 模擬硬體與連線屬於同一類「執行環境設定」。
2. 學生進入任務後，容易在最上方看到。
3. 不會混入 LED 控制積木，避免誤以為它是燈光效果。

---

## 六、模擬器浮動視窗設計

第一次執行積木時，Extension 在 Scratch 練習頁建立一個浮動面板。

建議 DOM 結構：

```html
<div id="osep-simulator-panel">
  <div id="osep-simulator-panel-header">
    <span>SmartRing 模擬硬體</span>
    <button id="osep-simulator-panel-close">×</button>
  </div>
  <iframe
    id="osep-simulator-frame"
    src=".../osep/simulator/embed.html"
  ></iframe>
</div>
```

---

## 七、手動關閉機制

除了執行積木第二次關閉，也需要提供手動關閉按鈕。

建議右上角提供：

```text
×
```

使用情境：

```text
學生覺得面板擋住舞台
        ↓
直接按 X 關閉

教師投影時臨時不想顯示
        ↓
直接按 X 關閉

學生忘記積木在哪裡
        ↓
仍可手動關閉
```

手動關閉時應該：

1. 移除浮動面板 DOM。
2. 將 Extension 內部狀態設為未開啟。
3. 後續再次執行積木時，可以重新開啟。

---

## 八、面板位置建議

第一版建議使用右下角浮動面板：

```text
position: fixed
right: 16px
bottom: 16px
width: 320px
height: 390px
z-index: 9999
```

理由：

1. 不破壞 Scratch Editor 原版 layout。
2. 不需要分析 React 元件階層。
3. 測試失敗時容易回復。
4. 可視為「同框模擬器原型」。
5. 後續可再改為拖曳、收合或側邊欄。

---

## 九、建議樣式

第一版可簡潔：

```css
#osep-simulator-panel {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 320px;
  height: 390px;
  z-index: 9999;
  background: #0f172a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.35);
}

#osep-simulator-panel-header {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 14px;
  color: white;
  font-size: 13px;
  font-weight: 700;
  background: #111827;
}

#osep-simulator-panel-close {
  border: 0;
  background: transparent;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

#osep-simulator-frame {
  width: 100%;
  height: calc(100% - 38px);
  border: 0;
}
```

---

## 十、iframe src 路徑規劃

需要同時支援：

```text
localhost 開發環境
GitHub Pages
```

建議 Extension 內用目前頁面位置推算：

```javascript
function getSimulatorEmbedUrl() {
    const origin = window.location.origin;
    const path = window.location.pathname;

    if(path.includes("/osep-scratch-editor/")) {
        return origin + "/osep-scratch-editor/osep/simulator/embed.html";
    }

    return origin + "/osep/simulator/embed.html";
}
```

但實作前需要再依目前 Scratch Editor 頁面實際 URL 檢查，避免 Pages base path 錯誤。

---

## 十一、Extension 端建議狀態

建議新增內部狀態：

```javascript
const SIMULATOR_UI = {
    panelId: "osep-simulator-panel",
    frameId: "osep-simulator-frame",
    closeId: "osep-simulator-panel-close"
};
```

不一定要放進 `STATE`，因為這是 UI 狀態，不是硬體狀態。

---

## 十二、建議函式

未來 MVP-32-6 可新增：

```javascript
function getSimulatorPanel() {}
function isSimulatorPanelOpen() {}
function openSimulatorPanel() {}
function closeSimulatorPanel() {}
function toggleSimulatorPanel() {}
function getSimulatorEmbedUrl() {}
function sendLedCommandToIframe(command) {}
```

---

## 十三、與現有 BroadcastChannel 的關係

目前 Extension 已經能用 BroadcastChannel 同步模擬器。

MVP-32-6 先可只建立 / 關閉 iframe，不急著改 LED command 傳送路徑。

但之後 MVP-32-7 建議把 LED command 同時送到：

```text
1. iframe postMessage
2. BroadcastChannel fallback
```

也就是：

```text
Extension LED command
        ├── iframe postMessage：正式同框用
        └── BroadcastChannel：跨分頁與備用通道
```

---

## 十四、建議 MVP 實作路線

### MVP-32-5｜規劃 Extension 端開關模擬器積木與手動關閉機制

本版只做規劃文件。

### MVP-32-6｜新增「開啟 / 關閉模擬硬體」積木

新增積木：

```text
開啟 / 關閉模擬硬體
```

功能：

1. 第一次執行建立右下角 iframe 面板。
2. 第二次執行移除 iframe 面板。
3. 面板右上角 X 可手動關閉。
4. 不修改 LED command 傳送路徑。
5. 不影響硬體連線。

### MVP-32-7｜Extension LED command 同步送 iframe + BroadcastChannel

將既有 `sendLedCommandToSimulator(command)` 擴充為：

```text
sendLedCommandToIframe(command)
sendLedCommandToBroadcastChannel(command)
```

或統一成：

```text
sendLedCommandToSimulator(command)
```

內部同時送 iframe 與 BroadcastChannel。

### MVP-32-8｜優化模擬器浮動面板

可加入：

1. 拖曳。
2. 收合。
3. 記住位置。
4. 小尺寸 / 大尺寸切換。
5. 面板不擋舞台的版面調整。

---

## 十五、風險控管

### 1. DOM 操作權限

目前 OSEP Extension 是 unsandboxed，理論上可以操作 DOM，但仍需實測。

### 2. iframe 路徑

GitHub Pages 與本機路徑需要特別檢查。

### 3. 面板遮擋

右下角可能遮到 Scratch 舞台或角色區，第一版可接受，後續再調整。

### 4. 狀態一致性

手動按 X 關閉後，下一次執行積木必須能重新開啟。

### 5. 不破壞一般 Scratch

只有載入 OSEP Extension 且執行積木才會顯示模擬器。

---

## 十六、MVP-32-5 結論

本版建議採用：

```text
Extension 積木控制模擬器浮動面板
```

具體行為：

```text
第一次執行：開啟模擬器
第二次執行：關閉模擬器
按右上角 X：手動關閉模擬器
```

此方案具備：

1. 對一般 Scratch 影響最低。
2. 不需先修改 Scratch Editor 工具列。
3. 符合 SmartRing 任務才開啟模擬器的教學邏輯。
4. 可逐步銜接 iframe postMessage 正式同框架構。

---

## 十七、下一版建議

下一版建議進入：

```text
MVP-32-6｜新增「開啟 / 關閉模擬硬體」積木
```

需要修改：

```text
static/osep/extensions/extensionV22C17.js
docs/OSEP_LEVEL3_MVP_LOG.md
```
