const { getDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    const db = getDB();

    // بوت بند کړه (DB ته)
    db.botStopped = true;

    // هکری-سټایل متن + Back button
    const stoppedMessage = `
╭─═══ 🛑 ʙᴏᴛ sᴛᴀᴛᴜs ═══─╮
│
│ ⚡ ʙᴏᴛ ɪs ɴᴏᴡ ʙʀᴏᴋᴇɴ ʙʏ ᴀᴅᴍɪɴ
│ 📛 ᴜsᴇʀs ᴄᴀɴɴᴏᴛ ᴜsᴇ ᴄᴏᴍᴍᴀɴᴅs
│
│ 📩 ғᴏʀ ʜᴇʟᴘ, ᴄᴏɴᴛᴀᴄᴛ sᴜᴘᴘᴏʀᴛ
╰─══════════════════─╯
`;

    const keyboard = {
        inline_keyboard: [
            [{ text: "↩️ ʙᴀᴄᴋ", callback_data: "adminpanel" }],
            [{ text: "💬 sᴜᴘᴘᴏʀᴛ", callback_data: "support" }]
        ]
    };

    await ctx.editMessageText(stoppedMessage, {
        parse_mode: "HTML",
        reply_markup: keyboard
    });
};