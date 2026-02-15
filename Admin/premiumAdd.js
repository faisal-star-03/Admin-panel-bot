const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});
    if (ctx.from.id !== ADMIN_ID) return;

    ctx.session.waitingForPremiumAdd = true;

    await ctx.editMessageText(
`<b>
╭─═══ 💎 ᴀᴅᴅ ᴘʀᴇᴍɪᴜᴍ ═══─╮
│ ❖ Send User ID
│ ❖ User will get Premium
│ ❖ Unlimited Downloads
╰─══════════════════════─╯
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