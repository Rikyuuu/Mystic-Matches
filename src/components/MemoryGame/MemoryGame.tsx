'use client'
import Image from 'next/image'
import GameBoard, { GameStateEnum } from '../GameBoard/GameBoard'
import React, { useState } from 'react'

const DELAY_START_MESSAGE_SHOWED = 4000

const MemoryGame = () => {
    const [gameState, setGameState] = useState<GameStateEnum>(
        GameStateEnum.NOT_STARTED
    )
    const [startMessage, setStartMessage] = useState<{
        value: string
        showed: boolean
    }>({
        value: "C'est paaaaarti !",
        showed: true,
    })
    const [endMessage, setEndMessage] = useState<{
        value: string
        showed: boolean
    }>({
        value: 'GG !',
        showed: false,
    })
    // Nombre de retournements de cartes
    const [countFlip, setCountFlip] = useState<number>(0)

    // Nombre de paires de cartes à trouver
    const totalPairs = 2

    const handleCountFlip = (newCount: number) => {
        setEndMessage((previousEndMessage) => ({
            ...previousEndMessage,
            showed: true,
        }))
        setCountFlip(newCount)
    }

    const handleStartGame = () => {
        handleChangeGameState(GameStateEnum.IN_PROGRESS)
        setTimeout(() => {
            setStartMessage((previousStartMessage) => ({
                ...previousStartMessage,
                showed: false,
            }))
        }, DELAY_START_MESSAGE_SHOWED)
    }

    // Fonction appelée pour changer l'état du jeu
    const handleChangeGameState = (newGameState: GameStateEnum) => {
        setGameState(newGameState)
    }

    return (
        <>
            {gameState === GameStateEnum.NOT_STARTED && (
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
            {gameState !== GameStateEnum.NOT_STARTED && (
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

                    <GameBoard
                        gameState={gameState}
                        totalPairs={totalPairs}
                        onCountFlipChange={handleCountFlip}
                        onChangeGameState={handleChangeGameState}
                    />

                    {gameState === GameStateEnum.FINISHED &&
                        endMessage.showed && (
                            <div className='flex flex-col items-center mt-8 opacity-80'>
                                <div>
                                    <p>
                                        {endMessage.value} Tu as terminé le jeu,
                                        avec {countFlip} retournements de
                                        cartes.
                                    </p>
                                </div>
                            </div>
                        )}
                </>
            )}
        </>
    )
}

export default MemoryGame
