# MVP-32-8B｜精簡 embed 模擬器畫面與移除縮小按鈕

## 一、調整原因

使用者測試 MVP-32-8 後發現，模擬器仍佔用較多 Scratch 舞台畫面。

目前畫面有兩層標題：

```text
外層浮動面板：SmartRing 模擬硬體
內層 iframe：SmartRing LED 模擬器 / WS2812 × 12
```

正式教學頁中，內層 iframe 的標題與副標不必要，應盡量只保留 LED 燈環。

---

## 二、本版調整重點

### Extension 浮動面板

1. 保留外層標題列：`SmartRing 模擬硬體`
2. 保留右上角 X 手動關閉。
3. 保留拖曳標題列移動。
4. 移除縮小 / 還原按鈕。
5. 面板尺寸調整為 `286px × 326px`。

### embed.html

1. 移除內層標題：`SmartRing LED 模擬器`
2. 移除副標：`WS2812 × 12`
3. 移除底部狀態列。
4. 將狀態文字移到 LED 燈環中心。
5. 除 LED 燈環與中心狀態文字外，不顯示其他控制或說明。

---

## 三、修改檔案

請替換：

```text
static/osep/extensions/extensionV22C17.js
static/osep/simulator/embed.html
```

建議新增文件：

```text
docs/OSEP_SIMULATOR_COMPACT_EMBED_UI_MVP32-8B.md
```

---

## 四、測試重點

1. OSEP Extension 仍看得到「開啟 / 關閉模擬硬體」。
2. 第一次執行積木可開啟模擬器。
3. 模擬器內不再顯示 `SmartRing LED 模擬器`。
4. 模擬器內不再顯示 `WS2812 × 12`。
5. 底部不再顯示狀態文字。
6. 狀態文字出現在 LED 燈環中心。
7. X 可手動關閉。
8. 標題列可拖曳移動。
9. LED 積木可同步控制 iframe。
10. BroadcastChannel 跨分頁同步仍正常。

---

## 五、Git 收尾

```powershell
git status
git add static/osep/extensions/extensionV22C17.js static/osep/simulator/embed.html docs/OSEP_SIMULATOR_COMPACT_EMBED_UI_MVP32-8B.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-8B compact simulator embed UI"
git push
git status
```
