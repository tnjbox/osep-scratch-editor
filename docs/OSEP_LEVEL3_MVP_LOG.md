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

## MVP-24B｜建立第 7 章練習檔與自我檢核表骨架

完成狀態：已完成  
分支：feature/osep-extension-menu

### 1. 本版新增功能

- 建立第 7 章「模組化任務」C701～C706 練習檔占位檔。
- 建立第 7 章 C701～C706 自我檢核表骨架。
- 更新 `tasks.js`，將第 7 章 C701～C706 任務接上對應自我檢核表路徑。
- 第 7 章目前仍維持 `enabled: false`，任務練習檔尚未正式開放。
- 本版只完成章節骨架，不製作正式 Scratch 任務內容。

### 2. 修改檔案

- `static/osep/data/tasks.js`
- `static/osep/projects/ch07/C701_custom_block_intro.sb3`
- `static/osep/projects/ch07/C702_led_function.sb3`
- `static/osep/projects/ch07/C703_parameter_led.sb3`
- `static/osep/projects/ch07/C704_interaction_module.sb3`
- `static/osep/projects/ch07/C705_state_management.sb3`
- `static/osep/projects/ch07/C706_module_challenge.sb3`
- `static/osep/checklists/ch07/C701_checklist.html`
- `static/osep/checklists/ch07/C702_checklist.html`
- `static/osep/checklists/ch07/C703_checklist.html`
- `static/osep/checklists/ch07/C704_checklist.html`
- `static/osep/checklists/ch07/C705_checklist.html`
- `static/osep/checklists/ch07/C706_checklist.html`

### 3. 測試方式

本機啟動：

```powershell
npm start

## MVP-C8-1E｜更新 C8 通訊協定與展示修正紀錄

完成狀態：已完成
分支：feature/osep-extension-menu

### 1. 本版新增功能

* 補充 C8 通訊協定整合紀錄。
* 確認 OSEP Scratch Editor 已可使用 C8 JSON LED 協定。
* 確認 D8 版本硬體可正常進行 WebSerial 連線、按鍵讀取與 LED 控制。
* 確認 Scratch 積木端亮度維持 0～30，送往 C8 韌體前自動 map 到 0～255。
* 確認教材首頁 C01 連線測試可直接開啟 Scratch Editor 程式頁面。
* 確認教材首頁 C01 連線測試改為新分頁開啟，保留原教材首頁。

### 2. 修改與相關檔案

* `static/osep/extensions/extensionV22C17.js`

  * LED 指令由舊協定改為 C8 JSON 協定。
  * `cmd:"RGB"` 改為 `cmd:"setAllLeds"`。
  * `cmd:"BUFFER"` 改為 `cmd:"showBuffer"`。
  * `cmd:"CLEAR"` 改為 `cmd:"clearLeds"`。
  * 新增 `mapLedValueToC8()`，將 Scratch 積木端 0～30 轉換為 C8 韌體端 0～255。
  * 保留原本 `ledBuffer` 架構，避免大幅修改既有積木邏輯。

* `static/osep/index.html`

  * C01 連線測試連結改為 `/editor.html?extension=...&project_url=...`。
  * C01 連線測試按鈕加入 `target="_blank"` 與 `rel="noopener noreferrer"`。

* `docs/OSEP_C8_SERIAL_PROTOCOL.md`

  * 新增 C8 通訊協定正式文件。
  * 說明 D8 / D4 兩種硬體版本共用 C8 JSON 通訊協定。
  * 說明平台端不需判斷 D8 / D4，只需依照標準 JSON 協定收送資料。
  * 說明 LED 指令、按鍵資料、亮度 map 策略與展示測試清單。

### 3. 測試方式

本機啟動：

```powershell
npm start
```

測試網址：

```text
http://localhost:8601/osep/
```

測試項目：

* 教材首頁可正常開啟。
* 點選 C01「開始連線測試」後，原首頁保留不動。
* 新分頁可開啟 Scratch Editor。
* 新分頁網址使用 `editor.html?extension=...&project_url=...`。
* C01 連線測試專案可正常載入。
* WebSerial 可正常連接 SmartRingController。
* D8 版本按鍵可正常讀取。
* 設定全部 LED 顏色可正常顯示。
* 關閉全部 LED 可正常運作。
* 設定單顆 LED 可正常顯示。
* 顯示 LED 暫存陣列可正常運作。
* Scratch 積木端輸入 0～30 後，LED 實際亮度已比雙重限制時明顯改善。

### 4. 已完成 commit

* `MVP-C8-1A update Scratch extension C8 protocol`
* `MVP-C8-1D add C8 serial protocol documentation`

### 5. 後續規劃

* MVP-C8-1F：整理 C8 展示測試清單與備援策略。
* MVP-F01：新增韌體燒錄入口規劃。
* MVP-F02：整理 D8 / D4 韌體下載與燒錄說明。
* MVP-V01：規劃 SmartRing 虛擬控制器。
* MVP-AI01：規劃 AI 密室逃脫任務模式。

### 6. 本階段暫不處理事項

* 不修改 D8 / D4 韌體。
* 不重新燒錄硬體。
* 不新增 D8 / D4 專屬 Scratch 積木。
* 不修改第 4～7 章教材內容。
* 不新增 Scratch 自動評分。
* 不實作韌體燒錄頁。
* 不實作 SmartRing 虛擬控制器。
* 不實作 AI 密室逃脫。


---

## MVP-C8-1F｜整理 C8 展示測試清單與備援策略

### 完成日期

2026-06-22

### 任務目標

建立 C8 通訊協定展示前的測試清單與備援策略文件，讓 OSEP Scratch Editor 在成果展、課堂展示或設備測試前，可以依照固定流程確認平台、硬體、WebSerial、LED 與按鍵功能是否正常。

### 新增檔案

* docs/OSEP_C8_DEMO_CHECKLIST.md

### 完成內容

1. 建立 D8 版 SmartRingController 展示檢查表。
2. 建立 D4 版 LED 展示板展示檢查表。
3. 整理 Scratch Editor 首頁、C01 連線測試與 Extension 載入檢查流程。
4. 整理 WebSerial 連線檢查流程。
5. 整理 D8 版按鍵測試表，包含 F / B / L / R / U / D / O / C 對應。
6. 整理 C8 LED 指令測試項目：

   * setAllLeds
   * clearLeds
   * showBuffer
7. 整理 Scratch 端 0～30 亮度轉換到 C8 端 0～255 的測試表。
8. 建立展示前 5 分鐘快速檢查流程。
9. 整理常見問題排除方式：

   * WebSerial 找不到裝置
   * Scratch Extension 載入失敗
   * LED 沒有反應
   * LED 亮度太暗
   * 按鍵沒有反應
10. 建立展示失敗時的備援策略：

    * 重新整理頁面
    * 更換 USB 線或 USB port
    * D8 版切換為 D4 版展示
    * 改用錄製影片或截圖展示
    * 必要時回退 C7 展示流程
11. 整理展示現場建議準備清單。

### 測試方式

本 MVP 為文件型任務，測試方式如下：

1. 確認 docs/OSEP_C8_DEMO_CHECKLIST.md 已建立。
2. 確認文件包含 D8 版展示檢查表。
3. 確認文件包含 D4 版展示檢查表。
4. 確認文件包含 Scratch 平台檢查表。
5. 確認文件包含 C8 亮度測試。
6. 確認文件包含常見問題排除。
7. 確認文件包含展示失敗備援策略。
8. 確認文件可作為成果展或課堂展示前檢查使用。

### 決策紀錄

本階段維持 C8 整合線既有決策：

1. 不修改 D8 / D4 韌體。
2. 不重新燒錄硬體。
3. 不新增 D8 / D4 專屬 Scratch 積木。
4. 不修改第 4～7 章教材內容。
5. 不新增 Scratch 自動評分。
6. 不處理 GitHub Pages。
7. 展示文件只整理檢查流程與備援策略，不改平台功能。

### 後續建議

下一步可選擇：

1. MVP-F01：規劃韌體燒錄入口。
2. MVP-F02：整理 D8 / D4 韌體下載與燒錄說明。
3. MVP-25-2：回到第 6 章教材主線，設計 C601～C606 示範題、仿作題與延伸挑戰。
4. MVP-V01：規劃 SmartRing 虛擬控制器。
5. MVP-AI01：規劃 AI 密室逃脫任務模式。


---

## MVP-26E｜更新 CH4～CH7 骨架練習檔與任務解鎖紀錄

### 完成日期

2026-06-22

### 任務目標

正式記錄 MVP-26D 已完成的 CH4～CH7 學生練習骨架檔更新與任務解鎖結果，作為後續教材檔案細修、Scratch 專案內容補強與課堂測試的依據。

### 前置完成項目

本紀錄對應前一版：

* MVP-26D add chapter 4 to 7 starter projects and unlock tasks

最新 commit：

* 1bba6f029 MVP-26D add chapter 4 to 7 starter projects and unlock tasks

### 完成內容

1. 更新第 4 章 C401～C406 學生練習骨架檔。
2. 更新第 5 章 C501～C506 學生練習骨架檔。
3. 更新第 6 章 C601～C606 學生練習骨架檔。
4. 更新第 7 章 C701～C706 學生練習骨架檔。
5. 解鎖 CH5～CH7 任務，讓 C501～C706 可直接進入 Scratch Editor 測試。
6. 確認 CH4～CH7 任務卡可正常點擊。
7. 確認 C401～C706 對應 .sb3 可正常載入。
8. 確認每個 .sb3 皆包含對應任務提示卡。
9. 維持目前 .sb3 為「學生練習骨架版」，後續可再逐題加入更完整的 OSEP SmartRing 積木程式。

### 修改檔案

* static/osep/data/tasks.js
* static/osep/projects/ch04/C401_button_detect.sb3
* static/osep/projects/ch04/C402_sprite_move.sb3
* static/osep/projects/ch04/C403_led_color.sb3
* static/osep/projects/ch04/C404_led_feedback.sb3
* static/osep/projects/ch04/C405_mini_game.sb3
* static/osep/projects/ch04/C406_challenge.sb3
* static/osep/projects/ch05/C501_continuous_control.sb3
* static/osep/projects/ch05/C502_speed_direction.sb3
* static/osep/projects/ch05/C503_led_status.sb3
* static/osep/projects/ch05/C504_condition_interaction.sb3
* static/osep/projects/ch05/C505_score_life.sb3
* static/osep/projects/ch05/C506_advanced_challenge.sb3
* static/osep/projects/ch06/C601_led_array_intro.sb3
* static/osep/projects/ch06/C602_array_led_control.sb3
* static/osep/projects/ch06/C603_array_shift_rotate.sb3
* static/osep/projects/ch06/C604_score_life_array.sb3
* static/osep/projects/ch06/C605_array_pattern.sb3
* static/osep/projects/ch06/C606_array_challenge.sb3
* static/osep/projects/ch07/C701_custom_block_intro.sb3
* static/osep/projects/ch07/C702_led_function.sb3
* static/osep/projects/ch07/C703_parameter_led.sb3
* static/osep/projects/ch07/C704_interaction_module.sb3
* static/osep/projects/ch07/C705_state_management.sb3
* static/osep/projects/ch07/C706_module_challenge.sb3

### 測試結果

已完成測試：

1. git status 顯示工作區乾淨。
2. git log 顯示最新 commit 已同步到 origin/feature/osep-extension-menu。
3. CH4～CH7 任務可進入 Scratch Editor。
4. CH5～CH7 鎖定狀態已解除。
5. C401～C706 專案可載入。
6. 學生練習骨架提示卡可正常顯示。

### Git 狀態

測試後狀態：

* On branch feature/osep-extension-menu
* Your branch is up to date with origin/feature/osep-extension-menu
* nothing to commit, working tree clean

最新紀錄：

* 1bba6f029 MVP-26D add chapter 4 to 7 starter projects and unlock tasks
* 2be54e5a8 MVP-25-2 add chapter 6 task design
* f50ac528f MVP-C8-1F add C8 demo checklist
* 48ea3669a MVP-C8-1F add C8 demo checklist
* 5518a003d MVP-C8-1E update C8 integration log

### 決策紀錄

1. CH4～CH7 的 .sb3 目前先採學生練習骨架版。
2. 骨架檔以任務提示卡為主，不預先放入完整解答。
3. 後續若需要，可逐題補上 OSEP SmartRing 積木示範區或教師版完成範例。
4. CH5～CH7 任務已先解鎖，方便整體流程測試與教材比對。
5. 目前不新增自動評分、不修改韌體、不調整 C8 通訊協定。

### 後續建議

下一步可選擇：

1. MVP-27-1：逐題檢查 C401～C406 骨架任務內容與第 4 章教材一致性。
2. MVP-27-2：逐題檢查 C501～C506 骨架任務內容與第 5 章教材一致性。
3. MVP-27-3：逐題檢查 C601～C606 骨架任務內容與第 6 章教材一致性。
4. MVP-27-4：逐題檢查 C701～C706 骨架任務內容與第 7 章教材一致性。
5. MVP-28-1：開始製作 C401 教師示範版或學生半成品版 .sb3。

## MVP-28-7｜補記 CH04～CH07 學生視角教材更新紀錄

### 完成日期

2026-06-23

### 任務目標

完成第 4～7 章教材頁的學生視角改寫紀錄，確認章節任務卡已從教師教學設計語氣，調整為學生可以直接閱讀與操作的任務格式。

本次整理聚焦於教材頁內容呈現，不修改 Scratch 練習檔 `.sb3`。

---

### 前置完成項目

已完成以下版本：

* MVP-28-2｜重寫第 4 章任務資料為學生視角
* MVP-28-3｜章節頁支援學生任務格式與 `steps` 欄位
* MVP-28-6｜重寫第 5～7 章任務資料為學生視角

---

### 本次完成內容

#### 1. 第 4 章｜基礎任務

第 4 章 C401～C406 已改為學生視角教材格式。

涵蓋任務：

* C401｜按鍵偵測
* C402｜角色移動
* C403｜LED 顏色控制
* C404｜LED 互動回饋
* C405｜迷你互動遊戲
* C406｜基礎任務挑戰

每一個任務皆包含：

* 任務目標
* 你要完成的任務
* 操作步驟

---

#### 2. 第 5 章｜進階任務

第 5 章 C501～C506 已改為學生視角教材格式。

涵蓋任務：

* C501｜連續按鍵控制
* C502｜速度與方向控制
* C503｜LED 狀態提示
* C504｜條件判斷互動
* C505｜分數與生命值
* C506｜進階挑戰任務

本章重點從單次按鍵控制進階到連續控制、速度變數、條件判斷、LED 狀態回饋、分數與生命值設計。

---

#### 3. 第 6 章｜陣列任務

第 6 章 C601～C606 已改為學生視角教材格式。

涵蓋任務：

* C601｜認識 LED 陣列
* C602｜用陣列控制燈號
* C603｜陣列位移效果
* C604｜分數與生命 LED 陣列
* C605｜陣列圖案設計
* C606｜陣列挑戰任務

本章重點是將 SmartRing LED 燈環視為一組有順序的陣列資料，讓學生理解索引、批次控制、位移、旋轉與資料視覺化。

---

#### 4. 第 7 章｜模組化任務

第 7 章 C701～C706 已改為學生視角教材格式。

涵蓋任務：

* C701｜認識自訂積木
* C702｜LED 函式封裝
* C703｜參數化 LED 控制
* C704｜互動流程模組化
* C705｜作品狀態管理
* C706｜模組化挑戰任務

本章重點是讓學生將重複流程整理成自訂積木，進一步理解函式、參數、模組化、狀態管理與程式重用。

---

### 修改檔案

```text
static/osep/data/tasks.js
static/osep/chapters/ch04.html
static/osep/chapters/ch05.html
static/osep/chapters/ch06.html
static/osep/chapters/ch07.html
```

其中：

* `tasks.js`：補齊 CH04～CH07 的學生視角任務文案與 `steps` 操作步驟。
* `ch04.html`～`ch07.html`：章節頁任務卡支援「任務目標」、「你要完成的任務」、「操作步驟」格式。

---

### 測試結果

已完成本機測試：

* CH04 C401～C406 任務卡正常顯示。
* CH05 C501～C506 任務卡正常顯示。
* CH06 C601～C606 任務卡正常顯示。
* CH07 C701～C706 任務卡正常顯示。
* 已確認 CH04～CH07 皆可顯示學生視角格式。
* 已確認 `steps` 欄位存在時會顯示「操作步驟」。
* 已確認章節任務卡不再因缺少 `steps` 欄位造成渲染中斷。

---

### Git 紀錄

相關 commit：

```text
18bd8c6c4 MVP-28-6 rewrite chapter 5~7 tasks for student view
78ed25aa6 MVP-28-3 show student task format in chapter pages
89cd49343 MVP-27-1 add chapter starter review checklist
8790773a9 MVP-26E update chapter starter project log
1bba6f029 MVP-26D add chapter 4 to 7 starter projects and unlock tasks
```

目前工作區狀態：

```text
nothing to commit, working tree clean
```

---

### 決策紀錄

1. 教材頁負責呈現學生任務目標、完成項目與操作步驟。
2. `.sb3` 練習檔定位為學生實作場，不再承擔大量任務說明。
3. 任務卡文案採學生視角，避免使用過多教師教學設計語氣。
4. CH04～CH07 統一採用相同教材呈現格式，方便後續維護與 Notion 教材同步。

---

### 後續建議

下一步可進入：

* MVP-29-1｜重構 CH04 `.sb3` 為學生實作骨架版
* MVP-29-2｜重構 CH05 `.sb3` 為學生實作骨架版
* MVP-29-3｜重構 CH06 `.sb3` 為學生實作骨架版
* MVP-29-4｜重構 CH07 `.sb3` 為學生實作骨架版


## MVP-31-5｜實作第一版共用核心 LED 燈環模擬器

### 任務目標

建立 OSEP Scratch Editor 教材網站的第一版線上 LED 燈環模擬器，提供無硬體情境下的 LED 陣列概念展示，並預留未來與 Blockly Lab 共用的模擬器核心架構。

### 本版新增

- 新增 `static/osep/simulator/index.html`
- 新增 `static/osep/simulator/simulator.css`
- 新增 `static/osep/simulator/simulator.js`
- 修改首頁線上模擬器按鈕，改為連到 `./simulator/`

### 功能內容

第一版模擬器支援：

1. 12 顆 LED 燈環顯示
2. LED 編號 1～12
3. 單顆 LED RGB 控制
4. RGB 教學輸入範圍 0～30
5. 全部 LED 顏色控制
6. 清除全部
7. 進度條顯示
8. 分數 LED 顯示
9. 生命值 LED 顯示
10. 預設圖樣
11. LED 狀態陣列顯示
12. 返回教材首頁

### 共用核心設計

本版在 `simulator.js` 中預留：

```javascript
window.OSEPLedRingSimulator
```

未來可供 OSEP Scratch Editor 或 Blockly Lab 呼叫，例如：

```javascript
window.OSEPLedRingSimulator.setLed(1, 30, 0, 0);
window.OSEPLedRingSimulator.setAll(0, 0, 30);
window.OSEPLedRingSimulator.showProgress(6);
window.OSEPLedRingSimulator.clear();
```

### RGB 範圍規則

雖然真實 RGB 訊號可使用 0～255，但本教材與積木設計統一採用 0～30。

因此模擬器狀態陣列顯示 0～30，網頁畫面顯示時再轉換為 0～255。

### 暫不實作

本版暫不實作：

- Scratch Extension 即時連動
- WebSerial 模擬
- Blockly Lab 直接整合
- 按鍵模擬
- 軟硬體同步
- 內嵌 Scratch Editor 面板

### 測試結果

待測試：

1. GitHub Pages 可開啟 `/osep/simulator/`
2. 首頁線上模擬器按鈕可正確進入
3. 返回教材首頁正常
4. C01 課前連線測試不受影響
5. 第 4～7 章章節入口不受影響
6. 單顆 LED RGB 控制正常
7. 全部 LED 顏色控制正常
8. 清除全部正常
9. 進度條、分數、生命值顯示正常
10. LED 狀態陣列以 0～30 顯示

### 後續建議

下一版建議進入：

`MVP-31-6｜規劃模擬器與 Extension / Blockly Lab 的同步介面`

重點是先定義共用同步 API，不急著直接修改 Extension 或 Blockly Lab，例如：

```javascript
window.OSEPLedRingSimulator.setLed(index, r, g, b);
window.OSEPLedRingSimulator.setAll(r, g, b);
window.OSEPLedRingSimulator.clear();
window.OSEPLedRingSimulator.showProgress(value);
window.OSEPLedRingSimulator.showScore(value);
window.OSEPLedRingSimulator.showLife(value);
```

最終目標是讓 OSEP Scratch Editor 與 Blockly Lab 都能走相同的 LED 指令介面，達成實體硬體與線上模擬器同步顯示。


## MVP-31-6｜規劃模擬器與 Extension / Blockly Lab 的同步介面

### 任務目標

規劃線上 LED 燈環模擬器與 OSEP Scratch Editor、Blockly Lab 的同步介面，作為未來軟硬體同步控制的基礎。

### 本版新增文件

- `docs/OSEP_LED_SIMULATOR_SYNC_INTERFACE_PLAN.md`

### 規劃重點

1. 確認模擬器最終方向為「軟硬體同步」。
2. OSEP Scratch Editor 與 Blockly Lab 未來應共用同一套 LED 模擬器 API。
3. RGB 教學輸入範圍統一維持 0～30。
4. 定義 LED Command Adapter 作為積木指令與輸出目標之間的中介層。
5. 定義 Hardware Transport 與 Simulator Transport。
6. 規劃三種同步模式：
   - hardware-only
   - simulator-only
   - hardware-and-simulator

### 暫不實作

本版僅做同步介面規劃，暫不修改：

- OSEP Scratch Extension
- Blockly Lab runtime
- WebSerial runtime
- ESP8266 韌體
- 線上模擬器程式碼

### 後續建議

下一版可進入：

`MVP-31-7｜補強模擬器 setBuffer / showBuffer`

或：

`MVP-31-8｜建立 LED Command Adapter 原型`

## MVP-31-7｜補強模擬器 setBuffer / showBuffer

### 任務目標

補強第一版線上 LED 燈環模擬器的暫存陣列能力，讓模擬器可對應 OSEP Scratch Editor 與 Blockly Lab 中的 LED Buffer / 暫存陣列概念，作為未來軟硬體同步的基礎。

### 本版修改檔案

- `static/osep/simulator/simulator.js`
- `docs/OSEP_LEVEL3_MVP_LOG.md`

### 本版新增能力

1. 新增模擬器內部 `buffer` 暫存陣列。
2. 新增 `setBuffer(buffer)`。
3. 新增 `setBufferLed(index, r, g, b)`。
4. 新增 `setBufferAll(r, g, b)`。
5. 新增 `clearBuffer()`。
6. 新增 `showBuffer()`。
7. 新增 `copyStateToBuffer()`。
8. 新增 `getBuffer()`。
9. 新增 `getSnapshot()`，同時回傳目前顯示狀態與暫存陣列。
10. 狀態輸出區同時顯示 `state` 與 `buffer`。

### 共用 API 補強

本版更新 `window.OSEPLedRingSimulator`，新增下列方法：

```javascript
window.OSEPLedRingSimulator.setBuffer(buffer);
window.OSEPLedRingSimulator.setBufferLed(index, r, g, b);
window.OSEPLedRingSimulator.setBufferAll(r, g, b);
window.OSEPLedRingSimulator.clearBuffer();
window.OSEPLedRingSimulator.showBuffer();
window.OSEPLedRingSimulator.copyStateToBuffer();
window.OSEPLedRingSimulator.getBuffer();
window.OSEPLedRingSimulator.getSnapshot();
```

### Buffer 規格

`buffer` 採 12 顆 LED 陣列格式，每一格使用 RGB 教學數值 0～30。

範例：

```javascript
[
  { "r": 30, "g": 0, "b": 0 },
  { "r": 0, "g": 30, "b": 0 },
  { "r": 0, "g": 0, "b": 30 }
]
```

規則：

1. RGB 範圍統一限制為 0～30。
2. LED 數量固定為 12。
3. `setBuffer()` 輸入少於 12 筆時，剩餘 LED 自動補黑色。
4. `setBuffer()` 輸入超過 12 筆時，只取前 12 筆。
5. `setBuffer()` 只更新暫存陣列，不直接改變畫面顯示。
6. `showBuffer()` 才會將暫存陣列顯示到 LED 燈環畫面。

### 暫不實作

本版暫不實作：

- 新增 Buffer 操作 UI
- Scratch Extension 即時連動
- Blockly Lab 直接整合
- WebSerial 模擬
- 按鍵模擬
- 跨頁同步
- 軟硬體同步模式切換

### 測試方式

在瀏覽器開啟模擬器頁面後，按 F12 開啟 Console 測試：

```javascript
window.OSEPLedRingSimulator.setBuffer([
  { r: 30, g: 0, b: 0 },
  { r: 0, g: 30, b: 0 },
  { r: 0, g: 0, b: 30 }
]);

window.OSEPLedRingSimulator.showBuffer();
window.OSEPLedRingSimulator.getSnapshot();
window.OSEPLedRingSimulator.clearBuffer();
```

確認：

1. `setBuffer()` 後畫面 LED 不立即改變。
2. `showBuffer()` 後 LED 顯示暫存陣列內容。
3. `getBuffer()` 可取得暫存陣列。
4. `getSnapshot()` 可同時取得 `state` 與 `buffer`。
5. RGB 數值超過 30 時會被限制為 30。
6. RGB 數值低於 0 時會被限制為 0。
7. C01 課前連線測試不受影響。
8. 第 4～7 章入口不受影響。
9. 首頁線上模擬器入口不受影響。

### 後續建議

下一版可進入：

`MVP-31-8｜建立 LED Command Adapter 原型`

重點是先在模擬器頁或獨立 JS 中建立 `dispatchLedCommand(command)`，讓未來 OSEP Scratch Editor 與 Blockly Lab 都能透過統一 LED command 控制模擬器。
