import Image from 'next/image'
import GameBoard from '../GameBoard/GameBoard'

const MemoryGame = () => {
    const totalPairs = 8 // Le nombre total de paires de cartes

    return (
        <>
            <div className='flex justify-center my-8'>
                <Image
                    src='/img/memory-game-removebg.png'
                    priority={true}
                    alt={'Logo du jeu League of Memory'}
                    width={200}
                    height={200}
                />
            </div>

            <GameBoard totalPairs={totalPairs} />
        </>
    )
}

export default MemoryGame
