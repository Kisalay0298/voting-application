const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/votingApp')
        .then(()=> console.log("MongoDB Connected"))
    }catch(err){
        console.log('Oops! something went wrong..');
        console.error(err);
    }
}

module.exports = connect;