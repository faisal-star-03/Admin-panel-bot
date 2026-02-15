const { getDB, saveDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    // session check
    if (!ctx.session?.waitingForPremiumAdd) return;
    if (!ctx.message?.text) return;
    if (ctx.from.id !== ADMIN_ID) return;

    const userId = Number(ctx.message.text.trim());
    if (!userId) {
        return ctx.reply("❌ Invalid User ID");
    }

    ctx.session.waitingForPremiumAdd = false;

    const db = getDB();
    db.premiumUsers = db.premiumUsers || [];

    // already premium?
    const exists = db.premiumUsers.find(u => u.id === userId);
    if (exists) {
        return ctx.reply("⚠️ User already Premium");
    }

    // add premium
    db.premiumUsers.push({
        id: userId,
        since: Date.now()
    });

    saveDB(db);

    // admin reply
    await ctx.reply(
`<b>
✅ Premium Activated Successfully

🆔 User ID: <code>${userId}</code>
💎 Status: Premium
</b>`,
        { parse_mode: "HTML" }
    );

    // notify user
    try {
        await ctx.telegram.sendMessage(
            userId,
`<b>
💎 Premium Access Granted!

🚀 You now have unlimited downloads.
🙏 Enjoy the premium features.
</b>`,
            { parse_mode: "HTML" }
        );
    } catch (e) {
        // user blocked bot → ignore
    }
};