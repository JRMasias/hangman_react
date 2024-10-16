export class Alphabet {
    letter: string;
    guess: number;

    constructor(letter: string, guess: number) {
        this.letter = letter;
        this.guess = guess;
    }

    setGuess(guess: number) { this.guess = guess; }
    getGuess() { return this.guess };
    getLetter() { return this.letter };
}

export const alphabet = [
    new Alphabet("a", 0),
    new Alphabet("b", 0),
    new Alphabet("c", 0),
    new Alphabet("d", 0),
    new Alphabet("e", 0),
    new Alphabet("f", 0),
    new Alphabet("g", 0),
    new Alphabet("h", 0),
    new Alphabet("i", 0),
    new Alphabet("j", 0),
    new Alphabet("k", 0),
    new Alphabet("l", 0),
    new Alphabet("m", 0),
    new Alphabet("n", 0),
    new Alphabet("o", 0),
    new Alphabet("p", 0),
    new Alphabet("q", 0),
    new Alphabet("r", 0),
    new Alphabet("s", 0),
    new Alphabet("t", 0),
    new Alphabet("u", 0),
    new Alphabet("v", 0),
    new Alphabet("w", 0),
    new Alphabet("x", 0),
    new Alphabet("y", 0),
    new Alphabet("z", 0),
];