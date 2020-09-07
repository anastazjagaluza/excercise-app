export function newIdForWorkout(workoutContainer) {
    const newNumber = Number(workoutContainer[workoutContainer.length - 1].id.slice(1)) + 1;
    const newId = "w" + newNumber;
    console.log(newId);
}

export function newIdForExcercise(excerciseContainer) {
    const newNumber = Number(excerciseContainer[excerciseContainer.length - 1].id.slice(3)) + 1;
    const workoutId = this.exContainer[excerciseContainer.length-1].id.slice(0, 3);
    const newId = workoutId + newNumber;
    console.log(newId);
}