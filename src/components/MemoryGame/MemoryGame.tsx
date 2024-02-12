'use client'
import Image from 'next/image'
import GameBoard from '../GameBoard/GameBoard'
import React, { useEffect, useRef, useState } from 'react'
import GameStateEnum from '@/interfaces/gameStateEnum'
import DifficultyLevelEnum from '@/interfaces/difficultyLevel'

const DELAY_START_MESSAGE_SHOWED = 4000

const MemoryGame = () => {
    const [gameState, setGameState] = useState<GameStateEnum>(
        GameStateEnum.NOT_STARTED
    )

    // Niveau de difficulté à "moye" par défaut
    const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelEnum>(
        DifficultyLevelEnum.MEDIUM
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

    const [hoveredButton, setHoveredButton] = useState<
        DifficultyLevelEnum | undefined
    >(undefined)

    // Nombre de paires de cartes à trouver
    // const [totalPairs, setTotalPairs] = useState<number>(4)

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

    const handleChangeDifficultyLevel = (difficulty: DifficultyLevelEnum) => {
        setDifficultyLevel(difficulty)
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

                        <div className='flex flex-col items-center mt-8'>
                            <button
                                className={`${
                                    difficultyLevel === DifficultyLevelEnum.EASY
                                        ? 'flex justify-between'
                                        : 'hover:flex hover:justify-center'
                                }  w-1/2 mt-4 border-2 border-green-300 rounded-md bg-green-200 text-green-700 game-menu-button-animation`}
                                onClick={() =>
                                    handleChangeDifficultyLevel(
                                        DifficultyLevelEnum.EASY
                                    )
                                }
                                onMouseEnter={() =>
                                    setHoveredButton(DifficultyLevelEnum.EASY)
                                }
                                onMouseLeave={() => setHoveredButton(undefined)}
                            >
                                {difficultyLevel !== DifficultyLevelEnum.EASY &&
                                    hoveredButton ===
                                        DifficultyLevelEnum.EASY && (
                                        <i className='ri-skip-right-line scroll-left'></i>
                                    )}
                                {difficultyLevel ===
                                    DifficultyLevelEnum.EASY && (
                                    <i className='ri-arrow-right-wide-line'></i>
                                )}
                                Facile{' '}
                                {difficultyLevel ===
                                    DifficultyLevelEnum.EASY && (
                                    <i className='ri-arrow-left-wide-line'></i>
                                )}
                                {difficultyLevel !== DifficultyLevelEnum.EASY &&
                                    hoveredButton ===
                                        DifficultyLevelEnum.EASY && (
                                        <i className='ri-skip-left-line scroll-right'></i>
                                    )}
                            </button>
                            <button
                                className={`${
                                    difficultyLevel ===
                                    DifficultyLevelEnum.MEDIUM
                                        ? 'flex justify-between'
                                        : 'hover:flex hover:justify-center'
                                } w-1/2 mt-4 border-2 border-yellow-300 rounded-md bg-yellow-200 text-yellow-700 game-menu-button-animation`}
                                onClick={() =>
                                    handleChangeDifficultyLevel(
                                        DifficultyLevelEnum.MEDIUM
                                    )
                                }
                                onMouseEnter={() =>
                                    setHoveredButton(DifficultyLevelEnum.MEDIUM)
                                }
                                onMouseLeave={() => setHoveredButton(undefined)}
                            >
                                {difficultyLevel !==
                                    DifficultyLevelEnum.MEDIUM &&
                                    hoveredButton ===
                                        DifficultyLevelEnum.MEDIUM && (
                                        <i className='ri-skip-right-line scroll-left'></i>
                                    )}
                                {difficultyLevel ===
                                    DifficultyLevelEnum.MEDIUM && (
                                    <i className='ri-arrow-right-wide-line'></i>
                                )}
                                Moyen
                                {difficultyLevel ===
                                    DifficultyLevelEnum.MEDIUM && (
                                    <i className='ri-arrow-left-wide-line'></i>
                                )}
                                {difficultyLevel !==
                                    DifficultyLevelEnum.MEDIUM &&
                                    hoveredButton ===
                                        DifficultyLevelEnum.MEDIUM && (
                                        <i className='ri-skip-left-line scroll-right'></i>
                                    )}
                            </button>
                            <button
                                className={`${
                                    difficultyLevel === DifficultyLevelEnum.HARD
                                        ? 'flex justify-between'
                                        : 'hover:flex hover:justify-center'
                                }  w-1/2 mt-4 border-2 border-red-300 rounded-md bg-red-200 text-red-700 game-menu-button-animation`}
                                onClick={() =>
                                    handleChangeDifficultyLevel(
                                        DifficultyLevelEnum.HARD
                                    )
                                }
                                onMouseEnter={() =>
                                    setHoveredButton(DifficultyLevelEnum.HARD)
                                }
                                onMouseLeave={() => setHoveredButton(undefined)}
                            >
                                {difficultyLevel !== DifficultyLevelEnum.HARD &&
                                    hoveredButton ===
                                        DifficultyLevelEnum.HARD && (
                                        <i className='ri-skip-right-line scroll-left'></i>
                                    )}
                                {difficultyLevel ===
                                    DifficultyLevelEnum.HARD && (
                                    <i className='ri-arrow-right-wide-line'></i>
                                )}
                                Difficile
                                {difficultyLevel ===
                                    DifficultyLevelEnum.HARD && (
                                    <i className='ri-arrow-left-wide-line'></i>
                                )}
                                {difficultyLevel !== DifficultyLevelEnum.HARD &&
                                    hoveredButton ===
                                        DifficultyLevelEnum.HARD && (
                                        <i className='ri-skip-left-line scroll-right'></i>
                                    )}
                            </button>

                            <button
                                className='w-1/2 mt-12 border-2 border-sky-300 rounded-md bg-sky-700 game-menu-button-animation'
                                onClick={handleStartGame}
                            >
                                Jouer
                            </button>
                        </div>
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
                        totalPairs={difficultyLevel}
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
