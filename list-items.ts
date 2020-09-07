import { html, LitElement, css, unsafeCSS, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import { workout, workoutList } from "./types";


@customElement("list-items")
export class ListItems extends LitElement{

    @property({type: Boolean, attribute: true}) active = true;
    @property({attribute: false}) workout: workout | undefined;
    @property({attribute: false}) workoutList: workoutList | undefined;
  

        
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
        .detailedgroup {
            margin-left: auto;
            display: flex;
            flex-direction: row;
            width: 40%;
            justify-content: space-between;
        }
        #new {
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
            ${this.workout != null && this.workout != undefined
             ? html `<input type="text" value="${this.workout.name}" placeholder="My workout">`
             : html `<input type="text" value="Your Workouts" disabled placeholder="My workout">`}
            <div id="content">
            ${this.workout != null 
                ? this.workout.excercises.map(el =>
                html `<div class="excercise">
                <a href="add.html?id=${el.id}">${el.name}</a>
                    <div class="detailedgroup">
                        <div class="circle"><span class="details">${el.sets} / ${el.reps}</span></div>
                        <div class="circle"><span class="details lengths">${el.repLength}s / ${el.pauseLength}s</span></div>
                    </div>
                </div>`)
                : this.workoutList.excercises.map(el=>
                    html `
                    <div class="excercise">
                     <a href="workouts.html?id=${el.id}">${el.name}</a>
                    <div class="detailedgroup">
                        <div class="circle"><span class="details lengths">${el.excercises}</span></div>
                    </div>
                </div>
                    `)}
            <div class="excercise">     
                ${this.workout != null 
                    ? html `<a href="add.html">Add a new excercise... </a>`
                    : html `<a href="workouts.html?new">Add a new workout... </a>`}
                <div class="detailedgroup">
                    <div id="new" class="circle"><span class="details lengths">+</span></div>
                </div>
            </div>
            </div>
             `
    }
}