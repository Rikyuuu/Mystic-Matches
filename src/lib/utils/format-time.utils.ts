/**
 * Formate le temps écoulé en millisecondes en une représentation sous forme de chaîne (MM:SS,SSS).
 * @param milliseconds Le temps écoulé en millisecondes.
 * @param showLastDigits Nombre de chiffres à afficher pour les millisecondes (3 ou 4).
 * @returns Une chaîne représentant le temps formaté au format MM:SS,SSS.
 */
export const formatTime = (
    milliseconds: number,
    showLastDigits: 3 | 4 = 3
): string => {
    // Calcule le total des secondes écoulées
    const totalSeconds = Math.floor(milliseconds / 1000)

    // Calcule le nombre de minutes et de secondes
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    // Extrait les derniers chiffres des millisecondes
    const lastDigits = milliseconds % 1000

    // Formate les millisecondes avec trois ou quatre chiffres
    const millisecondsString =
        showLastDigits === 3
            ? lastDigits.toString().padStart(3, '0')
            : lastDigits.toString().padStart(4, '0')

    // Retourne une chaîne de caractères formatée avec deux chiffres pour chaque partie du temps (MM:SS,SSS)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
    )},${millisecondsString}`
}
