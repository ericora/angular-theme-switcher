import { ThemeService } from './theme.service';
import { Component } from '@angular/core';
const themes = {
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876',
  },
  night: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867',
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A',
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-theme';
  constructor(private themeService: ThemeService) {}

  changeTheme(theme: string) {
    this.themeService.setTheme(themes[theme]);
  }

  downSpeed() {
    const currNum = this.getCurrentSpeed();
    const newSpeed = currNum === 2000 ? currNum : currNum + 500;
    this.changeSpeed(newSpeed);
  }

  upSpeed() {
    const currNum = this.getCurrentSpeed();
    const newSpeed = currNum === 500 ? currNum : currNum - 500;
    this.changeSpeed(newSpeed);
  }
  getCurrentSpeed() {
    const currSpeed = this.themeService.getVariable('--speed');
    const currNum = parseInt(currSpeed.slice(0, currSpeed.length - 2));
    return currNum;
  }
  changeSpeed(speed) {
    this.themeService.setVariable('--speed', `${speed}ms`);
  }
}
