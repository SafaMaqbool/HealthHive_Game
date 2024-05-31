"use client"

import React, { useState, useEffect } from 'react';

const phrases = [
    "Emergency Ambulance",
    "Time for Help",
    "Call Ambulance Here",
    "Real-time Updates",
    "Fast Emergency Response",
    "Emergency Button",
    "Offline Accessibility",
    "Good Health and Well-being",
    "Sustainable Cities and Communities",
    "Partnership for Goals"
];

const emojiSets = [
    "🚨🏥🚑",
    "⏰🆘🚨",
    "📞🚑📍",
    "⏱🔄📊",
    "⚡️🚨🚀",
    "🚨🆘🔴",
    "📴📶💻",
    "❤️🏥🌱",
    "🏙️🌍💼",
    "🤝🎯📈"
];

const hints = [
    "Related to emergency services",
    "Indicates urgency",
    "Where to call for help",
    "Keeps you informed in real-time",
    "Responds quickly in emergencies",
    "Triggers immediate assistance",
    "Accessible even without internet",
    "Aims for better health and wellness",
    "Focuses on sustainable urban development",
    "Works towards achieving global goals"
];

const Home = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState('');
    const [hint, setHint] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [isTwoLiner, setIsTwoLiner] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        if (currentPhraseIndex >= phrases.length) {
            setGameOver(true);
        } else {
            setTimer(0);
            setIsTwoLiner(false);
        }
    }, [currentPhraseIndex]);

    const displayNextPhrase = () => {
        setCurrentPhraseIndex(currentPhraseIndex + 1);
        setHint('');
        setGuess('');
    };

    const checkGuess = () => {
        const correctPhrase = phrases[currentPhraseIndex].toLowerCase();
        if (guess.toLowerCase() === correctPhrase) {
            setScore(score + 10);
            displayNextPhrase();
            setIsTwoLiner(true);
        } else {
            setHint("Hint: " + hints[currentPhraseIndex]);
        }
    };

    const skipPhrase = () => {
        setCurrentPhraseIndex(currentPhraseIndex + 1);
        setHint('');
        setGuess('');
    };

    if (gameOver) {
        return (
            <div className="container mx-auto my-20">
                <h1 className="text-2xl font-bold mb-4">Game Over</h1>
                <p className="text-xl mb-4">Final Score: {score}</p>
                <p className="text-xl">Total Time: {timer} seconds</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-20">
            <h1 className="text-2xl font-bold mb-4">Emergency Emoji Challenge</h1>
            <div className="text-4xl mb-6">{emojiSets[currentPhraseIndex]}</div>
            <input
                type="text"
                className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-full"
                placeholder="Your Guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
            />
            <div className="flex mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={checkGuess}
                >
                    Submit
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={skipPhrase}
                >
                    Skip
                </button>
            </div>
            <p className="text-red-500 mt-2">{hint}</p>
            <p className="text-lg mt-4">Score: {score}</p>
            <div className="text-green-500 mt-4">
                {isTwoLiner && (
                    <>
                        <p>Congratulations! You guessed it right!</p>
                        <p>Move on to the next challenge.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
