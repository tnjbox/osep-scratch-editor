// OSEP SmartRingController 教材任務資料
// MVP-12：教材網站資料架構 V1
//
// 命名規則：
// C01_connect：全課程共用連線測試，不列入第4章正式任務
// C401～C406：第4章基礎任務
// C501～C506：第5章進階任務
// C601～C606：第6章陣列任務
// C701～C706：第7章模組化任務

window.OSEP_COURSE = {
  title: "SmartRingController 教材網站",
  subtitle: "使用 OSEP Scratch Editor 連接 ESP8266 SmartRing，學習實體運算、互動控制與程式設計。",
  connectionTest: {
    code: "C01",
    title: "課前連線測試",
    description: "確認 OSEP Scratch Editor、SmartRing Extension、WebSerial 與 ESP8266 SmartRing 是否能正常連線。",
    project: "/osep/projects/C01_connect.sb3",
    enabled: true
  },
  chapters: [
    {
      id: "ch04",
      chapterNumber: 4,
      title: "第4章｜基礎任務",
      subtitle: "認識 SmartRing 與基礎互動控制",
      description: "本章透過 SmartRing 控制器，帶領學生完成連線、按鍵偵測、角色移動與 LED 基礎控制，建立實體輸入與 Scratch 程式互動的基本概念。",
      audience: "國小高年級／國中初階",
      concepts: ["WebSerial 連線", "按鍵輸入", "條件判斷", "角色互動", "LED 基礎控制"],
      tasks: [
        {
          code: "C401",
          title: "按鍵偵測",
          description: "任務目標：學會讀取 SmartRing 控制器上的不同按鍵，讓 Scratch 角色可以回應目前按下的按鍵。",
          goals: [
            "連線 SmartRing 控制器",
            "測試 F、B、L、R、U、D、O、C 八個按鍵",
            "按下不同按鍵時，讓 Scratch 角色說出對應的按鍵名稱",
            "確認每一個按鍵都能被 Scratch 正確偵測"
          ],
          steps: [
            "開啟 C401 任務練習檔",
            "先完成 SmartRing 連線",
            "找出 OSEP SmartRing 的按鍵偵測積木",
            "使用「如果……那麼……」判斷按鍵是否被按下",
            "按下 F 鍵時，讓角色說出「F」",
            "依序完成 B、L、R、U、D、O、C 的按鍵回應",
            "實際按下控制器上的每個按鍵，檢查角色是否正確回應"
          ],
          project: "/osep/projects/ch04/C401_button_detect.sb3",
          checklist: "/osep/checklists/ch04/C401_checklist.html",
          enabled: true
        },
        {
          code: "C402",
          title: "角色移動",
          description: "任務目標：學會使用 SmartRing 方向按鍵控制 Scratch 角色上下左右移動。",
          goals: [
            "使用 F、B、L、R 控制角色移動",
            "讓角色可以往上、下、左、右移動",
            "測試角色移動方向是否和按鍵對應",
            "嘗試讓角色不要超出舞台範圍"
          ],
          steps: [
            "開啟 C402 任務練習檔",
            "先完成 SmartRing 連線",
            "找出按鍵偵測積木",
            "找出改變 x 座標與 y 座標的移動積木",
            "按下 F 鍵時，讓角色往上移動",
            "按下 B 鍵時，讓角色往下移動",
            "按下 L 鍵時，讓角色往左移動",
            "按下 R 鍵時，讓角色往右移動",
            "測試角色是否能依照控制器穩定移動"
          ],
          project: "/osep/projects/ch04/C402_sprite_move.sb3",
          checklist: "/osep/checklists/ch04/C402_checklist.html",
          enabled: true
        },
        {
          code: "C403",
          title: "LED 顏色控制",
          description: "任務目標：學會使用 Scratch 積木控制 SmartRing LED 的顏色。",
          goals: [
            "讓全部 LED 顯示紅色",
            "讓全部 LED 顯示綠色",
            "讓全部 LED 顯示藍色",
            "使用清除 LED 積木關閉燈光",
            "嘗試設定指定 LED 顯示不同顏色"
          ],
          steps: [
            "開啟 C403 任務練習檔",
            "先完成 SmartRing 連線",
            "找出 LED 顏色控制積木",
            "設定全部 LED 顯示紅色",
            "改成全部 LED 顯示綠色",
            "改成全部 LED 顯示藍色",
            "使用清除 LED 積木關閉燈光",
            "嘗試改變 RGB 數值，觀察 LED 顏色如何變化"
          ],
          project: "/osep/projects/ch04/C403_led_color.sb3",
          checklist: "/osep/checklists/ch04/C403_checklist.html",
          enabled: true
        },
        {
          code: "C404",
          title: "LED 互動回饋",
          description: "任務目標：學會讓 SmartRing 按鍵觸發 LED 回饋，讓控制器不只可以輸入，也可以用燈光回應操作結果。",
          goals: [
            "按下 F 鍵時，LED 顯示綠色",
            "按下 B 鍵時，LED 顯示紅色",
            "按下 C 鍵時，清除 LED",
            "測試不同按鍵是否會產生不同 LED 回饋"
          ],
          steps: [
            "開啟 C404 任務練習檔",
            "先完成 SmartRing 連線",
            "找出按鍵偵測積木",
            "找出 LED 顏色控制積木",
            "使用條件判斷偵測 F 鍵，F 鍵被按下時讓 LED 顯示綠色",
            "使用條件判斷偵測 B 鍵，B 鍵被按下時讓 LED 顯示紅色",
            "使用條件判斷偵測 C 鍵，C 鍵被按下時清除 LED",
            "實際按下 F、B、C，確認 LED 回饋是否正確"
          ],
          project: "/osep/projects/ch04/C404_led_feedback.sb3",
          checklist: "/osep/checklists/ch04/C404_checklist.html",
          enabled: true
        },
        {
          code: "C405",
          title: "迷你互動遊戲",
          description: "任務目標：學會整合 SmartRing 按鍵、Scratch 角色移動與 LED 回饋，完成一個簡單互動遊戲。",
          goals: [
            "使用 SmartRing 控制角色移動",
            "讓角色碰到目標時出現成功回饋",
            "讓角色碰到障礙物或錯誤區域時出現失敗回饋",
            "使用 LED 顯示成功或失敗狀態",
            "測試遊戲是否能開始、操作、判斷與結束"
          ],
          steps: [
            "開啟 C405 任務練習檔",
            "先完成 SmartRing 連線",
            "讓角色可以用 F、B、L、R 移動",
            "設定一個目標物件",
            "設定一個障礙物或失敗條件",
            "當角色碰到目標時，讓角色說出成功訊息，並讓 LED 顯示綠色",
            "當角色碰到障礙物時，讓角色說出失敗訊息，並讓 LED 顯示紅色",
            "反覆測試遊戲流程是否完整"
          ],
          project: "/osep/projects/ch04/C405_mini_game.sb3",
          checklist: "/osep/checklists/ch04/C405_checklist.html",
          enabled: true
        },
        {
          code: "C406",
          title: "基礎任務挑戰",
          description: "任務目標：運用第 4 章學過的按鍵偵測、角色移動與 LED 回饋，設計一個自己的 SmartRing 互動任務。",
          goals: [
            "設計一個需要使用 SmartRing 按鍵的互動任務",
            "至少使用一種角色移動或角色回應",
            "至少使用一種 LED 回饋",
            "加入成功條件或失敗條件",
            "完成後測試你的任務是否可以順利操作"
          ],
          steps: [
            "開啟 C406 任務練習檔",
            "先想好你的任務規則",
            "決定哪些按鍵要控制角色或觸發事件",
            "設定角色移動或角色回應",
            "設定 LED 成功或失敗回饋",
            "加入任務完成條件",
            "測試任務是否可以正常開始、操作與結束",
            "修正操作不順或條件判斷錯誤的地方"
          ],
          project: "/osep/projects/ch04/C406_challenge.sb3",
          checklist: "/osep/checklists/ch04/C406_checklist.html",
          enabled: true
        }
      ]
    },
        {
      id: "ch05",
      chapterNumber: 5,
      title: "第5章｜進階任務",
      subtitle: "連續控制、條件判斷與遊戲互動",
      description: "本章承接第 4 章基礎任務，讓學生從單次按鍵控制進階到連續控制、速度變數、LED 狀態提示、條件判斷、分數與生命值設計，逐步完成更完整的 SmartRing 互動遊戲。",
      audience: "七年級",
      concepts: ["連續控制", "變數", "條件判斷", "重複結構", "LED 狀態回饋", "分數系統", "生命值", "互動遊戲"],
            tasks: [
        {
          code: "C501",
          title: "連續按鍵控制",
          description: "任務目標：學會讓角色在按住 SmartRing 方向鍵時持續移動，理解連續偵測與遊戲主迴圈的概念。",
          goals: [
            "使用重複結構持續偵測 SmartRing 按鍵",
            "按住 F、B、L、R 時，讓角色持續往對應方向移動",
            "放開按鍵後，角色停止移動或維持目前位置",
            "比較單次按鍵控制與連續按鍵控制的差異"
          ],
          steps: [
            "開啟 C501 任務練習檔",
            "先完成 SmartRing 連線",
            "找出按鍵偵測積木",
            "建立重複執行的偵測流程",
            "按住 F 鍵時，讓角色持續往上移動",
            "按住 B 鍵時，讓角色持續往下移動",
            "按住 L 鍵時，讓角色持續往左移動",
            "按住 R 鍵時，讓角色持續往右移動",
            "實際按住與放開按鍵，測試角色是否能連續移動"
          ],
          project: "/osep/projects/ch05/C501_continuous_control.sb3",
          checklist: "/osep/checklists/ch05/C501_checklist.html",
          enabled: true
        },
        {
          code: "C502",
          title: "速度與方向控制",
          description: "任務目標：學會使用變數控制角色移動速度，讓方向按鍵可以搭配不同速度產生不同操作效果。",
          goals: [
            "建立 speed 變數控制角色移動速度",
            "使用 F、B、L、R 控制角色方向",
            "調整 speed 數值，觀察角色移動距離的變化",
            "設計慢速、中速或快速移動模式"
          ],
          steps: [
            "開啟 C502 任務練習檔",
            "先完成 SmartRing 連線",
            "建立 speed 變數",
            "設定 speed 的初始值",
            "將角色移動距離改成使用 speed 變數",
            "按下不同方向鍵時，讓角色依照 speed 移動",
            "嘗試修改 speed 數值",
            "測試速度變快或變慢時，角色移動是否符合預期"
          ],
          project: "/osep/projects/ch05/C502_speed_direction.sb3",
          checklist: "/osep/checklists/ch05/C502_checklist.html",
          enabled: true
        },
        {
          code: "C503",
          title: "LED 狀態提示",
          description: "任務目標：學會用 SmartRing LED 顯示目前角色狀態、速度狀態或互動結果，讓硬體燈光成為程式回饋介面。",
          goals: [
            "待機時讓 LED 顯示一種顏色",
            "角色移動時讓 LED 顯示方向或移動狀態",
            "成功時讓 LED 顯示成功顏色",
            "失敗或碰到障礙時讓 LED 顯示警示顏色",
            "說明 LED 顏色與程式狀態的對應關係"
          ],
          steps: [
            "開啟 C503 任務練習檔",
            "先完成 SmartRing 連線",
            "找出 LED 顏色控制積木",
            "設定待機狀態的 LED 顏色",
            "按下方向鍵移動時，讓 LED 顯示對應狀態",
            "設計成功狀態的 LED 顏色",
            "設計失敗或警示狀態的 LED 顏色",
            "測試不同狀態下 LED 是否能正確變化"
          ],
          project: "/osep/projects/ch05/C503_led_status.sb3",
          checklist: "/osep/checklists/ch05/C503_checklist.html",
          enabled: true
        },
        {
          code: "C504",
          title: "條件判斷互動",
          description: "任務目標：學會使用條件判斷設計互動規則，例如碰到目標成功、碰到障礙失敗，或按下正確按鍵才通過關卡。",
          goals: [
            "使用 if 或 if-else 設計互動條件",
            "讓角色碰到目標時產生成功回饋",
            "讓角色碰到障礙或錯誤區域時產生失敗回饋",
            "讓角色或 LED 根據不同條件產生不同反應",
            "完成一個有成功與失敗判斷的互動任務"
          ],
          steps: [
            "開啟 C504 任務練習檔",
            "先完成 SmartRing 連線",
            "設定角色可以用方向鍵移動",
            "設定一個目標物件或成功區域",
            "設定一個障礙物或失敗區域",
            "使用條件判斷偵測角色是否碰到目標",
            "碰到目標時顯示成功訊息或 LED 成功顏色",
            "使用條件判斷偵測角色是否碰到障礙",
            "碰到障礙時顯示失敗訊息或 LED 警示顏色",
            "測試成功與失敗條件是否都能正確觸發"
          ],
          project: "/osep/projects/ch05/C504_condition_interaction.sb3",
          checklist: "/osep/checklists/ch05/C504_checklist.html",
          enabled: true
        },
        {
          code: "C505",
          title: "分數與生命值",
          description: "任務目標：學會使用 score 與 life 變數記錄遊戲狀態，並用角色或 LED 回饋呈現得分、扣血與遊戲結束條件。",
          goals: [
            "建立 score 變數記錄分數",
            "建立 life 變數記錄生命值",
            "碰到目標時讓 score 增加",
            "碰到障礙時讓 life 減少",
            "score 達標或 life 歸零時顯示結束狀態",
            "嘗試用 LED 顯示分數或生命值狀態"
          ],
          steps: [
            "開啟 C505 任務練習檔",
            "先完成 SmartRing 連線",
            "建立 score 變數，並設定初始值為 0",
            "建立 life 變數，並設定初始值為 3",
            "設定角色碰到目標時 score 加 1",
            "設定角色碰到障礙時 life 減 1",
            "當 score 達到指定分數時，顯示成功訊息或 LED 成功顏色",
            "當 life 等於 0 時，顯示失敗訊息或 LED 警示顏色",
            "測試得分、扣血與結束條件是否正確"
          ],
          project: "/osep/projects/ch05/C505_score_life.sb3",
          checklist: "/osep/checklists/ch05/C505_checklist.html",
          enabled: true
        },
        {
          code: "C506",
          title: "進階挑戰任務",
          description: "任務目標：綜合第 5 章學過的連續控制、速度變數、條件判斷、LED 回饋、分數與生命值，完成一個 SmartRing 進階互動作品。",
          goals: [
            "設計一個可以用 SmartRing 控制的互動任務",
            "加入連續方向控制",
            "加入 speed、score 或 life 變數",
            "加入成功與失敗條件",
            "使用 LED 顯示至少一種互動回饋",
            "完成一個具備挑戰目標的 SmartRing 作品"
          ],
          steps: [
            "開啟 C506 任務練習檔",
            "先想好你的進階任務主題",
            "設定角色控制方式",
            "加入 speed、score 或 life 其中至少一種變數",
            "設計成功條件，例如碰到目標、達到分數或通過關卡",
            "設計失敗條件，例如碰到障礙、生命值歸零或時間結束",
            "設計 LED 成功、失敗或狀態回饋",
            "測試作品是否可以正常開始、操作、判斷與結束",
            "修正操作不順、條件錯誤或 LED 回饋不清楚的地方"
          ],
          project: "/osep/projects/ch05/C506_advanced_challenge.sb3",
          checklist: "/osep/checklists/ch05/C506_checklist.html",
          enabled: true
        }
      ]
    },
        {
      id: "ch06",
      chapterNumber: 6,
      title: "第6章｜陣列任務",
      subtitle: "八年級｜陣列程式設計",
      description: "本章讓學生將 SmartRing 的 LED 燈條視為一組陣列資料，學習索引位置、資料狀態、批次控制、位移效果與圖案設計，對應八年級資訊科技「陣列程式設計」學習重點。",
      audience: "八年級",
      concepts: ["陣列", "索引", "LED 狀態", "批次控制", "位移", "旋轉", "圖案設計", "資料視覺化"],
            tasks: [
        {
          code: "C601",
          title: "認識 LED 陣列",
          description: "任務目標：學會把 SmartRing 的 12 顆 LED 看成一組有順序的資料，理解每一顆 LED 都有自己的位置與編號。",
          goals: [
            "觀察第 1～12 顆 LED 的實際位置",
            "理解 LED 編號與陣列位置的關係",
            "找出指定 LED 在燈環上的位置",
            "說明為什麼 LED 燈環可以看成一組陣列資料"
          ],
          steps: [
            "開啟 C601 任務練習檔",
            "先完成 SmartRing 連線",
            "讓第 1 顆 LED 亮起，觀察它的位置",
            "依序測試第 2～12 顆 LED",
            "記錄 LED 編號的排列方向",
            "嘗試讓第 3、6、9 顆 LED 顯示不同顏色",
            "嘗試讓第 1、4、7、10 顆 LED 顯示白色，觀察它們是否能代表上、右、下、左",
            "完成後說明 LED 編號與位置的對應關係"
          ],
          project: "/osep/projects/ch06/C601_led_array_intro.sb3",
          checklist: "/osep/checklists/ch06/C601_checklist.html",
          enabled: true
        },
        {
          code: "C602",
          title: "用陣列控制燈號",
          description: "任務目標：學會使用陣列概念控制多顆 LED 的顏色、亮滅與狀態，理解單顆控制與批次控制的差異。",
          goals: [
            "設定指定編號的 LED 顏色",
            "同時控制多顆 LED 的亮滅狀態",
            "使用範圍或重複概念批次設定 LED",
            "比較一顆一顆設定與批次設定的差異"
          ],
          steps: [
            "開啟 C602 任務練習檔",
            "先完成 SmartRing 連線",
            "設定第 1 顆 LED 顯示紅色",
            "設定第 6 顆 LED 顯示綠色",
            "設定第 12 顆 LED 顯示藍色",
            "嘗試設定第 1～6 顆 LED 顯示同一種顏色",
            "嘗試設定奇數顆或偶數顆 LED 顯示不同顏色",
            "使用顯示暫存陣列積木，確認多顆 LED 狀態是否正確",
            "完成後說明單一 LED 控制與多顆 LED 批次控制的差異"
          ],
          project: "/osep/projects/ch06/C602_array_led_control.sb3",
          checklist: "/osep/checklists/ch06/C602_checklist.html",
          enabled: true
        },
        {
          code: "C603",
          title: "陣列位移效果",
          description: "任務目標：學會觀察 LED 圖樣在陣列中的位移與旋轉效果，理解 shift 與 rotate 的差異。",
          goals: [
            "建立一組 LED 圖樣",
            "讓 LED 圖樣向左或向右位移",
            "讓 LED 圖樣在燈環中循環旋轉",
            "觀察 shift 與 rotate 對 LED 圖樣造成的不同結果",
            "設計簡單的跑馬燈或循環燈效"
          ],
          steps: [
            "開啟 C603 任務練習檔",
            "先完成 SmartRing 連線",
            "先設計一個簡單 LED 圖樣，例如一顆紅燈或三顆連續亮燈",
            "使用位移積木讓圖樣向左移動",
            "使用位移積木讓圖樣向右移動",
            "觀察圖樣移動到邊界時會發生什麼事",
            "使用旋轉積木讓圖樣循環移動",
            "比較位移與旋轉的差異",
            "嘗試設計一個跑馬燈效果"
          ],
          project: "/osep/projects/ch06/C603_array_shift_rotate.sb3",
          checklist: "/osep/checklists/ch06/C603_checklist.html",
          enabled: true
        },
        {
          code: "C604",
          title: "分數與生命 LED 陣列",
          description: "任務目標：學會把 score 與 life 這類變數轉換成 LED 顯示，讓 SmartRing 成為遊戲資料的視覺化介面。",
          goals: [
            "建立 score 變數表示分數",
            "建立 life 變數表示生命值",
            "用 LED 亮起數量表示 score",
            "用指定區段 LED 表示 life",
            "讓 LED 顯示隨著 score 或 life 改變",
            "說明資料變化與 LED 顯示之間的關係"
          ],
          steps: [
            "開啟 C604 任務練習檔",
            "先完成 SmartRing 連線",
            "建立 score 變數，初始值設為 0",
            "按下指定按鍵時，讓 score 加 1",
            "讓亮起的 LED 數量等於 score",
            "建立 life 變數，初始值設為 3",
            "按下指定按鍵或碰到障礙時，讓 life 減 1",
            "使用第 10～12 顆 LED 顯示生命值",
            "測試 score 增加與 life 減少時，LED 是否能正確更新",
            "完成後說明 LED 如何呈現分數與生命值"
          ],
          project: "/osep/projects/ch06/C604_score_life_array.sb3",
          checklist: "/osep/checklists/ch06/C604_checklist.html",
          enabled: true
        },
        {
          code: "C605",
          title: "陣列圖案設計",
          description: "任務目標：學會利用 LED 的陣列位置設計圖案、對稱效果與簡單動畫，讓一組 LED 狀態形成有意義的視覺訊息。",
          goals: [
            "選擇多個 LED 位置組成圖案",
            "使用不同顏色表達不同意義",
            "設計對稱或規律排列的 LED 效果",
            "用按鍵切換不同 LED 圖案",
            "說明圖案設計與 LED 陣列位置的關係"
          ],
          steps: [
            "開啟 C605 任務練習檔",
            "先完成 SmartRing 連線",
            "使用第 1、4、7、10 顆 LED 製作十字方向圖案",
            "嘗試設計一個至少使用 4 顆 LED 的自訂圖案",
            "讓圖案至少使用 2 種顏色",
            "設計第二個不同的 LED 圖案",
            "使用按鍵切換不同圖案",
            "測試每一個圖案是否能正確顯示",
            "完成後說明你的圖案名稱與代表意義"
          ],
          project: "/osep/projects/ch06/C605_array_pattern.sb3",
          checklist: "/osep/checklists/ch06/C605_checklist.html",
          enabled: true
        },
        {
          code: "C606",
          title: "陣列挑戰任務",
          description: "任務目標：綜合第 6 章學過的 LED 陣列位置、批次控制、位移旋轉、圖案設計與資料視覺化，完成一個 SmartRing 陣列應用作品。",
          goals: [
            "設計一個需要使用 LED 陣列的互動任務",
            "使用至少一種 LED 圖案",
            "使用至少一種變數控制 LED 顯示",
            "加入按鍵輸入或角色互動",
            "加入成功、失敗或關卡狀態回饋",
            "完成一個具備主題的 SmartRing 陣列作品"
          ],
          steps: [
            "開啟 C606 任務練習檔",
            "先想好你的陣列挑戰主題",
            "決定 LED 陣列要顯示什麼資訊，例如方向、分數、生命值、進度或密碼",
            "設計至少一種 LED 圖案",
            "加入按鍵輸入或角色互動規則",
            "使用變數記錄任務狀態",
            "讓 LED 顯示隨著任務狀態改變",
            "設計成功或失敗時的 LED 回饋",
            "測試作品是否可以正常開始、操作、判斷與結束",
            "修正 LED 位置、顏色、條件判斷或互動流程中的問題"
          ],
          project: "/osep/projects/ch06/C606_array_challenge.sb3",
          checklist: "/osep/checklists/ch06/C606_checklist.html",
          enabled: true
        }
      ]
    },
        {
      id: "ch07",
      chapterNumber: 7,
      title: "第7章｜模組化任務",
      subtitle: "八年級｜函式與模組化設計",
      description: "本章讓學生將 SmartRing 互動作品中的重複流程整理成函式或自訂積木，學習模組化設計、參數化控制、程式重用與作品整合，為更完整的互動作品設計做準備。",
      audience: "八年級",
      concepts: ["函式", "自訂積木", "參數", "模組化", "程式重用", "流程拆解", "作品整合"],
            tasks: [
        {
          code: "C701",
          title: "認識自訂積木",
          description: "任務目標：學會找出程式中重複出現的流程，並理解如何用 Scratch 自訂積木整理成可以重複使用的功能。",
          goals: [
            "觀察程式中重複出現的積木組合",
            "理解自訂積木可以把一段流程整理成一個新積木",
            "建立一個簡單的自訂積木",
            "使用自訂積木讓程式變得更清楚",
            "說明自訂積木與模組化設計的好處"
          ],
          steps: [
            "開啟 C701 任務練習檔",
            "先完成 SmartRing 連線",
            "觀察目前程式中哪些流程會重複出現",
            "選擇一段重複流程，例如清除 LED、設定狀態燈或角色回到起點",
            "建立一個新的自訂積木",
            "把重複流程放進自訂積木定義中",
            "在主程式中呼叫這個自訂積木",
            "測試自訂積木是否能正確執行",
            "完成後說明這個自訂積木負責什麼功能"
          ],
          project: "/osep/projects/ch07/C701_custom_block_intro.sb3",
          checklist: "/osep/checklists/ch07/C701_checklist.html",
          enabled: true
        },
        {
          code: "C702",
          title: "LED 函式封裝",
          description: "任務目標：學會把常用的 SmartRing LED 控制流程封裝成自訂積木，讓同一段 LED 程式可以重複使用。",
          goals: [
            "建立 LED 控制用的自訂積木",
            "把常用 LED 流程放進自訂積木",
            "在不同地方重複呼叫同一個 LED 自訂積木",
            "使用自訂積木顯示成功、失敗或待機狀態",
            "說明函式封裝如何減少重複程式"
          ],
          steps: [
            "開啟 C702 任務練習檔",
            "先完成 SmartRing 連線",
            "建立一個自訂積木，例如顯示成功燈號",
            "在自訂積木中設定 LED 顯示綠色或成功圖案",
            "建立另一個自訂積木，例如顯示失敗燈號",
            "在自訂積木中設定 LED 顯示紅色或警示圖案",
            "在主程式的不同條件中呼叫 LED 自訂積木",
            "測試成功與失敗狀態時 LED 是否正確顯示",
            "比較封裝前與封裝後的程式是否更容易閱讀"
          ],
          project: "/osep/projects/ch07/C702_led_function.sb3",
          checklist: "/osep/checklists/ch07/C702_checklist.html",
          enabled: true
        },
        {
          code: "C703",
          title: "參數化 LED 控制",
          description: "任務目標：學會在自訂積木中加入參數，讓同一個 LED 功能可以控制不同位置、顏色或數量。",
          goals: [
            "理解參數可以讓自訂積木更有彈性",
            "建立具有參數的 LED 自訂積木",
            "用參數指定 LED 位置",
            "用參數指定 LED 顏色或亮燈數量",
            "使用同一個自訂積木產生不同 LED 效果"
          ],
          steps: [
            "開啟 C703 任務練習檔",
            "先完成 SmartRing 連線",
            "建立一個具有參數的自訂積木，例如設定第 n 顆 LED",
            "在自訂積木中使用參數控制 LED 編號",
            "呼叫自訂積木，讓第 1 顆 LED 亮起",
            "改用不同參數，讓第 6 顆或第 12 顆 LED 亮起",
            "再建立顏色或數量相關參數",
            "測試同一個自訂積木是否能做出不同 LED 效果",
            "完成後說明參數讓程式變得更彈性的原因"
          ],
          project: "/osep/projects/ch07/C703_parameter_led.sb3",
          checklist: "/osep/checklists/ch07/C703_checklist.html",
          enabled: true
        },
        {
          code: "C704",
          title: "互動流程模組化",
          description: "任務目標：學會把 SmartRing 互動作品中的按鍵偵測、角色控制、LED 回饋等流程拆成不同模組，讓程式結構更清楚。",
          goals: [
            "拆解互動作品的主要功能流程",
            "把按鍵偵測整理成一個模組",
            "把角色控制整理成一個模組",
            "把 LED 回饋整理成一個模組",
            "在主程式中組合不同模組完成互動作品",
            "說明模組化如何幫助程式維護與修改"
          ],
          steps: [
            "開啟 C704 任務練習檔",
            "先完成 SmartRing 連線",
            "觀察作品需要哪些主要功能",
            "建立按鍵偵測相關自訂積木",
            "建立角色移動或角色狀態相關自訂積木",
            "建立 LED 回饋相關自訂積木",
            "在主程式中依序呼叫不同自訂積木",
            "測試每一個模組是否能單獨正常運作",
            "再測試所有模組組合後是否能完成互動任務",
            "完成後說明每個模組負責的功能"
          ],
          project: "/osep/projects/ch07/C704_interaction_module.sb3",
          checklist: "/osep/checklists/ch07/C704_checklist.html",
          enabled: true
        },
        {
          code: "C705",
          title: "作品狀態管理",
          description: "任務目標：學會使用變數、自訂積木與 LED 回饋管理作品狀態，例如開始、進行中、成功、失敗或結束。",
          goals: [
            "建立 state 變數記錄目前作品狀態",
            "設計開始、進行中、成功、失敗或結束狀態",
            "用自訂積木處理不同狀態的畫面或角色反應",
            "用 LED 顯示不同作品狀態",
            "讓作品依照條件切換狀態",
            "說明狀態管理如何讓互動作品更完整"
          ],
          steps: [
            "開啟 C705 任務練習檔",
            "先完成 SmartRing 連線",
            "建立 state 變數",
            "設定作品開始時 state 為 start",
            "按下指定按鍵後，將 state 改為 playing",
            "達成成功條件時，將 state 改為 success",
            "達成失敗條件時，將 state 改為 fail",
            "建立不同狀態對應的自訂積木",
            "讓 LED 顯示目前狀態，例如待機藍色、成功綠色、失敗紅色",
            "測試作品是否能依照條件正確切換狀態"
          ],
          project: "/osep/projects/ch07/C705_state_management.sb3",
          checklist: "/osep/checklists/ch07/C705_checklist.html",
          enabled: true
        },
        {
          code: "C706",
          title: "模組化挑戰任務",
          description: "任務目標：綜合第 7 章學過的自訂積木、參數、模組化流程與狀態管理，完成一個結構清楚、可以維護與擴充的 SmartRing 互動作品。",
          goals: [
            "設計一個 SmartRing 模組化互動作品",
            "至少建立三個自訂積木",
            "至少建立一個具有參數的自訂積木",
            "使用變數管理作品狀態",
            "使用 LED 呈現狀態或互動回饋",
            "讓主程式清楚呼叫不同模組完成作品流程",
            "完成後能說明每個模組的功能"
          ],
          steps: [
            "開啟 C706 任務練習檔",
            "先想好你的模組化挑戰主題",
            "列出作品需要的主要功能，例如連線、控制、判斷、LED 回饋與結束條件",
            "把主要功能拆成至少三個自訂積木",
            "設計至少一個具有參數的自訂積木",
            "建立 state、score、life 或其他需要的變數",
            "在主程式中安排作品流程",
            "用 LED 顯示至少一種狀態或互動結果",
            "測試每個自訂積木是否能單獨正常執行",
            "測試整體作品是否可以正常開始、操作、判斷與結束",
            "修正流程混亂、參數錯誤或狀態切換不清楚的地方",
            "完成後說明你的作品中每個模組負責什麼功能"
          ],
          project: "/osep/projects/ch07/C706_module_challenge.sb3",
          checklist: "/osep/checklists/ch07/C706_checklist.html",
          enabled: true
        }
      ]
    }
  ]
};