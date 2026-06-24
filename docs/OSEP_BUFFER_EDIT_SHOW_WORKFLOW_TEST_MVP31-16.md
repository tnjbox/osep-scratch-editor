# MVP-31-16｜Extension 同步暫存陣列編輯後的顯示流程與位移旋轉

專案：OSEP Scratch Editor / SmartRingController  
版本：MVP-31-16  
狀態：測試確認與流程整理  
更新日期：2026-06-24

---

## 一、任務目標

本版目標是確認 MVP-31-15 後，OSEP Scratch Extension 的 LED 暫存陣列編輯流程，是否能正確透過 `showBuffer()` 同步到線上 LED 燈環模擬器。

重點不是新增新的積木，也不是讓每一個暫存陣列編輯積木都立即同步，而是確認下列教學流程成立：

```text
編輯 LED 暫存陣列
        ↓
暫時不顯示
        ↓
執行「顯示 LED 暫存陣列」
        ↓
硬體與模擬器同步顯示目前暫存陣列
```

---

## 二、本版判斷

檢查目前 Extension 後，MVP-31-15 已經新增：

```javascript
function getSimulatorBufferSnapshot() {
    return STATE.ledBuffer.map((rgb) => ({
        r: limitLEDValue(rgb[0]),
        g: limitLEDValue(rgb[1]),
        b: limitLEDValue(rgb[2])
    }));
}

function sendLocalBufferToSimulator() {
    sendLedCommandToSimulator({
        type: "setBuffer",
        buffer: getSimulatorBufferSnapshot()
    });

    sendLedCommandToSimulator({
        type: "showBuffer"
    });
}
```

並且 `showBuffer()` 已經執行：

```javascript
sendLocalBufferToSimulator();
return bridge.sendBuffer();
```

因此，只要暫存陣列編輯積木正確修改 `STATE.ledBuffer`，最後接上 `顯示 LED 暫存陣列`，模擬器就會同步更新。

---

## 三、為什麼不建議每個編輯積木立即同步

下列積木屬於「編輯暫存陣列」：

```text
setBufferPixel
fillBuffer
copyBufferPixel
shiftBufferLeft
shiftBufferRight
rotateBufferLeft
rotateBufferRight
reverseBuffer
```

它們的教學概念是：

```text
先在暫存陣列中整理資料
最後再一次顯示
```

如果每一個編輯積木都立即同步模擬器，會造成：

1. 暫存陣列不再像「暫存」。
2. 學生會誤以為每次編輯都會立即亮燈。
3. 硬體沒有立即顯示，但模擬器卻立即顯示，會造成軟硬體不同步。
4. 後續演算法教學的「先算、再顯示」概念會被削弱。

因此本版維持：

```text
編輯積木只修改 STATE.ledBuffer
顯示積木才同步硬體與模擬器
```

---

## 四、需要測試的暫存陣列流程

### 測試 1｜單顆暫存後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 1 顆 LED RGB R 30 G 0 B 0
顯示 LED 暫存陣列
```

預期結果：

```text
模擬器第 1 顆 LED 亮紅色
其他 LED 熄滅
```

---

### 測試 2｜填滿暫存陣列後顯示

Scratch 積木流程：

```text
填滿 LED 暫存陣列 RGB R 0 G 30 B 0
顯示 LED 暫存陣列
```

預期結果：

```text
模擬器全部 LED 亮綠色
```

---

### 測試 3｜複製暫存陣列後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 1 顆 LED RGB R 30 G 0 B 0
複製暫存陣列第 1 顆到第 2 顆
顯示 LED 暫存陣列
```

預期結果：

```text
模擬器第 1、2 顆 LED 亮紅色
其他 LED 熄滅
```

---

### 測試 4｜向左平移後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 2 顆 LED RGB R 30 G 0 B 0
LED 暫存陣列向左平移
顯示 LED 暫存陣列
```

預期結果：

```text
原本第 2 顆紅燈平移到第 1 顆
模擬器第 1 顆 LED 亮紅色
```

---

### 測試 5｜向右平移後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 1 顆 LED RGB R 30 G 0 B 0
LED 暫存陣列向右平移
顯示 LED 暫存陣列
```

預期結果：

```text
原本第 1 顆紅燈平移到第 2 顆
模擬器第 2 顆 LED 亮紅色
```

---

### 測試 6｜向左旋轉後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 1 顆 LED RGB R 30 G 0 B 0
LED 暫存陣列向左旋轉
顯示 LED 暫存陣列
```

預期結果：

```text
第 1 顆紅燈循環旋轉到第 12 顆
模擬器第 12 顆 LED 亮紅色
```

---

### 測試 7｜向右旋轉後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 12 顆 LED RGB R 30 G 0 B 0
LED 暫存陣列向右旋轉
顯示 LED 暫存陣列
```

預期結果：

```text
第 12 顆紅燈循環旋轉到第 1 顆
模擬器第 1 顆 LED 亮紅色
```

---

### 測試 8｜反轉後顯示

Scratch 積木流程：

```text
清空 LED 暫存陣列
設定暫存陣列第 1 顆 LED RGB R 30 G 0 B 0
反轉 LED 暫存陣列
顯示 LED 暫存陣列
```

預期結果：

```text
第 1 顆紅燈反轉到第 12 顆
模擬器第 12 顆 LED 亮紅色
```

---

## 五、回測前幾版同步功能

MVP-31-16 測試時，也應回測：

### MVP-31-13

```text
設定全部 LED 顏色
設定全部 LED RGB
關閉全部 LED
顯示進度條
```

### MVP-31-14

```text
設定第 N 顆 LED RGB
顯示分數 LED
顯示生命 LED
```

### MVP-31-15

```text
清空並顯示 LED 暫存陣列
設定第 START 到 END 顆 LED RGB
設定奇數 LED RGB
設定偶數 LED RGB
顯示 LED 暫存陣列
```

---

## 六、部署方式

若本版只追加測試紀錄文件，不修改 Extension，可不需要重新部署 Pages。

若有更新 `docs/OSEP_LEVEL3_MVP_LOG.md`，只需 Git commit/push：

```powershell
git add docs/OSEP_BUFFER_EDIT_SHOW_WORKFLOW_TEST_MVP31-16.md docs/OSEP_LEVEL3_MVP_LOG.md
git commit -m "MVP-31-16 verify buffer edit show workflow"
git push
git status
```

若後續仍有 Extension 內容修改，才需要：

```powershell
npm run deploy:osep -- "MVP-31-16 verify buffer edit show workflow"
```

---

## 七、MVP-31-16 結論

本版結論：

1. MVP-31-15 的 `showBuffer()` 已足以支援暫存陣列編輯後同步模擬器。
2. 暫存陣列編輯積木不應立即同步模擬器。
3. 保持「先編輯、後顯示」更符合陣列與演算法教學。
4. 不建議本版新增額外 BroadcastChannel 發送點。
5. 本版以測試流程確認與教學邏輯整理為主。
6. 下一版可開始評估 LED 動畫同步，或轉入 iframe + postMessage 同框規劃。
