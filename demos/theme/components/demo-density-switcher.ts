/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeProvider } from '@wctoolkit/theme';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('demo-density-switcher')
export class DemoDensitySwitcher extends LitElement {
    static override get styles() {
        return [css`
            :host {
                display: block;
                transition: var(--theme-transition);
                margin-right: 32px;
            }

            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-wrap: wrap;
                font: var(--theme-typography-body);
                text-transform: var(--theme-typography-body-transform);
            }

            .title {
                font: var(--theme-typography-subtitle);
                text-transform: var(--theme-typography-subtitle-transform);
                margin-bottom: 16px;
            }

            .item {
                display: flex;
                align-items: center;
                margin-right: 24px;
            }

            input {
                margin: 0 8px 0 0;
            }
        `];
    }

    @property({ type: Array })
    densities: Array<string>;

    @property({type: Number, attribute: 'selected-index'})
    selectedIndex: number;

    constructor() {
        super();
        this.densities = ['Compact', 'Comfortable', 'Sparse'];
        this.selectedIndex = 1;
    }

    override render() {
        return html`
            <div class="title">Density</div>
            <div class="container">
                ${this.densities.map((density, index) => html`
                    <div class="item">
                        <input type="radio" id="${density}" name="density" @change="${this._densityChanged}" ?checked="${this.selectedIndex === index}">
                        <label for="${density}">${density}</label>
                    </div>
                `)}
            </div>
        `;
    }

    _densityChanged(e: any) {
        if (e.target.checked) {
            themeProvider.density = e.target.id.toLowerCase();
        }
    }
}