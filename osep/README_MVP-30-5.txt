# OSEP MVP-30-5 fixed pages

修正內容：
1. 自我檢核表返回章節連結改為相對路徑 ../../chapters/chXX.html。
2. 自我檢核表返回教材首頁連結改為相對路徑 ../../。
3. 首頁與章節頁 createEditorUrl() 改為依環境選擇：
   - GitHub Pages：editor.html
   - 本機 npx serve build：editor
4. 保留 project_url 與 extension 的 URLSearchParams 編碼。

覆蓋位置：
- static/osep/index.html
- static/osep/data/tasks.js
- static/osep/chapters/
- static/osep/checklists/
