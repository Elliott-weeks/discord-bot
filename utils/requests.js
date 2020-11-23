const axios = require("axios").default;

 const getRequest = async function(url, config){
    try {
        const response = await axios.get(url, config);
        return response.data;
        
    } catch (error) {
        console.error(error);
        
    }


}

module.exports = {getRequest}