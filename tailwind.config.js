/** @type {import('tailwindcss').Config} */
// 視覺 tokens（2026-11 視覺修整）：
// - slate 重新對應為以墨色 #1B2430 為軸的中性灰；900 = 終端機底色 #161B22
// - indigo 重新對應為 Git 橘紅強調色（500 #E2532D 圖形用；600 #C2410C 文字／按鈕用）
// - green 重新對應為成功色（600 #1F7A4D）
// 既有元件沿用 slate/indigo/green class 名稱即自動套用新配色。
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#F5F6F8', 100: '#EDEFF2', 200: '#E3E6EA', 300: '#CBD1D8', 400: '#959EAA',
          500: '#646D79', 600: '#4B5460', 700: '#363E49', 800: '#1B2430', 900: '#161B22', 950: '#0E1116',
        },
        indigo: {
          50: '#FDF4F0', 100: '#FBE4DA', 200: '#F5C6B4', 300: '#EEA287', 400: '#E87A5B', 500: '#E2532D',
          600: '#C2410C', 700: '#A2360B', 800: '#80300F', 900: '#672810', 950: '#3A1608',
        },
        green: {
          50: '#EEF7F1', 100: '#D6EDDE', 200: '#B2DCC1', 300: '#84C59D', 400: '#52AB78', 500: '#2F9161',
          600: '#1F7A4D', 700: '#19633F', 800: '#154F33', 900: '#113F29', 950: '#0A2418',
        },
        accent: { DEFAULT: '#E2532D', ink: '#C2410C' },
        ink: '#1B2430',
        paper: '#F5F6F8',
        line: '#E3E6EA',
        term: '#161B22',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Noto Sans TC"', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', '"Noto Sans TC"', 'monospace'],
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
}
