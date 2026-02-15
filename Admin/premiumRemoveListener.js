const { getDB, saveDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    // session check
    if (!ctx.session?.waitingForPremiumRemove) return;
    if (!ctx.message?.text) return;
    if (ctx.from.id !== ADMIN_ID) return;

    const userId = Number(ctx.message.text.trim());
    if (!userId) {
        return ctx.reply("❌ Invalid User ID");
    }

    ctx.session.waitingForPremiumRemove = false;

    const db = getDB();
    db.premiumUsers = db.premiumUsers || [];

    const before = db.premiumUsers.length;

    // remove premium
    db.premiumUsers = db.premiumUsers.filter(u => u.id !== userId);

    if (db.premiumUsers.length === before) {
        return ctx.reply("⚠️ User is not Premium");
    }

    saveDB(db);

    // admin reply
    await ctx.reply(
`<b>
❌ Premium Removed Successfully

🆔 User ID: <code>${userId}</code>
💎 Status: Normal User
</b>`,
        { parse_mode: "HTML" }
    );

    // notify user (optional)
    try {
        await ctx.telegram.sendMessage(
            userId,
`<b>
❌ Premium Removed

ℹ️ Your premium access has been revoked.
🙏 Thank you for using our bot.
</b>`,
            { parse_mode: "HTML" }
        );
    } catch (e) {
        // user blocked bot → ignore
    }
};