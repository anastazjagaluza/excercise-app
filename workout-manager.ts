import { html, LitElement, css, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import { workout, workoutList } from "./types";
import "./list-items";
import { ListItems } from "./list-items";


@customElement("workout-manager")
export class WorkoutManager extends LitElement{

    @property({attribute: false}) workout: workout = {id: "w00", name: "My Workout", excercises: [
        {id: "w01ex01", name: "Push-up", sets: 3, reps: 10, repLength: 30, pauseLength: 15}]};
    @property({attribute: false}) workoutList: workoutList = {
        name: "Your workouts",
        excercises: [
            { id: "w01", name: "Monday Workout", excercises: 3},
            { id: "w02", name: "Wednesday Workout", excercises: 5},
            { id: "w03", name: "Light stretching", excercises: 10}

        ]
    }

    firstUpdated(){
        const list = this.shadowRoot.querySelector("#list") as ListItems;
        const params = new URL(location.href).searchParams;
        if(params.get('id') != null ) {
            list.workout = this.workout;
            list.workoutList = null;
            
        }
        else {
            list.workoutList = this.workoutList;
            list.workout = null;
        }

        this.requestUpdate();
    
    }
        
    static get styles(){
        return css `
        :host {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-items: center;
            overflow-y: hidden;
            background-color: var(--main-pink);
        }

        #menulink {
            margin-top: auto;
            font-family: var(--second-font);
            width: 100%;
            padding: calc(9% - 1rem) 0;
            text-align: center;
        }
        a, a:hover, a:visited, a:active {
            width: 100%;
            color: white;
            text-decoration: none;
        }

        `
    }

    



    render(){
        return html`
           <list-items id="list"></list-items>
            <a id="menulink" href="index.html">Menu</a>
             `
    }
}