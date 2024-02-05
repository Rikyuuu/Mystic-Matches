import Image from 'next/image'

interface CardProps {
    // Chemin du fichier d'image (recto ou verso de la carte)
    imagePath: string
    // Indique si la carte est retournée
    isFlipped: boolean
    // Indique si la carte forme une paire
    isPaired: boolean
    // Fonction qui est appelée lors du clique sur la carte
    onClick: () => void
}

const Card = ({ imagePath, isFlipped, isPaired, onClick }: CardProps) => {
    return (
        <div
            className={`card ${isFlipped ? 'flipped' : ''} ${
                isPaired ? 'paired' : ''
            } hover:cursor-pointer`}
            onClick={!isFlipped ? onClick : undefined}
        >
            <Image
                src={
                    isFlipped || isPaired
                        ? imagePath
                        : '/img/verso-removebg.png'
                }
                alt='Card'
                width={200}
                height={200}
            />
            {/* <div className='flex justify-center'>{isFlipped ? value : '?'}</div> */}
        </div>
    )
}

export default Card
