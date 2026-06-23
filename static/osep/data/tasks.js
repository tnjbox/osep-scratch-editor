// OSEP SmartRingController 教材任務資料
// MVP-30-3：教材網站資料架構 V1（支援 GitHub Pages base path）
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
      path: "/osep/chapters/ch04.html",
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
          description: "讀取 SmartRing 控制器的不同按鍵，讓 Scratch 角色回應目前按下的按鍵。",
          goals: [
            "能完成 SmartRing 連線",
            "能讀取不同按鍵狀態",
            "能使用條件判斷做出角色回應"
          ],
          steps: [
            "開啟 C401 任務練習檔，先確認 SmartRing 已成功連線。",
            "按下 SmartRing 不同按鍵，觀察角色是否能偵測到按鍵狀態。",
            "使用條件判斷積木，讓角色在不同按鍵被按下時說出或顯示不同回應。",
            "測試每一個方向鍵與功能鍵，確認按鍵偵測結果正確。"
          ],
          project: "/osep/projects/ch04/C401_button_detect.sb3",
          checklist: "/osep/checklists/ch04/C401_checklist.html",
          enabled: true
        },
        {
          code: "C402",
          title: "角色移動",
          description: "使用 SmartRing 方向按鍵控制 Scratch 角色上下左右移動。",
          goals: [
            "能理解方向輸入與角色座標的關係",
            "能使用按鍵控制角色移動",
            "能調整角色移動速度"
          ],
          steps: [
            "開啟 C402 任務練習檔，觀察角色目前所在位置。",
            "使用 SmartRing 方向按鍵控制角色往上、下、左、右移動。",
            "調整每次移動的步數，觀察角色移動速度的變化。",
            "測試連續按鍵操作，確認角色能依照你的控制方向移動。"
          ],
          project: "/osep/projects/ch04/C402_sprite_move.sb3",
          checklist: "/osep/checklists/ch04/C402_checklist.html",
          enabled: true
        },
        {
          code: "C403",
          title: "LED 顏色控制",
          description: "使用 Scratch 積木控制 SmartRing LED 燈環顯示不同顏色。",
          goals: [
            "能控制 LED 顯示顏色",
            "能理解 RGB 顏色概念",
            "能使用程式改變實體燈光輸出"
          ],
          steps: [
            "開啟 C403 任務練習檔，先確認 LED 燈環可以被 Scratch 控制。",
            "使用 RGB 顏色積木設定 SmartRing LED 顏色。",
            "嘗試修改紅、綠、藍數值，觀察 LED 顏色的變化。",
            "設計一組你喜歡的燈光顏色，並測試是否能穩定顯示。"
          ],
          project: "/osep/projects/ch04/C403_led_color.sb3",
          checklist: "/osep/checklists/ch04/C403_checklist.html",
          enabled: true
        },
        {
          code: "C404",
          title: "LED 燈號回饋",
          description: "結合按鍵輸入與 LED 顯示，讓 SmartRing 對不同操作產生燈號回饋。",
          goals: [
            "能結合輸入與輸出",
            "能設計不同按鍵對應不同燈號",
            "能理解互動回饋的設計概念"
          ],
          steps: [
            "開啟 C404 任務練習檔，確認按鍵與 LED 都可以正常運作。",
            "設計不同按鍵對應不同 LED 顏色或燈號。",
            "按下 SmartRing 按鍵，觀察 LED 是否產生正確回饋。",
            "調整燈號顏色或顯示方式，讓使用者能清楚看出操作結果。"
          ],
          project: "/osep/projects/ch04/C404_led_feedback.sb3",
          checklist: "/osep/checklists/ch04/C404_checklist.html",
          enabled: true
        },
        {
          code: "C405",
          title: "簡易互動遊戲",
          description: "使用 SmartRing 控制角色完成簡易互動任務，整合按鍵、角色與燈光控制。",
          goals: [
            "能設計簡易遊戲互動",
            "能整合角色移動與 LED 回饋",
            "能完成一個小型互動作品"
          ],
          steps: [
            "開啟 C405 任務練習檔，閱讀範例遊戲的互動規則。",
            "使用 SmartRing 控制角色完成指定互動任務。",
            "加入 LED 回饋，讓成功、失敗或碰到目標時有不同提示。",
            "反覆測試遊戲流程，確認角色、按鍵與 LED 回饋能互相配合。"
          ],
          project: "/osep/projects/ch04/C405_mini_game.sb3",
          checklist: "/osep/checklists/ch04/C405_checklist.html",
          enabled: true
        },
        {
          code: "C406",
          title: "基礎挑戰任務",
          description: "綜合本章所學，完成一個具備 SmartRing 控制、角色互動與燈光回饋的挑戰作品。",
          goals: [
            "能整合本章基礎功能",
            "能修改範例並加入自己的設計",
            "能完成基礎互動挑戰"
          ],
          steps: [
            "開啟 C406 任務練習檔，先規劃你的基礎挑戰作品主題。",
            "整合按鍵偵測、角色移動與 LED 回饋功能。",
            "修改或新增角色互動規則，讓作品具有明確任務目標。",
            "完成測試後，檢查作品是否能讓同學理解並操作。"
          ],
          project: "/osep/projects/ch04/C406_challenge.sb3",
          checklist: "/osep/checklists/ch04/C406_checklist.html",
          enabled: true
        }
      ]
    },
        {
      id: "ch05",
      path: "/osep/chapters/ch05.html",
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
          description: "讓角色在按住 SmartRing 方向鍵時可以持續移動，理解持續偵測與遊戲主迴圈的概念。",
          goals: ["能使用重複結構持續偵測按鍵", "能讓角色依照 BTN1～BTN4 連續移動", "能說明單次按鍵與連續控制的差異"],
          steps: [
            "開啟 C501 任務練習檔，觀察單次按鍵與連續按鍵控制的差異。",
            "使用重複結構持續偵測 SmartRing 方向按鍵。",
            "讓角色在按住按鍵時能連續移動，而不是只移動一次。",
            "測試不同方向的連續控制，確認操作手感是否順暢。"
          ],
          project: "/osep/projects/ch05/C501_continuous_control.sb3",
          checklist: "/osep/checklists/ch05/C501_checklist.html",
          enabled: true
        },
        {
          code: "C502",
          title: "速度與方向控制",
          description: "使用變數控制角色移動速度，讓同一組方向鍵可以搭配不同速度產生不同操作效果。",
          goals: ["能建立速度變數", "能用變數控制角色移動距離", "能設計慢速、中速或快速移動模式"],
          steps: [
            "開啟 C502 任務練習檔，建立或觀察速度變數。",
            "讓角色移動距離依照速度變數改變。",
            "設計按鍵或條件來切換慢速、中速或快速。",
            "測試速度變化是否會影響角色控制難度。"
          ],
          project: "/osep/projects/ch05/C502_speed_direction.sb3",
          checklist: "/osep/checklists/ch05/C502_checklist.html",
          enabled: true
        },
        {
          code: "C503",
          title: "LED 狀態提示",
          description: "讓 SmartRing LED 根據角色狀態、速度或碰撞結果顯示不同顏色，建立程式狀態與硬體回饋的連結。",
          goals: ["能依照角色狀態改變 LED 顏色", "能用 LED 顯示成功、警示或加速狀態", "能說明 LED 回饋與程式狀態的關係"],
          steps: [
            "開啟 C503 任務練習檔，先設定角色的基本互動狀態。",
            "依照不同狀態設計 LED 顏色，例如正常、警示、加速或成功。",
            "在程式中加入條件判斷，讓 LED 隨狀態改變。",
            "測試每一種狀態，確認 LED 提示與畫面互動一致。"
          ],
          project: "/osep/projects/ch05/C503_led_status.sb3",
          checklist: "/osep/checklists/ch05/C503_checklist.html",
          enabled: true
        },
        {
          code: "C504",
          title: "條件判斷互動",
          description: "設計需要判斷條件的互動任務，例如碰到目標得分、碰到障礙扣分，或按下正確按鍵才通過關卡。",
          goals: ["能使用 if 或 if-else 條件判斷", "能設計成功與失敗兩種互動結果", "能讓角色或 LED 依條件產生不同回饋"],
          steps: [
            "開啟 C504 任務練習檔，找出作品中的成功與失敗條件。",
            "使用 if 或 if-else 積木判斷角色是否達成條件。",
            "設計不同結果的角色反應與 LED 回饋。",
            "反覆測試條件邏輯，確認成功與失敗不會互相混淆。"
          ],
          project: "/osep/projects/ch05/C504_condition_interaction.sb3",
          checklist: "/osep/checklists/ch05/C504_checklist.html",
          enabled: true
        },
        {
          code: "C505",
          title: "分數與生命值",
          description: "整合分數、生命值、條件判斷與 LED 回饋，讓作品具備基本遊戲規則與結束條件。",
          goals: ["能建立分數與生命值變數", "能設計得分、扣血與遊戲結束規則", "能用 LED 呈現分數或生命值狀態"],
          steps: [
            "開啟 C505 任務練習檔，建立分數與生命值變數。",
            "設計得分、扣生命值與遊戲結束條件。",
            "使用 SmartRing LED 顯示分數或生命值狀態。",
            "測試得分與扣血流程，確認變數與 LED 顯示同步更新。"
          ],
          project: "/osep/projects/ch05/C505_score_life.sb3",
          checklist: "/osep/checklists/ch05/C505_checklist.html",
          enabled: true
        },
        {
          code: "C506",
          title: "進階挑戰任務",
          description: "綜合 C501～C505 所學，設計一個具備方向控制、變數、條件判斷、LED 回饋與過關條件的 SmartRing 互動作品。",
          goals: ["能整合第 5 章進階程式概念", "能設計完整互動遊戲規則", "能完成具備挑戰目標的 SmartRing 作品"],
          steps: [
            "開啟 C506 任務練習檔，規劃一個進階互動遊戲主題。",
            "整合連續控制、速度變數、條件判斷與 LED 狀態提示。",
            "加入分數或生命值規則，讓作品具有挑戰性。",
            "完成後請同學試玩，根據回饋調整操作難度。"
          ],
          project: "/osep/projects/ch05/C506_advanced_challenge.sb3",
          checklist: "/osep/checklists/ch05/C506_checklist.html",
          enabled: true
        }
      ]
    },
        {
      id: "ch06",
      path: "/osep/chapters/ch06.html",
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
          description: "認識 SmartRing LED 燈條可以視為一組有順序的資料，每一顆 LED 都有自己的位置。",
          goals: ["能理解 LED 與陣列位置的關係", "能指出指定 LED 的位置", "能說明 LED 陣列在程式控制中的用途"],
          steps: [
            "開啟 C601 任務練習檔，觀察 SmartRing LED 的排列順序。",
            "指出不同編號的 LED 在燈環上的位置。",
            "使用指定 LED 位置控制單顆燈亮起。",
            "測試多個位置，確認你理解 LED 陣列索引與實體位置的關係。"
          ],
          project: "/osep/projects/ch06/C601_led_array_intro.sb3",
          checklist: "/osep/checklists/ch06/C601_checklist.html",
          enabled: true
        },
        {
          code: "C602",
          title: "用陣列控制燈號",
          description: "使用陣列概念控制多顆 LED 的開關、顏色與狀態，理解資料批次控制的基本概念。",
          goals: ["能控制多顆 LED 的顏色或亮滅狀態", "能理解批次控制 LED 的概念", "能比較單一設定與批次設定的差異"],
          steps: [
            "開啟 C602 任務練習檔，先控制單一 LED 顏色。",
            "改用陣列或批次控制方式設定多顆 LED。",
            "比較逐顆設定與一次設定多顆 LED 的差異。",
            "設計一組多顆 LED 燈號，並確認每個位置顯示正確。"
          ],
          project: "/osep/projects/ch06/C602_array_led_control.sb3",
          checklist: "/osep/checklists/ch06/C602_checklist.html",
          enabled: true
        },
        {
          code: "C603",
          title: "陣列位移效果",
          description: "透過 shift 與 rotate 的概念，設計 LED 燈號移動與循環效果。",
          goals: ["能觀察 LED 圖樣位移的效果", "能理解 shift 與 rotate 的差異", "能設計簡單的跑馬燈或循環燈效"],
          steps: [
            "開啟 C603 任務練習檔，觀察範例 LED 圖樣。",
            "使用位移或旋轉積木讓 LED 圖樣移動。",
            "比較 shift 與 rotate 的效果差異。",
            "設計一個跑馬燈或循環燈效，並測試動畫是否順暢。"
          ],
          project: "/osep/projects/ch06/C603_array_shift_rotate.sb3",
          checklist: "/osep/checklists/ch06/C603_checklist.html",
          enabled: true
        },
        {
          code: "C604",
          title: "分數與生命 LED 陣列",
          description: "將分數與生命值轉換成 LED 顯示，理解資料與視覺化回饋的關係。",
          goals: ["能用 LED 數量表示分數或生命值", "能觀察資料變化與 LED 顯示的關係", "能說明視覺化回饋在互動作品中的用途"],
          steps: [
            "開啟 C604 任務練習檔，建立分數或生命值資料。",
            "將分數或生命值轉換成 LED 顯示數量。",
            "讓資料變化時，LED 顯示也同步更新。",
            "測試得分、扣血或歸零情境，確認 LED 陣列能正確呈現狀態。"
          ],
          project: "/osep/projects/ch06/C604_score_life_array.sb3",
          checklist: "/osep/checklists/ch06/C604_checklist.html",
          enabled: true
        },
        {
          code: "C605",
          title: "陣列圖案設計",
          description: "利用陣列位置設計 LED 圖案、對稱效果與簡單動畫。",
          goals: ["能利用 LED 位置設計圖案", "能設計對稱或規律排列的 LED 效果", "能說明圖案設計與陣列位置的關係"],
          steps: [
            "開啟 C605 任務練習檔，先規劃你想顯示的 LED 圖案。",
            "依照 LED 位置設計對稱、規律或主題圖案。",
            "使用陣列控制方式設定圖案中的每一顆 LED。",
            "測試並調整圖案，讓燈環效果更清楚。"
          ],
          project: "/osep/projects/ch06/C605_array_pattern.sb3",
          checklist: "/osep/checklists/ch06/C605_checklist.html",
          enabled: true
        },
        {
          code: "C606",
          title: "陣列挑戰任務",
          description: "整合陣列控制、LED 圖案與互動規則，完成一個 SmartRing 陣列應用作品。",
          goals: ["能整合第 6 章陣列概念", "能設計 LED 圖案與互動規則", "能完成具備主題的 SmartRing 陣列作品"],
          steps: [
            "開啟 C606 任務練習檔，規劃一個結合 LED 陣列的互動作品。",
            "整合 LED 位置、批次控制、位移或圖案設計。",
            "加入 SmartRing 按鍵互動，讓使用者能改變 LED 效果。",
            "完成後測試作品，確認互動規則與 LED 顯示一致。"
          ],
          project: "/osep/projects/ch06/C606_array_challenge.sb3",
          checklist: "/osep/checklists/ch06/C606_checklist.html",
          enabled: true
        }
      ]
    },
        {
      id: "ch07",
      path: "/osep/chapters/ch07.html",
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
          description: "認識如何將常用的 SmartRing 控制流程整理成自訂積木，降低程式重複並提升可讀性。",
          goals: ["能理解自訂積木的用途", "能找出程式中重複出現的流程", "能說明模組化設計的好處"],
          steps: [
            "開啟 C701 任務練習檔，觀察程式中重複出現的積木流程。",
            "將重複流程整理成自訂積木。",
            "使用自訂積木取代原本重複的程式片段。",
            "比較整理前後的程式，說明自訂積木帶來的好處。"
          ],
          project: "/osep/projects/ch07/C701_custom_block_intro.sb3",
          checklist: "/osep/checklists/ch07/C701_checklist.html",
          enabled: true
        },
        {
          code: "C702",
          title: "LED 函式封裝",
          description: "將常用 LED 控制流程封裝成自訂積木，例如清除燈號、顯示狀態、顯示指定圖案。",
          goals: ["能建立 LED 控制用自訂積木", "能重複使用同一個 LED 函式", "能說明函式封裝與程式重用的關係"],
          steps: [
            "開啟 C702 任務練習檔，找出 LED 控制中重複使用的流程。",
            "建立一個 LED 控制用自訂積木。",
            "在不同地方呼叫同一個自訂積木來控制 LED。",
            "測試自訂積木是否能穩定重複使用。"
          ],
          project: "/osep/projects/ch07/C702_led_function.sb3",
          checklist: "/osep/checklists/ch07/C702_checklist.html",
          enabled: true
        },
        {
          code: "C703",
          title: "參數化 LED 控制",
          description: "在自訂積木中加入參數，讓同一個函式可以控制不同位置、顏色或數量的 LED。",
          goals: ["能理解參數的用途", "能設計具有參數的自訂積木", "能用參數控制不同 LED 效果"],
          steps: [
            "開啟 C703 任務練習檔，觀察沒有參數的自訂積木限制。",
            "建立具有參數的 LED 控制自訂積木。",
            "用不同參數控制 LED 位置、顏色或效果。",
            "測試多組參數，確認同一個自訂積木能產生不同結果。"
          ],
          project: "/osep/projects/ch07/C703_parameter_led.sb3",
          checklist: "/osep/checklists/ch07/C703_checklist.html",
          enabled: true
        },
        {
          code: "C704",
          title: "互動流程模組化",
          description: "將按鍵偵測、角色控制、LED 回饋等互動流程拆解成不同模組，提升程式結構清楚度。",
          goals: ["能拆解互動作品的主要流程", "能將不同功能整理成不同自訂積木", "能說明模組化如何幫助程式維護"],
          steps: [
            "開啟 C704 任務練習檔，拆解作品中的主要互動流程。",
            "將輸入偵測、角色控制、LED 回饋等功能分成不同自訂積木。",
            "重新組合各個自訂積木，完成清楚的互動流程。",
            "檢查程式結構，確認每個模組都有明確功能。"
          ],
          project: "/osep/projects/ch07/C704_interaction_module.sb3",
          checklist: "/osep/checklists/ch07/C704_checklist.html",
          enabled: true
        },
        {
          code: "C705",
          title: "作品狀態管理",
          description: "使用變數、自訂積木與 LED 回饋管理作品狀態，例如開始、進行中、成功、失敗或結束。",
          goals: ["能設計作品狀態變數", "能用自訂積木管理狀態切換", "能讓 LED 回饋對應不同作品狀態"],
          steps: [
            "開啟 C705 任務練習檔，建立作品需要的狀態變數。",
            "設計不同狀態，例如開始、進行中、成功、失敗或結束。",
            "使用自訂積木管理狀態切換與 LED 回饋。",
            "測試狀態轉換流程，確認畫面與 LED 反應一致。"
          ],
          project: "/osep/projects/ch07/C705_state_management.sb3",
          checklist: "/osep/checklists/ch07/C705_checklist.html",
          enabled: true
        },
        {
          code: "C706",
          title: "模組化挑戰任務",
          description: "整合自訂積木、參數、狀態管理與 SmartRing LED 回饋，完成一個結構清楚的互動作品。",
          goals: ["能整合第 7 章模組化概念", "能完成具備自訂積木的 SmartRing 作品", "能說明作品中各模組的功能"],
          steps: [
            "開啟 C706 任務練習檔，規劃一個模組化挑戰作品。",
            "使用自訂積木整理主要功能，避免重複堆疊程式。",
            "加入參數、狀態管理與 LED 回饋，讓作品結構更完整。",
            "完成後說明每個自訂積木的功能與作品運作流程。"
          ],
          project: "/osep/projects/ch07/C706_module_challenge.sb3",
          checklist: "/osep/checklists/ch07/C706_checklist.html",
          enabled: true
        }
      ]
    }
  ]
};