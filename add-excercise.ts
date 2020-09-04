import { html, LitElement, css, unsafeCSS, property, customElement } from "lit-element";
import 'regenerator-runtime/runtime';
import { excercise } from "./types";

@customElement("add-excercise")
export class AddExcercise extends LitElement{
    
    
    @property({type: Boolean, attribute: false}) durationBased: boolean = false;
    @property({type: Boolean, attribute: false}) repetitionBased: boolean = false;
    @property({type: Number, attribute: false}) reps: number = 1;
    @property({type: Number, attribute: false}) sets: number = 1;
    @property({type: Number, attribute: false}) step: number = 0;
    @property({type: Number, attribute: false}) pause: number = 15;
    @property({attribute: false}) excercise: excercise = {
        name: "",
        reps: 0,
        repLength: 5,
        pauseLength: 15
    };

    static get styles() {
      return css `
        :host {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-items: center;
            overflow-y: hidden;
            align-items: center;
            background-color: var(--main-blue);
            color: white;
            font-family: var(--main-font);
            --thumb-size: 40px;
            --thumb-margin: calc(-1*(var(--thumb-size) / 2 - .3rem));
        }

        form {
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
            align-items: center;
            padding: 0 1rem;
            height: 100%;
        }
        h2, h3 {
            text-align: center;
            margin-top: auto;
        }


        input[type=range] {
             width: 80%;
             background-color: transparent;
            -webkit-appearance: none;
        }
        
        input[type=range]:focus {
            outline: none;
        }
        
        input[type=range]::-webkit-slider-runnable-track {
            background: #41b5c5;
            box-shadow: inset 1px 2px 3px rgba(0,0,0,0.2);
            width: 100%;
            height: .6rem;
            cursor: pointer;
        }
        
        input[type=range]::-webkit-slider-thumb {
            margin-top: var(--thumb-margin);
            width: var(--thumb-size);
            height: var(--thumb-size);
            background: #41b5c5;
            border: 1px solid rgba(0, 0, 0, 0);
            box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
            border-radius: 50%;
            cursor: pointer;
            -webkit-appearance: none;
        }
        
        input[type=range]:focus::-webkit-slider-runnable-track {
            background: #55bdcb;
        }
        
        input[type=range]::-moz-range-track {
            background: #41b5c5;
            border: 0.1px solid #010101;
            border-radius: 1.3px;
            width: 100%;
            height: .6rem;
            cursor: pointer;
        }
        
        input[type=range]::-moz-range-thumb {
            margin-top: var(--thumb-margin);
            width: var(--thumb-size);
            height: var(--thumb-size);
            background: #41b5c5;
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 50%;
            cursor: pointer;
        }
        
        input[type=range]::-ms-track {
            background: transparent;
            border-color: transparent;
            color: transparent;
            width: 100%;
            height: .6rem;
            cursor: pointer;
        }
        
        input[type=range]::-ms-fill-lower {
            background: #37a6b5;
            border: 0.1px solid #010101;
            border-radius: 2.6px;
        }
        
        input[type=range]::-ms-fill-upper {
            background: #41b5c5;
            border: 0.1px solid #010101;
            border-radius: 2.6px;
        }
        
        input[type=range]::-ms-thumb {
            margin-top: var(--thumb-margin);
            width: var(--thumb-size);
            height: var(--thumb-size);
            background: #41b5c5;
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 20%;
            cursor: pointer;
        }
        
        input[type=range]:focus::-ms-fill-lower {
            background: #41b5c5;
        }
        
        input[type=range]:focus::-ms-fill-upper {
            background: #55bdcb;
        }
        
        input[type=text], input[type=tel] {
            text-align: center;
            width: 80%;
            font-family: var(--main-font);
            font-size: 110%;
            height: 2.6rem;
            background-color: #41B5C5;
            border: none;
            box-shadow: inset 1px 2px 3px gray;
            color: white;
            outline: white;
        }

        input[type=text]::placeholder {
            color: rgba(255,255,255,0.6);
        }

        button[type=submit] {
            margin-top: auto;
            font-family: var(--second-font);
            width: 100%;
            padding: calc(9% - 1rem) 0;
            text-align: center;
            background-color: transparent;
            border: none;
            outline: none;
            color: white;
        }

        button[type=submit]:disabled {
            color: rgba(255,255,255,0.4)
        }

        #stepper {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            padding: 0;
        }

        .step {
            background-color: #41B5C5;
            height: 100%;
            border: none;
            color: white;
            font-family: var(--main-font);
            width: 100%;
            padding: 1rem;
        }

        .done {
            background-color: var(--main-blue);
        }

        #squares, #pauses {
            display: flex;
            width: 80%;
            justify-content: space-between;
            align-content: center
        }
        .square, .round {
            color: white;
            font-family: var(--main-font);
            border: none;
            text-align: center;
            background-color: #41B5C5;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
            outline: none;
        }
        .square {
            width: 8rem;
            height: 8rem;
        }

        #pauses {
            width: 60%;
        }

        .round {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
        }

        .square>span {
            font-size: 70%;
            font-family: var(--second-font);
        }
    
        .selected {
            box-shadow: inset 1px 3px 3px rgba(0,0,0,0.2);
        }

        #repsdisplay, #setsdisplay {
            position: absolute;
        }`
    }

    saveType(e: CustomEvent){
        const target = e.target as HTMLButtonElement;
        const submitButton = this.shadowRoot.querySelector("button[type=submit]") as HTMLButtonElement;
        submitButton.disabled = false;
      
        switch(target.id as string){
            case "dur": {
                this.shadowRoot.querySelector("#rep").classList.remove("selected");
                this.shadowRoot.querySelector("#dur").classList.add("selected");
                this.repetitionBased = false;
                this.durationBased = true;
                break;
            }
            case "rep": {
                this.shadowRoot.querySelector("#rep").classList.add("selected");
                this.shadowRoot.querySelector("#dur").classList.remove("selected");
                this.durationBased = false;
                this.repetitionBased = true;
                break;
            }
        }
    }

    savePause(e: CustomEvent) {
        const target = e.target as HTMLButtonElement;
        const submitButton = this.shadowRoot.querySelector("button[type=submit]") as HTMLButtonElement;
        submitButton.disabled = false;
        this.excercise.pauseLength = Number(target.value);
       
        switch(target.id as string){
            case "five": 
                target.classList.add("selected");
                this.shadowRoot.querySelector("#fifteen").classList.remove("selected");
                this.shadowRoot.querySelector("#thirty").classList.remove("selected");
                break;
            case "fifteen":
                target.classList.add("selected");
                this.shadowRoot.querySelector("#thirty").classList.remove("selected");
                this.shadowRoot.querySelector("#five").classList.remove("selected");
                break;
            case "thirty":
                target.classList.add("selected");
                this.shadowRoot.querySelector("#fifteen").classList.remove("selected");
                this.shadowRoot.querySelector("#five").classList.remove("selected");
                break;
        }
    }

    displayreps() {
        const target = this.shadowRoot.querySelector("#reps") as HTMLInputElement;
        this.reps = Number(target.value);
        const display = this.shadowRoot.querySelector("#repsdisplay") as HTMLSpanElement;
        display.style.top = target.offsetTop - target.offsetHeight / 2 + "px";
        display.style.left = (target.offsetLeft + (this.reps/16 * target.offsetWidth)) - 10 + "px";
        this.requestUpdate();
    }

    displaysets() {       
        const target = this.shadowRoot.querySelector("#sets") as HTMLInputElement;
        this.sets = Number(target.value);
        const display = this.shadowRoot.querySelector("#setsdisplay") as HTMLSpanElement;
        display.style.top = target.offsetTop - target.offsetHeight / 2 + "px";
        display.style.left = (target.offsetLeft + (this.sets/23 * target.offsetWidth)) + 2 + "px"; 
        this.requestUpdate();
    }

    nextStep(e: CustomEvent) {
        e.preventDefault();
        this.forwardSteps();
        
    }

    goStepType() {
        this.step = 1;
        this.shadowRoot.querySelector("#timingsStep").classList.add("done");
        this.requestUpdate();
        window.requestAnimationFrame(()=>{
            window.requestAnimationFrame(()=>{
                if(this.repetitionBased != false) {        
                    const sets = this.shadowRoot.querySelector("#sets") as HTMLInputElement;
                    const setsdisplay = this.shadowRoot.querySelector("#setsdisplay") as HTMLSpanElement;
                    setsdisplay.style.top = sets.offsetTop - sets.offsetHeight / 2 + "px";
                    setsdisplay.style.left = sets.offsetLeft + (this.sets/23 * sets.offsetWidth) + 2 + "px";
                    }
                const reps = this.shadowRoot.querySelector("#reps") as HTMLInputElement;
                const repsdisplay = this.shadowRoot.querySelector("#repsdisplay") as HTMLSpanElement;
                repsdisplay.style.top = reps.offsetTop - reps.offsetHeight / 2 + "px";
                repsdisplay.style.left = reps.offsetLeft + (this.reps/16 * reps.offsetWidth) - 7 + "px"; 
                this.requestUpdate();
                })}
            )

    }

    forwardSteps() {
        const repLengthInput = this.shadowRoot.querySelector("#seconds") as HTMLInputElement;
        switch (this.step) {
            case 0:
                const nameInput = this.shadowRoot.querySelector("#name") as HTMLInputElement;
                this.excercise.name = nameInput.value;
                this.step = this.step + 1;
                this.shadowRoot.querySelector("#typeStep").classList.add("done");
                this.requestUpdate();
                break;
            case 1:
                    this.goStepType();
                    break;
            
            case 2:
                this.excercise.reps = this.reps;
                this.repetitionBased != false ? this.excercise.sets - this.sets : undefined;
                this.excercise.repLength = Number(repLengthInput.value);
                console.log(this.excercise);
                break
        }
    }
    reverseStep(e: CustomEvent) {
        const target = e.target as HTMLButtonElement;
        const form = this.shadowRoot.querySelector("form");
        if(Number(target.value) < this.step ) {
            switch(target.value) {

            }
        }
        else {
            form.submit();
        }
    }


    render() {
        return html`
                <div id="stepper">
                    <button class="step done" @click="${this.reverseStep}" id="nameStep" value="0">Name</button>
                    <button class="step" @click="${this.reverseStep}" id="typeStep" value="1">Type</button>
                    <button class="step" @click="${this.reverseStep}" id="timingsStep" value="2">Timings</button>
                </div>

                <form @submit="${this.nextStep}" >

                ${this.step == 1
               ? html `<h2>Choose the type of the excercise</h2>
                    <div id="squares">
                        <button type="button" class="square" @click="${this.saveType}" id="dur">Isometric <br/><span>duration-based</span></button>
                        <button type="button" class="square" @click="${this.saveType}" id="rep">Isotonic <br/><span>with sets and repetitions</span></button>
                    </div>`
               
               : this.step == 2
                     ? html `
                        <h2>Choose the timing options</h2>
                        <h3>How many seconds lasts one repetition?</h3>
                        <input required type="tel" id="seconds"><br/>
                        <label for="reps">How many ${this.durationBased != false ? `repetitions?` : `repetitions in one set?`}</label><br/>
                        <input type="range" @input="${this.displayreps}" id="reps" min="1" max="15" value="1">
                        <span id="repsdisplay">${this.reps}</span>
                        ${this.repetitionBased != false 
                        ? html `
                                <h3>How many sets?</h3><br/>
                                <input type="range" @input="${this.displaysets}" id="sets" min="1" max="20" value="1">
                                <span id="setsdisplay">${this.sets}</span>`
                : undefined}
                
                <h3>How long should be breaks between ${this.durationBased != false ? `excercises` : `sets`}</h3>
                    <div id="pauses">
                        <button type="button" class="round" @click="${this.savePause}" value="5" id="five">5 sec</button>
                        <button type="button" class="round selected" @click="${this.savePause}" value="15" id="fifteen">15 sec</button>
                        <button type="button" class="round" @click="${this.savePause}" value="30" id="thirty">30 sec</button>
                    </div>`

            : html `   <h2>Chose the name for your excercise</h2>
                       <input name="name" id="name" autocomplete="off" maxlength="30" required placeholder="e.g. plank or sit-ups" type="text">`}
            
                <button ?disabled="${this.step==1 || this.step==2}" type="submit">Continue</button>
                </form>
             `
    }
}