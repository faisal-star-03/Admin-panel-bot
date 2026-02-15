const { getDB, saveDB } = require("../db"); 
const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    if (!ctx.session?.waitingForUnban) return;
    if (!ctx.message?.text) return;
    if (ctx.from.id !== ADMIN_ID) return;

    const userId = Number(ctx.message.text.trim());
    if (!userId) {
        ctx.session.waitingForUnban = false;
        return ctx.reply("❌ ɪɴᴠᴀʟɪᴅ ᴜsᴇʀ ɪᴅ");
    }

    // ✅ DB لوستل
    const db = getDB();
    db.bannedUsers = db.bannedUsers || [];

    // ❌ not banned
    if (!db.bannedUsers.includes(userId)) {
        ctx.session.waitingForUnban = false;
        return ctx.reply("⚠️ ᴜsᴇʀ ɪs ɴᴏᴛ ʙᴀɴɴᴇᴅ");
    } 

    // ✅ remove ban from DB
    db.bannedUsers = db.bannedUsers.filter(id => id !== userId);
    saveDB(db);

    // ✅ remove ban from memory
    ctx.botInfo.bannedUsers = ctx.botInfo.bannedUsers || [];
    ctx.botInfo.bannedUsers = ctx.botInfo.bannedUsers.filter(id => id !== userId);

    ctx.session.waitingForUnban = false;

    // ✅ notify admin
    await ctx.reply(
`<b>
╭─═══ 🔓 ᴜɴʙᴀɴ sᴜᴄᴄᴇss ═══─╮
│ ❖ ᴜsᴇʀ ᴀᴄᴄᴇss ʀᴇsᴛᴏʀᴇᴅ
│
│ 🆔 ᴜsᴇʀ ɪᴅ:
│ <code>${userId}</code>
│
│ ⚡ sᴛᴀᴛᴜs: ᴀᴄᴛɪᴠᴇ
╰─══════════════════════─╯
</b>`,
        { parse_mode: "HTML" }
    ); 

    // 📩 notify user
    try {
        await ctx.telegram.sendMessage(
            userId,
`<b>
╭─═══ 🔓 ᴀᴄᴄᴇss ʀᴇsᴛᴏʀᴇᴅ ═══─╮
│ ❖ ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴜɴʙᴀɴɴᴇᴅ
│
│ 🤖 ʙᴏᴛ ᴀᴄᴄᴇss ɪs
│ ɴᴏᴡ ᴀᴄᴛɪᴠᴇ
│
│ 📌 ғᴏʀ ᴀssɪsᴛᴀɴᴄᴇ
│ ᴄᴏɴᴛᴀᴄᴛ sᴜᴘᴘᴏʀᴛ
╰─══════════════════════─╯
</b>`,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🆘 sᴜᴘᴘᴏʀᴛ", callback_data: "support" }
                        ]
                    ]
                }
            }
        );
    } catch (e) { 
        // user blocked bot → ignore
    }
};