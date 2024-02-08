import Image from 'next/image'
import React, { useEffect } from 'react'
import { GameStateEnum } from '../GameBoard/GameBoard'

interface CardProps {
    // Chemin du fichier d'image (recto ou verso de la carte)
    imagePath: string
    // Indique si la carte est entrain de se retourner face recto
    isFlipping: boolean
    // Indique si la carte est entrain de se retourner face verso
    isFlippingBack: boolean
    // Indique si la carte est retournée
    isFlipped: boolean
    // Indique si la carte forme une paire
    isPaired: boolean
    // Etat du jeu
    gameState: GameStateEnum
    // Fonction qui est appelée lors du clique sur la carte
    onClick: () => void
}

const Card = ({
    imagePath,
    isFlipping,
    isFlippingBack,
    isFlipped,
    isPaired,
    gameState,
    onClick,
}: CardProps) => {
    return (
        <div
            className={`${isFlipping ? 'animate-flip' : ''} ${
                isFlippingBack ? 'animate-reverse-flip' : ''
            } ${isFlipped ? 'animate-flip' : 'animate-reverse-flip'} ${
                isPaired ? '' : 'hover:cursor-pointer'
            } ${
                isPaired && gameState !== GameStateEnum.FINISHED && 'opacity-60'
            } ${
                gameState === GameStateEnum.FINISHED
                    ? 'opacity-100 animation-stack-in-line'
                    : ''
            } flex justify-center`}
            onClick={!isFlipped ? onClick : undefined}
        >
            <Image
                src={
                    isFlipped || isPaired
                        ? imagePath
                        : '/img/riven-card-back.png'
                }
                alt='Card'
                priority={true}
                width={`${isFlipped || isPaired ? 224 : 335}`}
                height={`${isFlipped || isPaired ? 224 : 335}`}
                // sizes='width: 14rem auto, height: 14rem auto'
                // className='w-auto h-auto max-w-56 max-h-56'
            />
        </div>
    )
}

export default Card
