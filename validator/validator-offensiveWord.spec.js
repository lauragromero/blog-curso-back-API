const ValidatorCheckOffensiveWord = require('./validator-offensiveWord');


describe('Chek offensive words', () => {
    it('case 1', () => {
        const comment = 'esto es una caca'
        const offensiveDB =[
            {word: 'Caca', level: 1}
        ];;
         const foundOffensiveWord = ValidatorCheckOffensiveWord.check(comment, offensiveDB)
        expect(foundOffensiveWord.length).toBe(1);
    })
    it('case 2', () => {
        const comment = 'esto es una caca'
        const offensiveDB =[];
        const foundOffensiveWord = ValidatorCheckOffensiveWord.check(comment, offensiveDB)
        expect(foundOffensiveWord.length).toBe(0);
    })
    it('case 3', () => {
        const comment = 'esto es una maravilla'
        const offensiveDB =[
            {word: 'caca', level: 1}
        ];;
         const foundOffensiveWord = ValidatorCheckOffensiveWord.check(comment, offensiveDB)
        expect(foundOffensiveWord.length).toBe(0);
    })
})