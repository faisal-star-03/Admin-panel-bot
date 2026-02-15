const { getDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    const db = getDB();

    const users = db.allUsers || [];
    const banned = db.bannedUsers || [];
    const todayUsers = db.todayUsers || [];
    const totalDownloadsObj = db.userDownloads || {};
    const totalDownloads = Object.values(totalDownloadsObj).reduce((a, b) => a + b, 0);
    const botStopped = db.botStopped === true;

    const caption = `
<b>
╭─═══ 🤖 ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ ᴘᴀɴᴇʟ ═══─╮
│ ❖ ⚡ System Monitoring Center
│ ❖ 🔐 Admin Only Access
│─────────────────────────────
│ 👥 Total Users        ➥ ${users.length}
│ 🆕 Today Users        ➥ ${todayUsers.length}
│ 🚫 Banned Users       ➥ ${banned.length}
│─────────────────────────────
│ 📥 Downloaded Videos  ➥ ${db.totalDownloads}
│─────────────────────────────
│ 🤖 Bot Status         ➥ ${db.botStopped ? "🛑 STOPPED" : "▶️ RUNNING"}
│ ⚙ Control             ➥ /stop • /run
╰─═════════════════════─╯
</b>
`;

    await ctx.editMessageText(caption, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "🛑 Stop Bot", callback_data: "botstop" },
                    { text: "▶️ Run Bot", callback_data: "botrun" }
                ],
                [
                    { text: "🔙 Back", callback_data: "adminpanel" }
                ]
            ]
        }
    });
};