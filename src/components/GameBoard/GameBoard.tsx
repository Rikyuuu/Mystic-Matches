'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'

interface GameBoardProps {
    totalPairs: number
}

interface CardType {
    id: number
    imagePath: string
    isFlipping: boolean
    isFlippingBack: boolean
    isFlipped: boolean
    isPaired: boolean
}

export enum GameStateEnum {
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}

const DELAY_BEFORE_CHECKING_PAIRS = 700
const DELAY_BEFORE_FLIPPING_BACK = 10

const GameBoard = ({ totalPairs }: GameBoardProps) => {
    // Stocke les cartes du jeu
    const [cards, setCards] = useState<
        Array<{
            id: number
            imagePath: string
            isFlipping: boolean
            isFlippingBack: boolean
            isFlipped: boolean
            isPaired: boolean
        }>
    >([])
    // Etat qui indique si la vérification des cartes est en cours
    const [isChecking, setIsChecking] = useState<boolean>(false)
    const [gameState, setGameState] = useState<GameStateEnum>(
        GameStateEnum.IN_PROGRESS
    )

    useEffect(() => {
        // Création des paires de cartes avec les chemins d'accès aux images
        const initialCards = Array.from(
            { length: totalPairs * 2 },
            (_, index) => createCard(index)
        )

        // Mélange des cartes
        const shuffledCards = initialCards.sort(() => Math.random() - 0.5)

        // Mise à jour de l'état avec les cartes mélangées
        setCards(shuffledCards)
    }, [totalPairs])

    /**
     * Méthode permettant de créer une carte
     * @param index Index de la carte
     * @returns Une carte
     */
    const createCard = (index: number): CardType => ({
        id: index,
        imagePath: `/img/recto/LoL/flipped-${Math.floor(index / 2) + 1}.png`,
        isFlipping: false, // Indique si la carte est entrain de se retourner vers le recto
        isFlippingBack: false, // Indique si la carte est entrain de se retourner vers le verso
        isFlipped: false, // Indique si la carte est retournée
        isPaired: false, // Indique si la carte forme une paire
    })

    const handleCardClick = (clickedCard: {
        id: number
        imagePath: string
        isFlipping: boolean
        isFlipped: boolean
        isPaired: boolean
    }) => {
        // ischecking => Empêche le clique si la vérification des cartes est en cours.
        // clickedCard.isFlipped => Vérifie également si la carte est déjà retournée.
        // clickedCard.isPaired => Vérifie également si la carte est déjà appariée.
        // Si l'une de ces conditions est vraie, on s'arrête et on ne fait rien.
        if (isChecking || clickedCard.isFlipped || clickedCard.isPaired) {
            return
        }

        // Déclenche l'animation verso du retournement de carte vers le recto avant que isFlipped soit mis à true
        const updatedIsInFlippingCards = cards.map((card) =>
            card.id === clickedCard.id ? { ...card, isFlipping: true } : card
        )
        setCards(updatedIsInFlippingCards)

        setTimeout(() => {
            // Passe l'état du retournement de la carte cliquée à true (isFlipped) et passe isFlipping à false pour mettre fin à l'animation du retournement verso
            // et activer la suite de l'animation, le retournement recto.
            const updatedCards = cards.map((card) =>
                card.id === clickedCard.id ? { ...card, isFlipped: true } : card
            )

            // Met à jour l'état avec les cartes retournées
            setCards(updatedCards)

            // Filtre les cartes retournées non appariées
            const flippedUnpairedCards = updatedCards.filter(
                (card) => card.isFlipped && !card.isPaired
            )

            // Si deux cartes retournées non appariées => vérifie si elles forment une paire
            if (flippedUnpairedCards.length === 2) {
                // Début de la vérification, empêche le clic pendant la vérification
                setIsChecking(true)

                setTimeout(() => {
                    // On vérifie les paires
                    checkForPairs(flippedUnpairedCards)
                    // Fin de la vérification, autorise les clics
                    setIsChecking(false)
                }, DELAY_BEFORE_CHECKING_PAIRS) // Attend un court délai avant de vérifier les paires
            }
        }, DELAY_BEFORE_FLIPPING_BACK) // Attend 10 ms avant de définir isFlipping à false
    }

    /**
     * Méthode permettant de vérifier si les deux cartes retournées forment une paire et met à jour l'état en conséquence.
     * @param flippedUnpairedCards Tableau contenant deux cartes retournées non appariées
     */
    const checkForPairs = (
        flippedUnpairedCards: Array<{
            id: number
            imagePath: string
            isFlipped: boolean
            isPaired: boolean
        }>
    ) => {
        // Extrait et stocke les deux cartes actuellement retournées pour les utiliser plus facilement
        const [firstCard, secondCard] = flippedUnpairedCards

        // Vérifie si les cartes retournées forment une paire
        if (firstCard.imagePath === secondCard.imagePath) {
            // Les cartes forment une paire, on les marques donc comme appariées
            const updatedCards = cards.map((card) =>
                card.id === firstCard.id || card.id === secondCard.id
                    ? { ...card, isFlipped: true, isPaired: true }
                    : card
            )
            setCards(updatedCards)

            checkGameIsFinished(updatedCards)
        } else {
            // Les cartes ne forment pas une paire, on met isFlippingBack à true pour déclencher l'animation du retournement face verso
            const updatedAnimationCards = cards.map((card) =>
                card.id === firstCard.id || card.id === secondCard.id
                    ? { ...card, isFlippingBack: true }
                    : card
            )

            setCards(updatedAnimationCards)

            setTimeout(() => {
                // Comme les cartes ne forment pas une paire et qu'on a attendu l'animation du retournement,
                // on les remet maintenant face verso après un court délai
                const resetFlippingStateCards = cards.map((card) =>
                    card.id === firstCard.id || card.id === secondCard.id
                        ? { ...card, isFlipped: false }
                        : card
                )
                setCards(resetFlippingStateCards)
            }, DELAY_BEFORE_FLIPPING_BACK) // Attend un court délai avant de remettre les cartes face verso
        }
    }

    // Vérifie si toutes les cartes sont appariées
    const checkGameIsFinished = (cardsToCheck) => {
        const isGameFinished = cardsToCheck.every((card) => card.isPaired)

        if (isGameFinished) {
            setGameState(GameStateEnum.FINISHED)
        }
    }

    return (
        <>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    imagePath={card.imagePath}
                    isFlipping={card.isFlipping}
                    isFlippingBack={card.isFlippingBack}
                    isFlipped={card.isFlipped}
                    isPaired={card.isPaired}
                    gameState={gameState}
                    onClick={() => handleCardClick(card)}
                />
            ))}
        </>
    )
}

export default GameBoard
