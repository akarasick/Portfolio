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
 * @param {boolean} isClickable
 * @description toggle click event in header buttons
 */
function toggleClickableHeaderButtons(isClickable) {
  try {
    const buttons = document.querySelectorAll('[data-is-clickable-in-background="false"]');

    for (const button of buttons) {
      if (isClickable) button.state.isClickableInBackground = 'true';
      else button.state.isClickableInBackground = 'false';
    }
  } catch (error) {
    console.error('toggle clickable header buttons - ', error);
  }
}

/**
 * @returns {void}
 * @description set bread menu animation
 */
function setBreadMenuAnimation() {
  try {
    const breadBtn = document.getElementById('bread-menu');
    if (!breadBtn) return;

    const responsiveMenu = document.getElementById('responsive-menu');
    if (!responsiveMenu) return;

    breadBtn.addEventListener('click', function () {
      let topBreadSelector,
        bottomBreadSelector,
        state;
      switch (responsiveMenu.dataset.state) {
        case 'Menu':
        case 'Stale': {
          topBreadSelector = 'top-bread-open';
          bottomBreadSelector = 'bottom-bread-open';
          state = 'Close';
          break;
        }
        case 'Close': {
          topBreadSelector = 'top-bread-close';
          bottomBreadSelector = 'bottom-bread-close';
          state = 'Menu';
          break;
        }
      }

      const topLine = document.getElementById(topBreadSelector);
      if (!topLine) return;
      const bottomLine = document.getElementById(bottomBreadSelector);
      if (!bottomLine) return;

      topLine.beginElement();
      bottomLine.beginElement();
      responsiveMenu.dataset.state = state;
      breadBtn.setAttribute('aria-label', state);
      toggleClickableHeaderButtons(state !== 'Close');
    });
  } catch (error) {
    console.error('set hamburger menu animation - ', error);
  }
}

/**
 * @returns {void}
 * @description set footer text
 */
function setFooter() {
  try {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const p = document.createElement('p');
    p.innerHTML = `Copyright &copy; ${new Date().getFullYear()} Rushil Shah. All rights reserved.`;
    footer.appendChild(p);
  } catch (error) {
    console.error('set footer - ', error);
  }
}

/**
 * @returns {void}
 * @description set bread menu auto close
 */
function setBreadMenuAutoCloser() {
  try {
    const responsiveMenu = document.getElementById('responsive-menu');
    if (!responsiveMenu) return;

    const menuItems = document.querySelectorAll('.menu-item');
    for (const item of menuItems) {
      item.addEventListener('click', function () {
        const breadBtn = document.getElementById('bread-menu');
        if (!breadBtn || responsiveMenu.dataset.state !== 'Close') return;
        breadBtn.click();
      });
    }
  } catch (error) {
    console.error('set bread menu auto closer - ', error);
  }
}

/**
 * @returns {void}
 * @description remove loader
 */
function removeLoader() {
  try {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const manImage = document.querySelector('img.man');
    if (!manImage || manImage.complete) {
      loader.style.visibility = 'hidden';
      loader.style.opacity = 0;
      return;
    }

    const event = manImage.addEventListener('load', function () {
      loader.style.visibility = 'hidden';
      loader.style.opacity = 0;
      removeEventListener(event);
    });
  } catch (error) {
    console.error('remove loader - ', error);
  }
}

/**
 * @returns {void}
 * @description set home section description text
 */
function setHomeSectionDescription() {
  try {
    const homeDescription = document.getElementById('home-description');
    if (!homeDescription) return;

    homeDescription.textContent = `I’m a full-stack developer with ${new Date().getFullYear() - 2020} years of experience in both MERN and MEAN stacks, blending creativity with precision to craft seamless, innovative solutions.`;
  } catch (error) {
    console.error('set home section description - ', error);
  }
}

/**
 * @returns {void}
 * @description set typing effect on home section
 */
function setTypeingEffect() {
  try {
    const names = [
      "Rushil Shah.",
      'Open Source Contributor.',
      "Chess Enthusiast.",
      "Developer."
    ];
    const typingSpeed = 100; // Speed of typing
    const erasingSpeed = 50; // Speed of erasing
    const pauseTime = 1000; // Time before erasing
    const board = document.getElementById('board');
    let index = 0;
    let charIndex = 0;
    let currentName = '';

    function type() {
      if (charIndex < currentName.length) {
        board.textContent += currentName.charAt(charIndex);
        ++charIndex;
        setTimeout(type, typingSpeed);
      } else {
        // After typing the current sentence, pause before erasing
        setTimeout(erase, pauseTime);
      }
    }

    function erase() {
      if (charIndex > 0) {
        board.textContent = currentName.substring(0, charIndex - 1);
        --charIndex;
        setTimeout(erase, erasingSpeed);
      } else {
        // Move to the next text in the array after erasing
        index = index + 1 < names.length ? index + 1 : 0;
        currentName = names[index];
        setTimeout(type, typingSpeed);
      }
    }

    currentName = names[index];
    type();
  } catch (error) {
    console.error('set typeing effect - ', error);
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
    setBreadMenuAnimation();
    setBreadMenuAutoCloser();
    setHomeSectionDescription();
    setFooter();
    setTypeingEffect();
    removeLoader();
  } catch (error) {
    console.error('App initalizatin failed - ', error);
  }
}

'use strict';
var localStorage = new LocalStorage();
var console = new Console(localStorage);
var theme = localStorage.getItem('THEME') || (window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? Theme.DARK : Theme.LIGHT); // checking system dark mode is enable or not
init();