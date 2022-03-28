const request = require('request-promise');

module.exports = async (options) => {
    const { cookieJar, proxy, userAgent } = options;
    const reqOptions = {
        uri: 'https://www.stockx.com/login',
        headers: {
            'Host': 'stockx.com',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'upgrade-insecure-requests': '1',
            'user-agent': userAgent,
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'it-IT,it;q=0.9',
        },
        jar: cookieJar,
        followAllRedirects: true,
        followRedirect: true,
        proxy,
        resolveWithFullResponse: true
    };

    //Fetch login page
    const res = await request(reqOptions);

    if (res.statusCode != 200) throw new Error(`Status code error ${res.statusCode} - Response: ${res.body}`);

    //Get state and client ID
    const state = res.req._header.split('state=')[1].split('&')[0];
    const clientID = res.req._header.split('client=')[1].split('&')[0];

    if (state == undefined || clientID == undefined) throw new Error("Could not find state or Client ID!");

    return {
        state, 
        clientID
    };
};