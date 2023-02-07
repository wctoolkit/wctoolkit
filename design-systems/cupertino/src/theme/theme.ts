/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { BaseTheme } from '@wctoolkit/core';
import { ColorTokens, ElevationTokens, MotionTokens, ShapeTokens, TypographyTokens } from './tokens/tokens.js';
import { Icons } from './icons/icons.js';

 /**
  * @customtype theme
  * @summary The basic theme definition.
  * @displayname Basic Theme
  */
export class Theme extends BaseTheme {
    static override get tokens() {
        return {
            ...ColorTokens,
            ...TypographyTokens,
            ...ElevationTokens,
            ...MotionTokens,
            ...ShapeTokens
        }
    }

    static override get icons() {
        return {
            ...Icons
        }
    }

    constructor(name: string) {
        super(name);
    }
}