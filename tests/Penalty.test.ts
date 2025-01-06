import { simulerTir, mettreAJourScore, ajouterAHistorique, estJeuDecide, afficherHistorique, seanceTirsAuBut } from '../index'
import type { Score } from '../src/types/Score';
import type { History } from '../src/types/History';
import { describe, it, expect, jest } from 'bun:test';

describe('simulerTir', () => {
    it('should return a boolean', () => {
        const result = simulerTir();
        expect(typeof result).toBe('boolean');
    });
});

describe('mettreAJourScore', () => {
    it('should update the score correctly for team A', () => {
        const initialScore: Score = { teamA: 0, teamB: 0 };
        const updatedScore = mettreAJourScore(initialScore, 'A', true);
        expect(updatedScore.teamA).toBe(1);
        expect(updatedScore.teamB).toBe(0);
    });

    it('should update the score correctly for team B', () => {
        const initialScore: Score = { teamA: 0, teamB: 0 };
        const updatedScore = mettreAJourScore(initialScore, 'B', true);
        expect(updatedScore.teamA).toBe(0);
        expect(updatedScore.teamB).toBe(1);
    });
});

describe('ajouterAHistorique', () => {
    it('should add a new entry to the history', () => {
        const initialHistory: History = [];
        const updatedHistory = ajouterAHistorique(initialHistory, 'A', true);
        expect(updatedHistory.length).toBe(1);
        expect(updatedHistory[0]).toEqual({ team: 'A', scored: true });
    });
});

describe('estJeuDecide', () => {
    it('should return true if team A has won', () => {
        const score: Score = { teamA: 3, teamB: 0 };
        const result = estJeuDecide(score, 3);
        expect(result).toBe(true);
    });

    it('should return true if team B has won', () => {
        const score: Score = { teamA: 0, teamB: 3 };
        const result = estJeuDecide(score, 3);
        expect(result).toBe(true);
    });

    it('should return false if the game is not decided', () => {
        const score: Score = { teamA: 1, teamB: 1 };
        const result = estJeuDecide(score, 3);
        expect(result).toBe(false);
    });
});

describe('afficherHistorique', () => {
    it('should display the correct history', () => {
        const history: History = [
            { team: 'A', scored: true },
            { team: 'B', scored: false },
        ];
        const score: Score = { teamA: 1, teamB: 0 };
        console.log = jest.fn();
        afficherHistorique(history, score);
        // 2 tirs + l'affichage du score final = 3
        expect(console.log).toHaveBeenCalledTimes(3);
    });
});
