'use client';

import Image, { StaticImageData } from "next/image";
import { images } from "@/components/images";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { Alphabet, alphabet } from "@/components/alphabet";
import { Button } from "@/components/ui/button";
import { level_3_words, level_1_words, level_2_words } from "@/components/words";
import GameOver from "@/components/gameOver";
import Winner from "@/components/winner";


const rand = Math.floor(Math.random() * level_1_words.length);
const word = level_1_words[rand].toLowerCase();
const wordLength = word.length;

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [roundsLeft, setRoundsLeft] = useState<number>(10);
  const [hangImage, setHangImage] = useState<StaticImageData[]>(images);
  const [hangIndex, setHangIndex] = useState<number>(0);
  const [alphaButtons, setAlphaButtons] = useState<Alphabet[]>(alphabet);
  const [points, setPoints] = useState<number>(0);
  const [blankSpaces, setBlankSpaces] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<number>(0);
  const [check, setCheck] = useState<number>(1);

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  let winRef = useRef(blankSpaces);
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  useEffect(() => {
    setIsClient(true);
    let setupBlankSpaces = [];

    for (let i = 0; i < wordLength; i++) {
      setupBlankSpaces.push("");
    }

    setBlankSpaces(setupBlankSpaces);
  }, [alphaButtons]);

  function handleWin() {
    let result = false;
    let newCheck = 0;

    for (let i = 0; i < wordLength; i++) {
      if (word[i] == winRef.current[i]) {
        newCheck++;
        setCheck(newCheck);
      }

      if (newCheck == wordLength) {
        setGameOver(1);
      }
    }

    return result;
  }

  function handleGuess(guess: Alphabet, index: number) {
    let guesses = alphaButtons;
    let currPoints = points;
    let imageIndex = hangIndex;
    let newRoundsRemaining = roundsLeft;

    // the guess is correct
    if (word.includes(guess.getLetter())) {

      // update points
      currPoints++;
      setPoints(currPoints);

      // call function that handles asterisks
      handleBlankSpaces(guess.getLetter());

      // update buttons to reflect right guess
      const newGuess = new Alphabet(guess.getLetter(), 1);
      guesses[index] = newGuess;
      setAlphaButtons(guesses);
    } else {
      // the guess is incorrect

      // decrease points
      currPoints--;
      setPoints(currPoints);

      // increase image index
      if (imageIndex < 10) {
        imageIndex++;
        setHangIndex(imageIndex);
      }

      // decrease tries remaining
      if (newRoundsRemaining > 0) {
        newRoundsRemaining--;
        setRoundsLeft(newRoundsRemaining);
      }

      const newGuess = new Alphabet(guess.getLetter(), -1);
      guesses[index] = newGuess;
      setAlphaButtons(guesses);
    }

    // check to see if game is over
    if (newRoundsRemaining <= 0) {
      setTimeout(() => {
        setGameOver(-1);
      }, 100);
    } else {
      // if all the blank spaces have been filled the game is won
      if (handleWin()) {
      }
    }
  }

  function handleBlankSpaces(guess: string) {
    let newBlanks = [...blankSpaces];

    for (let i = 0; i < wordLength; i++) {
      if (word[i] == guess) {
        newBlanks[i] = guess;
      }
    }

    winRef.current = newBlanks;
    setBlankSpaces(newBlanks);
  }

  console.log(word);

  return (
    !isClient ? <main></main> :
      <main className="flex flex-col justify-center items-center py-10 px-10 md:py-14 md:px-32 xl:py-20 xl:px-52 2xl:px-96 max-h-screen">
        {gameOver == -1 ? <GameOver /> : ""}
        {gameOver == 1 ? <Winner points={points} /> : ""}
        <h1 className="text-4xl sm:text-5xl text-blue-600">Hangman</h1>
        <p className="pt-2 text-sm text-red-600">Tries remaining: {roundsLeft}</p>
        <p className="pt-2 text-sm text-yellow-600">Points: {points}</p>
        <Image src={hangImage[hangIndex]} alt="hangman" className="pt-5 lg:max-w-[520px]" priority />

        <div className="flex justify-evenly items-center w-full pt-5">
          {blankSpaces.map((letter, index) => {
            return (
              <p key={index} className={clsx(`text-2xl border-b-2 md:border-b-4 xl:border-b-8 border-green-800 text-center text-green-600`, wordLength > 10 ? "w-2 md:w-7 xl:w-14 text-xl md:text-3xl xl:text-5xl" : "w-5 md:w-10 xl:w-20 md:text-3xl xl:text-5xl")}>{letter ? letter : "*"}</p>
            );
          })}
        </div>

        <div className="grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 w-full gap-5 pt-10">
          {alphaButtons.map((a, index) => {
            return (
              <Button key={index} onClick={() => a.getGuess() == 0 ? handleGuess(a, index) : undefined}
                className={clsx("font-bold md:text-xl 2xl:text-2xl", a.getGuess() == 0 ? "bg-blue-900 hover:bg-blue-700" : a.getGuess() == 1 ? "bg-green-800 hover:bg-green-800" : "bg-red-800 hover:bg-red-800")}>
                {a.getLetter()}
              </Button>);
          })}
        </div>
      </main >
  );
}


/*
* 
* Make a UI where the user can choose the level before playing.
* Incorporate a database where a user can sign up, login, and their highscore gets saved
* 
* Incorporate an admin panel that allows teachers to add/use their own vocabulary, and view student's scores
* 
*/