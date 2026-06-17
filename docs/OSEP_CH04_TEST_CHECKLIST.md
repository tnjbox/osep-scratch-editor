# OSEP SmartRing 自我檢核表送出規格

## 1. 目的

本文件記錄 OSEP SmartRingController 教材網站中，自我檢核表送出到 Google Sheet 的資料格式與 Apps Script 實作方式。

目前已完成 C401 原型：

- `static/osep/checklists/ch04/C401_checklist.html`
- 可送出學生自我檢核資料到 Google Sheet
- Google Sheet 工作表名稱：`responses`

本規格文件的用途：

1. 作為後續 C402～C406 套用送出功能的依據。
2. 作為 Google Sheet / Apps Script 維護紀錄。
3. 作為未來將自我檢核表功能模組化、共用化的參考。
4. 避免 Web App URL、資料欄位、送出格式分散在不同檔案中而難以維護。

---

## 2. Google Sheet 設定

建議試算表名稱：

```text
OSEP_SmartRing_Checklist_Responses
```

工作表名稱：

```text
responses
```

第一列欄位：

```text
timestamp	chapter	taskCode	taskTitle	className	seatNumber	studentName	doneItems	explainItems	challengeItems	reflection	userAgent
```

欄位說明：

| 欄位 | 說明 |
|---|---|
| timestamp | Apps Script 寫入時間 |
| chapter | 章節代碼，例如 `ch04` |
| taskCode | 任務代碼，例如 `C401` |
| taskTitle | 任務名稱，例如 `按鍵偵測` |
| className | 學生班級 |
| seatNumber | 學生座號 |
| studentName | 學生姓名 |
| doneItems | 「我做到了」勾選項目，以 `；` 串接 |
| explainItems | 「我能說明」勾選項目，以 `；` 串接 |
| challengeItems | 「延伸挑戰」勾選項目，以 `；` 串接 |
| reflection | 學生反思文字 |
| userAgent | 瀏覽器資訊，供除錯使用 |

---

## 3. 資料流程

自我檢核表送出流程如下：

```text
學生填寫 checklist HTML 頁面
        ↓
按下「送出自我檢核」
        ↓
前端 JavaScript 組成 JSON payload
        ↓
fetch POST 到 Google Apps Script Web App
        ↓
Apps Script doPost(e) 解析資料
        ↓
appendRow 寫入 Google Sheet responses 工作表
```

目前 C401 已完成此流程，後續 C402～C406 應依照相同格式套用。

---

## 4. Apps Script Code.gs

目前 Apps Script 建議使用以下版本。

```javascript
const SHEET_NAME = "responses";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return createJsonResponse({
        ok: false,
        message: "找不到工作表：" + SHEET_NAME
      });
    }

    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        ok: false,
        message: "沒有收到表單資料"
      });
    }

    const data = JSON.parse(e.postData.contents);

    const row = [
      new Date(),
      data.chapter || "",
      data.taskCode || "",
      data.taskTitle || "",
      data.className || "",
      data.seatNumber || "",
      data.studentName || "",
      Array.isArray(data.doneItems) ? data.doneItems.join("；") : "",
      Array.isArray(data.explainItems) ? data.explainItems.join("；") : "",
      Array.isArray(data.challengeItems) ? data.challengeItems.join("；") : "",
      data.reflection || "",
      data.userAgent || ""
    ];

    sheet.appendRow(row);

    return createJsonResponse({
      ok: true,
      message: "資料已成功送出"
    });

  } catch (error) {
    return createJsonResponse({
      ok: false,
      message: "送出失敗：" + error.message
    });
  }
}

function doGet() {
  return createJsonResponse({
    ok: true,
    message: "OSEP SmartRing checklist API is running."
  });
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        chapter: "ch04",
        taskCode: "C401",
        taskTitle: "按鍵偵測",
        className: "701",
        seatNumber: "01",
        studentName: "測試學生",
        doneItems: [
          "我能開啟 C401 任務練習檔。",
          "我能完成 SmartRingController 連線。",
          "我能偵測 BTN1 上鍵。"
        ],
        explainItems: [
          "我能說明為什麼要使用「重複無限次」持續偵測按鍵。"
        ],
        challengeItems: [
          "我能讓不同按鍵播放不同音效。"
        ],
        reflection: "這是一筆 Apps Script 內部測試資料。",
        userAgent: "Apps Script testDoPost"
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

---

## 5. Apps Script 部署設定

Apps Script 建議部署為 Web App。

部署設定：

```text
部署類型：網頁應用程式
說明：MVP-17 checklist submit API
執行身分：我
誰可以存取：任何人
```

注意事項：

1. 學生不需要 Google Sheet 編輯權限。
2. 寫入動作由 Apps Script 以教師帳號身分執行。
3. Web App URL 產生後，前端 HTML 需要使用該 URL 進行 fetch POST。
4. 若重新部署新版 Apps Script，應確認前端使用的是最新 `/exec` URL。
5. 不建議公開 Google Sheet 編輯權限給學生。

---

## 6. 前端送出資料格式

前端自我檢核表頁面需送出 JSON。

範例：

```javascript
{
  chapter: "ch04",
  taskCode: "C401",
  taskTitle: "按鍵偵測",
  className: className,
  seatNumber: seatNumber,
  studentName: studentName,
  doneItems: doneItems,
  explainItems: explainItems,
  challengeItems: challengeItems,
  reflection: reflection,
  userAgent: navigator.userAgent
}
```

欄位對應：

| 前端欄位 | Apps Script 接收欄位 | Google Sheet 欄位 |
|---|---|---|
| `chapter` | `data.chapter` | chapter |
| `taskCode` | `data.taskCode` | taskCode |
| `taskTitle` | `data.taskTitle` | taskTitle |
| `className` | `data.className` | className |
| `seatNumber` | `data.seatNumber` | seatNumber |
| `studentName` | `data.studentName` | studentName |
| `doneItems` | `data.doneItems` | doneItems |
| `explainItems` | `data.explainItems` | explainItems |
| `challengeItems` | `data.challengeItems` | challengeItems |
| `reflection` | `data.reflection` | reflection |
| `userAgent` | `data.userAgent` | userAgent |

---

## 7. fetch 設定

目前採用：

```javascript
fetch(WEB_APP_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "text/plain;charset=utf-8"
  },
  body: JSON.stringify(payload)
});
```

使用 `mode: "no-cors"` 的原因：

1. Google Apps Script Web App 在前端跨網域送出時可能遇到 CORS 限制。
2. `no-cors` 可以讓資料順利送出。
3. 使用 `no-cors` 時，前端無法讀取 Apps Script 回傳 JSON。
4. 因此前端只能在 fetch 沒有拋出錯誤時顯示「已送出，請向老師確認資料是否成功記錄」。

目前前端成功訊息建議文字：

```text
已送出。請回到課堂或向老師確認資料是否成功記錄。
```

---

## 8. 前端頁面基本欄位

每個檢核表頁面應包含學生基本資料區塊：

- 班級：`className`
- 座號：`seatNumber`
- 姓名：`studentName`
- 學習反思：`reflection`

必填欄位：

- 班級
- 座號
- 姓名

送出前應檢查：

1. 班級不可空白。
2. 座號不可空白。
3. 姓名不可空白。

若有缺漏，應在頁面顯示提示，不送出資料。

---

## 9. Checkbox 分組規則

每個檢核表頁面的 checkbox 分成三組：

1. `doneItems`
   - 對應「我做到了」
2. `explainItems`
   - 對應「我能說明」
3. `challengeItems`
   - 對應「延伸挑戰」

送出時只收集已勾選項目的文字內容。

例如：

```javascript
doneItems: [
  "我能開啟 C401 任務練習檔。",
  "我能完成 SmartRingController 連線。",
  "我能偵測 BTN1 上鍵。"
]
```

Apps Script 寫入 Google Sheet 時會用 `；` 串接：

```text
我能開啟 C401 任務練習檔。；我能完成 SmartRingController 連線。；我能偵測 BTN1 上鍵。
```

---

## 10. C401 已完成原型

目前已完成：

```text
static/osep/checklists/ch04/C401_checklist.html
```

功能：

1. 可輸入班級、座號、姓名。
2. 可勾選「我做到了」。
3. 可勾選「我能說明」。
4. 可勾選「延伸挑戰」。
5. 可填寫學習反思。
6. 可送出到 Google Apps Script Web App。
7. Google Sheet `responses` 工作表可收到資料。
8. 不填必填欄位時會提示。
9. 送出中會顯示狀態。
10. 送出後會顯示已送出提示。

---

## 11. C402～C406 套用規則

後續 C402～C406 套用送出功能時，可參考 C401 成功版本。

只需修改每頁的：

| 頁面 | chapter | taskCode | taskTitle |
|---|---|---|---|
| `C402_checklist.html` | `ch04` | `C402` | `角色移動` |
| `C403_checklist.html` | `ch04` | `C403` | `LED 顏色控制` |
| `C404_checklist.html` | `ch04` | `C404` | `LED 燈號回饋` |
| `C405_checklist.html` | `ch04` | `C405` | `簡易互動遊戲` |
| `C406_checklist.html` | `ch04` | `C406` | `基礎挑戰任務` |

其餘送出流程應與 C401 一致。

注意事項：

1. 保留每個頁面原本的任務目標與檢核項目文字。
2. 不要誤把 C401 的檢核項目複製到其他任務。
3. 只複製表單欄位、送出按鈕、訊息區塊與 JavaScript 送出流程。
4. Web App URL 應一致。
5. 送出欄位格式應一致。

---

## 12. 建議的前端送出邏輯

每個檢核表頁面建議包含以下流程：

```text
按下「送出自我檢核」
        ↓
讀取班級、座號、姓名
        ↓
檢查必填欄位
        ↓
收集三組 checkbox 勾選文字
        ↓
讀取 reflection
        ↓
組成 payload
        ↓
按鈕 disabled，顯示「送出中……」
        ↓
fetch POST
        ↓
顯示成功或失敗訊息
        ↓
按鈕恢復可按
```

---

## 13. 送出狀態訊息建議

建議至少有一個訊息區塊，用來顯示：

| 狀態 | 訊息 |
|---|---|
| 必填欄位缺漏 | 請先填寫班級、座號與姓名。 |
| 送出中 | 送出中，請稍候…… |
| 送出成功 | 已送出。請回到課堂或向老師確認資料是否成功記錄。 |
| 送出失敗 | 送出失敗，請檢查網路後再試一次，或請老師協助。 |

---

## 14. 安全與隱私注意事項

目前 Google Sheet 收集學生資料，至少包含：

- 班級
- 座號
- 姓名
- 任務完成狀態
- 學習反思

使用時建議注意：

1. Google Sheet 不應公開給學生編輯。
2. 若需要公開檢視，建議只公開統計結果，不公開個人資料。
3. Apps Script Web App URL 不應放在公開說明文件中任意散布。
4. 學生姓名資料應依學校個資規範使用。
5. 後續若上線到公開網站，應確認資料收集目的與使用方式已向學生說明。

---

## 15. 後續可優化方向

1. 將共用送出 JS 抽成獨立檔案，例如：
   - `static/osep/checklists/checklist-submit.js`
2. 將 Web App URL 集中管理，避免散落在每個 HTML。
3. 增加送出後鎖定表單或避免重複送出。
4. 增加「已送出時間」顯示。
5. 增加教師查詢、匯出、篩選功能。
6. 設計 Google Sheet 分班統計頁。
7. 將第 5～7 章檢核表也逐步套用相同送出機制。
8. 改善 Apps Script 回應與錯誤紀錄。
9. 若未來不受 CORS 限制，可改回讀取 JSON response，顯示更精確的成功/失敗狀態。

---

## 16. 目前版本狀態

目前 MVP-17 已完成：

1. Google Sheet `responses` 工作表建立。
2. Apps Script Web App 建立與部署。
3. `doGet` 測試成功。
4. `testDoPost` 測試成功。
5. Google Sheet 可新增測試資料。
6. `C401_checklist.html` 已完成送出原型。
7. C401 網頁送出資料可寫入 Google Sheet。

下一步建議：

```text
MVP-17｜Step 6：批次套用 C402～C406 檢核表送出功能
```
