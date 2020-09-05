import { WorkoutManager } from "./workout-manager";

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

export interface listElement {
    name: string,
    excercises: number
}

export interface workoutList {
    name: string
    excercises: Array<listElement>
}