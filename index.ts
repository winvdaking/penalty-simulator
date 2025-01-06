/**
 * Imports
 */
import type { Score } from "./src/types/Score";
import type { History } from "./src/types/History";
import type { Team } from "./src/types/Team";

/**
 * Simuler un tir au but
 */
export const simulerTir = (): boolean => Math.random() < 0.5;

/**
 * Mettre à jour le score
 */
export const mettreAJourScore = (score: Score, equipe: Team, resultat: boolean): Score => ({
    ...score,
    [equipe === "A" ? "teamA" : "teamB"]: score[equipe === "A" ? "teamA" : "teamB"] + (resultat ? 1 : 0),
});

/**
 * Ajouter à l'historique
 */
export const ajouterAHistorique = (historique: History, team: Team, scored: boolean): History => [
    ...historique,
    { team, scored },
];

/**
 * Vérifier si le jeu est décidé
 */
export const estJeuDecide = (score: Score, tirs: number): boolean => {
    const tirsRestants = 5 - tirs;
    return (
        (score.teamA > score.teamB + tirsRestants) ||
        (score.teamB > score.teamA + tirsRestants)
    );
};

/**
 * Afficher l'historique
 */
export const afficherHistorique = (historique: History, score: Score): void => {
    let scoreA = 0;
    let scoreB = 0;

    historique.forEach((entree, index) => {
        if (entree.team === "A" && entree.scored) {
            scoreA++;
        } else if (entree.team === "B" && entree.scored) {
            scoreB++;
        }
        console.log(
            `Tir ${index + 1} : Score : ${scoreA}/${scoreB} (Équipe ${entree.team
            } : ${entree.scored ? "+1" : "0"})`
        );
    });

    console.log(
        `Victoire : ${score.teamA > score.teamB ? "Équipe A" : "Équipe B"
        } (Score : ${score.teamA}/${score.teamB})`
    );

};

/**
 * Fonction récursive pour simuler la séance de tirs au but
 */
export const seanceTirsAuBut = (
    score: Score,
    historique: History,
    tirs: number
): void => {
    if (tirs >= 5 && Math.abs(score.teamA - score.teamB) > 0) {
        afficherHistorique(historique, score);
        return;
    }

    const equipe: Team = tirs % 2 === 0 ? "A" : "B";
    const resultat = simulerTir();
    const nouveauScore = mettreAJourScore(score, equipe, resultat);
    const nouvelHistorique = ajouterAHistorique(historique, equipe, resultat);

    if (estJeuDecide(nouveauScore, tirs + 1)) {
        afficherHistorique(nouvelHistorique, nouveauScore);
        return;
    }

    seanceTirsAuBut(nouveauScore, nouvelHistorique, tirs + 1);
};

/**
 * Initialisation
 */
const scoreInitial: Score = { teamA: 0, teamB: 0 };
const historiqueInitial: History = [];

// Commencer la séance de tirs au but
seanceTirsAuBut(scoreInitial, historiqueInitial, 0);