let nsfwPhrases = [
    '.mp4',
    '.webm',
    'boards.4chan.org',
];

module.exports = {
    message: (client, message) => {
        if (message.author.bot) {
            return;
        }

        nsfwPhrases.forEach(phrase => {
            if (message.content.includes(phrase)) {
                message.delete().catch(o_o => {});

                return message.author.send({
                    embed: {
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        color: 0xff8c00,
                        description: `Fuck off sending that shit to anything other than #NSFW, faggot.`
                    }
                });
            }
        });
    }
};