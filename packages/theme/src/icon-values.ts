/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
export class IconValues {
    private _content: Map<string, string> = new Map();
    private _default: string = 'default';
    private _variants: Array<string>;

    constructor(values: any) {
        if (typeof values === 'string') {
            this._content.set('default', `<svg viewBox="0 0 24 24">${values}</svg>`);
        } else {
            if (values.icon) {
                const val = values.icon;
                let size = 24;

                if (values.size) {
                    size = values.size;
                }

                this._content.set('default', `<svg viewBox="0 0 ${size} ${size}">${val}</svg>`);
            } else if (values.variants) {
                this._default = values.default || this._default;

                const variants = Object.getOwnPropertyNames(values.variants);

                for (let i = 0; i < variants.length; i++) {
                    const variantName = variants[i];
                    const variant = values.variants[variantName];

                    if (typeof variant === 'string') {
                        this._content.set(variantName, `<svg viewBox="0 0 24 24">${variant}</svg>`);
                    } else {
                        if (variant.icon) {
                            const val = variant.icon;
                            let size = 24;
            
                            if (variant.size) {
                                size = variant.size;
                            }

                            this._content.set(variantName, `<svg viewBox="0 0 ${size} ${size}">${val}</svg>`);
                        }
                    }
                }
            }
        }

        this._variants = [...this._content.keys()];
    }

    get variants() {
        return this._variants;
    }

    get defaultVariant() {
        return this._default;
    }

    getIcon(variant?: string) : string {
        return this._content.has(variant) ? this._content.get(variant) : this._content.get(this._default) || null;
    }
}