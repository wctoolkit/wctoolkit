/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from '@wctoolkit/theme';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('demo-mode-switcher')
export class DemoModeSwitcher extends LitElement {
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
    modes: Array<string>;

    @property({type: Number, attribute: 'selected-index'})
    selectedIndex: number;

    constructor() {
        super();
        this.modes = ['System', 'Light', 'Dark'];
        this.selectedIndex = 0;
    }

    override render() {
        return html`
            <div class="title">Mode</div>
            <div class="container">
                ${this.modes.map((mode, index) => html`
                    <div class="item">
                        <input type="radio" id="${mode}" name="mode" @change="${this._modeChanged}" ?checked="${this.selectedIndex === index}">
                        <label for="${mode}">${mode}</label>
                    </div>
                `)}
            </div>
        `;
    }

    _modeChanged(e: any) {
        if (e.target.checked) {
            themeManager.mode = e.target.id.toLowerCase();
        }
    }
}