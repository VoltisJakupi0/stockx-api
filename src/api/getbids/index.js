const getBids = require('./bids');

module.exports = async (bearer, customerId, options) => {
    const bids = await getBids(bearer, customerId, options);
        
    return bids;
};