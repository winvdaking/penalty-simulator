import type { Score } from './Score';
import type { PenaltyResult } from './PenaltyResult';

export type History = {
    shotNumber: number;
    score: Score;
    result: PenaltyResult;
}