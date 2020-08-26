export interface excercise {
    name: string,
    sets?: number,
    reps: number,
    repLength: number,
    pauseLength: number
}

export interface workout {
    name: string,
    excercises: Array<excercise>
}