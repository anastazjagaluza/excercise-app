import { html, LitElement, css, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import "./add-item";


@customElement("one-item")
export class ListItems extends LitElement{

    @property({attribute: true}) headline: string | undefined;
    @property({attribute: true}) link: string | undefined;
    @property({attribute: true}) leftCircle: string | undefined;
    @property({attribute: true}) rightCircle: string | undefined;
    @property({type: Boolean, attribute: true}) record: boolean = false;
  

        
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
            <div class="${this.record != false ? "record" : "excercise"}">
                <a href="${this.link}">${this.headline}</a>
                <div class="detailedgroup">
                   ${this.leftCircle != null ? html ` <div class="circle"><span class="details">${this.leftCircle}</span></div>` : undefined}
                    <div class="circle"><span class="details lengths">${this.rightCircle}</span></div>
                </div>
            </div>
             `
    }
}