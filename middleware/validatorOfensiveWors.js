//const dotenv  = require ('dotenv');
const  OffensiveWordRepository = require ('../resources/offensivewords/repository');
const  ValidatorCheckOffensiveWord = require ('../validator/validator-offensiveWord');

//es el modulo validador de que no haya palabras ofenssivas en los comentarios, es que se va importar déspues a los controladores, para hacer el chequeo, esta función recibe la req, además se trae las palabras de la colleción ejecutando el get del repositorio

//const settings = dotenv.config();

//const OffensiveValidator = {};

async  function OffensiveValidator (req, res, next) {
    const comment = req.body;
    //me traigo las palabras de la base de datos
    const offensivewordsDB = await OffensiveWordRepository.getAll();
    //recorro esas palabras y voy fomando un objeto con la palabra y el nivel 
    const offensivewords = offensivewordsDB.map(item => {
        return { word: item.word, level: item.level }
    });

    const offensivewordsFound = ValidatorCheckOffensiveWord.check(comment.comment, offensivewords);
    if (offensivewordsFound.length === 0) {
        next();
    }else{
        const offensiveWord = offensivewordsFound.map(word => `La palabra ${word.word} no está permitida con nivel ${word.level}`);
        res.status(403).json({message: offensiveWord});
    }
    return offensivewordsFound;
}

module.exports =  OffensiveValidator;