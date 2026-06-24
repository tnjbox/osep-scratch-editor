# MVP-32-7｜Extension LED command 同步送 iframe + BroadcastChannel

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-7  
狀態：Extension LED command 同步路徑整合  
更新日期：2026-06-24

---

## 一、任務目標

MVP-32-6 已完成「開啟 / 關閉模擬硬體」積木，可以在 Scratch 練習頁右下角開啟 iframe 模擬器。

本版目標是讓既有 OSEP LED 積木送出的 LED command 同時同步到：

```text
1. iframe postMessage：同頁 SmartRing 模擬硬體
2. BroadcastChannel：跨分頁模擬器與 fallback
```

---

## 二、本版新增功能

### 1. 新增 iframe LED command 傳送

當模擬器浮動面板已開啟時，Extension 會找到：

```text
#osep-simulator-frame
```

並透過：

```javascript
frame.contentWindow.postMessage(...)
```

送出 LED command。

### 2. 保留 BroadcastChannel

原本跨分頁模擬器同步不移除，仍保留：

```text
BroadcastChannel("osep-led-ring")
```

用途：

```text
跨分頁測試
開發除錯
fallback 備用通道
```

### 3. 暫存陣列改用 iframe 批次傳送

`setBuffer + showBuffer` 會用 `ledCommands` 批次送入 iframe，減少重複訊息。

BroadcastChannel 端仍維持逐筆 `ledCommand`，保留既有相容性。

---

## 三、本版修改檔案

```text
static/osep/extensions/extensionV22C17.js
docs/OSEP_LEVEL3_MVP_LOG.md
```

建議新增文件：

```text
docs/OSEP_EXTENSION_IFRAME_BROADCAST_SYNC_MVP32-7.md
```

---

## 四、新增或調整的主要函式

### 新增

```javascript
sendLedCommandToBroadcastChannel(command)
sendLedCommandToIframe(command)
sendLedCommandsToIframe(commands)
```

### 調整

```javascript
sendLedCommandToSimulator(command)
sendLocalBufferToSimulator()
```

---

## 五、同步邏輯

### 單一 LED command

```text
LED 積木
  ↓
sendLedCommandToSimulator(command)
  ├── sendLedCommandToIframe(command)
  └── sendLedCommandToBroadcastChannel(command)
```

### 暫存陣列顯示

```text
顯示 LED 暫存陣列
  ↓
sendLocalBufferToSimulator()
  ├── iframe：ledCommands [setBuffer, showBuffer]
  └── BroadcastChannel：逐筆 ledCommand
```

---

## 六、測試方式

### 1. 部署

```powershell
npm run deploy:osep -- "MVP-32-7 sync LED commands to iframe and BroadcastChannel"
```

### 2. 開啟 Scratch 任務頁

開啟任一 OSEP Scratch 練習頁，載入 OSEP Extension。

### 3. 開啟同頁模擬器

執行：

```text
開啟 / 關閉模擬硬體
```

預期右下角出現 SmartRing 模擬器。

### 4. 測試 LED 積木

請依序測試：

```text
設定全部 LED 顏色
設定全部 LED RGB
設定第 N 顆 LED RGB
關閉全部 LED
顯示進度條
顯示分數 LED
顯示生命 LED
清空並顯示 LED 暫存陣列
設定範圍 LED 後顯示
設定奇數 LED 後顯示
設定偶數 LED 後顯示
```

預期：

```text
右下角 iframe 模擬器會同步顯示 LED 變化。
```

### 5. 回測 BroadcastChannel

同時開啟：

```text
/osep/simulator/
```

再執行 LED 積木。

預期：

```text
同頁 iframe 模擬器與跨分頁完整模擬器都能同步顯示。
```

---

## 七、重要限制

本版仍不處理：

```text
拖曳模擬器面板
收合模擬器面板
記住模擬器位置
工具列按鈕
硬體 / 模擬器模式切換 UI
```

這些保留到後續版本。

---

## 八、回歸測試

請確認以下功能不受影響：

```text
1. 連接 ESP8266
2. ESP8266 已連線？
3. 按鍵偵測
4. 實體 WS2812 LED 控制
5. BroadcastChannel 跨分頁同步
6. 模擬硬體積木第一次開啟、第二次關閉
7. 模擬器右上角 X 手動關閉
```

---

## 九、Git 收尾

```powershell
git status
git add static/osep/extensions/extensionV22C17.js docs/OSEP_EXTENSION_IFRAME_BROADCAST_SYNC_MVP32-7.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-7 sync LED commands to iframe and BroadcastChannel"
git push
git status
```

---

## 十、下一版建議

下一版建議進入：

```text
MVP-32-8｜優化模擬器浮動面板位置與樣式
```

建議內容：

```text
1. 避免遮住舞台關鍵區域
2. 加入縮小 / 收合
3. 調整手機與小螢幕尺寸
4. 評估拖曳面板
