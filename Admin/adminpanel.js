const { Markup } = require("telegraf");

const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;

    const admText = `
<b>
╭─═══ 🛡 𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗡𝗧𝗥𝗢𝗟 𝗣𝗔𝗡𝗘𝗟 ═══─╮
│─❖ 👑 Full system access granted
│─❖ ⚙ Manage users & bot actions
│─❖ 🚀 Secure • Powerful • Live
│─────────────────────────────│
│ ❖ Available Controls ❖
│ • User Management
│ • Bot Control
│ • Messaging System
│ • Live Status
╰─═══════════════════════════─╯
</b>
`;
   await ctx.editMessageText(admText, {
    parse_mode: "HTML",
    reply_markup: {
        inline_keyboard: [
            // First row: Ban / Unban
            [
                { text: "🚫 Ban User", callback_data: "ban" },
                { text: "✅ Unban User", callback_data: "unban" }
            ],

            // Second row: Bot Stop / Run
            [
                { text: "⛔ Bot Stop", callback_data: "botstop" },
                { text: "▶️ Bot Run", callback_data: "botrun" }
            ],
          [
                { text: "💎 Premium Users", callback_data: "premium_list" }
            ],
            // Third row: Broadcast Message / Forward
            [
                { text: "📢 Broad Msg", callback_data: "broadcast_msg" },
                { text: "📤 Broad Frwd", callback_data: "broadFrwd" }
            ],

            // Fourth row: long text → single button
            [
                { text: "✉️ Send Msg to User", callback_data: "sendUser" }
            ],

            // Fifth row: Bot Status
            [
                { text: "📊 Bot Status", callback_data: "botstatus" }
            ],
            [
                { text: "◽premium add", callback_data: "premium_add" },
                { text: "🎈premium remove", callback_data: "premium_remove" }
            ],
            // Sixth row: Back
            [
                { text: "🔙 Back", callback_data: "mainmenu" }
            ]
        ]
     }
   });
  };