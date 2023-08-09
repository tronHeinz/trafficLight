
class TrafficLight extends HTMLElement {
	static get observedAttributes() {
			return ['mode'];
	}

	constructor () {
		super();

		this._mode = 0;
		this._root = -1;
	}
	
	connectedCallback () {
		this.app = document.querySelector('#app');
		this._root = this.attachShadow({mode: 'open'});
		this.app.appendChild(this._root);
		
		this.render();

		// fetch some nodes from the shadow dom tree
		this.redlight = this._root.querySelector('.trafficLightRed');
		this.orangelight = this._root.querySelector('.trafficLightOrange');
		this.greenlight = this._root.querySelector('.trafficLightGreen');
		this.startBtn = this._root.querySelector('.startBtn');
		
		// init traffic light
		this.redlight.classList.add('off');
		this.orangelight.classList.add('off');
		this.greenlight.classList.add('off');
	
		// content binding
		this.nextStep = this.nextStep.bind(this);

		this.startBtn.addEventListener('click', this.nextStep);
	}

	attributeChangedCallback (name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		if (name === 'mode') {
			switch(this._mode) {
				case 1: {
					this.clearTrafficLight();
					this.redlight.classList.remove('off');
					break;
				}
				case 2: {
					this.clearTrafficLight();
					this.redlight.classList.remove('off');
					this.orangelight.classList.remove('off');
					break;
				}
				case 3: {
					this.clearTrafficLight();
					this.greenlight.classList.remove('off');
					break;
				}
				case 4: {
					this.clearTrafficLight();
					this.orangelight.classList.remove('off');
					break;
				}
				case 5: {
					this.clearTrafficLight();
					this.redlight.classList.remove('off');
					this._mode = 1;
				}
			}
		}
	}

	nextStep() {
		this._mode += 1;
		this.setAttribute('mode', this._mode);
	}

	clearTrafficLight() {
		this.redlight.classList.add('off');
		this.orangelight.classList.add('off');
		this.greenlight.classList.add('off');
	}
	
	render() {
		this._root.innerHTML = `
			<style>
				.title {
					font-size: 20px;
					text-align: center;
					width: 175px;
				}

				.trafficLight {
					display: flex;
					border: 3px solid #000;
					border-radius: 5px;
					width: 150px;
					height: 450px;
					flex-direction: column;
					padding: 10px;
				}

				.trafficLight div {
    			border: 2px solid #000;
					border-radius: 100%;
    			flex: 1;
					margin: 5px;
					transition: background 0.5s 0.75s;
				}

				.trafficLightRed {
					background: red;
				}

				.trafficLightOrange {
					background: orange;
				}

				.trafficLightGreen {
					background: green;
				}

				.off {
					background: none;
				}

				button {
					border: 3px solid #000;
					background: #fff;
					margin: 10px 0;
					font-size: 20px;
					border-radius: 5px;
					width: 175px;
					transition: background 0.3s;
				}
				button:active {
					background: red;
					color: #000;
				}
			
			</style>
			<div class="title">Traffic light</div>
			<div class="trafficLight">
			<div class="trafficLightRed"></div>
			<div class="trafficLightOrange"></div>
			<div class="trafficLightGreen"></div>
			</div>
			<button class="startBtn">Start</div>
		`;
	}
}

export default TrafficLight;