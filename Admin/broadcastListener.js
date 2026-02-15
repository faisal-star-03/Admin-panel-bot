const { getDB } = require("../db");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    // 🔐 security
    if (!ctx.session?.waitingForBroadcast) return;
    if (!ctx.message) return;
    if (ctx.from.id !== ADMIN_ID) return;

    ctx.session.waitingForBroadcast = false;

    const db = getDB();
    const users = db.allUsers || [];

    if (users.length === 0) {
        return ctx.reply("❌ No users found in database");
    }

    let sent = 0;
    let pinned = 0;
    let failed = 0;

    for (const userId of users) {
        try {
            // 📢 send message (copy)
            const msg = await ctx.telegram.copyMessage(
                userId,
                ctx.chat.id,
                ctx.message.message_id
            );
            sent++;

            // 📌 pin message (no notification)
            await ctx.telegram.pinChatMessage(
                userId,
                msg.message_id,
                { disable_notification: true }
            );
            pinned++;

            // ⏳ anti-flood delay
            await new Promise(r => setTimeout(r, 40));

        } catch (e) {
            failed++;
        }
    }

    await ctx.reply(
`<b>
📢 BROADCAST + PIN COMPLETED

<code>
TOTAL USERS : ${users.length}
SENT        : ${sent}
PINNED      : ${pinned}
FAILED      : ${failed}
STATUS      : OK
</code>
</b>`,
        { parse_mode: "HTML" }
    );
};