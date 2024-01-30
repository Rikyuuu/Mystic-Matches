'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'

interface GameBoardProps {
    totalPairs: number
}

const GameBoard = ({ totalPairs }: GameBoardProps) => {
    // Stocke les cartes du jeu
    const [cards, setCards] = useState<
        Array<{
            id: number
            imagePath: string
            isFlipped: boolean
            isPaired: boolean
        }>
    >([])
    // Etat qui indique si la vérification des cartes est en cours
    const [isChecking, setIsChecking] = useState<boolean>(false)

    useEffect(() => {
        // Création des paires de cartes avec les chemins d'accès aux images
        const initialCards = Array.from(
            { length: totalPairs * 2 },
            (_, index) => ({
                id: index,
                imagePath: `/img/recto/flipped-${
                    Math.floor(index / 2) + 1
                }.png`,
                isFlipped: false, // Indique si la carte est retournée
                isPaired: false, // Indique si la carte forme une paire
            })
        )

        // Mélange des cartes
        const shuffledCards = initialCards.sort(() => Math.random() - 0.5)

        // Mise à jour de l'état avec les cartes mélangées
        setCards(shuffledCards)
    }, [totalPairs])

    const handleCardClick = (clickedCard: {
        id: number
        imagePath: string
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

        // Retourne la carte cliquée
        const updatedCards = cards.map((card) =>
            card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        )

        // Met à jour l'état avec les cartes retournées
        setCards(updatedCards)

        // Filtre les cartes retournées non appariées
        const flippedUnpairedCards = updatedCards.filter(
            (card) => card.isFlipped && !card.isPaired
        )

        // Si deux cartes retournées non appariées, vérifie si elles forment une paire
        if (flippedUnpairedCards.length === 2) {
            // Début de la vérification, empêche le clic pendant la vérification
            setIsChecking(true)

            setTimeout(() => {
                checkForPairs(flippedUnpairedCards)
                // Fin de la vérification, autorise les clics
                setIsChecking(false)
            }, 1000) // Attend un court délai avant de vérifier les paires
        }
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
                    ? { ...card, isPaired: true }
                    : card
            )
            setCards(updatedCards)
        } else {
            // Les cartes ne forment pas une paire, on les remet face verso
            const updatedCards = cards.map((card) =>
                card.id === firstCard.id || card.id === secondCard.id
                    ? { ...card, isFlipped: false }
                    : card
            )
            setCards(updatedCards)
        }
    }

    return (
        <>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    imagePath={card.imagePath}
                    isFlipped={card.isFlipped}
                    isPaired={card.isPaired}
                    onClick={() => handleCardClick(card)}
                />
            ))}
        </>
    )
}

export default GameBoard
