export type Score = {
    teamA: number;
    teamB: number;
} & {
    [key: string]: number;
};