import { Injectable, Inject } from '@angular/core';
import * as Color from 'color';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = { ...defaults };
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(theme) {
    this.theme = { ...theme };
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value);
  }

  getVariable(name) {
    return window
      .getComputedStyle(this.document.documentElement)
      .getPropertyValue(name);
  }
  getThemeSet() {
    return this.theme;
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }
}
const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8',
};
function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };
  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light,
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
  --color-base: ${light};
  --color-contrast: ${dark};
  --background-color: ${light};
  --text-color: ${dark};
  --toolbar-background-color: ${contrast(light, 0.1)};
  --toolbar-text-color: ${contrast(dark, 0.1)};
  --item-background-color: ${contrast(light, 0.3)};
  --item-text-color: ${contrast(dark, 0.3)};
  --color-primary: ${primary};
  --color-primary-rgb: 56,128,255;
  --color-primary-contrast: ${contrast(primary)};
  --color-primary-contrast-rgb: 255,255,255;
  --color-primary-shade:  ${Color(primary).darken(shadeRatio)};
  --color-primary-tint:  ${Color(primary).lighten(tintRatio)};
  --color-secondary: ${secondary};
  --color-secondary-rgb: 12,209,232;
  --color-secondary-contrast: ${contrast(secondary)};
  --color-secondary-contrast-rgb: 255,255,255;
  --color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
  --color-secondary-tint: ${Color(secondary).lighten(tintRatio)};
  --color-tertiary:  ${tertiary};
  --color-tertiary-rgb: 112,68,255;
  --color-tertiary-contrast: ${contrast(tertiary)};
  --color-tertiary-contrast-rgb: 255,255,255;
  --color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
  --color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};
  --color-success: ${success};
  --color-success-rgb: 16,220,96;
  --color-success-contrast: ${contrast(success)};
  --color-success-contrast-rgb: 255,255,255;
  --color-success-shade: ${Color(success).darken(shadeRatio)};
  --color-success-tint: ${Color(success).lighten(tintRatio)};
  --color-warning: ${warning};
  --color-warning-rgb: 255,206,0;
  --color-warning-contrast: ${contrast(warning)};
  --color-warning-contrast-rgb: 255,255,255;
  --color-warning-shade: ${Color(warning).darken(shadeRatio)};
  --color-warning-tint: ${Color(warning).lighten(tintRatio)};
  --color-danger: ${danger};
  --color-danger-rgb: 245,61,61;
  --color-danger-contrast: ${contrast(danger)};
  --color-danger-contrast-rgb: 255,255,255;
  --color-danger-shade: ${Color(danger).darken(shadeRatio)};
  --color-danger-tint: ${Color(danger).lighten(tintRatio)};
  --color-dark: ${dark};
  --color-dark-rgb: 34,34,34;
  --color-dark-contrast: ${contrast(dark)};
  --color-dark-contrast-rgb: 255,255,255;
  --color-dark-shade: ${Color(dark).darken(shadeRatio)};
  --color-dark-tint: ${Color(dark).lighten(tintRatio)};
  --color-medium: ${medium};
  --color-medium-rgb: 152,154,162;
  --color-medium-contrast: ${contrast(medium)};
  --color-medium-contrast-rgb: 255,255,255;
  --color-medium-shade: ${Color(medium).darken(shadeRatio)};
  --color-medium-tint: ${Color(medium).lighten(tintRatio)};
  --color-light: ${light};
  --color-light-rgb: 244,244,244;
  --color-light-contrast: $${contrast(light)};
  --color-light-contrast-rgb: 0,0,0;
  --color-light-shade: ${Color(light).darken(shadeRatio)};
  --color-light-tint: ${Color(light).lighten(tintRatio)};`;
}

function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}
