The `@wctoolkit/theme` package is a generic theming library for web components based on design tokens, which are converted to CSS custom variables for use. It also supports svg icons, which are linked to themes.

# Installation

```powershell
npm install @wctoolkit/theme --save
```

# Creating a Theme

Before getting into creating themes, there are 3 important concepts to understand.

* ThemeManager: This class manages all the theme instances (brands) for an application. A singleton instance, `window.themeManager` is automatically created that you will interact with.
* Theme: This is the application or design system specific template for all brands and defines all the required design tokens and icons. It is created by subclassing `Theme`.
* Brand: This is a named instance of the `Theme` subclass which allows you to create one or more unique brands or variants by overriding the default design token and icon values. You will always have a least one brand (instance).

To theme an application, you need to import `Theme` in order to create a theme template, and `themeManager` which is used to register the theme brands that you create and set the active theme brand.

```html
<div class="thing">Hello</div>
```

```javascript
import { Theme, themeManager } from '@wctoolkit/theme';
```

A typical custom theme definition looks like this:

```javascript
class MyTheme extends Theme {  
    // The theme design tokens that are shared by all brands.
    static get tokens() {
        return {
            // Design token definitions.
        }
    }

    // The theme icons that are shared by all brands.
    static get icons() {
        return {
            // Icon definitions.
        };
    }

    constructor(name, /* override parameters */) {
        super(name);

        // Add brand design tokens that are unique to each brand.

        // Add brand icons that are unique to each brand.
    }
}
```

The static `tokens` getter should return an object containing all the design tokens that are shared by every instance of the theme (brands) and the static `icons` getter should return an object containing all the shared icons. These are called the `Theme Design Tokens` and the `Theme Icons`.

This is enough if you only want a single brand (look and feel), but if you want more than one brand then you need to override the shared design tokens (you'll always want to do this) and icon values (not so common). The values used for the design token and icon overrides should be passed in *via* the constructor. All overrides should be done in the constructor, or methods called from the constructor. These are called the `Brand Design Tokens` and the `Brand Icons`.

## Creating Theme Design Tokens

`Theme Design Tokens` are created in a static getter function called `tokens`, and each token is converted to a CSS custom property with the corresponding value. Each token is a name-value pair, where the name value should be kebab-case and the value can be a string (for simple tokens), an object for complex tokens (you can specify different values for `light` and `dark` mode, or `compact`, `confortable` and `sparse` densities), or a reference token.




`Theme Design Tokens` are created in a static getter function called `tokens`, and each token is converted to a CSS custom property with the corresponding value. Theme definitions support light and dark modes by providing an optional dark mode value for design tokens (typically color values). If a dark mode value isn't provided then the light value will be provided for both the light and dark mode. The code snippet below shows the design token definition possibilities.

```javascript
static get tokens() {
    return {
        // A design token with a light value only.
        // Used for light and dark mode.
        'theme-primary-color': '#1976D2',

        // A design token with a light and a dark value.
        'theme-on-window-color': {
            light: 'rgba(0, 0, 0, 0.87)',
            dark: 'rgba(255, 255, 255, 0.87)'
        },

        // A design token with a reference value.
        'theme-typography-font-serif': 'Georgia',
        'theme-typography-headline-font': '{theme-typography-font-serif}',

        // A design token with a reference value and a default value.
        'theme-typography-headline-weight': '{theme-typography-weight-bold:600}',
    }
}
```
You can also specify separate token values for different UI densities (typically size type values).

## Creating Theme Icons

`Theme Icons` are created in a static getter function called `icons`, and each icons, which consists of an svg snippet, is converted to am html svg element containing the snippet. If a size isn't provided, then it is assumed that the icon fits on a `24x24px` grid. The code snippet below shows the icon definition possibilities.

```javascript
static get icons() {
    {
        // A single 24x24px (default) icon.
        'chevron-up': '<g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g>',

        // A single 40x40px.
        'chevron-down': {
            icon: '<g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g>',
            size: 40
        }
    }; 
}

```

## Creating Brand Design Tokens

All instances of a custom `Theme` class will share the same global design tokens. If you want different values for certain design tokens to create different brands, then you have to create them per instance, as shown below:

```javascript
constructor(name, primaryColor) {
    super(name);

    // Add brand design tokens that are unique to each brand.
    this.addToken('theme-primary-color', primary);

    // Add brand icons that are unique to each brand.
}
```

You can then create brands like this:

```javascript
const blueThemeBrand = new MyTheme('blue', '#1976D2');
const redThemeBrand = new MyTheme('red', '#F44336');
const greenThemeBrand = new MyTheme('green', '#388E3C');
```

The `addToken` method takes the design token name as the first parameter, and the value object as the second parameter. The second parameter should be an object identical to the ones used to define the global design tokens. i.e. This is valid:

```javascript
this.addToken('theme-primary-window', {
    light: '#FAFAFA',
    dark: '#1E1E1E'
});
```

## Creating Brand Icons

All instances of a custom `Theme` class will share the same global icons. If you want different values for certain icons to create different brands, then you have to create them per instance, as shown below:

```javascript
// As created in the previous section.
const redThemeBrand = new MyTheme('red', '#F44336');

redThemeBrand.addIcon('chevron-right', '<g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>');
```

You can also add them in the constructor like design tokens, but it's a bit clumsy.

```javascript
constructor(name, primaryColor, icon) {
    super(name);

    // Add brand design tokens that are unique to each brand.
    this.addToken('theme-primary-color', primary);

    // Add brand icons that are unique to each brand.
    this.addIcon('chevron-right', icon);
}
```

The `addIcon` method takes the icon name as the first parameter, and the value object as the second parameter. The second parameter should be an object identical to the ones used to define the global icons.

# Using a Theme

TODO