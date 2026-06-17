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
          description: "讀取 SmartRing 控制器的不同按鍵，讓 Scratch 角色回應目前按下的按鍵。",
          goals: [
            "能完成 SmartRing 連線",
            "能讀取不同按鍵狀態",
            "能使用條件判斷做出角色回應"
          ],
          project: "/osep/projects/ch04/C401_button_detect.sb3",
          checklist: "",
          enabled: false
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
          checklist: "",
          enabled: false
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
          checklist: "",
          enabled: false
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
          checklist: "",
          enabled: false
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
          checklist: "",
          enabled: false
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
          checklist: "",
          enabled: false
        }
      ]
    },
    {
      id: "ch05",
      chapterNumber: 5,
      title: "第5章｜進階任務",
      subtitle: "條件、重複與遊戲互動",
      description: "本章以七年級程式概念為核心，透過條件判斷、重複結構、分數與生命值設計，讓學生將 SmartRing 應用在互動遊戲中。",
      audience: "七年級",
      concepts: ["條件判斷", "重複結構", "分數系統", "生命值", "互動遊戲"],
      tasks: [
        {
          code: "C501",
          title: "條件判斷遊戲",
          description: "使用 SmartRing 按鍵觸發不同條件，讓角色做出對應反應。",
          goals: ["能使用 if 條件判斷", "能設計不同按鍵對應不同事件", "能建立基礎互動規則"],
          project: "/osep/projects/ch05/C501_condition_game.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C502",
          title: "重複控制挑戰",
          description: "使用重複結構控制角色、燈光或遊戲流程。",
          goals: ["能使用重複執行", "能控制持續偵測輸入", "能理解遊戲主迴圈概念"],
          project: "/osep/projects/ch05/C502_loop_control.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C503",
          title: "分數系統",
          description: "建立遊戲分數變數，並使用 LED 或角色狀態回饋得分結果。",
          goals: ["能建立分數變數", "能在事件中更新分數", "能用視覺回饋呈現分數變化"],
          project: "/osep/projects/ch05/C503_score_system.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C504",
          title: "生命值系統",
          description: "建立生命值或失誤次數機制，讓遊戲具備挑戰與結束條件。",
          goals: ["能建立生命值變數", "能設計扣血或失誤規則", "能判斷遊戲結束條件"],
          project: "/osep/projects/ch05/C504_life_system.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C505",
          title: "控制器互動遊戲",
          description: "使用 SmartRing 控制角色完成更完整的遊戲互動。",
          goals: ["能整合控制器輸入", "能設計遊戲目標", "能加入分數或生命值"],
          project: "/osep/projects/ch05/C505_controller_game.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C506",
          title: "進階挑戰任務",
          description: "綜合第5章所學，完成一個具備條件、重複、分數或生命值的互動遊戲。",
          goals: ["能整合第5章程式概念", "能設計遊戲規則", "能完成進階互動挑戰"],
          project: "/osep/projects/ch05/C506_challenge.sb3",
          checklist: "",
          enabled: false
        }
      ]
    },
    {
      id: "ch06",
      chapterNumber: 6,
      title: "第6章｜陣列任務",
      subtitle: "LED 暫存陣列與資料處理",
      description: "本章聚焦八年級陣列程式設計，透過 LED 暫存陣列、索引、位移、旋轉與圖樣設計，讓學生理解資料如何被儲存、修改與顯示。",
      audience: "八年級",
      concepts: ["陣列", "索引", "LED 暫存陣列", "Shift", "Rotate", "Pattern"],
      tasks: [
        {
          code: "C601",
          title: "認識 LED 暫存陣列",
          description: "了解 SmartRing LED 暫存陣列如何儲存 12 顆 LED 的顏色資料。",
          goals: ["能理解 LED 與陣列位置的關係", "能設定指定位置的 LED", "能說明暫存陣列的用途"],
          project: "/osep/projects/ch06/C601_array_intro.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C602",
          title: "批次設定 LED",
          description: "使用陣列概念一次設定多顆 LED，理解資料批次處理。",
          goals: ["能批次設定 LED", "能理解範圍設定", "能比較單一設定與批次設定差異"],
          project: "/osep/projects/ch06/C602_led_buffer.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C603",
          title: "位移與旋轉",
          description: "操作 LED 暫存陣列進行 shift 與 rotate，觀察資料位置改變。",
          goals: ["能區分 shift 與 rotate", "能觀察資料位移結果", "能設計移動燈效"],
          project: "/osep/projects/ch06/C603_shift_rotate.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C604",
          title: "圖樣設計",
          description: "使用 LED 暫存陣列建立固定圖樣，並顯示在 SmartRing 燈環上。",
          goals: ["能設計 LED 圖樣", "能使用陣列儲存圖樣", "能修改圖樣產生不同效果"],
          project: "/osep/projects/ch06/C604_pattern_design.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C605",
          title: "進度條 LED",
          description: "使用 LED 燈環顯示分數、進度或能量條，理解資料與視覺化的關係。",
          goals: ["能使用 LED 顯示數值進度", "能將變數轉換為 LED 顯示", "能設計遊戲狀態回饋"],
          project: "/osep/projects/ch06/C605_progress_bar.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C606",
          title: "陣列挑戰任務",
          description: "綜合陣列、索引、圖樣與燈效設計，完成一個 SmartRing 陣列互動作品。",
          goals: ["能整合陣列概念", "能設計燈效規則", "能完成陣列應用挑戰"],
          project: "/osep/projects/ch06/C606_array_challenge.sb3",
          checklist: "",
          enabled: false
        }
      ]
    },
    {
      id: "ch07",
      chapterNumber: 7,
      title: "第7章｜模組化任務",
      subtitle: "自訂積木與作品重構",
      description: "本章聚焦八年級模組化程式設計，透過 Scratch 自訂積木，將 SmartRing 控制、LED 顯示與遊戲邏輯拆解成可重複使用的模組。",
      audience: "八年級",
      concepts: ["模組化", "自訂積木", "任務拆解", "程式重構", "遊戲專案整合"],
      tasks: [
        {
          code: "C701",
          title: "認識自訂積木",
          description: "學習如何使用 Scratch 自訂積木整理重複出現的程式片段。",
          goals: ["能建立自訂積木", "能將重複程式整理成模組", "能理解模組化的好處"],
          project: "/osep/projects/ch07/C701_custom_block_intro.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C702",
          title: "LED 功能模組",
          description: "將常用 LED 控制流程整理成自訂積木，建立可重複使用的燈光模組。",
          goals: ["能建立 LED 控制模組", "能使用參數改變顯示效果", "能重複使用自訂積木"],
          project: "/osep/projects/ch07/C702_function_led.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C703",
          title: "控制器功能模組",
          description: "將 SmartRing 控制器輸入整理成角色控制或事件觸發模組。",
          goals: ["能整理控制器輸入流程", "能建立角色控制模組", "能讓程式更容易閱讀與維護"],
          project: "/osep/projects/ch07/C703_function_controller.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C704",
          title: "遊戲規則模組",
          description: "將分數、生命值、勝負判斷等遊戲規則整理成模組。",
          goals: ["能拆解遊戲規則", "能建立分數或生命值模組", "能讓遊戲邏輯更清楚"],
          project: "/osep/projects/ch07/C704_game_module.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C705",
          title: "作品重構",
          description: "將原本較零散的 Scratch 作品重構成較清楚的模組化結構。",
          goals: ["能觀察原始程式問題", "能使用自訂積木重構作品", "能提升程式可讀性"],
          project: "/osep/projects/ch07/C705_project_refactor.sb3",
          checklist: "",
          enabled: false
        },
        {
          code: "C706",
          title: "期末整合挑戰",
          description: "完成一個整合 SmartRing 控制、LED 顯示與模組化設計的完整互動作品。",
          goals: ["能整合第4～7章概念", "能使用模組化設計作品", "能完成完整互動專題"],
          project: "/osep/projects/ch07/C706_final_challenge.sb3",
          checklist: "",
          enabled: false
        }
      ]
    }
  ]
};