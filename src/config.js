// 教材固定資訊（Sprint_curriculum_restructure §3.0）——講師帳號只准出現在這個檔案，
// 教材文字一律 import 這裡的常數。

/** 講師的 GitHub 帳號（學員交作業時 @ 這個帳號）。 */
export const INSTRUCTOR_GITHUB = 'BlekZz';

/** 學員在 PR 描述欄要寫的 mention。 */
export const INSTRUCTOR_MENTION = `@${INSTRUCTOR_GITHUB}`;

/** 本教材網站的原始碼 repo（選修 E2 Fork 貢獻練習的上游）。 */
export const TUTORIAL_REPO = `${INSTRUCTOR_GITHUB}/Trainer_Git_Tutorial`;

/** 作業 repo 名稱（學員建在自己帳號下）。 */
export const HOMEWORK_REPO_NAME = 'git-journal';

/** 講師收件匣：所有 @ 講師的 PR。 */
export const INSTRUCTOR_INBOX_URL = `https://github.com/search?q=is%3Apr+mentions%3A${INSTRUCTOR_GITHUB}&type=pullrequests`;
