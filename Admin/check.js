const CHANNEL_ID = "@WK_TELE_BOTS";

module.exports = async (ctx, next) => {
    try {
        const member = await ctx.telegram.getChatMember(
            CHANNEL_ID,
            ctx.from.id
        );

        if (["member", "administrator", "creator"].includes(member.status)) {
            return next();
        }

        await ctx.reply("❌ مهرباني وکړئ لومړی چینل جوین کړئ");
    } catch (err) {
        console.error(err.message);
    }
};