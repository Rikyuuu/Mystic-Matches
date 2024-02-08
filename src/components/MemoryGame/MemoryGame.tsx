'use client'
import Image from 'next/image'
import GameBoard from '../GameBoard/GameBoard'
import React, { useEffect, useState } from 'react'

const DELAY_START_MESSAGE_SHOWED = 4000

const MemoryGame = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [startMessage, setStartMessage] = useState<{
        value: string
        showed: boolean
    }>({
        value: "C'est paaaaarti !",
        showed: true,
    })
    const totalPairs = 4 // On choisi le nombre total de paires de cartes

    const handleStartGame = () => {
        setGameStarted(true)
        setTimeout(() => {
            setStartMessage((prev) => ({ ...prev, showed: false }))
        }, DELAY_START_MESSAGE_SHOWED)
    }

    return (
        <>
            {!gameStarted && (
                <div className='flex flex-col justify-center items-center text-2xl my-20 opacity-80'>
                    <div>
                        <h1 className='mb-4'>Ceci est un jeu de mémoire.</h1>
                        <p>
                            Retournez les cartes pour trouver la paire
                            identique.
                        </p>
                        <p>
                            Moins vous faites de mouvements, plus vous gagnez de
                            points.
                        </p>
                        <p>
                            L'objectif est de trouver toutes les paires le plus
                            rapidement possible <br /> ou avec le moins de
                            tentative possible.
                        </p>
                        <p>Vous êtes prêt ?</p>
                        <p>Alors commençons !</p>
                        <button
                            className='w-1/4 mt-4 border-2 border-sky-300 rounded-md bg-sky-700'
                            onClick={handleStartGame}
                        >
                            Jouer
                        </button>
                    </div>
                </div>
            )}
            {gameStarted && (
                <>
                    <div className='flex justify-center mb-8'>
                        <Image
                            src='/img/logo-removebg.png'
                            alt={'Logo du jeu League of Memory'}
                            width={200}
                            height={200}
                        />
                    </div>
                    {startMessage.showed && (
                        <div className='flex justify-center mb-8'>
                            <p className='animated-message'>
                                {startMessage.value}
                            </p>
                        </div>
                    )}
                    <div className='flex justify-around'>
                        <div className='grid grid-cols-4 gap-4'>
                            <GameBoard totalPairs={totalPairs} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default MemoryGame
