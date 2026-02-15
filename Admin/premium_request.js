const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});

    ctx.session = ctx.session || {};
    ctx.session.waitingForPremiumRequest = true;

    await ctx.editMessageText(
        `<b>
╭─═══ 💎 ᴘʀᴇᴍɪᴜᴍ ʀᴇǫᴜᴇꜱᴛ ═══─╮
│ 📝 Send your request details
│─────────────────────────────
│ Include:
│ • ⏳ Duration (days / months)
│ • 💬 Any extra message
│
│ Example:
│ 30 days premium
│ I need full access
│─────────────────────────────
│ 📤 Your message will be sent
│     directly to Admin
╰─══════════════════════════─╯
</b>`,
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔙 Back", callback_data: "mainmenu" }]
                ]
            }
        }
    );
};