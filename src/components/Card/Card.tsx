import Image from 'next/image'
import React from 'react'

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
    // Fonction qui est appelée lors du clique sur la carte
    onClick: () => void
}

const Card = ({
    imagePath,
    isFlipping,
    isFlippingBack,
    isFlipped,
    isPaired,
    onClick,
}: CardProps) => {
    return (
        <div
            className={`${isFlipping ? 'animate-flip' : ''} ${
                isFlippingBack ? 'animate-reverse-flip' : ''
            } ${isFlipped ? 'animate-flip' : 'animate-reverse-flip'} ${
                isPaired ? 'opacity-60' : 'hover:cursor-pointer'
            }`}
            onClick={!isFlipped ? onClick : undefined}
        >
            <Image
                src={
                    isFlipped || isPaired
                        ? imagePath
                        : '/img/riven-card-back.png'
                }
                alt='Card'
                width={224}
                height={224}
                sizes='width: 14rem auto, height: 14rem auto'
                priority={true}
                // className='w-auto h-auto max-w-56 max-h-56'
            />
        </div>
    )
}

export default Card
