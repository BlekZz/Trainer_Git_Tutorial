# Trainer_Git_Tutorial — 專案規則

React + Vite 教學網站（GitHub Pages 部署）。受眾：**從未用過 terminal 的實習生**。
教學設計原則的完整版見全域 skill `~/.claude/coldbench/skills/tutorial-design/SKILL.md`。

## 教學內容鐵律（改任何章節前必讀）

1. **一個 CommandBlock 只放一條指令**——學員會整段複製貼上，多條併塊是缺失。
2. **每條指令必須回答「輸入後我會看到什麼」**，三態擇一就近標註：
   - 有輸出 → 緊接 `<CommandBlock variant="output" ...>` 範例
   - 無輸出 → 緊接 `<NoOutputHint />`（Shared.jsx）
   - 要等待 → Callout 說明等多久、畫面樣子、不要重按 Enter
3. **嚇人但正常的訊息**用 `<FalseAlarm signal={'學員會看到的原文'}>`（Shared.jsx）事先展示。
   Windows 受眾必遇：CRLF warning、push/clone 進度行、pager 按 q、vim 逃生（Esc → :q!/:wq）。
4. **模擬終端（TerminalSim）輸出必須貼近真機**（含進度行）；系統代打的指令要加旁白標示。
5. 佔位符 `<xxx>` 要明講「整個換掉、角括號不要打進去」；`$` 提示符不用打進去。
6. 集中式錯誤對照表在 ErrorRoom.jsx（錯誤原文 → 白話 → 解法），新增常見錯誤往那裡加。

## 驗收

- 改完跑 `npm run build`（必過）。ESLint 有 6 個既有錯誤（Chapter0Setup 的 NextButton
  render 內宣告，react-hooks/static-components），非新引入者可忽略。
- 內容改動交付前：用 tutorial-design skill 內的 6 條 rubric 派 fresh-context agent 稽核。

## 知識歸檔路由表

| 類型 | 去處 |
|---|---|
| 教學設計原則（跨專案） | `~/.claude/coldbench/skills/tutorial-design/SKILL.md` |
| 本專案內容慣例 | 本檔「教學內容鐵律」段 |
| Sprint / 規格 / 改進提案 | `dev/` |
