const getProfile = require('./profile');

module.exports = async (bearer, options) => {
    const profile = await getProfile(bearer, options);
        
    return profile;
};