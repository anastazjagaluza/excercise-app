import { html, LitElement, css, unsafeCSS, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import "./add-item";
import "./one-item";
import { workout, workoutList, records, record } from "./types";


@customElement("list-items")
export class ListItems extends LitElement{

    @property({type: Boolean, attribute: true}) active = true;
    @property({attribute: false}) workout: workout | undefined;
    @property({attribute: false}) new: Boolean = false;
    @property({attribute: false}) workoutList: workoutList | undefined;
    @property({attribute: false}) records: records | undefined;
    @property({attribute: true}) recType: string | undefined;
  

        
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

        .excercise, .record {
            padding: 1rem;
            display: flex;
            color: white;
            align-items: center;
        }
        .excercise {
            background: #DB6C9F;
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
            ${this.workout != null
             ? html `<input type="text" value="${this.workout.name}" placeholder="My workout">`
             : this.records != null 
                    ? html `<input type="text" value="Your ${this.recType}" placeholder="My workout">`
                    : this.workoutList != null
                        ? html `<input type="text" value="Your Workouts" disabled placeholder="My workout">`
                        :  undefined}
            <div id="content">
            ${this.new != true
                ? this.workout != null
                  ? this.workout.excercises.map(el =>
                         html `     
                            <one-item 
                                headline="${el.name}" 
                                link="add.html?id=${el.id}"
                                leftCircle="${el.sets} / ${el.reps}"
                                rightCircle="${el.repLength}s / ${el.pauseLength}s">
                            </one-item>`)
                :  this.workoutList != null 
                    ? this.workoutList.excercises.map(el=>
                    html `
                    <one-item 
                        headline="${el.name}" 
                        link="workouts.html?id=${el.id}"
                        rightCircle="${el.excercises}">
                    </one-item>
                    `)
                : this.records != null
                    ? this.recType == "weight"  
                        ? this.records.weight.map(el=>
                        html `<one-item record headline="${el.value} kg" rightCircle="${el.date}"></one-item>`)
                        : this.records.workouts.map(el=>
                        html `<one-item record headline="${el.name}" rightCircle="${el.date}"></one-item>`)
                    : undefined
                    : undefined}
              
                          ${this.workout != null && this.new == true
                            ? html `
                            <add-item text="Add a new excercise..." link="add.html"></add-item>
                            `
                            : this.workoutList != null 
                                ? html `
                                 <add-item text="Add a new workout..." link="workouts.html?new"></add-item>
                                `
                                : this.recType == "weight"
                                ? html `
                                   <add-item text="Add a new measurement..." link=""></add-item>
                              `
                            : undefined}
                             
            </div>
             `
    }
}