import { html, LitElement, css, unsafeCSS, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import { workout, workoutList, records, record } from "./types";


@customElement("add-item")
export class AddItem extends LitElement{

    @property({attribute: true}) text: string | undefined;
    @property({attribute: true}) link: string | undefined;
  

        
    static get styles(){
        return css `
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
            <div class="excercise">  
                <a href="${this.link}">${this.text}</a>
                <div class="detailedgroup">
                    <div id="new" class="circle"><span class="details lengths">+</span></div>
                </div>
            </div>
             `
    }
}