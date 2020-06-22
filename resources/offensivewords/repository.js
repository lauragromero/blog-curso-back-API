
const OffensiveWord = require('./model')

const OffensiveWordRepository = {};

OffensiveWordRepository.getAll = async () => {
    try {
        return await OffensiveWord.find({}).select({ __v:0});
    }catch(err) {
        console.log(err);
    }
}

OffensiveWordRepository.addOffensiveWord = async (offensiveWord) => {
    const newOffensiveWord = new OffensiveWord(offensiveWord);
    return await newOffensiveWord.save();
}

OffensiveWordRepository.updateOffensiveWord = async (id, offensiveWord) => {
    try {
        let offensiveWordUpdate = await OffensiveWord.findByIdAndUpdate(id, offensiveWord, {new: true});
        return offensiveWordUpdate;   
    } catch (err) {
        console.log(err);
    }
}

OffensiveWordRepository.deleteOffensiveWord = async (id) => {
    try {
        let offensiveWordDelete = await OffensiveWord.findByIdAndDelete(id);
        return offensiveWordDelete;
    } catch (err) {
        console.log(err);
    }
}


module.exports= OffensiveWordRepository;