
const OffensiveWordRepository = require('./repository'); 

const OffensiveWordService = {};

OffensiveWordService.getAll = async () => {
    try {
        return await OffensiveWordRepository.getAll();   
    } catch (err) {
        console.log(err);
    }
}


OffensiveWordService.addOffensiveWord = async (offensiveWords) => {
    try {
        return await OffensiveWordRepository.addOffensiveWord(offensiveWords);
    } catch (err) {
        console.log(err);
    }
}

OffensiveWordService.updateOffensiveWord = async (id, offensiveWords) => {
    try {
        return await OffensiveWordRepository.updateOffensiveWord(id, offensiveWords);
    } catch (err) {
        console.log(err);
    }
}

OffensiveWordService.deleteOffensiveWord = async (id) => {
    try{
        return await OffensiveWordRepository.deleteOffensiveWord(id);
    }catch(err){
        console.log(err);
    }
}


module.exports=  OffensiveWordService;