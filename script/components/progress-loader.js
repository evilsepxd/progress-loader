export default class ProgressLoader extends HTMLElement {
    _radius = 40;
    _circleLength = 2 * Math.PI * this._radius;

    _value = 15;
    _animating = false;
    _visible = true;

    connectedCallback() {
        const shadow = this._createShadowDOM();

        this.progressCircle = shadow.querySelector('.progress');

        this._setCircleStrokeDasharray();
        this.render();
    }

    render() {
        this._setCircleStrokeDashoffset();
    }

    static get observedAttributes() {
        return ['value', 'animate', 'hidden'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this._value = parseInt(newValue, 10);
                break;
            case 'animate':
                this._animating = newValue === 'true';
                break;
            case 'hidden':
                this._visible = newValue === 'false';
                break;
        }
    }

    _createShadowDOM() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = this._createTemplate();

        return shadow;
    }

    _setCircleStrokeDasharray() {
        this.progressCircle.style.strokeDasharray = this._circleLength;
    }

    _setCircleStrokeDashoffset() {
        const offset = this._circleLength - (this._value / 100) * this._circleLength;
        this.progressCircle.style.strokeDashoffset = offset;
    }

    _createTemplate() {
        return `
            <style>
                :host {
                    width: 200px;
                    height: 200px;
                }
                
                .progress-loader {
                    width: 100%;
                    height: 100%;                
                }
                
                circle {
                    fill: none;
                    stroke-width: 6px;
                    stroke-linecap: square;
                }
                
                .background {
                    stroke: #f0f4f8;
                }
                
                .progress {
                    stroke: #007aff;
                    transform: rotate(-90deg);
                    transform-origin: center;
                    transition: stroke-dashoffset 0.3s ease;
                }
            </style>

            <svg class="progress-loader" viewBox="0 0 100 100">
                <circle class="background" cx="50" cy="50" r="${this._radius}"></circle>
                <circle class="progress" cx="50" cy="50" r="${this._radius}"></circle>
            </svg>
        `;
    }
}