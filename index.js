import { Console } from './js/console.js';
import { Theme } from './js/enum.js';
import { LocalStorage } from './js/localstorge.js';

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
 * @param {string} eventName
 * @param {any} value
 * @description send custom google analytics events
 */
function sendGACustomEvent(eventName, value) {
  try {
    if (!gtag) return;
    gtag('event', eventName, value);
  } catch (error) {
    console.error('Send GACustomEvent theme failed - ', error);
  }
}

/**
 * @returns {void}
 * @description set id=themeChanger button click event
 */
function setThemeChanger() {
  try {
    const themeChanger = document.getElementById('theme-changer');
    if (!themeChanger) return;

    themeChanger.addEventListener('click', function () {
      changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    });
  } catch (error) {
    console.error('Set theme changer failed - ', error);
  }
}

/**
 * @returns {void}
 * @description set cv download button trackable
 */
function setCVDownloadGACustomEvent() {
  try {
    const cvDownloadBtn = document.getElementById('cv-download');
    if (!cvDownloadBtn) return;

    cvDownloadBtn.addEventListener('click', function () {
      if (localStorage.getItem('CV_DOWNLOADED') !== '1') {
        sendGACustomEvent('cv_download', {
          'event_category': 'portfolio',
          'event_label': 'cv_download',
          'value': 1
        });
        localStorage.setItem('CV_DOWNLOADED', '1');
      }
    });
  } catch (error) {
    console.error('set CV download GA custom event - ', error);
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
    setCVDownloadGACustomEvent();
  } catch (error) {
    console.error('App initalizatin failed - ', error);
  }
}

'use strict';
var localStorage = new LocalStorage();
var console = new Console(localStorage);
var theme = localStorage.getItem('THEME') || (window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? Theme.DARK : Theme.LIGHT); // checking system dark mode is enable or not
init();