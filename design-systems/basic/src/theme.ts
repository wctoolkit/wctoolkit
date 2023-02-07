/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { BaseTheme } from '@wctoolkit/core';

 /**
  * @customtype theme
  * @summary The basic theme definition.
  * @displayname Basic Theme
  */
export class Theme extends BaseTheme {
    static override get tokens() {
        return {
        }
    }

    static override get icons() {
        return {
        }
    }

    constructor(name: string) {
        super(name);
    }
}