module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});

    ctx.session = ctx.session || {};
    ctx.session.waitingForSupport = true;

    await ctx.editMessageText(
        `<b>
╭─═══ 🎗 sᴜᴘᴘᴏʀᴛ ᴄᴇɴᴛᴇʀ ═══─╮
│ ❖ Please send your message
│ ❖ Our admin will review it
│ ❖ Reply will be sent ASAP
╰─═══════════════════════════─╯
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