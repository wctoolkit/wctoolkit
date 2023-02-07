/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { DesignTokenShape } from '@wctoolkit/theme';
const WCTElements = new Set<HTMLElement>();

const updateDir = () => {
    const dir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';

    WCTElements.forEach((el) => {
        el.setAttribute('dir', dir);
    });
};

const dirObserver = new MutationObserver(updateDir);

dirObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
});

/**
 * @customtype component
 * @summary The base component class for all web component toolkit components.
 * @displayname Element
 * @category Core
 */
export class WCTElement extends LitElement {
    static _tokensRegistered = false;
    static designTokens? : DesignTokenShape;

    static _registerTokens() {
        if (!this._tokensRegistered) {
            const constructor = this.constructor as typeof WCTElement;
            const { designTokens } = constructor;

            if (designTokens && window.designSystemProvider) {
                window.designSystemProvider.registerTokens(designTokens);
            }

            this._tokensRegistered = true;
        }
    }

    static register(tagName: string) {
        this._registerTokens();
        window.customElements.define(tagName, this);
    }

    /**
    * The text direction.
    * @type {string}
    * @allowedvalues ["ltr", "rtl"]
    * @attribute: dir
    */
    @property({ type: String, reflect: true, attribute: 'dir' })
    override dir: 'ltr' | 'rtl' = 'ltr';

    /**
    * Whether or not the text direction is LTR (default) or RTL.
    * @type {boolean}
    * @readonly true
    * @default true
    */
    @property({ type: Boolean })
    get isLTR() {
        return this.dir === 'ltr';
    }

    override connectedCallback() {
        super.connectedCallback();

        this.dir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
        WCTElements.add(this);
    }

    override disconnectedCallback() {
        WCTElements.delete(this);
        super.disconnectedCallback();
    }
}