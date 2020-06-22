const OffensiveWordRepository = require('../resources/offensivewords/repository');

const defaultOffensiveWords = async () => {
    try {
        const offensiveWords = await OffensiveWordRepository.getAll();
        if (offensiveWords.length === 0) {
            OffensiveWordRepository.addOffensiveWord({ word: 'Idiota', level: 3 });
            OffensiveWordRepository.addOffensiveWord({ word: 'Inutil', level: 2 });
            OffensiveWordRepository.addOffensiveWord({ word: 'Imbecil', level: 5 });
            console.info('Default offensive words list has been inserted.');
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = defaultOffensiveWords;