import { html, LitElement, css, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import { records, record } from "./types";
import "./list-items";
import { ListItems } from "./list-items";


@customElement("record-manager")
export class RecordManager extends LitElement{


    @property({attribute: false}) recType: string = "weight";
    @property({attribute: false}) records: records = {
        weight: [
            {
              value: 54,
              date: "12/09"  
            },
            {
                value: 55,
                date: "13/09"  
              },
              {
                value: 56,
                date: "18/09"  
              },
        ],
        workouts: [
            {
                name: "Monday Workout",
                date: "01/09"
            },
            {
                name: "Tuesday Workout",
                date: "03/09"
            },
            {
                name: "Running",
                date: "06/09"
            }
        ]
    };


    firstUpdated(){        
        const list = this.shadowRoot.querySelector("#list") as ListItems;
        const params = new URL(location.href).searchParams;
        if(params.get('workouts') != null ) {
           this.recType = "workouts";
           list.recType = "workouts";
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
            border-top: 1px solid gray;
        }
        a, a:hover, a:visited, a:active {
            width: 100%;
            color: white;
            text-decoration: none;
        }

        select {
            background-color: var(--main-pink);
            color: white;
            width: 99vw;
            padding: calc(9% - 1rem) 0;
            text-align-last: center;
        }
        select> option {
            text-align: center;
        }
        #optionsgroup {
            display: flex;
            flex-direction: row;
            width: 100%;
        }

        .options {
            width: 100%;
            background-color: var(--main-pink);
            outline: none;
            box-shadow: none;
            border: none;
            color: white;
            font-family: var(--second-font);
            width: 100%;
            padding: calc(12% - 1rem) 0;
            text-align: center;
        }

        .active {
            background-color: #DB6C9F;
        }

        `
    }

    presentRecords(e: CustomEvent) {
        const list = this.shadowRoot.querySelector("#list") as ListItems;
        const target = e.target as HTMLOptionElement;
        list.recType = target.value;
        window.location.href="records.html?" + target.value;
        this.requestUpdate();
    }



    render(){
        return html`
            <select @input="${this.presentRecords}">
            ${this.recType == "weight"
                    ? html`
                    <option value="weight">Weight</option>
                    <option value="workouts">Workouts</option>
                    `
                    : html`
                    <option value="workouts">Workouts</option>
                    <option value="weight">Weight</option>
                    `
            }
            </select>
           <list-items .records="${this.records}" recType="weight" id="list"></list-items>
            <div id="optionsgroup">
           <button class="options active">List</button>
           <button class="options">Graph</button>
           </div>
            <a id="menulink" href="index.html">Menu</a>
             `
    }
}