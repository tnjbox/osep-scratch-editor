# MVP-32-6｜新增「開啟 / 關閉模擬硬體」積木

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-6  
狀態：新增 Extension 端模擬器浮動面板開關積木  
更新日期：2026-06-24

---

## 一、任務目標

本版在 OSEP Scratch Extension 中新增一個積木：

```text
開啟 / 關閉模擬硬體
```

讓學生在 Scratch 練習頁中自行開啟或關閉 SmartRing 模擬器浮動視窗。

---

## 二、本版新增功能

### 1. 新增積木

新增於共同積木區，靠近「連接 ESP8266」與「ESP8266 已連線？」：

```text
開啟 / 關閉模擬硬體
```

### 2. 第一次執行：開啟模擬器

執行積木後，會在 Scratch 練習頁右下角建立浮動面板。

面板內容：

```text
標題列：SmartRing 模擬硬體
右上角：X 關閉按鈕
內容：iframe 載入 /osep/simulator/embed.html
```

### 3. 第二次執行：關閉模擬器

若模擬器已經開啟，再執行一次同一個積木會移除浮動面板。

### 4. 手動關閉

面板右上角提供 X 按鈕，可直接手動關閉模擬器視窗。

手動關閉後，再執行「開啟 / 關閉模擬硬體」積木，必須能重新開啟。

---

## 三、本版修改檔案

```text
static/osep/extensions/extensionV22C17.js
docs/OSEP_LEVEL3_MVP_LOG.md
```

建議新增文件：

```text
docs/OSEP_EXTENSION_SIMULATOR_TOGGLE_BLOCK_MVP32-6.md
```

---

## 四、重要設計說明

本版只處理「開啟 / 關閉模擬器面板」。

本版尚不修改 LED command 傳送路徑。

也就是說：

```text
MVP-32-6：能開啟 / 關閉 iframe 模擬器
MVP-32-7：LED command 同步送 iframe + BroadcastChannel
```

因此本版測試重點不是 LED 積木是否能控制 iframe，而是：

```text
1. 積木能開啟模擬器
2. 積木能再次關閉模擬器
3. X 可以手動關閉
4. 手動關閉後可再次用積木開啟
```

---

## 五、技術實作摘要

### 新增 UI 狀態常數

```javascript
const SIMULATOR_UI = {
    panelId: "osep-simulator-panel",
    frameId: "osep-simulator-frame",
    closeId: "osep-simulator-panel-close",
    styleId: "osep-simulator-panel-style"
};
```

### 新增輔助函式

```javascript
getSimulatorPanel()
isSimulatorPanelOpen()
getSimulatorEmbedUrl()
ensureSimulatorPanelStyle()
openSimulatorPanel()
closeSimulatorPanel()
toggleSimulatorPanel()
```

### 新增 Extension 積木定義

```javascript
{ opcode:'toggleSimulatorPanel', blockType:Scratch.BlockType.COMMAND, text:'開啟 / 關閉模擬硬體' },
```

### 新增 Extension 方法

```javascript
toggleSimulatorPanel() {
    toggleSimulatorPanel();
}
```

---

## 六、面板預設位置

第一版採右下角浮動面板：

```text
right: 16px
bottom: 16px
width: 320px
height: 390px
z-index: 999999
```

理由：

1. 不破壞 Scratch Editor 原始版面。
2. 不需修改工具列或 React 元件。
3. 容易測試與回復。
4. 後續可再加入拖曳、收合、記住位置。

---

## 七、測試方式

### 1. 部署

```powershell
npm run deploy:osep -- "MVP-32-6 add simulator toggle block"
```

### 2. 開啟 OSEP 任務練習頁

例如開啟 C401 或任一會載入 OSEP Extension 的 Scratch 練習頁。

### 3. 測試新增積木

在 OSEP 擴充積木中找到：

```text
開啟 / 關閉模擬硬體
```

### 4. 測試流程

請依序測試：

```text
1. 第一次執行積木
   預期：右下角出現 SmartRing 模擬硬體視窗。

2. 第二次執行積木
   預期：模擬器視窗關閉。

3. 再執行一次積木
   預期：模擬器視窗再次開啟。

4. 按右上角 X
   預期：模擬器視窗關閉。

5. 再執行一次積木
   預期：模擬器視窗可重新開啟。
```

---

## 八、回歸測試

請確認以下功能不受影響：

```text
1. 連接 ESP8266
2. ESP8266 已連線？
3. 按鍵偵測
4. 設定全部 LED 顏色
5. 設定第 N 顆 LED RGB
6. 關閉全部 LED
7. 顯示 LED 暫存陣列
8. 原本 BroadcastChannel 跨分頁模擬器同步
```

---

## 九、Git 收尾

```powershell
git status
git add static/osep/extensions/extensionV22C17.js docs/OSEP_EXTENSION_SIMULATOR_TOGGLE_BLOCK_MVP32-6.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-6 add simulator toggle block"
git push
git status
```

---

## 十、下一版建議

下一版建議進入：

```text
MVP-32-7｜Extension LED command 同步送 iframe + BroadcastChannel
```

目標是讓已經開啟的 iframe embed 模擬器可以接收 Extension LED 積木送出的指令。
