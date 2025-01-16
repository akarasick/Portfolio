import { LocalStorage } from './localstorge.js';

/**
 * @exports
 * @class console
 * @description - console class adapter class
 */
export class Console {
  #localStorage;

  /**
   * @constructor
   * @param {LocalStorage} [localStorage]
   */
  constructor(localStorage) {
    this.#localStorage = localStorage || new LocalStorage();
  }

  /**
   * @private
   * @returns {void}
   * @param {Function} logger
   * @param {string} style
   * @description adapter for logging on console
   */
  #print(logger, style) {
    if (this.#localStorage.getItem('LOGGING') !== '1') return;

    const timestamp = new Date().toISOString();
    const message = arguments[2];
    const args = Array.from(arguments);
    args.splice(0, 3);
    logger(`%c${timestamp} ::: ${message}`, style, ...args);
  }

  /**
  * @public
  * @returns {void}
  * @description equivalent to console.log
  */
  log() {
    this.#print(console.log, 'font-weight: bold', ...arguments);
  }

  /**
  * @public
  * @returns {void}
  * @description equivalent to console.error
  */
  error() {
    this.#print(console.error, 'font-weight: bold', ...arguments);
  }
}