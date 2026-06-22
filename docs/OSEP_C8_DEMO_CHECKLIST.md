# OSEP C8 展示測試清單與備援策略

版本：MVP-C8-1F
專案：OSEP Scratch Editor
適用平台：OSEP Scratch Editor / Scratch Extension V2.2-C17
適用韌體協定：C8 JSON Serial Protocol
文件目的：提供展示前、課堂前、成果展前的快速檢查流程與故障備援策略。

---

## 1. 文件定位

本文件用於整理 OSEP Scratch Editor 專案在 C8 通訊協定整合後的展示測試流程。

目前 C8 階段的核心原則如下：

1. 平台端不判斷硬體版本。
2. D8 版與 D4 版硬體只要支援相同 C8 JSON 通訊協定，即可共用 Scratch / Blockly 平台。
3. Scratch Extension 端已改用 C8 LED 指令。
4. Scratch 積木端亮度仍維持 0～30，送到 C8 韌體前轉換為 0～255。
5. 本階段不修改韌體、不重新燒錄、不新增 D8 / D4 專屬積木。

---

## 2. 展示設備版本

### 2.1 D8 版硬體

D8 版為完整 SmartRingController 硬體。

硬體特性：

```text
ESP8266 + 12 顆 WS2812 LED + 8 個按鈕
WS2812 使用 D8 腳位
```

按鍵對應：

```text
btn[0] = D1 = F
btn[1] = D2 = B
btn[2] = D3 = L
btn[3] = D4 = R
btn[4] = D0 = U / func
btn[5] = D5 = D
btn[6] = D6 = O
btn[7] = D7 = C / mode
```

適合展示項目：

1. WebSerial 連線。
2. 按鍵偵測。
3. Scratch 角色互動。
4. LED 全亮、清除、單顆控制。
5. LED 暫存陣列。
6. 按鍵觸發 LED 回饋。
7. SmartRingController 作為實體控制器的課堂應用。

---

### 2.2 D4 版硬體

D4 版為簡化 LED 展示硬體。

硬體特性：

```text
ESP8266 + 12 顆 WS2812 LED
沒有任何按鈕
WS2812 使用 D4 腳位
```

適合展示項目：

1. WebSerial 連線。
2. LED 全亮。
3. LED 清除。
4. 單顆 LED 控制。
5. LED 暫存陣列。
6. LED 圖樣或資料視覺化。
7. 作為低成本 LED 展示版。

限制：

```text
D4 版沒有按鈕，因此不適合展示按鍵偵測、角色控制、實體互動輸入。
```

---

## 3. 展示前總檢查表

展示前建議依照下列順序檢查。

### 3.1 電腦與瀏覽器檢查

| 項目        | 檢查內容                     | 結果   |
| --------- | ------------------------ | ---- |
| 瀏覽器       | 使用 Chrome 或 Edge         | □ 通過 |
| WebSerial | 瀏覽器支援 WebSerial          | □ 通過 |
| USB 線     | 使用可傳輸資料的 USB 線，不使用只能充電的線 | □ 通過 |
| USB 埠     | ESP8266 可被電腦偵測到 COM port | □ 通過 |
| 網路        | 若使用線上頁面，確認網路可連線          | □ 通過 |
| 本機服務      | 若使用本機版，確認服務已啟動           | □ 通過 |

---

### 3.2 Git 與專案狀態檢查

進入專案資料夾：

```powershell
cd D:\YOSEP\osep-scratch-editor
```

檢查 Git 狀態：

```powershell
git status
```

預期結果：

```text
On branch feature/osep-extension-menu
Your branch is up to date with 'origin/feature/osep-extension-menu'.

nothing to commit, working tree clean
```

確認最新 commit：

```powershell
git log --oneline -5
```

目前 C8 整合後應包含：

```text
5518a003d MVP-C8-1E update C8 integration log
fa43e30cb MVP-C8-1D add C8 serial protocol documentation
e5328150a MVP-C8-1A update Scratch extension C8 protocol
```

---

### 3.3 本機開發服務檢查

啟動開發伺服器：

```powershell
npm start
```

開啟本機網址：

```text
http://localhost:8601/osep/
```

檢查項目：

| 項目           | 預期結果                                         | 結果   |
| ------------ | -------------------------------------------- | ---- |
| 首頁           | OSEP Scratch Editor 首頁可正常開啟                  | □ 通過 |
| C01 連線測試     | 點擊後以新分頁開啟 Scratch Editor                     | □ 通過 |
| 專案載入         | C01_connect.sb3 可正常載入                        | □ 通過 |
| Extension 載入 | OSEP SmartRing 積木可正常出現                       | □ 通過 |
| 無錯誤頁面        | 沒有 Invalid extension URL 或 Permission denied | □ 通過 |

---

## 4. Scratch 平台展示檢查表

### 4.1 首頁入口檢查

檢查網址：

```text
http://localhost:8601/osep/
```

操作流程：

1. 開啟 OSEP 首頁。
2. 點擊「開始連線測試」。
3. 確認 Scratch Editor 以新分頁開啟。
4. 確認原本首頁仍保留在原分頁。
5. 確認 C01 連線測試專案成功載入。

預期結果：

```text
首頁不被覆蓋。
Scratch Editor 在新分頁開啟。
C01 連線測試專案可正常載入。
```

---

### 4.2 Scratch Extension 檢查

檢查項目：

| 項目       | 預期結果               | 結果   |
| -------- | ------------------ | ---- |
| OSEP 積木群 | 可看到 SmartRing 相關積木 | □ 通過 |
| 連線積木     | 可執行 WebSerial 連線   | □ 通過 |
| 按鍵積木     | D8 版可讀取按鍵狀態        | □ 通過 |
| LED 積木   | 可控制 LED 顏色         | □ 通過 |
| 暫存陣列積木   | 可設定並顯示 LED 暫存陣列    | □ 通過 |

---

## 5. D8 版硬體展示檢查表

D8 版為完整展示用硬體，建議優先使用。

### 5.1 D8 版連線檢查

操作流程：

1. 將 D8 版 ESP8266 接上 USB。
2. 開啟 OSEP Scratch Editor。
3. 執行 C01 連線測試專案。
4. 點擊連線積木或連線按鈕。
5. 在瀏覽器 WebSerial 視窗選擇正確 COM port。
6. 確認連線成功。

檢查項目：

| 項目           | 預期結果                    | 結果   |
| ------------ | ----------------------- | ---- |
| ESP8266 可被偵測 | WebSerial 視窗出現 COM port | □ 通過 |
| 可連線          | Scratch 顯示已連線或可正常讀取狀態   | □ 通過 |
| Baud rate    | 使用 115200               | □ 通過 |
| 無連線中斷        | 測試期間連線穩定                | □ 通過 |

---

### 5.2 D8 版按鍵檢查

依序按下每個按鍵，確認 Scratch 端可讀取。

| 按鍵 | 腳位 | btn index | 預期結果              | 結果   |
| -- | -- | --------: | ----------------- | ---- |
| F  | D1 |    btn[0] | 按下時 F 狀態為 true    | □ 通過 |
| B  | D2 |    btn[1] | 按下時 B 狀態為 true    | □ 通過 |
| L  | D3 |    btn[2] | 按下時 L 狀態為 true    | □ 通過 |
| R  | D4 |    btn[3] | 按下時 R 狀態為 true    | □ 通過 |
| U  | D0 |    btn[4] | 按下時 U / func 狀態改變 | □ 通過 |
| D  | D5 |    btn[5] | 按下時 D 狀態為 true    | □ 通過 |
| O  | D6 |    btn[6] | 按下時 O 狀態為 true    | □ 通過 |
| C  | D7 |    btn[7] | 按下時 C / mode 狀態改變 | □ 通過 |

注意事項：

```text
D0 腳位為 ESP8266 特例，使用 INPUT_PULLDOWN_16。
如果 D0 行為與其他按鍵不同，先確認韌體是否為 C8 相容版本。
```

---

### 5.3 D8 版 LED 檢查

#### 5.3.1 全部 LED 顏色測試

測試項目：

| 測試 |    Scratch 輸入值 |         預期 C8 送出值 | 預期結果        | 結果   |
| -- | -------------: | ----------------: | ----------- | ---- |
| 紅色 |   R=30 G=0 B=0 |     R=255 G=0 B=0 | 全部 LED 顯示紅色 | □ 通過 |
| 綠色 |   R=0 G=30 B=0 |     R=0 G=255 B=0 | 全部 LED 顯示綠色 | □ 通過 |
| 藍色 |   R=0 G=0 B=30 |     R=0 G=0 B=255 | 全部 LED 顯示藍色 | □ 通過 |
| 白色 | R=30 G=30 B=30 | R=255 G=255 B=255 | 全部 LED 顯示白色 | □ 通過 |
| 關閉 |    R=0 G=0 B=0 |       R=0 G=0 B=0 | 全部 LED 關閉   | □ 通過 |

C8 指令格式：

```json
{"cmd":"setAllLeds","r":255,"g":0,"b":0}
```

---

#### 5.3.2 清除 LED 測試

操作：

1. 先讓 LED 顯示任一顏色。
2. 執行清除 LED 積木。
3. 確認全部 LED 關閉。

C8 指令格式：

```json
{"cmd":"clearLeds"}
```

預期結果：

```text
12 顆 LED 全部熄滅。
```

---

#### 5.3.3 單顆 LED 測試

操作：

1. 清除全部 LED。
2. 設定第 1 顆 LED 為紅色。
3. 設定第 6 顆 LED 為綠色。
4. 設定第 12 顆 LED 為藍色。
5. 顯示暫存陣列。

預期結果：

```text
第 1 顆顯示紅色。
第 6 顆顯示綠色。
第 12 顆顯示藍色。
其他 LED 維持關閉。
```

C8 指令格式：

```json
{
  "cmd":"showBuffer",
  "leds":[
    {"r":255,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":255,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":255}
  ]
}
```

---

### 5.4 D8 版展示結論

若下列項目都通過，即可使用 D8 版作為正式展示主機：

```text
□ WebSerial 連線正常
□ 按鍵讀取正常
□ LED 全亮正常
□ LED 清除正常
□ 單顆 LED 正常
□ LED 暫存陣列正常
□ Scratch 專案載入正常
□ 展示流程可在 1 分鐘內完成
```

---

## 6. D4 版硬體展示檢查表

D4 版為簡化 LED 展示硬體，主要作為備援或純 LED 展示使用。

### 6.1 D4 版連線檢查

操作流程：

1. 將 D4 版 ESP8266 接上 USB。
2. 開啟 OSEP Scratch Editor。
3. 執行 C01 連線測試專案。
4. 透過 WebSerial 選擇正確 COM port。
5. 確認連線成功。

檢查項目：

| 項目           | 預期結果                    | 結果   |
| ------------ | ----------------------- | ---- |
| ESP8266 可被偵測 | WebSerial 視窗出現 COM port | □ 通過 |
| 可連線          | Scratch 可正常送出 LED 指令    | □ 通過 |
| LED 有反應      | LED 接收 C8 指令後正常顯示       | □ 通過 |
| 無按鍵測試        | D4 版沒有按鍵，不測按鍵           | □ 確認 |

---

### 6.2 D4 版 LED 檢查

D4 版只檢查 LED 控制。

| 測試     | 預期結果          | 結果   |
| ------ | ------------- | ---- |
| 全部紅色   | 12 顆 LED 顯示紅色 | □ 通過 |
| 全部綠色   | 12 顆 LED 顯示綠色 | □ 通過 |
| 全部藍色   | 12 顆 LED 顯示藍色 | □ 通過 |
| 全部關閉   | 12 顆 LED 全部熄滅 | □ 通過 |
| 單顆 LED | 指定 LED 可正確顯示  | □ 通過 |
| 暫存陣列   | 多顆 LED 可依序顯示  | □ 通過 |

---

### 6.3 D4 版展示結論

D4 版適合用於：

```text
□ LED 顏色控制展示
□ 陣列概念展示
□ 資料視覺化展示
□ 成果展備援展示
```

D4 版不適合用於：

```text
□ 按鍵偵測
□ 實體控制器互動
□ 角色方向控制
□ 需要 F / B / L / R / U / D / O / C 的任務
```

---

## 7. C8 亮度測試

Scratch 積木端維持 0～30 亮度範圍，Extension 送出前轉換為 C8 韌體使用的 0～255。

轉換函式：

```javascript
function mapLedValueToC8(value) {
    const v = Math.max(0, Math.min(30, Math.round(Number(value) || 0)));
    return Math.round((v / 30) * 255);
}
```

轉換對照：

| Scratch 輸入值 | C8 送出值 | 預期亮度 |
| ----------: | -----: | ---- |
|           0 |      0 | 關閉   |
|           5 |     43 | 很暗   |
|          10 |     85 | 低亮度  |
|          15 |    128 | 中亮度  |
|          20 |    170 | 偏亮   |
|          25 |    213 | 高亮度  |
|          30 |    255 | 最高亮度 |

測試重點：

```text
Scratch 積木仍使用 0～30，符合課堂教學需求。
C8 韌體端收到 0～255，可避免亮度被雙重壓低。
```

---

## 8. 展示前快速流程

正式展示前建議使用下列 5 分鐘流程。

### 8.1 快速檢查流程

```text
1. 接上 D8 版硬體。
2. 開啟 Chrome 或 Edge。
3. 開啟 http://localhost:8601/osep/
4. 點擊 C01 連線測試。
5. 在新分頁開啟 Scratch Editor。
6. 點擊連線，選擇 ESP8266 COM port。
7. 測試全部 LED 紅色。
8. 測試清除 LED。
9. 測試單顆 LED。
10. 測試按鍵 F / B / L / R。
11. 若都正常，即可進入正式展示。
```

---

### 8.2 展示建議順序

正式展示時建議依照下列順序，避免一開始就進入複雜任務。

```text
1. 說明硬體：ESP8266 + WS2812 + 按鍵。
2. 說明平台：OSEP Scratch Editor。
3. 展示 WebSerial 連線。
4. 展示按鍵偵測。
5. 展示 LED 全亮與清除。
6. 展示單顆 LED 控制。
7. 展示 LED 暫存陣列。
8. 展示學生任務如何從基礎互動延伸到陣列與模組化。
```

---

## 9. 常見問題與排除方式

### 9.1 WebSerial 找不到裝置

可能原因：

```text
1. USB 線只能充電，不能傳輸資料。
2. ESP8266 驅動未安裝。
3. 裝置被其他程式占用。
4. 瀏覽器不支援 WebSerial。
5. 使用了非 Chrome / Edge 瀏覽器。
```

處理方式：

```text
1. 更換 USB 資料線。
2. 更換 USB port。
3. 關閉 Arduino IDE、序列埠監控視窗或其他占用 COM port 的程式。
4. 改用 Chrome 或 Edge。
5. 重新插拔 ESP8266。
6. 重新整理 Scratch Editor 頁面。
```

---

### 9.2 Scratch Extension 載入失敗

可能錯誤：

```text
Invalid extension URL
Permission to load extension denied
```

處理方式：

```text
1. 確認網址是否由 OSEP 首頁入口進入。
2. 確認 extensionV22C17.js 路徑正確。
3. 確認 localhost:8601 /osep/extensions/ 已列入信任路徑。
4. 重新啟動 npm start。
5. 重新整理頁面。
```

---

### 9.3 LED 沒有反應

可能原因：

```text
1. 硬體不是 C8 相容韌體。
2. WS2812 腳位與韌體版本不一致。
3. Scratch Extension 尚未使用 C8 LED 指令。
4. WebSerial 連線未成功。
5. LED 電源或接線異常。
```

處理方式：

```text
1. 先測試 clearLeds 指令。
2. 再測試 setAllLeds 指令。
3. 再測試 showBuffer 指令。
4. 確認目前 Extension 為 C8 修正版。
5. 確認 D8 版硬體使用 D8 韌體，D4 版硬體使用 D4 韌體。
6. 若展示現場無法排除，改用備援流程。
```

---

### 9.4 LED 亮度太暗

可能原因：

```text
1. Scratch 端數值太低。
2. 韌體端 brightness 設定較低。
3. 舊版 Extension 未將 0～30 map 到 0～255。
```

處理方式：

```text
1. Scratch 積木輸入值先使用 30。
2. 確認 Extension 內有 mapLedValueToC8()。
3. 確認送出 C8 指令時 RGB 已轉換到 0～255。
```

---

### 9.5 按鍵沒有反應

可能原因：

```text
1. 使用的是 D4 版硬體，D4 版沒有按鍵。
2. D8 版按鍵接線異常。
3. 韌體沒有送出 btn 陣列。
4. Scratch 專案使用的按鍵積木與實際按鍵不同。
```

處理方式：

```text
1. 先確認目前硬體是 D8 版。
2. 依序測試 F / B / L / R / U / D / O / C。
3. 若只有 D0 異常，確認 D0 是否使用 INPUT_PULLDOWN_16。
4. 若全部按鍵無反應，改測 ESP8266 → 平台狀態資料是否有送出。
```

---

## 10. 展示失敗時的備援策略

### 10.1 備援策略 A：重新整理頁面

適用情況：

```text
Scratch 頁面卡住、WebSerial 狀態異常、Extension 短暫失效。
```

處理方式：

```text
1. 中斷 WebSerial。
2. 重新整理 Scratch Editor 頁面。
3. 重新載入 C01 連線測試。
4. 重新連線 ESP8266。
5. 從 LED 清除測試重新開始。
```

---

### 10.2 備援策略 B：更換 USB 線或 USB port

適用情況：

```text
WebSerial 找不到裝置、連線不穩、ESP8266 反覆斷線。
```

處理方式：

```text
1. 更換 USB 資料線。
2. 更換電腦 USB port。
3. 避免使用不穩定的 USB hub。
4. 重新插拔 ESP8266。
5. 重新連線 WebSerial。
```

---

### 10.3 備援策略 C：D8 版切換為 D4 版展示

適用情況：

```text
D8 版按鍵異常，但 LED 指令仍可展示。
```

處理方式：

```text
1. 改用 D4 版硬體。
2. 略過按鍵偵測展示。
3. 改展示 LED 全亮、清除、單顆 LED、暫存陣列。
4. 將展示重點轉為「陣列控制與 LED 資料視覺化」。
```

展示說法：

```text
目前這一組是簡化版 LED 展示板，沒有按鍵輸入，但仍然使用相同 C8 通訊協定。
這代表平台端可以共用同一套 Scratch 積木與 JSON 指令，硬體端只要維持協定一致即可。
```

---

### 10.4 備援策略 D：改用已錄製影片或截圖展示

適用情況：

```text
現場電腦、瀏覽器、USB、硬體不可控，導致即時展示失敗。
```

建議準備：

```text
1. WebSerial 成功連線截圖。
2. Scratch C01 專案載入截圖。
3. LED 全亮照片。
4. 單顆 LED 控制照片。
5. 按鍵控制角色影片。
6. LED 暫存陣列展示影片。
```

展示說法：

```text
現場因 USB 或瀏覽器權限問題，先以錄製畫面說明完整流程。
實際系統已完成 C8 通訊協定整合，包含 WebSerial 連線、按鍵讀取與 LED 控制。
```

---

### 10.5 備援策略 E：回退 C7 展示流程

適用情況：

```text
C8 指令與現場硬體韌體不一致，且短時間無法重燒韌體。
```

處理方式：

```text
1. 改用已確認可運作的 C7 硬體。
2. 改用 C7 相容版本的 Extension 或已保存的展示版本。
3. 展示核心功能，不展示 C8 新協定。
4. 展示後再回到 C8 整合線處理韌體一致性。
```

注意：

```text
本階段正式主線仍為 C8 協定。
C7 回退只作為展示備援，不作為後續開發主線。
```

---

## 11. 展示現場建議準備清單

### 11.1 硬體

```text
□ D8 版 SmartRingController 至少 1 組
□ D4 版 LED 展示板至少 1 組
□ 備用 ESP8266
□ 備用 USB 資料線 2 條以上
□ 行動電源或穩定 USB 供電
□ 小型收納盒
```

---

### 11.2 軟體

```text
□ OSEP Scratch Editor 本機版
□ C01 連線測試專案
□ Scratch Extension V2.2-C17 C8 修正版
□ C8 通訊協定文件
□ C8 展示測試清單
□ 展示影片或截圖備份
```

---

### 11.3 展示資料

```text
□ 專案簡介投影片
□ 硬體架構圖
□ C8 JSON 通訊協定示意圖
□ Scratch 積木畫面截圖
□ 學生任務地圖
□ 第 4～7 章課程架構
```

---

## 12. 展示前最後確認

正式展示前，請確認下列項目。

```text
□ Git 工作區乾淨
□ 最新版本已 push 到 GitHub
□ 本機 npm start 可正常啟動
□ OSEP 首頁可正常開啟
□ C01 連線測試可新分頁開啟
□ Scratch Extension 可正常載入
□ D8 版 WebSerial 可連線
□ D8 版按鍵可讀取
□ D8 版 LED 可控制
□ D4 版 LED 可控制
□ 備援影片或截圖已準備
□ 備用 USB 線已準備
```

---

## 13. MVP-C8-1F 完成判定

本 MVP 完成條件：

```text
□ docs/OSEP_C8_DEMO_CHECKLIST.md 已建立
□ 文件包含 D8 版展示檢查表
□ 文件包含 D4 版展示檢查表
□ 文件包含 Scratch 平台檢查表
□ 文件包含 C8 亮度測試
□ 文件包含常見問題排除
□ 文件包含展示失敗備援策略
□ 文件包含展示現場準備清單
□ 文件可作為成果展或課堂展示前檢查使用
```

---

## 14. 後續建議

完成 MVP-C8-1F 後，建議下一步可選擇：

### 14.1 MVP-F01｜韌體燒錄入口規劃

目標：

```text
規劃未來在 OSEP 平台中提供韌體下載、燒錄說明與版本選擇入口。
```

---

### 14.2 MVP-F02｜D8 / D4 韌體下載與燒錄說明

目標：

```text
整理 D8 版與 D4 版韌體的差異、適用硬體、燒錄流程與測試方式。
```

---

### 14.3 MVP-25-2｜第 6 章 C601～C606 示範題與仿作題設計

目標：

```text
回到教材主線，開始設計第 6 章陣列任務的示範題、仿作題與延伸挑戰。
```

---

### 14.4 MVP-V01｜SmartRing 虛擬控制器規劃

目標：

```text
規劃未來在沒有實體硬體時，也能用虛擬控制器模擬按鍵與 LED 狀態。
```

---

### 14.5 MVP-AI01｜AI 密室逃脫任務模式規劃

目標：

```text
以第 6 章陣列任務為基礎，設計未來 AI 密室逃脫任務的互動模式。
```
