import Image from 'next/image'
import GameBoard from '../GameBoard/GameBoard'

const MemoryGame = () => {
    const totalPairs = 8 // On choisi le nombre total de paires de cartes

    return (
        <>
            <div className='flex justify-center mb-8'>
                <Image
                    src='/img/logo-removebg.png'
                    priority={true}
                    alt={'Logo du jeu League of Memory'}
                    width={200}
                    height={200}
                />
            </div>
            <div className='flex justify-around'>
                <div className='grid grid-cols-4 gap-4'>
                    <GameBoard totalPairs={totalPairs} />
                </div>
            </div>
        </>
    )
}

export default MemoryGame
