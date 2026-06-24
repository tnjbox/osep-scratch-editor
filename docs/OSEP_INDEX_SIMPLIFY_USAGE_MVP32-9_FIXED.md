# MVP-32-9 fixed｜簡化入口頁使用方式區塊並保留 C01

## 一、修正原因

前一版 MVP-32-9 使用的入口頁底稿不正確，導致 C01 課前連線測試區塊遺失。

本版改以使用者重新上傳的正確 `index.html` 為底稿重新處理。

---

## 二、本版刪除內容

刪除：

```text
開始前選擇使用方式
方式 A｜使用實體硬體
方式 B｜使用線上模擬
```

---

## 三、本版保留內容

保留：

```text
教材簡介
C01 課前連線測試
章節學習任務
使用提醒
```

---

## 四、使用提醒修正

最下方使用提醒文字改為：

```text
使用提醒： 請先 燒錄韌體 確認 ESP8266 SmartRing 已連接電腦，並使用支援 WebSerial 的瀏覽器，例如 Chrome 或 Edge。 進入任務練習檔後，請在 Scratch 畫面中執行連線積木。
```

其中：

```text
燒錄韌體
```

超連結到：

```text
https://tnjbox.github.io/blockly-lab/firmware.html
```

---

## 五、修改檔案

```text
static/osep/index.html
docs/OSEP_LEVEL3_MVP_LOG.md
```

建議新增文件：

```text
docs/OSEP_INDEX_SIMPLIFY_USAGE_MVP32-9_FIXED.md
```

---

## 六、測試重點

部署後確認：

```text
1. 「開始前選擇使用方式」已刪除。
2. 「方式 A｜使用實體硬體」已刪除。
3. 「方式 B｜使用線上模擬」已刪除。
4. C01 課前連線測試仍存在。
5. 章節學習任務仍存在。
6. 最下方使用提醒文字正確。
7. 「燒錄韌體」可開新分頁連到 Blockly Lab 韌體燒錄頁。
```

---

## 七、Git 收尾

```powershell
git status
git add static/osep/index.html docs/OSEP_INDEX_SIMPLIFY_USAGE_MVP32-9_FIXED.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-9 simplify index usage and preserve C01"
git push
git status
```
