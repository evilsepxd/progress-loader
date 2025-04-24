export default class ProgressLoader extends HTMLElement {
    _radius = 40;
    _circleLength = 2 * Math.PI * this._radius;

    _value = 15;
    _animating = false;
    _visible = true;

    connectedCallback() {
        const shadow = this._createShadowDOM();

        this._loader = shadow.querySelector('.progress-loader');
        this._progressCircle = shadow.querySelector('.progress');

        this._setCircleStrokeDasharray();
        this.render();
    }

    render() {
        this._setCircleStrokeDashoffset();
        this._toggleActive();
        this._toggleVisibility();
    }

    static get observedAttributes() {
        return ['value', 'animate', 'hidden'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this.value = newValue;
                break;
            case 'animate':
                this.animate = newValue;
                break;
            case 'hidden':
                this.visible = newValue;
                break;
        }
        this.render();
    }

    get value() {
        return this._value;
    }

    set value(value) {
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed) && parsed >= 0) {
            this._value = value;
            this._setCircleStrokeDashoffset();
        }
    }

    get animate() {
        return this._animating;
    }

    set animate(value) {
        this._animating = !!value;
        this._toggleActive();
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = !!value;
        this._toggleVisibility();
    }

    _createShadowDOM() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = this._createTemplate();

        return shadow;
    }

    _toggleVisibility() {
        if (this._visible) {
            this._loader.classList.remove('hidden');
        } else {
            this._loader.classList.add('hidden');
        }
    }

    _toggleActive() {
        if (this._animating) {
            this._loader.classList.add('active');
        } else {
            this._loader.classList.remove('active');
        }
    }

    _setCircleStrokeDashoffset() {
        const offset = this._circleLength - (this._value / 100) * this._circleLength;
        this._progressCircle.style.strokeDashoffset = offset;
    }

    _setCircleStrokeDasharray() {
        this._progressCircle.style.strokeDasharray = this._circleLength;
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
                    
                    &.active {
                        animation: 1s spin infinite linear;
                    }
                    
                    &.hidden {
                        display: none;
                    }
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
                
                @keyframes spin {
                    from {
                        transform: rotate(0deg);                    
                    }                
                    to {
                        transform: rotate(360deg);
                    }
                }
            </style>

            <svg class="progress-loader" viewBox="0 0 100 100">
                <circle class="background" cx="50" cy="50" r="${this._radius}"></circle>
                <circle class="progress" cx="50" cy="50" r="${this._radius}"></circle>
            </svg>
        `;
    }
}