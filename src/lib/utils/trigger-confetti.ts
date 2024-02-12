import confetti from 'canvas-confetti'

// Durée de l'animation des confettis en millisecondes
export const CONFETTIS_DURATION = 10000

export const confettiDefaultOptions: confetti.Options = {
    particleCount: 100, // Nombre de confettis
    startVelocity: 30, // Vitesse initiale
    spread: 360, // Ecartement en degré des confettis autour de l'angle specifié
    ticks: 60, // Durée de vie en ticks d'un confetti =>  1 tick = une unité de temps en animation
    origin: {
        x: Math.random(),
        y: -0.1, // Partir du haut de la fenêtre
    },
}

/**
 * Fonction qui génère un nombre aléatoire dans une plage donnée en spécifiant la
 * valeur minimale (min) et la valeur maximale (max).
 *
 * @param min La valeur minimale de l'intervalle
 * @param max La valeur maximale de l'intervalle
 * @returns Un nombre aléatoire dans l'intervalle spécifié
 *
 */
export const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

/**
 * Fonction qui appel la librairie canvas-confetti pour déclencher une pluie de confettis avec les options définies
 * dans le paramètre confettiOptions et selon la durée établie par confettiDuration
 *
 * @param confettiOptions Les options personnalisées des confettis (optionnel)
 * @param confettiDuration La durée (en ms) personnalisée des confettis (optionnel) par défaut 10 secondes
 */
export const triggerConfetti = (
    confettiOptions: confetti.Options = confettiDefaultOptions,
    confettiDuration: number = CONFETTIS_DURATION
) => {
    confetti(confettiOptions)

    // Permet de nettoyer les confettis après la durée spécifiée par CONFETTIS_DURATION
    setTimeout(() => {
        confetti.reset()
    }, CONFETTIS_DURATION)
}
