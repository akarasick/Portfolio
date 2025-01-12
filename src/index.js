import { Console } from './console.js';
import { LocalStorage } from './localstorge.js';

/**
 * @return {void}
 * @param {string} newTheme ['dark', 'light']
 * @description - change theme
 */
function changeTheme(newTheme) {
  try {
    theme = newTheme;
    document.body.className = '';
    localStorage.setItem('THEME', newTheme);
    document.body.classList.add(newTheme);
  } catch (error) {
    console.error('Change theme failed - ', error);
  }
}

/**
 * @returns {void}
 * @description set id=themeChanger button click event
 */
function setThemeChanger() {
  try {
    const themeChanger = document.getElementById('themeChanger');
    if (!themeChanger) return;

    themeChanger.addEventListener('click', function () {
      changeTheme(theme === 'light' ? 'dark' : 'light');
    });
  } catch (error) {
    console.error('Set theme changer failed - ', error);
  }
}

/**
 * @returns {void}
 * @description initialization of app
 */
function init() {
  try {
    if (theme) changeTheme(theme);
    setThemeChanger();
  } catch (error) {
    console.error('App initalizatin failed - ', error);
  }
}

var localStorage = new LocalStorage();
var theme = localStorage.getItem('THEME') ?? 'light';
var isLogEnabled = localStorage.getItem('LOGGING') === '1';
var console = new Console(isLogEnabled);
init();