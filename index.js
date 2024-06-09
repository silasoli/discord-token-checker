const fs = require('fs');
const axios = require('axios');

async function checkToken(token) {
    try {
        const response = await axios.get('https://discord.com/api/v9/users/@me/library', {
            headers: {
                Authorization: token,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36'
            }
        });

        if (response.status === 200) {
            console.log('Good token:', token);
            fs.appendFileSync('Good.txt', token + '\n');
        } else if (response.status === 401) {
            console.log('Bad token:', token);
        } else if (response.status === 403) {
            console.log('Locked token:', token);
        } else {
            console.log('Unknown error with token:', token);
        }
    } catch (error) {
        console.log('Error checking token:', error.message);
    }
}

async function readTokens() {
    try {
        const tokens = fs.readFileSync('./tokens.txt', 'utf8').split('\n');
        for (const token of tokens) {
            await checkToken(token.trim());
        }
    } catch (error) {
        console.log('Error reading tokens:', error.message);
    }
}

readTokens();
