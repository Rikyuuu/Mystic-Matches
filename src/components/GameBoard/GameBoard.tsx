'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { formatTime } from '@/lib/utils/format-time.utils'

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
    // Temps écoulé en secondes
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    // Temps initial
    const [startTime, setStartTime] = useState<number>(0)

    useEffect(() => {
        // Création des paires de cartes avec les chemins d'accès aux images
        const initialCards = Array.from(
            { length: totalPairs * 2 },
            (_, index) => ({
                id: index,
                // Le math floor permet de garantir que les paires d'images ont des indices voisins (j'ajoute 1 juste pour commencer à 1 et pas à 0)
                imagePath: `/img/recto/LoL/flipped-${
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

    useEffect(() => {
        // Variable pour stocker l'ID de la requête d'animation
        let requestId: number

        // Fonction de mise à jour du temps écoulé
        const updateElapsedTime = () => {
            // Obtient le temps actuel en millisecondes
            const currentTime = Date.now()

            // Calcule le temps écoulé en millisecondes
            const elapsedMilliseconds = currentTime - startTime

            // Met à jour l'état avec le temps écoulé
            setElapsedTime(elapsedMilliseconds)

            // Programme la prochaine mise à jour en utilisant requestAnimationFrame
            requestId = requestAnimationFrame(updateElapsedTime)
        }

        // Démarrage de l'animation
        if (startTime === 0) {
            // Si startTime est à zéro (donc si c'est la première exécution), met à jour startTime avec l'heure actuelle
            setStartTime(Date.now())
        }

        // Démarre l'animation en appelant la fonction de mise à jour
        requestId = requestAnimationFrame(updateElapsedTime)

        // Nettoyage à la fin ou lorsqu'il y a des changements dans startTime
        return () => {
            // Annule l'animationFrame pour arrêter l'animation
            cancelAnimationFrame(requestId)
        }
    }, [startTime, setElapsedTime])

    // Effet séparé pour réinitialiser le temps écoulé à la fin
    useEffect(() => {
        return () => {
            // Réinitialise le temps écoulé à zéro
            setElapsedTime(0)
        }
    }, [])

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
            <div className='flex justify-center mb-4'>
                Temps écoulé : {formatTime(elapsedTime)}
            </div>

            <div className='flex justify-around'>
                <div className='grid grid-cols-4 gap-4'>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            imagePath={card.imagePath}
                            isFlipped={card.isFlipped}
                            isPaired={card.isPaired}
                            onClick={() => handleCardClick(card)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default GameBoard
