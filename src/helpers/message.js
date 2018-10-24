const config = require("../../config/config.json");

module.exports = {
    message: (client, message) => {
        if (message.author.bot || message.channel.nsfw) {
            return;
        }

        let validated = false;
        config["nsfw-phrases"].forEach(phrase => {
            if (message.content.includes(phrase) && (message.content.includes('https://') || message.content.includes('http://')) && !validated) {
                message.delete().catch(o_o => {});

                let nsfwChannel = message.guild.channels.get(config['nsfw-channel']);

                if (nsfwChannel) {
                    nsfwChannel.send({
                        file: message.content
                    });
                }

                message.author.send({
                    embed: {
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        color: 0xff8c00,
                        description: `Fuck off sending that shit to anything other than <#${config['nsfw-channel']}>, faggot.`
                    }
                });

                validated = true;
            }
        });
    }
};