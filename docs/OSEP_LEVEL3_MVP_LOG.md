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

