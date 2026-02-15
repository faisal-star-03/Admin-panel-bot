const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    ctx.session.waitingForUserMsg = true;

    const caption = `
<b>
╭─═══ ✉️ ꜱᴇɴᴅ ᴍᴇꜱꜱᴀɢᴇ ᴛᴏ ᴜꜱᴇʀ ═══─╮
│ ❖ Direct Admin Messaging Tool
│ ❖ Send private message to user
│─────────────────────────────
│ 📌 Format:
│ <code>USER_ID MESSAGE</code>
│
│ 📎 Example:
│ <code>123456 Hello, welcome!</code>
│─────────────────────────────
│ ⚠️ Make sure ID is correct
╰─══════════════════════════─╯
</b>
`;

    await ctx.editMessageText(caption, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔙 Back", callback_data: "adminpanel" }]
            ]
        }
    });
};
