import { html, LitElement, css, unsafeCSS, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import { workout } from "./types";


@customElement("workout-manager")
export class WorkoutManager extends LitElement{

    @property({attribute: false}) workout: workout = {name: "My Workout", excercises: [
        {name: "Push-up", sets: 3, reps: 10, repLength: 30, pauseLength: 15}]};

        
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
        
       button {
            background-color: var(--main-pink);
            width: 100%;
            border: none;
            color: white;
        }
        #content, input {
            font-family: var(--main-font);
        }

        input {
            box-shadow: none;
            border: none;
            background-color: var(--main-pink);
            text-align: center;
        }

        button, input {
            text-align: center;
            width: 100%;
            height: 7%;
            color: white;
        }
        #menulink {
            margin-top: auto;
            font-family: var(--second-font);
            width: 100%;
            padding: calc(9% - 1rem) 0;
            text-align: center;
        }

        .excercise {
            padding: 1rem;
            background: #DB6C9F;
            display: flex;
            color: white;
            align-items: center;
        }
        .circle {
            font-size: 100%;
            border: 1px solid white;
            border-radius: 50%;
            width: 3.7rem;
            height: 3.7rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .4rem;
        }
        #detailedgroup {
            margin-left: auto;
            display: flex;
            flex-direction: row;
            width: 40%;
            justify-content: space-between;
        }
        #new {
            margin-left: auto;
            font-size: 200%;
        }
        .details {
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .lengths {
            font-size: 70%;
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
            <input type="text" value="${this.workout.name}" placeholder="My workout">
            <div id="content">
            ${this.workout.excercises.map(el =>
                html `<div class="excercise">
                <a>${el.name}</a>
                    <div id="detailedgroup">
                        <div class="circle"><span class="details">${el.sets} / ${el.reps}</span></div>
                        <div class="circle"><span class="details lengths">${el.repLength}s / ${el.pauseLength}s</span></div>
                    </div>
                </div>`
                )}
            <div class="excercise">     
                <a href="add.html">Add a new excercise... </a>
                <div id="rest">
                    <div id="new" class="circle">+</div>
                </div>
            </div>
            </div>
            <a id="menulink" href="index.html">Menu</a>
             `
    }
}