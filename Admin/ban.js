const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});

    if (ctx.from.id !== ADMIN_ID) {
        return ctx.answerCbQuery("❌ Access denied", { show_alert: true });
    }

    ctx.session = ctx.session || {};
    ctx.session.waitingForBan = true;

    await ctx.editMessageText(
        `<b>
╭─═══ 🚫 ʙᴀɴ ᴜꜱᴇʀ ═══─╮
│ ❖ Send the User ID to ban
│ ❖ User will lose access immediately
╰─════════════════════─╯
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
