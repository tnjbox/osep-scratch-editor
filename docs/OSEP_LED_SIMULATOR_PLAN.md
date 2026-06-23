# OSEP LED 燈環模擬器規劃

版本：MVP-31-4  
專案：OSEP Scratch Editor / Blockly Lab / SmartRingController  
狀態：規劃完成，尚未實作  
建議檔名：`docs/OSEP_LED_SIMULATOR_PLAN.md`

---

## 一、規劃目的

線上 LED 燈環模擬器的目的，是讓沒有 SmartRingController 實體硬體的學生，也能先理解 SmartRing LED 燈環的控制概念。

這個模擬器不應只服務 OSEP Scratch Editor，也應同步考量 Blockly Lab。兩個平台都使用 SmartRingController 作為教學硬體，若模擬器從一開始就設計成可共用模組，未來可以降低重複開發與維護成本。

因此本規劃的核心方向是：

> 建立一套可同時支援 OSEP Scratch Editor 與 Blockly Lab 的共用 LED 燈環模擬器。

---

## 二、共用設計原則

### 1. 同一套模擬器核心

模擬器應拆成「核心邏輯」與「平台入口」兩層。

核心邏輯負責：

1. 管理 12 顆 LED 狀態。
2. 控制單顆 LED。
3. 控制全部 LED。
4. 顯示進度條。
5. 顯示分數。
6. 顯示生命值。
7. 顯示基本圖樣。
8. 將教學亮度值轉換為畫面顯示顏色。

平台入口負責：

1. OSEP Scratch Editor 的頁面整合。
2. Blockly Lab 的頁面整合。
3. 各平台的按鈕、說明文字與返回連結。
4. 未來與 Extension 或 Blockly Runtime 的連動。

建議未來核心檔案可朝共用模組方向設計，例如：

```text
simulator-core.js
simulator-view.js
simulator.css
```

不同平台只需要包一層入口頁。

---

## 三、亮度與 RGB 數值規範

### 1. 教學積木使用 0～30

雖然 RGB 顏色在網頁與一般 LED 控制中常見範圍是 0～255，但目前 OSEP Scratch Editor 與 Blockly Lab 的 SmartRing 積木都採用：

```text
R：0～30
G：0～30
B：0～30
```

這是因為實體 SmartRingController 的 WS2812 LED 不適合在課堂中使用過高亮度，既可能刺眼，也可能增加供電壓力。

因此模擬器的教學輸入範圍應統一採用：

```text
0～30
```

不應在第一版模擬器中直接讓學生輸入 0～255，避免與現有積木不一致。

### 2. 內部顯示可轉換為 0～255

模擬器可以在內部把 0～30 轉換成網頁顯示用的 0～255。

建議轉換方式：

```text
displayValue = round(inputValue / 30 * 255)
```

例如：

| 教學輸入值 | 網頁顯示值 |
|---:|---:|
| 0 | 0 |
| 10 | 85 |
| 20 | 170 |
| 30 | 255 |

### 3. 狀態顯示應同時保留教學值

LED 狀態陣列建議顯示教學值，而不是只顯示轉換後的 0～255。

建議顯示：

```text
LED 1：R=30, G=0, B=0
LED 2：R=0, G=30, B=0
LED 3：R=0, G=0, B=30
```

如需除錯，可在開發模式中額外顯示：

```text
CSS 顯示值：rgb(255, 0, 0)
```

但學生版畫面應以 0～30 為主。

---

## 四、目前網站狀態

目前 OSEP Scratch Editor 教材首頁已完成兩種使用方式說明。

### 方式 A｜使用實體硬體

學生若有 SmartRingController 實體硬體，需要先完成 ESP8266 韌體燒錄。

韌體燒錄頁面：

```text
https://tnjbox.github.io/blockly-lab/firmware.html
```

### 方式 B｜使用線上模擬

學生若沒有實體硬體，未來可使用線上 LED 燈環模擬器學習：

- LED 顯示
- RGB 顏色控制
- LED 陣列概念
- 進度條
- 分數 LED
- 生命值 LED
- 圖樣設計
- 互動回饋

目前首頁按鈕仍顯示「規劃中」，尚未連到正式模擬器頁面。

---

## 五、模擬器教學定位

線上 LED 燈環模擬器第一版的定位如下：

> 無硬體情境下的 SmartRing LED 陣列可視化學習工具。

它應該先協助學生理解：

1. SmartRing 有 12 顆 LED。
2. 每顆 LED 有固定編號。
3. 每顆 LED 可以設定 R、G、B 三個通道。
4. 教學亮度值範圍為 0～30。
5. 一圈 LED 可以被視為一組陣列資料。
6. 多顆 LED 可以組成圖樣、進度條、分數或生命值。
7. LED 回饋可以用來表達程式狀態。

第一版不追求完整硬體模擬，而是先完成 LED 概念展示。

---

## 六、使用情境

### 1. 課堂硬體不足

當班上只有少量 SmartRingController 時，部分學生可以先使用模擬器理解 LED 控制概念。

### 2. 線上教學

學生在家沒有硬體，也能透過瀏覽器操作 LED 燈環模擬器。

### 3. 課前預習

學生可以先熟悉 LED 編號、RGB 顏色與陣列概念，再到課堂操作實體硬體。

### 4. 教師展示

教師可用投影畫面示範：

- 第幾顆 LED 亮起
- 全部 LED 變色
- 進度條
- 分數顯示
- 生命值顯示
- LED 陣列資料變化

### 5. 跨平台共用

同一套 LED 模擬器核心未來可支援：

- OSEP Scratch Editor
- Blockly Lab
- SmartRingController 教材網站
- 未來其他教學頁面或展示頁

---

## 七、建議架構

建議採用「共用核心、分平台入口」架構。

```text
共用模擬器核心
        │
        ├── OSEP Scratch Editor 入口
        │
        └── Blockly Lab 入口
```

### 1. 共用核心

共用核心負責 LED 狀態與畫面繪製。

建議概念 API：

```javascript
SmartRingSimulatorCore.setLed(index, r, g, b);
SmartRingSimulatorCore.setAll(r, g, b);
SmartRingSimulatorCore.clear();
SmartRingSimulatorCore.showProgress(value);
SmartRingSimulatorCore.showScore(value);
SmartRingSimulatorCore.showLife(value);
SmartRingSimulatorCore.getState();
```

其中 `r`、`g`、`b` 均採用教學積木規格：

```text
0～30
```

### 2. 顯示轉換

核心內部或 View 層負責將 0～30 轉成 CSS 顯示顏色。

```javascript
function toDisplayValue(value) {
  const safeValue = Math.max(0, Math.min(30, Number(value) || 0));
  return Math.round((safeValue / 30) * 255);
}
```

### 3. 平台入口

OSEP Scratch Editor 與 Blockly Lab 可以各自提供自己的入口頁，但使用相同核心。

例如：

```text
OSEP Scratch Editor：static/osep/simulator/index.html
Blockly Lab：src 或 public 中建立 simulator 頁面
```

實際位置可在各專案實作時依照建置系統調整，但核心 API 與亮度規範應保持一致。

---

## 八、三種整合方案比較

## 方案 A｜獨立模擬器頁面

### 說明

先在 OSEP Scratch Editor 中新增一個獨立網頁作為 LED 燈環模擬器，例如：

```text
static/osep/simulator/index.html
static/osep/simulator/simulator.css
static/osep/simulator/simulator.js
```

但開發時就把核心邏輯寫成未來可搬移到 Blockly Lab 的形式。

### 優點

1. 風險最低。
2. 不影響 Scratch Editor。
3. 不影響 Extension trusted path。
4. 不影響 WebSerial。
5. 可單獨測試與部署。
6. 可先建立共用核心設計。
7. 適合作為第一版 MVP。

### 缺點

1. 第一版不會與 Scratch 積木即時連動。
2. 學生需要在模擬器頁與 Scratch 任務頁之間切換。
3. Blockly Lab 仍需後續建立入口頁。

### 適合階段

適合作為 MVP-31-5 第一版實作方向。

---

## 方案 B｜內嵌 OSEP Scratch Editor 或 Blockly Lab 面板

### 說明

將 LED 燈環模擬器嵌入平台介面，例如 OSEP Scratch Editor 的側邊面板，或 Blockly Lab 的右側 SmartRing 狀態區。

### 優點

1. 學生可在同一畫面看到積木與 LED 模擬器。
2. 教學體驗較完整。
3. Blockly Lab 原本已有右側狀態面板，未來較容易整合。
4. 可逐步支援無硬體教學。

### 缺點

1. OSEP Scratch Editor 需要修改 Scratch/TurboWarp GUI，風險較高。
2. Blockly Lab 與 OSEP Scratch Editor 的 UI 架構不同，需分別接入口。
3. 若核心沒有先獨立，容易造成兩邊重複開發。

### 適合階段

不建議作為 MVP-31-5。  
可在獨立模擬器穩定後，再分別評估兩個平台的嵌入方式。

---

## 方案 C｜與 OSEP Scratch Extension / Blockly Runtime 即時連動

### 說明

讓積木執行 LED 控制指令時，同步更新模擬器畫面。

未來可能形成兩種路徑：

```text
OSEP Scratch Editor：Scratch Extension → Simulator API
Blockly Lab：Blockly Runtime → Simulator API
```

### 優點

1. 最接近完整無硬體學習體驗。
2. Scratch 或 Blockly 積木執行後，學生可立即看到 LED 模擬效果。
3. 可讓沒有硬體的學生完成部分 LED 任務。
4. 同一套 Simulator API 可同時支援兩個平台。

### 缺點

1. 技術風險最高。
2. 需要修改 Extension 或 Runtime。
3. 需要定義穩定的模擬器 API。
4. 需要處理硬體未連線時 LED 指令是否仍可執行。
5. 需要處理實體硬體與模擬器同步顯示的責任分工。

### 適合階段

不建議 MVP-31-5 實作。  
適合 MVP-31-6 做可行性評估。

---

## 九、建議採用策略

建議採用三階段策略：

```text
MVP-31-4｜規劃線上 LED 燈環模擬器
MVP-31-5｜實作第一版獨立 LED 燈環模擬器
MVP-31-6｜評估與 OSEP Scratch Extension / Blockly Runtime 即時連動
```

目前定案：

1. 第一版採用「獨立模擬器頁面」。
2. 第一版的程式設計要預留 Blockly Lab 共用可能。
3. LED 控制輸入統一採用 0～30。
4. 畫面顯示時才轉換成 0～255。
5. 第一版不修改 Scratch Editor。
6. 第一版不修改 Extension。
7. 第一版不接 WebSerial。
8. 第一版先完成 12 顆 LED 的可視化控制。
9. 獨立模擬器穩定後，再評估與兩個平台即時連動。

---

## 十、MVP-31-5 第一版功能範圍

MVP-31-5 建議實作以下功能。

### 1. 12 顆 LED 燈環顯示

畫面中央顯示 12 顆 LED，排列成環狀。

每顆 LED 顯示編號：

```text
1 ～ 12
```

### 2. 單顆 LED RGB 控制

提供輸入欄位：

```text
LED 編號：1～12
R：0～30
G：0～30
B：0～30
```

按下按鈕後，指定 LED 顯示該 RGB 顏色。

### 3. 全部 LED 顏色控制

提供常用按鈕：

```text
全部紅色：R=30, G=0, B=0
全部綠色：R=0, G=30, B=0
全部藍色：R=0, G=0, B=30
全部白色：R=30, G=30, B=30
清除全部：R=0, G=0, B=0
```

### 4. LED 狀態陣列顯示

顯示目前 12 顆 LED 的教學值，例如：

```text
1: R=30, G=0, B=0
2: R=0, G=30, B=0
3: R=0, G=0, B=30
...
12: R=0, G=0, B=0
```

### 5. 進度條顯示

提供：

```text
進度值：0～12
```

輸入 5 時，亮起第 1～5 顆 LED。

### 6. 分數 LED 顯示

提供：

```text
分數：0～12
```

第一版可先用亮燈數量表示分數。

### 7. 生命值 LED 顯示

提供：

```text
生命值：0～5
```

第一版可先用前 5 顆或指定區域表示生命值。

### 8. 預設圖樣

可提供幾個基本圖樣：

```text
紅綠交錯
藍白交錯
奇數 LED
偶數 LED
彩虹示意
```

圖樣內部也應使用 0～30 的教學值，而不是直接使用 0～255。

### 9. 返回教材首頁

模擬器頁面應提供返回教材首頁的連結。

本機與 GitHub Pages 都應使用相對路徑，避免再次產生 base path 錯誤。

---

## 十一、MVP-31-5 暫不實作項目

第一版暫不實作：

1. Scratch Extension 即時連動。
2. Blockly Runtime 即時連動。
3. WebSerial 模擬。
4. 按鍵模擬。
5. 完整動畫播放。
6. 硬體模式與模擬模式切換。
7. 內嵌 Scratch Editor。
8. 內嵌 Blockly Lab。
9. 修改 `extensionV22C17.js`。
10. 修改 `tw-security-manager.jsx`。
11. 修改章節任務頁。
12. 修改 checklist 頁。

---

## 十二、建議檔案結構

MVP-31-5 在 OSEP Scratch Editor 專案中建議新增：

```text
static/osep/simulator/index.html
static/osep/simulator/simulator.css
static/osep/simulator/simulator.js
```

如果要提高未來共用性，可進一步拆成：

```text
static/osep/simulator/index.html
static/osep/simulator/simulator-core.js
static/osep/simulator/simulator-view.js
static/osep/simulator/simulator.css
```

其中：

- `simulator-core.js`：管理 LED 狀態、0～30 數值、進度條、分數、生命值。
- `simulator-view.js`：負責 DOM 畫面繪製，將 0～30 轉成 CSS 顯示。
- `simulator.css`：負責畫面樣式。
- `index.html`：OSEP Scratch Editor 的入口頁。

未來 Blockly Lab 若要共用，可參考同一個核心 API 重新接到 Blockly Lab 的頁面或面板。

可能修改：

```text
static/osep/index.html
docs/OSEP_LEVEL3_MVP_LOG.md
```

首頁只需要將「線上 LED 燈環模擬器（規劃中）」改成正式連結：

```html
<a class="btn" href="./simulator/">開啟線上 LED 燈環模擬器</a>
```

注意：

1. 使用相對路徑 `./simulator/`。
2. 不使用 `/osep/simulator/`。
3. 不使用 `https://tnjbox.github.io/osep/...` 硬編碼。
4. 避免再次發生 GitHub Pages base path 錯誤。

---

## 十三、頁面配置建議

模擬器頁面可分為四個區域：

```text
┌──────────────────────────────┐
│ SmartRing LED 燈環模擬器       │
├──────────────────────────────┤
│ 左側：12 顆 LED 燈環視覺區     │
│ 右側：控制面板                 │
│ 下方：LED 狀態陣列             │
│ 底部：教學提示與返回首頁        │
└──────────────────────────────┘
```

### 視覺區

顯示 12 顆 LED，環狀排列。

### 控制面板

包含：

1. 單顆 LED 控制
2. 全部顏色控制
3. 進度條
4. 分數
5. 生命值
6. 預設圖樣
7. 清除全部

### 狀態陣列

即時顯示目前 12 顆 LED 的 0～30 教學值。

### 教學提示

顯示簡短說明：

> SmartRingController 實體硬體共有 12 顆 LED。  
> 在這個模擬器中，你可以先理解每顆 LED 的編號、顏色與陣列狀態。  
> 本平台的 SmartRing 積木使用 0～30 控制 LED 亮度。  
> 未來接上實體硬體後，Scratch 或 Blockly 積木會控制真實 LED 燈環。

---

## 十四、與 OSEP Scratch Editor 的關係

### MVP-31-5

暫時無直接連動。

```text
Scratch Extension → 繼續控制實體硬體
LED 模擬器 → 獨立頁面練習 LED 概念
```

### MVP-31-6

再評估是否建立模擬器 API，例如：

```javascript
window.SmartRingSimulator = {
  setLed(index, r, g, b) {},
  setAll(r, g, b) {},
  clear() {},
  showProgress(value) {},
  showScore(value) {},
  showLife(value) {},
  getState() {}
};
```

其中 `r`、`g`、`b` 均為 0～30。

未來如果要連動 Extension，可讓 Extension 在執行 LED 指令時呼叫模擬器 API。

---

## 十五、與 Blockly Lab 的關係

Blockly Lab 已經有 SmartRingController 積木、WebSerial Runtime 與右側狀態區。未來若要整合模擬器，建議不要重新開發另一套 LED 邏輯，而是共用同一組核心概念。

### 建議整合方式

1. 第一階段：先參考 OSEP 模擬器核心，建立 Blockly Lab 入口頁或右側模擬面板。
2. 第二階段：讓 Blockly Runtime 執行 LED 積木時，同步呼叫 Simulator API。
3. 第三階段：支援硬體模式、模擬模式與雙顯示模式。

### Blockly Lab 應遵守的共同規格

1. LED 數量：12 顆。
2. LED 編號：1～12。
3. RGB 教學輸入範圍：0～30。
4. 畫面顯示可轉換為 0～255。
5. 狀態陣列以 0～30 顯示。
6. API 名稱與參數盡量與 OSEP 模擬器一致。

---

## 十六、與 WebSerial 的關係

MVP-31-5 不連接 WebSerial。

原因：

1. 第一版目標是 LED 概念展示。
2. WebSerial 是實體硬體通訊。
3. 模擬器不需要序列埠即可運作。
4. 若混入 WebSerial，會增加除錯複雜度。

未來可評估：

```text
硬體連線模式：積木 → WebSerial → ESP8266
模擬模式：積木 → Simulator API → LED 模擬器
雙顯示模式：積木 → WebSerial + Simulator API
```

---

## 十七、與課程任務的關係

### 第 4 章

可支援：

- C403 LED 顏色控制
- C404 LED 燈號回饋
- C405 簡易互動遊戲
- C406 基礎挑戰任務

### 第 5 章

可支援：

- C503 LED 狀態提示
- C505 分數與生命值
- C506 進階挑戰任務

### 第 6 章

可支援：

- C601 認識 LED 陣列
- C602 用陣列控制燈號
- C603 陣列位移效果
- C604 分數與生命 LED 陣列
- C605 陣列圖案設計
- C606 陣列挑戰任務

### 第 7 章

可支援：

- C702 LED 函式封裝
- C703 參數化 LED 控制
- C705 作品狀態管理
- C706 模組化挑戰任務

### Blockly Lab 課程

可支援：

- SmartRing 基礎互動課程
- SmartRing 陣列課程
- SmartRing 函式仿作課程
- 程式解題平台中的硬體互動展示

---

## 十八、風險控管

### 1. 避免硬編碼 GitHub Pages 路徑

首頁與模擬器頁面應優先使用相對路徑。

例如：

```html
<a href="../">返回教材首頁</a>
```

或：

```html
<a href="./simulator/">開啟線上 LED 燈環模擬器</a>
```

避免使用：

```text
/osep/...
https://tnjbox.github.io/osep/...
```

### 2. 不修改 Extension

MVP-31-5 不修改：

```text
static/osep/extensions/extensionV22C17.js
```

### 3. 不修改 trusted path

MVP-31-5 不修改：

```text
src/containers/tw-security-manager.jsx
```

### 4. 不修改章節頁與 checklist

MVP-31-5 優先只新增模擬器頁，不影響既有學習任務。

### 5. 避免 0～255 與 0～30 規格混用

學生操作介面、狀態陣列、API 參數應統一使用 0～30。  
只有畫面渲染層可以轉成 0～255。

### 6. 避免 OSEP 與 Blockly Lab 各自長出不同規格

若未來兩個平台都要使用模擬器，應共同遵守：

```text
LED_COUNT = 12
LED_INDEX = 1～12
RGB_INPUT_RANGE = 0～30
```

---

## 十九、驗收標準

MVP-31-5 完成後，至少需通過：

1. GitHub Pages 可開啟模擬器頁。
2. 本機開發環境可開啟模擬器頁。
3. 12 顆 LED 能正確顯示。
4. LED 編號 1～12 清楚可見。
5. 單顆 LED RGB 控制正常。
6. RGB 輸入範圍為 0～30。
7. 輸入超出 0～30 時能被限制或提示。
8. 全部 LED 控制正常。
9. 清除全部正常。
10. 進度條顯示正常。
11. 分數 LED 顯示正常。
12. 生命值 LED 顯示正常。
13. LED 狀態陣列以 0～30 顯示。
14. 畫面顏色能正確呈現亮度差異。
15. 返回教材首頁連結正常。
16. 不影響 C01 課前連線測試。
17. 不影響第 4～7 章章節入口。
18. 不影響 `.sb3` 任務載入。
19. 不影響 OSEP Extension unsandboxed 載入。
20. 程式結構保留未來 Blockly Lab 共用可能。

---

## 二十、MVP Log 建議紀錄

以下內容可加入 `docs/OSEP_LEVEL3_MVP_LOG.md`。

### MVP-31-4｜規劃線上 LED 燈環模擬器

#### 任務目標

規劃 OSEP Scratch Editor 與 Blockly Lab 可共用的線上 LED 燈環模擬器，讓沒有 SmartRingController 實體硬體的學生，也能先理解 LED 顯示、RGB 顏色、LED 陣列、進度條、分數與生命值等概念。

#### 本版重點

本版僅進行規劃，不修改網站功能、Extension 或 Blockly Runtime。

#### 新增文件

- `docs/OSEP_LED_SIMULATOR_PLAN.md`

#### 規劃結論

第一版模擬器建議採用獨立頁面方式實作，但程式結構需預留未來與 Blockly Lab 共用的可能。

MVP-31-5 第一版先完成：

1. 12 顆 LED 燈環顯示
2. LED 編號 1～12
3. 單顆 LED RGB 控制
4. RGB 教學輸入範圍 0～30
5. 全部 LED 顏色控制
6. 清除全部
7. 進度條顯示
8. 分數 LED 顯示
9. 生命值 LED 顯示
10. LED 狀態陣列顯示
11. 返回教材首頁

#### 共用規格

- LED 數量：12 顆
- LED 編號：1～12
- RGB 教學輸入範圍：0～30
- 畫面顯示值：可由 0～30 轉換為 0～255
- 狀態陣列顯示：以 0～30 為主
- 未來整合：OSEP Scratch Editor 與 Blockly Lab 共用模擬器核心概念

#### 暫不實作

MVP-31-5 暫不實作：

- Scratch Extension 即時連動
- Blockly Runtime 即時連動
- WebSerial 模擬
- 按鍵模擬
- 內嵌 Scratch Editor 面板
- 內嵌 Blockly Lab 面板
- 修改 `extensionV22C17.js`
- 修改 `tw-security-manager.jsx`

#### 風險控管

因前一版曾發生 GitHub Pages base path 錯誤，本規劃要求後續模擬器入口優先使用相對路徑，例如：

```html
<a href="./simulator/">開啟線上 LED 燈環模擬器</a>
```

避免使用硬編碼：

```text
/osep/...
https://tnjbox.github.io/osep/...
```

同時避免將學生操作介面設計成 0～255，因為目前 OSEP Scratch Editor 與 Blockly Lab 的 SmartRing 積木皆採用 0～30。

#### 測試狀態

本版為規劃文件，無功能測試項目。  
後續 MVP-31-5 實作時需確認不影響：

- C01 課前連線測試
- 第 4～7 章章節入口
- `.sb3` 任務載入
- OSEP Extension unsandboxed 載入

---

## 二十一、結論

MVP-31-4 定案如下：

線上 LED 燈環模擬器第一版應採用「獨立頁面」實作，先作為無硬體教學與 LED 陣列概念展示工具。

但設計時不能只考慮 OSEP Scratch Editor，也要預留 Blockly Lab 共用可能。未來兩個平台應盡量共用同一套模擬器核心概念，避免重複開發。

RGB 控制規格應與現有 SmartRing 積木一致，學生輸入與狀態顯示統一採用 0～30。模擬器內部可在畫面渲染時將 0～30 轉成 0～255，但不應讓學生版介面直接使用 0～255。

MVP-31-5 再正式新增模擬器頁面，完成 12 顆 LED 顯示、單顆 RGB 控制、全部顏色控制、進度條、分數、生命值與 LED 狀態陣列顯示。
