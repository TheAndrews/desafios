const TelegramBot = require('node-telegram-bot-api')
const cheerio = require('cheerio');
const axios = require("axios");
const TOKEN = 'secret_token'
const bot = new TelegramBot(TOKEN, { polling: true })

bot.onText(/\/NadaPraFazer (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    if (!resp){
        bot.sendMessage(chatId, 'invalid parameter');
        return;
    }
    const subreddits = resp.split(';');
    
    const message = await crawlSubReddits(subreddits);
    bot.sendMessage(chatId, message.join());
});

async function crawlSubReddits(subreddits){
    let message = [];
    for(let sr = 0; sr < subreddits.length; sr++){
        const response = await axios.get(`https://old.reddit.com/r/${subreddits[sr]}/`);
        const $ = cheerio.load(response.data);
        const scores = $('.score');
        for(let i = 0; i< scores.length; i++){
            if(!$(scores[i]).hasClass('likes'))
                continue;
                
            const text_area = $(scores[i]).parent().parent();
            const entry = $(text_area).find('.entry');
            const title = $(entry).find('.title');
            const comments = $(entry).find('.comments');
            if (threadPumped($(scores[i]).html())){
                message.push(`upvotes: ${$(scores[i]).html()} \n subreddit: ${subreddits[sr]} \n title: ${$(title).find('a').html()} \n comments: ${$(comments).attr('href')} \n thread: ${$(title).find('a').attr('href')} \n\n`);
            }
        }       
    };

    return message;
}

function threadPumped(number){
    try{
        if (number.toString().indexOf('k')> -1)
            return true;
        else if(parseInt(number) >= 5000)
            return true;
        else
            return false;
    }catch(err){
        console.log(err);
        return false;
    }
}

