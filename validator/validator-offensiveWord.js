const ValidatorCheckOffensiveWord = {};

ValidatorCheckOffensiveWord.check = (word, offensivewords) => {
    const words = word.toLowerCase().split(' ');
    let offensivesFound = [];
    offensivewords.map(item => {
        const isFound = words.includes(item.word.toLowerCase());
        if (isFound) {
            offensivesFound = [...offensivesFound, item];
        }
    })
    return offensivesFound;
 
}

module.exports=  ValidatorCheckOffensiveWord;

