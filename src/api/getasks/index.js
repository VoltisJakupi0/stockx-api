const getAsks = require('./asks');

module.exports = async (bearer, customerId, options) => {
    const asks = await getAsks(bearer, customerId, options);
        
    return asks;
};