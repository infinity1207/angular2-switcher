# angular2-switcher

Easily navigate to `typescript(.ts)`|`template(.html)`|`style(.scss/.sass/.less/.css)` in angular2 project.

## Support

[![Paypal Donations](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.me/infinity20091207) a :coffee: and you will help me to keep working on this extension :wink:

## Usage

* Go to the definition of variables/functions when press `f12` within html.
* Switch `.ts`|`.html`|`.css`|`.spec.ts` quickly.
  >|   |  Windows  |     macOS     |
  >| - | :-------: | :-----------: |
  >| If on `.ts`&#124;`.css`&#124;`.spec.ts`:&ensp;go to `.html`<br>If on `.html`:&ensp;go to previous | `alt+o` | `shift+alt+o` |
  >| If on `.ts`&#124;`.html`&#124;`.spec.ts`:&ensp;go to `.css`<br>If on `.css`:&ensp;go to previous | `alt+i` | `shift+alt+i` |
  >| If on `.css`&#124;`.html`&#124;`.spec.ts`:&ensp;go to `.ts`<br>If on `ts`:&ensp;go to previous | `alt+u` | `shift+alt+u` |
  >| If on `.ts`&#124;`.css`&#124;`.html`:&ensp;go to `.spec.ts`<br>If on `.spec.ts`:&ensp;go to previous | `alt+p` | `shift+alt+p` |

## Available Settings

* Open files side by side (`false` by default)
```json
  "angular2-switcher.openSideBySide": true
```

* The order of angular2-switcher find corresponding style file  (`[".scss", ".sass", ".less", ".css"]` by default)
```json
  "angular2-switcher.styleFormats": [".scss", ".sass", ".less", ".css"]
```

* The order of angular2-switcher find corresponding template file  (`[".html"]` by default)
```json
  "angular2-switcher.templateFormats": [".html"]
```

## Source

[GitHub](https://github.com/infinity1207/angular2-switcher)
