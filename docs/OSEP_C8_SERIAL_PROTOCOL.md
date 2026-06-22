# OSEP SmartRingController C8 通訊協定

版本：MVP-C8-1D  
適用平台：OSEP Scratch Editor / Blockly-lab  
適用韌體：SmartRingController C8  
狀態：展示與平台整合用正式協定文件

---

## 1. 文件目的

本文件用來定義 OSEP SmartRingController C8 版本的 WebSerial JSON 通訊協定。

C8 的核心原則是：

- 不同硬體版本可以使用不同韌體。
- 只要韌體支援相同 JSON 通訊協定，平台端就不需要區分硬體版本。
- Scratch 與 Blockly-lab 應共用同一套 SmartRingController C8 協定。
- 平台端只負責送出標準 JSON 指令與解析標準 JSON 狀態資料。

因此，OSEP Scratch Editor 不需要判斷目前連接的是 D8 版或 D4 版硬體，只要依照 C8 JSON 協定收送資料即可。

---

## 2. 支援硬體版本

### 2.1 D8 版本

D8 版本硬體包含：

- ESP8266
- 12 顆 WS2812 LED
- 8 個按鈕
- WS2812 資料腳位使用 D8

D8 版本可支援：

- WebSerial 連線
- 8 個按鈕狀態讀取
- 功能鍵狀態
- 模式鍵狀態
- 12 顆 LED 控制
- LED 暫存陣列顯示
- LED 圖樣、分數、生命值與動畫效果

### 2.2 D4 版本

D4 版本硬體包含：

- ESP8266
- 12 顆 WS2812 LED
- 沒有任何按鈕
- WS2812 資料腳位使用 D4

D4 版本可支援：

- WebSerial 連線
- 12 顆 LED 控制
- LED 暫存陣列顯示
- LED 圖樣、分數、生命值與動畫效果

D4 版本沒有按鈕，因此按鍵狀態固定為未按下。  
若 D4 韌體不主動輸出按鍵資料，平台端仍應允許 LED 指令正常運作。

---

## 3. 平台整合原則

Scratch / Blockly 平台端不應根據硬體版本切換不同指令。

平台端只需要遵守以下原則：

1. WebSerial 使用 115200 baud rate。
2. 接收 ESP8266 輸出的 JSON 狀態資料。
3. 送出 C8 定義的 JSON LED 指令。
4. LED 編號在平台積木端維持 1～12。
5. Scratch / Blockly 積木端亮度維持 0～30。
6. 實際送到 C8 韌體前，平台可將 0～30 map 到 0～255。
7. D8 版本可使用按鍵與 LED。
8. D4 版本只能使用 LED，按鍵積木回傳 false 屬於正常現象。

---

## 4. WebSerial 設定

平台端 WebSerial 連線速率：

```javascript
baudRate: 115200
```

所有 JSON 指令皆以一行為單位送出，結尾必須包含換行字元：

```javascript
JSON.stringify(obj) + "\n"
```

---

## 5. ESP8266 → 平台狀態資料

C8 韌體會透過 Serial 輸出 JSON 狀態資料。

### 5.1 D8 版本狀態資料

D8 版本包含 8 個按鈕，因此會輸出：

```json
{"btn":[false,false,false,false,false,false,false,false],"func":0,"mode":0}
```

欄位說明：

| 欄位 | 型態 | 說明 |
|---|---|---|
| `btn` | boolean array | 8 個按鈕狀態 |
| `func` | number | 功能鍵狀態，通常對應 `btn[4]` |
| `mode` | number | 模式鍵狀態，通常對應 `btn[7]` |

### 5.2 D4 版本狀態資料

D4 版本沒有按鈕，但為了保持平台協定一致，建議輸出相同格式：

```json
{"btn":[false,false,false,false,false,false,false,false],"func":0,"mode":0}
```

若 D4 韌體不主動輸出按鍵資料，平台端仍可使用 LED 指令。

---

## 6. D8 版本按鍵對應

| btn index | 腳位 | 積木代號 | 說明 |
|---:|---|---|---|
| `btn[0]` | D1 | F | 前 / BTN1 |
| `btn[1]` | D2 | B | 後 / BTN2 |
| `btn[2]` | D3 | L | 左 / BTN3 |
| `btn[3]` | D4 | R | 右 / BTN4 |
| `btn[4]` | D0 | U | 上 / BTN0 / 功能鍵 |
| `btn[5]` | D5 | D | 下 / BTN5 |
| `btn[6]` | D6 | O | 確認 / BTN6 |
| `btn[7]` | D7 | C | 取消 / BTN7 / 模式鍵 |

D0 腳位使用 ESP8266 的 `INPUT_PULLDOWN_16`，其餘按鈕通常使用 `INPUT_PULLUP`。

---

## 7. 平台 → ESP8266 LED 指令

### 7.1 設定全部 LED

C8 指令：

```json
{"cmd":"setAllLeds","r":255,"g":0,"b":0}
```

欄位說明：

| 欄位 | 說明 |
|---|---|
| `cmd` | 固定為 `setAllLeds` |
| `r` | 紅色亮度，0～255 |
| `g` | 綠色亮度，0～255 |
| `b` | 藍色亮度，0～255 |

---

### 7.2 清除全部 LED

C8 指令：

```json
{"cmd":"clearLeds"}
```

用途：

- 關閉所有 LED。
- 清空目前 LED 顯示狀態。

---

### 7.3 顯示 LED 暫存陣列

C8 指令：

```json
{
  "cmd":"showBuffer",
  "leds":[
    {"r":255,"g":0,"b":0},
    {"r":0,"g":255,"b":0},
    {"r":0,"g":0,"b":255}
  ]
}
```

建議平台端固定送出 12 筆 LED 資料：

```json
{
  "cmd":"showBuffer",
  "leds":[
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0},
    {"r":0,"g":0,"b":0}
  ]
}
```

欄位說明：

| 欄位 | 說明 |
|---|---|
| `cmd` | 固定為 `showBuffer` |
| `leds` | LED 陣列資料 |
| `r` | 單顆 LED 紅色值，0～255 |
| `g` | 單顆 LED 綠色值，0～255 |
| `b` | 單顆 LED 藍色值，0～255 |

---

### 7.4 設定亮度

C8 指令：

```json
{"cmd":"setBrightness","value":10}
```

欄位說明：

| 欄位 | 說明 |
|---|---|
| `cmd` | 固定為 `setBrightness` |
| `value` | 韌體亮度值 |

目前 OSEP Scratch Extension 已保留底層 `setBrightness(value)` 函式，但尚未做成學生積木。展示階段主要透過 RGB map 解決亮度過低問題。

---

## 8. Scratch 積木端亮度策略

為了與 Blockly-lab 保持一致，Scratch 積木端仍維持 0～30 的亮度輸入範圍。

但是 C8 韌體的 LED RGB 指令使用 0～255，因此 Scratch Extension 在送出 JSON 前會進行轉換：

| 積木端數值 | 送到 C8 韌體 |
|---:|---:|
| 0 | 0 |
| 10 | 85 |
| 20 | 170 |
| 30 | 255 |

轉換公式：

```text
C8_RGB = round((ScratchValue / 30) * 255)
```

此策略的目的：

- 學生仍使用 0～30 的安全教學範圍。
- Scratch 與 Blockly-lab 的積木輸入規則一致。
- 韌體不需要重燒。
- 避免 Scratch 端限制到 30，又被韌體 brightness 二次縮放後過暗。
- 保留 C8 韌體端的亮度保護機制。

---

## 9. LED 編號規則

平台積木端 LED 編號採用：

```text
1～12
```

這比 0～11 更適合學生理解。

平台內部如需處理陣列，允許轉為 0-based，但對學生顯示與積木輸入一律採用 1～12。

---

## 10. Scratch Extension 目前 C8 對應

| Scratch Extension 功能 | C8 指令 |
|---|---|
| 設定全部 LED 顏色 | `setAllLeds` |
| 關閉全部 LED | `clearLeds` 或清空 buffer 後 `showBuffer` |
| 設定單顆 LED | 更新本地 buffer 後 `showBuffer` |
| 顯示 LED 暫存陣列 | `showBuffer` |
| 分數 LED | 更新本地 buffer 後 `showBuffer` |
| 生命 LED | 更新本地 buffer 後 `showBuffer` |
| LED 動畫 | 更新本地 buffer 後 `showBuffer` |

目前已移除舊 LED 指令：

```text
cmd:"RGB"
cmd:"CLEAR"
cmd:"BUFFER"
```

---

## 11. 教材首頁連線測試

教材首頁 C01 連線測試連結應直接開啟 Scratch Editor 程式頁面：

```text
/editor.html?extension=...&project_url=...
```

且應使用新分頁開啟：

```html
target="_blank" rel="noopener noreferrer"
```

這樣可以保留教材首頁，同時讓學生在新分頁完成連線測試。

---

## 12. 展示測試清單

### 12.1 D8 版本展示測試

D8 版本應測試：

- WebSerial 可連線。
- 按鈕狀態可讀取。
- `btn[0]`～`btn[7]` 對應正確。
- `func` 狀態可讀取。
- `mode` 狀態可讀取。
- 設定全部 LED 顏色正常。
- 關閉全部 LED 正常。
- 設定單顆 LED 正常。
- 顯示 LED 暫存陣列正常。
- 分數 LED 正常。
- 生命 LED 正常。

### 12.2 D4 版本展示測試

D4 版本應測試：

- WebSerial 可連線。
- 設定全部 LED 顏色正常。
- 關閉全部 LED 正常。
- 設定單顆 LED 正常。
- 顯示 LED 暫存陣列正常。
- 分數 LED 正常。
- 生命 LED 正常。

D4 版本沒有按鈕，因此按鍵積木回傳 false 是正常現象。

---

## 13. 後續建議

後續可再規劃：

1. MVP-C8-1E：更新 MVP log。
2. MVP-F01：新增韌體燒錄入口。
3. MVP-F02：整理 D8 / D4 韌體下載與燒錄說明。
4. MVP-V01：規劃 SmartRing 虛擬控制器。
5. MVP-AI01：規劃 AI 密室逃脫任務模式。

---

## 14. 本階段暫不處理事項

本階段不處理：

- 不修改 D8 / D4 韌體。
- 不重新燒錄硬體。
- 不新增 D8 / D4 專屬 Scratch 積木。
- 不修改第 4～7 章教材內容。
- 不新增 Scratch 自動評分。
- 不實作韌體燒錄頁。
- 不實作 SmartRing 虛擬控制器。
- 不實作 AI 密室逃脫。
