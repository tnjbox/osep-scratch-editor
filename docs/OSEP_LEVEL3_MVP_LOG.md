# OSEP Scratch Editor Level 3-MVP 開發紀錄

## MVP-01 建立專案

- 專案資料夾：D:\YOSEP\osep-scratch-editor
- 基礎專案：TurboWarp/scratch-gui
- 狀態：完成

## MVP-02 本機安裝與啟動

- npm ci：完成
- npm start：完成
- 編譯結果：Compiled successfully
- 本機網址：http://localhost:8601/
- 狀態：完成

## MVP-03 原始 Editor 基準測試

| 測試項目 | 結果 | 備註 |
|---|---|---|
| Editor 可開啟 |  |  |
| 基本積木可拖曳 |  |  |
| 綠旗可執行 |  |  |
| Extension 選單可開啟 |  |  |
| 原本 Extension 可顯示 |  |  |

## MVP-03 原始 Editor 基準測試

| 測試項目 | 結果 | 備註 |
|---|---|---|
| Editor 可開啟 | 成功 | http://localhost:8601/ |
| 基本積木可拖曳 | 成功 |  |
| 綠旗可執行 | 成功 |  |
| Extension 選單可開啟 | 成功 |  |
| 原本 Extension 可顯示 | 成功 |  |

## MVP-05A 手動載入 OSEP Extension 測試

- 測試方式：在自架 TurboWarp/scratch-gui 開發版中載入 OSEP WebSerial Extension
- 測試網址：http://localhost:8601/
- ESP8266 互動：成功
- WebSerial 連線：成功
- 結論：自架 Editor 開發環境可支援 OSEP WebSerial Extension

## MVP-05B 本地 Extension URL 測試

- Extension 檔案位置：static/osep/extensions/extensionV22C17.js
- 測試 URL：http://localhost:8601/osep/extensions/extensionV22C17.js
- 結果：Extension 可被載入，但被 sandbox 執行
- 錯誤訊息：Error in sandboxed script
- 判斷：只修改 Extension Library 選單不足以支援 WebSerial Extension
- 下一步：尋找 trusted / unsandboxed extension 載入機制

## MVP-05C Trusted Local Extension 測試

- Extension 檔案位置：static/osep/extensions/extensionV22C17.js
- 測試 URL：http://localhost:8601/osep/extensions/extensionV22C17.js
- 修改檔案：src/containers/tw-security-manager.jsx
- 修改內容：將 http://localhost:8601/osep/extensions/ 加入 trusted extension path
- 測試結果：成功
- 結論：OSEP Extension 可透過本機 trusted path 以 unsandboxed 方式執行，WebSerial 可正常與 ESP8266 互動

## MVP-05D Extension 選單整合測試

- 修改檔案：src/lib/libraries/extensions/index.jsx
- Extension 名稱：OSEP SmartRing
- Extension URL：http://localhost:8601/osep/extensions/extensionV22C17.js
- 載入方式：Extension 選單載入
- Trusted / Unsandboxed：成功
- ESP8266 WebSerial 互動：成功
- Git commit：完成
- 結論：OSEP SmartRing 已可作為自架 OSEP Scratch Editor 的擴充功能選單項目使用

## MVP-06 C01_connect.sb3 載入測試

- 專案檔案：static/osep/projects/C01_connect.sb3
- 測試方式：在自架 OSEP Scratch Editor 手動載入 C01_connect.sb3
- OSEP Extension 載入方式：Extension 選單載入 OSEP SmartRing
- Extension ID 對應：成功
- OSEP 積木狀態：正常，未出現 undefined / 紅色積木
- WebSerial 連線：成功
- ESP8266 搖桿 / 按鍵互動：成功
- 結論：C01_connect.sb3 可作為自架 OSEP Scratch Editor 的第一個練習檔git status

## MVP-07 C01 project_url 自動載入測試

- 專案檔案：static/osep/projects/C01_connect.sb3
- 專案 URL：http://localhost:8601/osep/projects/C01_connect.sb3
- Editor 測試 URL：http://localhost:8601/?project_url=http%3A%2F%2Flocalhost%3A8601%2Fosep%2Fprojects%2FC01_connect.sb3
- 測試結果：成功
- C01 自動載入：成功
- OSEP Extension 對應：成功
- ESP8266 WebSerial 互動：成功
- 結論：自架 OSEP Scratch Editor 可透過 project_url 參數載入課程練習檔

## MVP-08 C01 課堂入口頁測試

- 入口頁位置：static/osep/index.html
- 入口網址：http://localhost:8601/osep/
- 功能：提供 C01 連線測試入口
- 點選後載入：C01_connect.sb3
- project_url 自動載入：成功
- OSEP SmartRing Extension：可正常載入
- ESP8266 WebSerial 互動：成功
- 結論：自架 OSEP Scratch Editor 已具備最小課堂入口能力


## MVP-09 Build 版測試

- Build 指令：npm run build
- Build 測試伺服器：npx serve build
- 測試網址：http://localhost:3000/osep/
- C01 載入方式：入口頁同時帶入 extension 與 project_url 參數
- Extension URL：使用 window.location.origin 動態產生
- Project URL：使用 window.location.origin 動態產生
- Trusted Extension：信任目前網站來源下的 /osep/extensions/
- C01_connect.sb3 自動載入：成功
- OSEP SmartRing Extension 自動載入：成功
- ESP8266 WebSerial 互動：成功
- 結論：自架 OSEP Scratch Editor 已可 build 成正式可測試版本

MVP-10 完成：
1. 家中電腦成功將 MVP-09 版本 push 到 GitHub
2. GitHub repo 已更新到 feature/osep-extension-menu
3. 學校電腦成功 pull 最新版本
4. 學校電腦測試正常
5. 兩邊電腦已建立 GitHub 同步流程

## MVP-11｜建立正式課堂任務首頁

### 完成日期
2026-06-17

### 完成內容
1. 將 `/osep/` 課堂入口頁改為正式任務首頁。
2. 建立 C01、C02、C03、C04 四個任務卡片。
3. C01「連線測試」可點擊進入。
4. C01 可自動載入 OSEP SmartRing Extension。
5. C01 可自動載入 `C01_connect.sb3`。
6. C02～C04 先設定為「即將開放」，避免學生誤點。
7. 頁面使用 `window.location.origin` 動態產生 extension URL 與 project URL。
8. 本機測試成功，並已 push 到 GitHub。

### 修改檔案
- `static/osep/index.html`

### 測試結果
1. `http://localhost:8601/osep/` 可正常開啟。
2. 可看到 OSEP SmartRing 課堂任務入口頁。
3. C01 可正常點擊。
4. 點選 C01 後可進入 Scratch Editor。
5. Extension 與 C01 專案可自動載入。

## MVP-12｜建立 SmartRingController 教材網站架構 V1

### 完成內容

1. 將 `/osep/index.html` 從單一課堂任務首頁，調整為 SmartRingController 教材總入口。
2. 保留 `C01_connect.sb3` 作為全課程共用「課前連線測試」，不列入第4章正式任務。
3. 建立正式任務命名規則：

   * C401～C406：第4章基礎任務
   * C501～C506：第5章進階任務
   * C601～C606：第6章陣列任務
   * C701～C706：第7章模組化任務
4. 新增 `static/osep/data/tasks.js`，集中管理教材章節、任務代碼、任務名稱、任務說明、學習目標、Scratch 專案路徑與自我檢核表連結。
5. 新增第4～7章章節頁：

   * `static/osep/chapters/ch04.html`
   * `static/osep/chapters/ch05.html`
   * `static/osep/chapters/ch06.html`
   * `static/osep/chapters/ch07.html`
6. 每個章節頁可讀取 `tasks.js`，動態呈現該章教材簡介、學習概念與 6 個任務摺疊區塊。
7. 每個任務摺疊區塊預留：

   * 任務說明
   * 學習目標
   * 任務練習檔按鈕
   * 自我檢核表按鈕
8. 尚未建立的任務練習檔與自我檢核表，先顯示為「尚未開放」。
9. 本機測試成功，並已 push 到 GitHub。

### 修改與新增檔案

* `static/osep/index.html`
* `static/osep/data/tasks.js`
* `static/osep/chapters/ch04.html`
* `static/osep/chapters/ch05.html`
* `static/osep/chapters/ch06.html`
* `static/osep/chapters/ch07.html`

### 測試結果

1. `http://localhost:8601/osep/` 可正常開啟教材總入口。
2. 首頁可顯示教材簡介、C01 課前連線測試與第4～7章入口。
3. C01 課前連線測試可正常開啟 Scratch Editor，並自動載入 OSEP Extension 與 `C01_connect.sb3`。
4. 第4～7章頁面可正常開啟。
5. 章節頁可顯示章節簡介、學習概念與 6 個任務摺疊區塊。
6. 任務練習檔與自我檢核表按鈕可依照 `tasks.js` 中的 `enabled` 與 `checklist` 狀態顯示。

## MVP-13｜建立 C401 按鍵偵測任務

### 完成日期

2026-06-17

### 目標

建立第 4 章第一個正式任務 C401「按鍵偵測」，讓學生可以透過 SmartRingController 的 4 個方向鍵，練習使用 Scratch 偵測實體按鍵輸入，並讓角色做出對應回應。

### 完成內容

1. 確認 C401 定位為第 4 章基礎任務的第一個正式任務。
2. 確認 C401 採用 4 鍵方向鍵偵測：
   - BTN1：上
   - BTN2：下
   - BTN3：左
   - BTN4：右
3. 建立 C401 學生練習檔：
   - `static/osep/projects/ch04/C401_button_detect.sb3`
4. C401 練習檔採用半成品學生練習檔設計：
   - 保留角色與任務提示。
   - 預備會用到的方向鍵偵測積木。
   - 不直接完成完整答案，讓學生需要自行組合核心邏輯。
5. 修改 `static/osep/data/tasks.js`：
   - 確認 C401 project 路徑為 `/osep/projects/ch04/C401_button_detect.sb3`
   - 將 C401 的 `enabled` 改為 `true`
   - `checklist` 暫時維持空字串，等待後續自我檢核頁建立。
6. 完成本機測試：
   - `/osep/` 可正常開啟教材總入口。
   - 第 4 章頁面可展開 C401 任務。
   - C401「開啟任務練習檔」按鈕可正常啟動 Scratch Editor。
   - Scratch Editor 可自動載入 OSEP SmartRing Extension。
   - Scratch Editor 可自動載入 C401 專案。
   - ESP8266 SmartRingController BTN1～BTN4 測試正常。
7. 已完成 commit 並 push 到 GitHub：
   - `MVP-13 create C401 button detect task`

### 修改檔案

```text
static/osep/data/tasks.js
static/osep/projects/ch04/C401_button_detect.sb3
docs/OSEP_LEVEL3_MVP_LOG.md


## MVP-14｜建立 C402 角色移動任務

### 完成日期

2026-06-17

### 目標

建立第 4 章第二個正式任務 C402「角色移動」，讓學生使用 SmartRingController 的 4 個方向鍵控制 Scratch 角色上下左右移動，從 C401 的「按鍵偵測」進一步理解「按鍵輸入」與「角色座標變化」之間的關係。

### 完成內容

1. 確認 C402 定位為第 4 章基礎任務的第二個正式任務。
2. 確認 C402 採用 4 鍵方向鍵控制：
   - BTN1：角色往上移動
   - BTN2：角色往下移動
   - BTN3：角色往左移動
   - BTN4：角色往右移動
3. 建立 C402 學生練習檔：
   - `static/osep/projects/ch04/C402_sprite_move.sb3`
4. C402 練習檔採用半成品學生練習檔設計：
   - 保留角色、起始位置與任務提示。
   - 預備方向鍵偵測與 x/y 座標移動積木。
   - 不直接完成完整答案，讓學生需要自行組合核心邏輯。
5. 修改 `static/osep/data/tasks.js`：
   - 確認 C402 project 路徑為 `/osep/projects/ch04/C402_sprite_move.sb3`
   - 將 C402 的 `enabled` 改為 `true`
   - `checklist` 暫時維持空字串，等待後續自我檢核頁建立。
6. 完成本機測試：
   - 第 4 章頁面可展開 C402 任務。
   - C402「開啟任務練習檔」按鈕可正常啟動 Scratch Editor。
   - Scratch Editor 可自動載入 OSEP SmartRing Extension。
   - Scratch Editor 可自動載入 C402 專案。
   - ESP8266 SmartRingController BTN1～BTN4 可正常控制角色上下左右移動。
7. 已完成 commit 並 push 到 GitHub：
   - `MVP-14 create C402 sprite move task`

### 修改檔案

```text
static/osep/data/tasks.js
static/osep/projects/ch04/C402_sprite_move.sb3
docs/OSEP_LEVEL3_MVP_LOG.md

## MVP-16｜建立第 4 章自我檢核表架構

### 完成日期

2026-06-17

### 目標

建立第 4 章 C401～C406 的自我檢核表靜態頁面，並將檢核表連結接回第 4 章任務卡片，讓學生完成每個任務後可以進行自我檢核與反思。

### 完成內容

1. 調整第 4～7 章任務練習檔開啟方式：
   - 點選「開啟任務練習檔」時，Scratch Editor 改為在新分頁開啟。
   - 原本章節頁保留在原分頁，方便學生對照任務說明與檢核表。
2. 建立第 4 章自我檢核表資料夾：
   - `static/osep/checklists/ch04/`
3. 建立 C401 自我檢核表頁面：
   - `static/osep/checklists/ch04/C401_checklist.html`
4. 建立 C402～C406 自我檢核表頁面：
   - `static/osep/checklists/ch04/C402_checklist.html`
   - `static/osep/checklists/ch04/C403_checklist.html`
   - `static/osep/checklists/ch04/C404_checklist.html`
   - `static/osep/checklists/ch04/C405_checklist.html`
   - `static/osep/checklists/ch04/C406_checklist.html`
5. 每個自我檢核表頁面皆包含：
   - 任務目標
   - 我做到了
   - 我能說明
   - 延伸挑戰
   - 完成後想一想
   - 返回第 4 章
   - 返回教材總入口
6. 修改 `static/osep/data/tasks.js`：
   - 將 C401～C406 的 `checklist` 欄位接上對應檢核表頁面。
7. 完成本機測試：
   - 第 4 章 C401～C406 任務練習檔皆可在新分頁開啟。
   - 第 4 章 C401～C406 自我檢核表按鈕皆可正常開啟。
   - 每個檢核表頁面可正常顯示。
   - checkbox 可正常勾選。
   - 返回第 4 章與返回教材總入口按鈕正常。
8. 已完成 commit 並 push 到 GitHub：
   - `ch04-ch07: open task projects in new tab (target=_blank, noopener noreferrer)`
   - `MVP-16 add C401 checklist page`
   - `ch04: add C402-C406 checklist pages`
   - `ch04: set checklist URLs for C401-C406`

### 修改檔案

```text
static/osep/chapters/ch04.html
static/osep/chapters/ch05.html
static/osep/chapters/ch06.html
static/osep/chapters/ch07.html
static/osep/checklists/ch04/C401_checklist.html
static/osep/checklists/ch04/C402_checklist.html
static/osep/checklists/ch04/C403_checklist.html
static/osep/checklists/ch04/C404_checklist.html
static/osep/checklists/ch04/C405_checklist.html
static/osep/checklists/ch04/C406_checklist.html
static/osep/data/tasks.js
docs/OSEP_LEVEL3_MVP_LOG.md

## MVP-17｜建立第 4 章自我檢核表送出功能

### 完成日期

2026-06-18

### 目標

將第 4 章 C401～C406 自我檢核表由靜態 HTML 頁面升級為可送出表單，讓學生完成任務後可以填寫班級、座號、姓名、勾選自我檢核項目、填寫學習反思，並將資料送出到 Google Sheet。

### 完成內容

1. 建立 Google Sheet 回收表：
   - 試算表名稱：`OSEP_SmartRing_Checklist_Responses`
   - 工作表名稱：`responses`
2. 設定 Google Sheet 欄位：
   - `timestamp`
   - `chapter`
   - `taskCode`
   - `taskTitle`
   - `className`
   - `seatNumber`
   - `studentName`
   - `doneItems`
   - `explainItems`
   - `challengeItems`
   - `reflection`
   - `userAgent`
3. 建立 Google Apps Script Web App：
   - `doPost(e)`：接收前端 JSON 資料並寫入 Google Sheet。
   - `doGet()`：提供 API 運作測試。
   - `testDoPost()`：提供 Apps Script 內部測試資料。
4. 完成 Apps Script 測試：
   - `doGet` 測試成功。
   - `testDoPost` 測試成功。
   - Google Sheet 可新增測試資料。
5. 將 `C401_checklist.html` 升級為可送出版本：
   - 新增班級、座號、姓名欄位。
   - 新增學習反思欄位。
   - 新增「送出自我檢核」按鈕。
   - 新增送出狀態訊息。
   - 可將 `doneItems`、`explainItems`、`challengeItems` 寫入 Google Sheet。
6. 建立自我檢核表送出規格文件：
   - `docs/OSEP_CHECKLIST_SUBMIT_SPEC.md`
7. 將 C402～C406 自我檢核表批次升級為可送出版本：
   - `C402_checklist.html`
   - `C403_checklist.html`
   - `C404_checklist.html`
   - `C405_checklist.html`
   - `C406_checklist.html`
8. 完成本機測試：
   - C401～C406 每一頁皆可輸入班級、座號、姓名。
   - checkbox 可正常勾選。
   - 學習反思欄位可輸入。
   - 必填欄位未填時會提示。
   - 送出後 Google Sheet 可新增對應任務資料。
   - `taskCode` 與 `taskTitle` 寫入正確。
9. 已完成 commit 並 push 到 GitHub：
   - `MVP-17 enable C401 checklist submission`
   - `docs add checklist submit spec`
   - `MVP-17 enable chapter 4 checklist submissions`

### 修改檔案

```text
static/osep/checklists/ch04/C401_checklist.html
static/osep/checklists/ch04/C402_checklist.html
static/osep/checklists/ch04/C403_checklist.html
static/osep/checklists/ch04/C404_checklist.html
static/osep/checklists/ch04/C405_checklist.html
static/osep/checklists/ch04/C406_checklist.html
docs/OSEP_CHECKLIST_SUBMIT_SPEC.md
docs/OSEP_LEVEL3_MVP_LOG.md

---

## MVP-19｜重構自我檢核表共用送出 JS

### 完成日期

2026-06-18

### 本版新增功能

1. 新增第 4 章自我檢核表共用送出程式：
   - `static/osep/checklists/checklist-submit.js`
2. 將 C401～C406 原本各自內嵌的 Google Sheet 送出 JavaScript 抽出為共用檔案。
3. C401～C406 各自保留任務設定：
   - `chapter`
   - `taskCode`
   - `taskTitle`
4. 成功訊息統一為：
   - `已送出自我檢核表`
5. 保留原本 Google Sheet 送出功能，並讓第 5～7 章後續檢核表可重複使用共用送出邏輯。

### 修改檔案

```text
static/osep/checklists/checklist-submit.js
static/osep/checklists/ch04/C401_checklist.html
static/osep/checklists/ch04/C402_checklist.html
static/osep/checklists/ch04/C403_checklist.html
static/osep/checklists/ch04/C404_checklist.html
static/osep/checklists/ch04/C405_checklist.html
static/osep/checklists/ch04/C406_checklist.html
docs/OSEP_LEVEL3_MVP_LOG.md

---

## MVP-20｜重整第 5 章進階任務架構

### 完成日期

2026-06-18

### 本版新增功能

1. 重整第 5 章「進階任務」的 C501～C506 任務序列。
2. 將第 5 章定位為承接第 4 章基礎任務，進入連續控制、速度變數、LED 狀態提示、條件判斷、分數與生命值。
3. 更新 `static/osep/data/tasks.js` 中 `ch05` 的章節說明、概念標籤與任務資料。
4. 第 5 章任務仍維持 `enabled: false`，避免尚未建立任務檔時誤導學生開啟。
5. 為後續 MVP-21～MVP-26 建立施工藍圖。

### 修改檔案

```text
static/osep/data/tasks.js
docs/OSEP_LEVEL3_MVP_LOG.md

---

## MVP-21｜建立第 5 章 C501～C506 任務基礎架構

### 完成日期

2026-06-18

### 本版新增功能

1. 建立第 5 章任務檔資料夾：
   - `static/osep/projects/ch05/`
2. 建立第 5 章自我檢核表資料夾：
   - `static/osep/checklists/ch05/`
3. 建立 C501～C506 任務檔骨架：
   - `C501_continuous_control.sb3`
   - `C502_speed_direction.sb3`
   - `C503_led_status.sb3`
   - `C504_condition_interaction.sb3`
   - `C505_score_life.sb3`
   - `C506_advanced_challenge.sb3`
4. 建立 C501～C506 自我檢核表骨架：
   - `C501_checklist.html`
   - `C502_checklist.html`
   - `C503_checklist.html`
   - `C504_checklist.html`
   - `C505_checklist.html`
   - `C506_checklist.html`
5. C501～C506 自我檢核表皆沿用 MVP-19 的共用送出程式：
   - `static/osep/checklists/checklist-submit.js`
6. 更新 `static/osep/data/tasks.js`：
   - C501 補上任務檔與自我檢核表路徑並啟用。
   - C502～C506 補上任務檔與自我檢核表路徑，但維持未啟用。
7. 本版先建立第 5 章可測試骨架，正式教材內容後續再規劃與替換。

### 修改檔案

```text
static/osep/data/tasks.js
docs/OSEP_LEVEL3_MVP_LOG.md

---

## MVP-22｜建立第 5 章正式教材內容規劃文件

### 完成日期

2026-06-18

### 本版新增功能

1. 新增第 5 章正式教材內容規劃文件：
   - `docs/OSEP_CH05_TASK_PLAN.md`
2. 明確定義第 5 章「進階任務」的教學定位。
3. 規劃 C501～C506 的正式教材內容方向：
   - 教學目標
   - 教師示範題
   - 學生仿作練習
   - 延伸挑戰
   - 主要使用積木
   - 自我檢核重點
   - Scratch 任務檔修改方向
4. 建立後續 MVP-23～MVP-28 的任務製作順序。
5. 本版僅建立教材規劃文件，尚未修改第 5 章 `.sb3` 任務檔與檢核表內容。

### 新增檔案

```text
docs/OSEP_CH05_TASK_PLAN.md


---

## MVP-23｜統一第 4、5 章自我檢核表版型

### 完成日期

2026-06-18

### 本版新增功能

1. 統一第 4 章 C401～C406 自我檢核表版型。
2. 統一第 5 章 C501～C506 自我檢核表版型。
3. 將「學習反思」欄位從學生基本資料區移到最後的「完成後想一想」區塊。
4. 移除自我檢核表中的獨立「按鍵對應」區塊。
5. 確認各檢核表保留：
   - `className`
   - `seatNumber`
   - `studentName`
   - `reflection`
   - `doneItems`
   - `explainItems`
   - `challengeItems`
   - `submitButton`
   - `submitStatus`
   - `checklist-submit.js`
   - `OSEP_CHECKLIST_CONFIG`

### 修改檔案

```text
static/osep/checklists/ch04/C401_checklist.html
static/osep/checklists/ch04/C402_checklist.html
static/osep/checklists/ch04/C403_checklist.html
static/osep/checklists/ch04/C404_checklist.html
static/osep/checklists/ch04/C405_checklist.html
static/osep/checklists/ch04/C406_checklist.html
static/osep/checklists/ch05/C501_checklist.html
static/osep/checklists/ch05/C502_checklist.html
static/osep/checklists/ch05/C503_checklist.html
static/osep/checklists/ch05/C504_checklist.html
static/osep/checklists/ch05/C505_checklist.html
static/osep/checklists/ch05/C506_checklist.html
docs/OSEP_LEVEL3_MVP_LOG.md

## MVP-24A｜建立第 6 章與第 7 章章節骨架

完成狀態：已完成  
Commit：2472c4c14  
分支：feature/osep-extension-menu

### 1. 本版新增功能

- 建立第 6 章「陣列任務」章節頁骨架：`static/osep/chapters/ch06.html`
- 建立第 7 章「模組化任務」章節頁骨架：`static/osep/chapters/ch07.html`
- 新增第 6 章 C601～C606 任務練習檔占位檔。
- 新增第 6 章 C601～C606 自我檢核表骨架。
- 更新 `tasks.js`，加入並修正第 6 章、第 7 章章節資料。
- 修正第 4～7 章任務練習檔連結，點選後直接進入 Scratch Editor 的 `editor.html` 頁面。
- 第 7 章目前僅建立章節與任務資料骨架，正式練習檔與自我檢核表後續再補。

### 2. 修改檔案

- `static/osep/chapters/ch04.html`
- `static/osep/chapters/ch05.html`
- `static/osep/chapters/ch06.html`
- `static/osep/chapters/ch07.html`
- `static/osep/data/tasks.js`
- `static/osep/projects/ch06/C601_led_array_intro.sb3`
- `static/osep/projects/ch06/C602_array_led_control.sb3`
- `static/osep/projects/ch06/C603_array_shift_rotate.sb3`
- `static/osep/projects/ch06/C604_score_life_array.sb3`
- `static/osep/projects/ch06/C605_array_pattern.sb3`
- `static/osep/projects/ch06/C606_array_challenge.sb3`
- `static/osep/checklists/ch06/C601_checklist.html`
- `static/osep/checklists/ch06/C602_checklist.html`
- `static/osep/checklists/ch06/C603_checklist.html`
- `static/osep/checklists/ch06/C604_checklist.html`
- `static/osep/checklists/ch06/C605_checklist.html`
- `static/osep/checklists/ch06/C606_checklist.html`

### 3. 重要修正

原本任務練習檔連結會進入專題頁面：

```text
http://localhost:8601/?extension=...&project_url=...