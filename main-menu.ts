import { html, LitElement, css, customElement } from "lit-element";
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

    bluetoothStuff() {
        navigator.bluetooth.requestDevice({filters: [{name: "HONOR Band 5-66C"}]})
.then(device => {
  // Human-readable name of the device.
  console.log(device);

  // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
})
.then(async server => { const services = await server.getPrimaryServices(); console.log(services);  })
.catch(error => { console.log(error); });
    }

    render(){
        return html`
            <a class="router" id="start">Excercise now</a>
            <a class="router" @click="${this.bluetoothStuff}"  id="create">See your progress</a>
            <a class="router" id="manage" href="workouts.html">Manage your workouts</a>
            <a id="logout" href="">Log out</a>
             `
    }
}