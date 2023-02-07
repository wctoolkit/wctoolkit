/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from '@wctoolkit/theme';
import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';

@customElement('demo-icon')
export class DemoIcon extends LitElement {
    static override get styles() {
        return [css`
            :host {
                display: inline-block;
                transition: var(--theme-transition);
                width: 24px;
                height: 24px;
            }

            svg {
                fill: var(--theme-text-primary-color);
                width: 100%;
                height: 100%;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }
  
    @property({ type: String })
    icon: string;

    constructor() {
        super();
        this.icon = null;
    }

    override render() {
        const icon = themeManager.getIconContent(this.icon);
        return html`${icon ? unsafeHTML(icon) : null}`;
    }
}