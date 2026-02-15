const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    ctx.session.waitingForPremiumRemove = true;

    await ctx.editMessageText(
`<b>
╭─═══ ❌ ʀᴇᴍᴏᴠᴇ ᴘʀᴇᴍɪᴜᴍ ═══─╮
│ ❖ Send User ID
│ ❖ Premium will be revoked
╰─══════════════════════════─╯
</b>`,
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔙 Back", callback_data: "adminpanel" }]
                ]
            }
        }
    );
};