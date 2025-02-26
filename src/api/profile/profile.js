const request = require('request-promise');
const { checkRes, parseJSON } = require('../../utils');

module.exports = async (bearer, options) => {
    const { cookieJar, proxy, userAgent } = options;
    
    const res = await request({
        uri: 'https://stockx.com/api/users/me',
        method: 'GET',
        headers: {
            'Host': 'stockx.com',
            'sec-fetch-mode': 'cors',
            'origin': 'https://stockx.com',
            'authorization': `Bearer ${bearer}`,
            'content-type': 'application/json',
            'appos': 'web',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': userAgent,
            'appversion': '0.1',
            'accept': '*/*',
            'sec-fetch-site': 'same-origin',
            'accept-language': 'en-US,en;q=0.9',
        },
        jar: cookieJar,
        simple: false,
        resolveWithFullResponse: true,
        proxy: proxy
    });

    checkRes(res);

    const { body } = res;
    const profileObj = parseJSON(body);

    return profileObj;
};