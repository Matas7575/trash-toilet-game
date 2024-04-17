"use client";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { DataType, notToilet, toilet } from "./data";
// @ts-ignore
import useSound from "use-sound";
// @ts-ignore
import ding from "../sounds/ding.mp3";
// @ts-ignore
import bruh from "../sounds/bruh.mp3";
import rizz from "../sounds/rizz.mp3";
import toiletImage from "../public/images/spiningToilet.gif";
import trashCanImage from "../public/images/trashCan.gif";


const toiletItems: DataType[] = toilet;
const notToiletItems: DataType[] = notToilet;
const allItems: DataType[] = [...toiletItems, ...notToiletItems];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const [playDing] = useSound(ding);
  const [playBruh] = useSound(bruh);
  const [playRizz] = useSound(rizz);

  console.log("trashcanImage", trashCanImage)

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * allItems.length));
  }, []);

  useEffect(() => {
    if (score > Number(highScore)) {
      setHighScore(score);
      if (typeof window !== "undefined") {
        localStorage.setItem("highScore", score.toString());
      }
    }
  }, [score]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHighScore(Number(localStorage.getItem("highScore")) || 0);
    }
  }, []);

  useEffect(() => {
    if (score === 10) {
      playRizz();
    }
  }, [score]);

  const handlers = useSwipeable({
    //Swiped left so to the toilet
    onSwipedLeft: () => goToNextTrash(false),

    //Swiped right so to the trashcna
    onSwipedRight: () => goToNextTrash(true),
  });

  const goToNextTrash = (swipedRight: boolean) => {
    const currentItem = allItems[currentIndex];
    const isToiletItem = toiletItems.includes(currentItem);
    const wasCorrect =
      (!swipedRight && isToiletItem) || (swipedRight && !isToiletItem);

    setIsCorrect(wasCorrect);

    console.log("swiped right: ", swipedRight);
    console.log("item was: ", currentItem, "was correct: ", wasCorrect);

    if (wasCorrect) {
      setScore((prevScore) => prevScore + 1);
      playDing();
    } else {
      setScore(0);
      playBruh();
    }

    const nextIndex = Math.floor(Math.random() * allItems.length); // Get a random index
    setCurrentIndex(nextIndex); // Go to next trash item or loop back
  };

  return (
    <div {...handlers} className="game-container">
      <h1>Trash Game</h1>
      <h2>High Score: {highScore}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img className="toiletImage" src={toiletImage.src} alt="Toilet" />

        <div
          className={`trash-item ${isCorrect ? "correctGuess" : "wrongGuess"}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {allItems[currentIndex].name}
          <img
            className="itemIcon"
            src={allItems[currentIndex].image}
            alt="icon for item"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}
          />
        </div>
        <img
          className="trashCanImage"
          src={trashCanImage.src}
          alt="Trash can"
        />
      </div>
      <div
        className="score"
        style={{ animation: isCorrect ? "score-increase 1s" : "" }}
      >
        Score: {score >= 10 ? "🔥" : ""} {score} {score >= 10 ? "🔥" : ""}
      </div>
      <p>
        Icons by :{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </p>
    </div>
  );
}
