const { getDB, saveDB } = require("../db");
const { Markup } = require("telegraf");

const ADMIN_ID = 7703382662;
const SUPPORT_USERNAME = "@WK_SUPPORT"; // support username

module.exports = async (ctx) => {
    // ✅ session + admin check
    if (!ctx.session?.waitingForBan) return;
    if (!ctx.message?.text) return;
    if (ctx.from.id !== ADMIN_ID) return;

    const userId = Number(ctx.message.text.trim());
    if (!userId) {
        ctx.session.waitingForBan = false;
        return ctx.reply("❌ ɪɴᴠᴀʟɪᴅ ᴜsᴇʀ ɪᴅ");
    }

    const db = getDB();
    db.bannedUsers = db.bannedUsers || [];

    if (db.bannedUsers.includes(userId)) {
        ctx.session.waitingForBan = false;
        return ctx.reply("⚠️ ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ ʙᴀɴɴᴇᴅ");
    }

    // ✅ save ban
    db.bannedUsers.push(userId);
    saveDB(db);
    ctx.session.waitingForBan = false;

    // ✅ admin confirmation
    await ctx.reply(
        `<b>
╭─═══ 🚫 ʙᴀɴ sᴜᴄᴄᴇss ═══─╮
│ ❖ ᴜsᴇʀ ʜᴀs ʙᴇᴇɴ ʙᴀɴɴᴇᴅ
│
│ 🆔 ᴜsᴇʀ ɪᴅ:
│ <code>${userId}</code>
╰─══════════════════════─╯
</b>`,
        { parse_mode: "HTML" }
    );

    // 🔔 notify banned user
    try {
        await ctx.telegram.sendMessage(
            userId,
            `<b>
╭─═══ 🚫 ᴀᴄᴄᴇss ʙʟᴏᴄᴋᴇᴅ ═══─╮
│ ❖ ʏᴏᴜʀ ᴀᴄᴄᴏᴜɴᴛ ʜᴀs
│ ❖ ʙᴇᴇɴ ʙᴀɴɴᴇᴅ ʙʏ ᴀᴅᴍɪɴ
│
│ 🔐 ᴀᴄᴄᴇss ᴅɪsᴀʙʟᴇᴅ
│
│ ⚠️ ɪғ ʏᴏᴜ ᴛʜɪɴᴋ
│ ᴛʜɪs ɪs ᴀ ᴍɪsᴛᴀᴋᴇ,
│ ᴄᴏɴᴛᴀᴄᴛ sᴜᴘᴘᴏʀᴛ
╰─══════════════════════─╯
</b>`,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🆘 sᴜᴘᴘᴏʀᴛ",
                                url: `https://t.me/${SUPPORT_USERNAME.replace("@", "")}`
                            }
                        ]
                    ]
                }
            }
        );
    } catch (err) {
        console.log("❗ Cannot notify banned user:", err.message);
    }
};