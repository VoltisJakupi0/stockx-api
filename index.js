const StockXAPI = require('./src/classes/stockx');
const stockX = new StockXAPI({
    currency: 'EUR',
    //proxy: 'ip:port'
});

(async () => {
    try {
        console.log('Logging in...');
        
        await stockX.login({
            user: 'YOUR_EMAIL', 
            password: 'YOUR_PASSWORD'
        });
        
        console.log('Successfully logged in!');
        
        console.log('Getting profile...');

        const profile = await stockX.getProfile();

        console.log('Successfully got profile data!');

        const bids = await stockX.getBids('current');

        bids.forEach(function (item) {
            console.log(item);
        });

    }
    catch(e){
        console.log('Error: ' + e.message);
    }
})();