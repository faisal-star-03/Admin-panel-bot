const { getDB } = require("../db");

const ADMIN_ID = 7703382662;

// یوازې د public channel post لینک
const POST_REGEX = /^https?:\/\/t\.me\/([A-Za-z0-9_]+)\/(\d+)$/;

module.exports = async (ctx) => {
    if (!ctx.session?.waitingForForward) return;
    if (!ctx.message?.text) return;
    if (ctx.from.id !== ADMIN_ID) return;

    ctx.session.waitingForForward = false;

    const link = ctx.message.text.trim();
    const match = link.match(POST_REGEX);

    if (!match) {
        return ctx.reply(
            "❌ یوازې د فابلیک چینل پوسټ لینک ومنل کېږي\n\n" +
            "مثال:\nhttps://t.me/channel_name/123"
        );
    }

    const channelUsername = match[1];   // WK_TELE_BOTS
    const messageId = Number(match[2]); // 123

    const db = getDB();
    const users = db.allUsers || [];

    if (users.length === 0) {
        return ctx.reply("❌ No users found in database");
    }

    let success = 0;
    let failed = 0;

    for (const userId of users) {
        try {
            const msg = await ctx.telegram.forwardMessage(
                userId,
                "@" + channelUsername,
                messageId
            );

            // 📌 Pin forwarded message
            await ctx.telegram.pinChatMessage(
                userId,
                msg.message_id,
                { disable_notification: true }
            );

            success++;
        } catch (e) {
            failed++;
        }
    }

    await ctx.reply(
        `📢 BROADCAST + PIN COMPLETED \n\n` +
        `👥 TOTAL USERS : ${users.length}\n` +
        `SENT : ${success}\n` +
        `FAILED : ${failed}`
    );
};