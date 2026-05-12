const A = 440;
const DURATION = "2n";

const chord1 = /** @type {HTMLButtonElement} */ document.querySelector("#chord1");

/**
 * @type {any}
 */
let synth;
// @ts-expect-error
const now = Tone.now();
class ChordButton extends HTMLButtonElement {
    static observedAttributes = ["notes"];

    constructor() {
        super();
    }

    /**
     * @param {number} index 
     * @returns {number}
     */
    static indexToHz(index) {
        return A * (2) ** (index / 12);
    }

    /**
     * 
     * @param {number} frequency 
     * @returns {number}
     */
    static hzToIndex(frequency) {
        return Math.log2(frequency / A) * 12;
    }

    async playChordFreq(frequencies = [440], duration = DURATION) {
        await Tone.start();
        synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synth.triggerAttackRelease(frequencies, duration);
    }

    playChordIndices(frequencies = [440], duration = DURATION) {
        for (let i = 0; i < frequencies.length; i++) {
            frequencies[i] = ChordButton.indexToHz(frequencies[i]);
        }

        this.playChordFreq(frequencies, duration);
    }

    connectedCallback() {
        let thisElement = this;
        this.onclick = function () {
            thisElement.playChordIndices(JSON.parse(thisElement.getAttribute("notes")), DURATION);
        }
    }
}

customElements.define("chord-button", ChordButton, { extends: "button" });