const { getDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    const db = getDB();

    // بوت فعال کړه (DB ته)
    db.botStopped = false;

    // هکری-سټایل متن + Back & Support بټن
    const runningMessage = `
╭─═══ ▶️ ʙᴏᴛ sᴛᴀᴛᴜs ═══─╮
│
│ ⚡ ʙᴏᴛ ɪs ʀᴜɴɴɪɴɢ ᴀɢᴀɪɴ
│ ✅ ᴜsᴇʀs ᴄᴀɴ ᴜsᴇ ᴄᴏᴍᴍᴀɴᴅs
│
│ 📩 ғᴏʀ ʜᴇʟᴘ, ᴄᴏɴᴛᴀᴄᴛ sᴜᴘᴘᴏʀᴛ
╰─══════════════════─╯
`;

    const keyboard = {
        inline_keyboard: [
            [{ text: "↩️ ʙᴀᴄᴋ", callback_data: "adminpanel" }],
            [{ text: "💬 sᴜᴘᴘᴏʀᴛ", url: "https://t.me/WK_TELE_BOTS" }]
        ]
    };

    await ctx.editMessageText(runningMessage, {
        parse_mode: "HTML",
        reply_markup: keyboard
    });
};