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
          project: "/osep/projects/ch05/C501_continuous_control.sb3",
          checklist: "/osep/checklists/ch05/C501_checklist.html",
          enabled: true
        },
        {
          code: "C502",
          title: "速度與方向控制",
          description: "使用變數控制角色移動速度，讓同一組方向鍵可以搭配不同速度產生不同操作效果。",
          goals: ["能建立速度變數", "能用變數控制角色移動距離", "能設計慢速、中速或快速移動模式"],
          project: "/osep/projects/ch05/C502_speed_direction.sb3",
          checklist: "/osep/checklists/ch05/C502_checklist.html",
          enabled: true
        },
        {
          code: "C503",
          title: "LED 狀態提示",
          description: "讓 SmartRing LED 根據角色狀態、速度或碰撞結果顯示不同顏色，建立程式狀態與硬體回饋的連結。",
          goals: ["能依照角色狀態改變 LED 顏色", "能用 LED 顯示成功、警示或加速狀態", "能說明 LED 回饋與程式狀態的關係"],
          project: "/osep/projects/ch05/C503_led_status.sb3",
          checklist: "/osep/checklists/ch05/C503_checklist.html",
          enabled: true
        },
        {
          code: "C504",
          title: "條件判斷互動",
          description: "設計需要判斷條件的互動任務，例如碰到目標得分、碰到障礙扣分，或按下正確按鍵才通過關卡。",
          goals: ["能使用 if 或 if-else 條件判斷", "能設計成功與失敗兩種互動結果", "能讓角色或 LED 依條件產生不同回饋"],
          project: "/osep/projects/ch05/C504_condition_interaction.sb3",
          checklist: "/osep/checklists/ch05/C504_checklist.html",
          enabled: true
        },
        {
          code: "C505",
          title: "分數與生命值",
          description: "整合分數、生命值、條件判斷與 LED 回饋，讓作品具備基本遊戲規則與結束條件。",
          goals: ["能建立分數與生命值變數", "能設計得分、扣血與遊戲結束規則", "能用 LED 呈現分數或生命值狀態"],
          project: "/osep/projects/ch05/C505_score_life.sb3",
          checklist: "/osep/checklists/ch05/C505_checklist.html",
          enabled: true
        },
        {
          code: "C506",
          title: "進階挑戰任務",
          description: "綜合 C501～C505 所學，設計一個具備方向控制、變數、條件判斷、LED 回饋與過關條件的 SmartRing 互動作品。",
          goals: ["能整合第 5 章進階程式概念", "能設計完整互動遊戲規則", "能完成具備挑戰目標的 SmartRing 作品"],
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
          project: "/osep/projects/ch06/C601_led_array_intro.sb3",
          checklist: "/osep/checklists/ch06/C601_checklist.html",
          enabled: true
        },
        {
          code: "C602",
          title: "用陣列控制燈號",
          description: "使用陣列概念控制多顆 LED 的開關、顏色與狀態，理解資料批次控制的基本概念。",
          goals: ["能控制多顆 LED 的顏色或亮滅狀態", "能理解批次控制 LED 的概念", "能比較單一設定與批次設定的差異"],
          project: "/osep/projects/ch06/C602_array_led_control.sb3",
          checklist: "/osep/checklists/ch06/C602_checklist.html",
          enabled: true
        },
        {
          code: "C603",
          title: "陣列位移效果",
          description: "透過 shift 與 rotate 的概念，設計 LED 燈號移動與循環效果。",
          goals: ["能觀察 LED 圖樣位移的效果", "能理解 shift 與 rotate 的差異", "能設計簡單的跑馬燈或循環燈效"],
          project: "/osep/projects/ch06/C603_array_shift_rotate.sb3",
          checklist: "/osep/checklists/ch06/C603_checklist.html",
          enabled: true
        },
        {
          code: "C604",
          title: "分數與生命 LED 陣列",
          description: "將分數與生命值轉換成 LED 顯示，理解資料與視覺化回饋的關係。",
          goals: ["能用 LED 數量表示分數或生命值", "能觀察資料變化與 LED 顯示的關係", "能說明視覺化回饋在互動作品中的用途"],
          project: "/osep/projects/ch06/C604_score_life_array.sb3",
          checklist: "/osep/checklists/ch06/C604_checklist.html",
          enabled: true
        },
        {
          code: "C605",
          title: "陣列圖案設計",
          description: "利用陣列位置設計 LED 圖案、對稱效果與簡單動畫。",
          goals: ["能利用 LED 位置設計圖案", "能設計對稱或規律排列的 LED 效果", "能說明圖案設計與陣列位置的關係"],
          project: "/osep/projects/ch06/C605_array_pattern.sb3",
          checklist: "/osep/checklists/ch06/C605_checklist.html",
          enabled: true
        },
        {
          code: "C606",
          title: "陣列挑戰任務",
          description: "整合陣列控制、LED 圖案與互動規則，完成一個 SmartRing 陣列應用作品。",
          goals: ["能整合第 6 章陣列概念", "能設計 LED 圖案與互動規則", "能完成具備主題的 SmartRing 陣列作品"],
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
          project: "/osep/projects/ch07/C701_custom_block_intro.sb3",
          checklist: "/osep/checklists/ch07/C701_checklist.html",
          enabled: true
        },
        {
          code: "C702",
          title: "LED 函式封裝",
          description: "將常用 LED 控制流程封裝成自訂積木，例如清除燈號、顯示狀態、顯示指定圖案。",
          goals: ["能建立 LED 控制用自訂積木", "能重複使用同一個 LED 函式", "能說明函式封裝與程式重用的關係"],
          project: "/osep/projects/ch07/C702_led_function.sb3",
          checklist: "/osep/checklists/ch07/C702_checklist.html",
          enabled: true
        },
        {
          code: "C703",
          title: "參數化 LED 控制",
          description: "在自訂積木中加入參數，讓同一個函式可以控制不同位置、顏色或數量的 LED。",
          goals: ["能理解參數的用途", "能設計具有參數的自訂積木", "能用參數控制不同 LED 效果"],
          project: "/osep/projects/ch07/C703_parameter_led.sb3",
          checklist: "/osep/checklists/ch07/C703_checklist.html",
          enabled: true
        },
        {
          code: "C704",
          title: "互動流程模組化",
          description: "將按鍵偵測、角色控制、LED 回饋等互動流程拆解成不同模組，提升程式結構清楚度。",
          goals: ["能拆解互動作品的主要流程", "能將不同功能整理成不同自訂積木", "能說明模組化如何幫助程式維護"],
          project: "/osep/projects/ch07/C704_interaction_module.sb3",
          checklist: "/osep/checklists/ch07/C704_checklist.html",
          enabled: true
        },
        {
          code: "C705",
          title: "作品狀態管理",
          description: "使用變數、自訂積木與 LED 回饋管理作品狀態，例如開始、進行中、成功、失敗或結束。",
          goals: ["能設計作品狀態變數", "能用自訂積木管理狀態切換", "能讓 LED 回饋對應不同作品狀態"],
          project: "/osep/projects/ch07/C705_state_management.sb3",
          checklist: "/osep/checklists/ch07/C705_checklist.html",
          enabled: true
        },
        {
          code: "C706",
          title: "模組化挑戰任務",
          description: "整合自訂積木、參數、狀態管理與 SmartRing LED 回饋，完成一個結構清楚的互動作品。",
          goals: ["能整合第 7 章模組化概念", "能完成具備自訂積木的 SmartRing 作品", "能說明作品中各模組的功能"],
          project: "/osep/projects/ch07/C706_module_challenge.sb3",
          checklist: "/osep/checklists/ch07/C706_checklist.html",
          enabled: true
        }
      ]
    }
  ]
};