const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    ctx.session.waitingForForward = true;

    const caption = `
<b>
╭─═══ 🔁 ʙʀᴏᴀᴅᴄᴀꜱᴛ ꜰᴏʀᴡᴀʀᴅ ═══─╮
│ ❖ Forward any message
│ ❖ It will be sent to all users
│─────────────────────────────
│ 📌 You can forward:
│ • Text messages
│ • Photos / Videos
│ • Any Telegram content
│─────────────────────────────
│ ⚠️ Make sure content is final
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