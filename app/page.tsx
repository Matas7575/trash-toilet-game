// pages/index.js
'use client'
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const trashItems = [
  { id: 1, name: 'Plastic Bottle', type: 'recycling' },
  { id: 2, name: 'Banana Peel', type: 'compost' },
  // Add more items here
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextTrash(false),
    onSwipedRight: () => goToNextTrash(true),
  });

  const goToNextTrash = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1); // Increment score if correct
    const nextIndex = currentIndex + 1 < trashItems.length ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex); // Go to next trash item or loop back
  };

  return (
    <div {...handlers} className="game-container">
      <h1>Trash Game</h1>
      <div className="trash-item">
        {trashItems[currentIndex].name}
      </div>
      <div>Score: {score}</div>
    </div>
  );
}
