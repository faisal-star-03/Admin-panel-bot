const { getDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    await ctx.answerCbQuery().catch(() => {});

    if (ctx.from.id !== ADMIN_ID) return;

    const db = getDB();
    const premiumUsers = db.premiumUsers || [];

    // ❌ که پریمیوم یوزر نه وي
    if (premiumUsers.length === 0) {
        return ctx.editMessageText(
`<b>
╭─═══ 💎 ᴘʀᴇᴍɪᴜᴍ ᴜꜱᴇʀꜱ ═══─╮
│ ❌ No premium users found
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
    }

    // ✅ list جوړول
    let text = `<b>
╭─═══ 💎 ᴘʀᴇᴍɪᴜᴍ ᴜꜱᴇʀꜱ ʟɪꜱᴛ ═══─╮
│ 👥 Total: ${premiumUsers.length}
│─────────────────────────────│
`;

    premiumUsers.forEach((u, i) => {
        const sinceDate = new Date(u.since);
        const days = Math.floor((Date.now() - u.since) / (1000 * 60 * 60 * 24));

        text += `│ ${i + 1}. 🆔 <code>${u.id}</code>
│    ⏱ Since: ${sinceDate.toLocaleDateString()}
│    📆 Days Active: ${days}
│─────────────────────────────│
`;
    });

    text += `╰─══════════════════════════─╯</b>`;

    await ctx.editMessageText(text, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔙 Back", callback_data: "adminpanel" }]
            ]
        }
    });
};