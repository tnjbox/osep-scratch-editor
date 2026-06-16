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

