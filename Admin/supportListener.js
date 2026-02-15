const ADMIN_ID = 7703382662;

module.exports = async (ctx) => {
    // ❌ که support mode فعال نه وي، هیڅ مه کوه
    if (!ctx.session || !ctx.session.waitingForSupport) return;
    if (!ctx.message) return;

    const user = ctx.from;
    const message = ctx.message;

    // 🛑 support mode بند کړه
    ctx.session.waitingForSupport = false;

    // 🔁 اصلي میسج ادمین ته forward کړه
    try {
        await ctx.telegram.forwardMessage(
            ADMIN_ID,
            ctx.chat.id,
            message.message_id
        );
    } catch (err) {
        console.error("❌ Support forward error:", err);
    }

    // 🧾 د میسج خلاصه (که text نه وي)
    let preview = "📎 Non-text message";
    if (message.text) preview = message.text;

    // 📩 ادمین ته معلوماتی پیغام
    await ctx.telegram.sendMessage(
        ADMIN_ID,
        `<b>🎗 New Support Message</b>

👤 User: ${user.first_name || "N/A"}
🔖 Username: ${user.username ? `@${user.username}` : "N/A"}
🆔 ID: <code>${user.id}</code>

💬 Message:
${preview}`,
        { parse_mode: "HTML" }
    );

    // ✅ یوزر ته confirmation
    await ctx.reply(
        `<b>
✅ Your support message has been sent successfully.

📌 Our admin will contact you soon.
🙏 Thank you for reaching out.
</b>`,
        { parse_mode: "HTML" }
    );
};
