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

    async bluetoothStuff() {
      try {
        console.log('Requesting Bluetooth Device...');
        const device  = await navigator.bluetooth.requestDevice({
            filters: [{name: "HONOR Band 5-66C"}, {services: ['heart_rate']}]});
    
        console.log('Connecting to GATT Server...');
        const server = await device.gatt.connect();
    
        console.log('Getting Heart Rate Service...');
        const service = await server.getPrimaryService('heart_rate');
    
        console.log('Getting Heart Rate Control Point Characteristic...');
        const characteristic = await service.getCharacteristic('heart_rate_control_point');
    
        console.log('Writing Heart Rate Control Point Characteristic...');
        // Writing 1 is the signal to reset energy expended.
        let resetEnergyExpended = Uint8Array.of(1);
        await characteristic.writeValue(resetEnergyExpended);
    
        console.log('> Energy expended has been reset.');
      } catch(error) {
        console.log('Argh! ' + error);
      }
    }

    render(){
        return html`
            <a class="router" id="start">Excercise now</a>
            <a class="router"  id="create" href="records.html?workouts">See your progress</a>
            <a class="router" id="manage" href="workouts.html">Manage your workouts</a>
            <a id="logout" href="">Log out</a>
             `
    }
}