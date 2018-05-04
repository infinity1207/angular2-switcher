# angular2-switcher

Easily navigate to `typescript(.ts)`|`template(.html)`|`style(.scss/.sass/.less/.css)` in angular2 project.

## Usage

* Go to the definition of variables/functions when press `f12` within html.

* Switch `.ts`|`.html`|`.css`|`.spec.ts` fastly.

  * `alt+o`(Windows) `shift+alt+o`(macOS)

    > if on `.ts|.css|.spec.ts`: go to html<br>
    > if on `.html`: go to previous

  * `alt+i`(Windows) `shift+alt+i`(macOS)

    > if on `.ts|.html|.spec.ts`: go to css<br>
    > if on `.css`: go to previous

  * `alt+u`(Windows) `shift+alt+u`(macOS)

    > if on `.css|.html|.spec.ts`: go to ts<br>
    > if on `ts`: go to previous

  * `alt+p`(Windows) `shift+alt+p`(macOS)
    > if on `.ts|.css|.html`: go to spec.ts<br>
    > if on `.spec.ts`: go to previous

## Release Notes

### 0.1.7

* Add configuration to enable open files side by side.

  Extension will add configuration "angular2-switcher.openSideBySide" to workspace, default value is `false`.

  Add `"angular2-switcher.openSideBySide":true` in user settings to open template and styles etc side by side to the component class.

### 0.1.6(2018-2-5)

#### Bug Fixes

* Not working since 0.15 ([#16](https://github.com/infinity1207/angular2-switcher/issues/16))

### 0.1.5(2018-2-5)

#### Bug Fixes

* Add the possibility to switch to the .spec.ts unit test file associated with the .ts file ([#14](https://github.com/infinity1207/angular2-switcher/issues/14))

### 0.1.4(2017-2-15)

* Add icon.

### 0.1.3(2017-2-15)

#### Bug Fixes

* F12 on component variables using null propagation does not work ([#8](https://github.com/infinity1207/angular2-switcher/issues/8))
* File switching only within focused window editor ([#7](https://github.com/infinity1207/angular2-switcher/issues/7))

## Source

[GitHub](https://github.com/infinity1207/angular2-switcher)
