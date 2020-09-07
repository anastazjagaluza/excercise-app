import { WorkoutManager } from "./workout-manager";

export interface excercise {
    id: string,
    name: string,
    sets?: number,
    reps: number,
    repLength: number,
    pauseLength: number
}

export interface workout {
    id: string,
    name: string,
    excercises: Array<excercise>
}

export interface listElement {
    id: string,
    name: string,
    excercises: number
}

export interface workoutList {
    name: string
    excercises: Array<listElement>
}