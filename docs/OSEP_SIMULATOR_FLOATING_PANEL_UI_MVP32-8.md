# MVP-32-8｜優化模擬器浮動面板位置與樣式

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-32-8  
狀態：優化 Extension 端模擬器浮動面板  
更新日期：2026-06-24

---

## 一、任務目標

MVP-32-6 已完成「開啟 / 關閉模擬硬體」積木。  
MVP-32-7 已完成 LED command 同步送 iframe + BroadcastChannel。

本版目標是在不修改 Scratch Editor 原始 UI 的前提下，優化右下角 SmartRing 模擬硬體浮動面板。

---

## 二、本版新增功能

### 1. 面板尺寸微調

```text
width: 300px
height: 360px
right: 18px
bottom: 18px
```

目的：

```text
減少遮擋 Scratch 舞台與角色區
保留足夠 LED 燈環可視空間
```

### 2. 標題列優化

標題列顯示：

```text
SmartRing 模擬硬體
```

並加入綠色狀態點，讓學生容易辨識這是模擬硬體面板。

### 3. 新增縮小 / 還原按鈕

標題列新增：

```text
—
```

按下後，面板縮小成只有標題列。

縮小後按鈕變成：

```text
□
```

再按一次可還原面板。

### 4. 保留 X 手動關閉

右上角仍保留：

```text
×
```

可直接關閉模擬器面板。

### 5. 新增拖曳移動

學生或教師可拖曳標題列移動模擬器面板，避免遮住 Scratch 舞台或角色區。

### 6. 小螢幕尺寸保護

在窄螢幕下，面板寬高會自動限制在視窗範圍內。

---

## 三、本版修改檔案

```text
static/osep/extensions/extensionV22C17.js
docs/OSEP_LEVEL3_MVP_LOG.md
```

建議新增文件：

```text
docs/OSEP_SIMULATOR_FLOATING_PANEL_UI_MVP32-8.md
```

---

## 四、面板行為

### 開啟

執行：

```text
開啟 / 關閉模擬硬體
```

若面板不存在，會建立面板。

### 關閉

再次執行：

```text
開啟 / 關閉模擬硬體
```

若面板已存在，會移除面板。

### 手動關閉

按右上角：

```text
×
```

會移除面板。

### 縮小 / 還原

按：

```text
—
```

面板縮小，只保留標題列。

按：

```text
□
```

面板還原。

### 拖曳

拖曳標題列可移動面板位置。

---

## 五、設計原則

本版仍維持低風險策略：

```text
不修改 Scratch Editor React UI
不修改工具列
不修改任務入口頁
不修改 embed.html
不修改 LED command 同步邏輯
```

只優化由 Extension 建立的浮動面板。

---

## 六、測試方式

### 1. 部署

```powershell
npm run deploy:osep -- "MVP-32-8 improve simulator floating panel UI"
```

### 2. 開啟任務練習頁

開啟任一 OSEP Scratch 練習頁。

### 3. 開啟模擬硬體

執行：

```text
開啟 / 關閉模擬硬體
```

預期右下角出現新版面板。

### 4. 測試面板操作

依序測試：

```text
1. 面板是否顯示新版標題列。
2. 按 — 是否縮小。
3. 按 □ 是否還原。
4. 拖曳標題列是否能移動。
5. 按 × 是否能關閉。
6. 關閉後再次執行積木是否能重新開啟。
```

### 5. 測試 LED 同步

開啟面板後，測試：

```text
設定全部 LED 顏色
設定第 N 顆 LED RGB
關閉全部 LED
顯示進度條
顯示分數 LED
顯示生命 LED
顯示 LED 暫存陣列
```

預期 iframe 模擬器仍可同步顯示。

---

## 七、回歸測試

請確認：

```text
1. 實體 ESP8266 連線不受影響。
2. BroadcastChannel 跨分頁同步不受影響。
3. 開啟 / 關閉模擬硬體積木仍正常。
4. 右上角 X 手動關閉仍正常。
5. LED command 同步 iframe 仍正常。
```

---

## 八、Git 收尾

```powershell
git status
git add static/osep/extensions/extensionV22C17.js docs/OSEP_SIMULATOR_FLOATING_PANEL_UI_MVP32-8.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-8 improve simulator floating panel UI"
git push
git status
```

---

## 九、下一版建議

下一版建議可進入：

```text
MVP-32-9｜新增模擬硬體狀態積木與模式提示
```
