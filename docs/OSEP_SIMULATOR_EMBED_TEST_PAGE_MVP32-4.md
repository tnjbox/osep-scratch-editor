# MVP-32-4｜建立 iframe embed 測試頁

## 一、任務目標

建立正式 parent 測試頁，用來驗證：

```text
parent 頁面 → postMessage → iframe → /osep/simulator/embed.html → WS2812 LED 更新
```

本頁不是正式 Scratch 練習頁，而是進入 Scratch Editor 同框前的安全測試頁。

## 二、本版新增檔案

```text
static/osep/simulator-embed-test.html
```

## 三、頁面功能

測試頁包含：

1. 內嵌 iframe：`./simulator/embed.html`
2. 基本測試：第 1 顆紅燈、全部綠燈、第 6 顆藍燈、清除全部
3. 狀態型顯示：進度條、分數、生命、查詢 iframe 狀態
4. 暫存陣列測試：彩色排列、前半紅燈、奇數綠燈、偶數藍燈
5. 顯示最後送出的 postMessage JSON

## 四、測試網址

```text
https://tnjbox.github.io/osep-scratch-editor/osep/simulator-embed-test.html
```

## 五、Git 收尾

```powershell
git status
git add static/osep/simulator-embed-test.html docs/OSEP_SIMULATOR_EMBED_TEST_PAGE_MVP32-4.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-32-4 add iframe embed simulator test page"
git push
git status
```

## 六、部署

```powershell
npm run deploy:osep -- "MVP-32-4 add iframe embed simulator test page"
```

## 七、下一版建議

```text
MVP-32-5｜分析 Scratch 練習頁嵌入位置
```
