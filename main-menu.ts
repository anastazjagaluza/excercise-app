import { html, LitElement, css, unsafeCSS, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';

@customElement("main-menu")
export class MainMenu extends LitElement{

    static get styles(){
        return css `
        :host {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-items: center;
            text-align: center;
            overflow-y: hidden;
        }

        a, a:hover, a:visited, a:active {
            width: 100%;
            color: white;
            text-decoration: none;
        }

        .router {
            font-size: 140%;
            padding: calc(28% - 1rem) 0;
            font-family: var(--main-font);
        }

        #start {
            background-color: var(--main-green);
        }

        #create {
            background-color: var(--main-blue);
        }
        
        #manage {
            background-color: var(--main-pink);
        }

        #logout {
            width: 100%;
            padding: calc(9% - 1rem) 0;
            background-color: var(--main-grey);
            font-family: var(--second-font);
            color: white;
        }
        `
    }



    render(){
        return html`
            <a class="router" id="start">Start working out!</a>
            <a class="router" id="create">Create a new workout</a>
            <a class="router" id="manage" href="workouts.html">Manage your workouts</a>
            <a id="logout" href="">Log out</a>
             `
    }
}