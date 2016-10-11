/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('botkit');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

// Notifiy everyone (in #general channel) that a new channel has been created.
controller.on('channel_created', function(bot, message) {

    console.log("------------------- NEW CHANNEL -------------------");
    console.log("- channel_created MESSAGE:");
    console.log(message);

    var channelId = message.channel.id;
    var channelName = message.channel.name;
    var channelPurpose = 'Purpose not found!';

    bot.api.channels.info({
        token: process.env.token,
        channel: channelId
    },function(err,response) {
        console.log("- channel info RESPONSE:");
        console.log(response);
        channelPurpose = response.channel.purpose.value;
        reply();
    });

    function reply() {
        console.log("- bot REPLY");
        console.log(channelId);
        console.log(channelName);
        console.log(channelPurpose);

        bot.say({
            text: "Looks like a new channel has been created!",
            username: "FOMO bot",
            icon_emoji: ":robot:",
            channel: "general",
            attachments: [
                {
                    title: "#" + channelName,
                    text: "Purpose & Topics: " + channelPurpose
                }
            ]
        });
    }

});

// Development testing: direct message the bot and it will answer this.
controller.hears([''], 'direct_message', function(bot, message) {

    var channelId = "C03ER7F95";        // ie. #general channel
    var channelName = "";
    var channelPurpose = "";

    bot.api.channels.info({
        token: process.env.token,
        channel: channelId
    },function(err,response) {
        channelName = response.channel.name;
        channelPurpose = response.channel.purpose.value;
        reply();
    });

    function reply() {
        console.log("----------");
        console.log(channelId);
        console.log(channelName);
        console.log(channelPurpose);

        bot.reply(message,{
            text: "Looks like a new channel has been created!",
            username: "FOMO bot",
            icon_emoji: ":robot:",
            attachments: [
                {
                    title: "#" + channelName,
                    text: "Purpose & Topics: " + channelPurpose
                }
            ]
        });
    }

});
