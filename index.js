const Discord = require('discord.js');

const client = new Discord.Client();
fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');


var isReady = true;

client.on('ready', () => {
    console.log('I am ready');
});

client.on('message', message => {
    if(isReady && message.content.startsWith('=')){
        
        var number = message.content.substr(1);
        if(parseInt(number) > 0 && parseInt(number) <= 100)
        {
            message.delete(1000);
            var voiceChannel = message.member.voiceChannel;
            if (typeof voiceChannel != 'undefined')
            {
                isReady = false;
                voiceChannel.join().then(connection => {
                var filePath = './sounds/' + number + '.wav';
                const dispatcher = connection.playFile(filePath);
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                    isReady = true;
                });
                }).catch(err => console.log(err));
            }
            
        }
        
    }
});

client.login(token);