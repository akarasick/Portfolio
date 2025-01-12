/**
 * @exports
 * @class console
 * @description - console class adapter class
 */
export class Console {
  #isLogEnabled = false;

  /**
   * @constructor
   * @param {boolean} [isLogEnabled]
   */
  constructor(isLogEnabled) {
    if (isLogEnabled !== undefined) this.#isLogEnabled = isLogEnabled;
  }

  /**
   * @public
   * @returns {void}
   * @param {Function} logger
   * @param {string} style
   * @description adapter for logging on console
   */
  print(logger, style) {
    if (!this.#isLogEnabled) return;

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
    this.print(console.log, 'font-weight: bold', ...arguments);
  }

  /**
  * @public
  * @returns {void}
  * @description equivalent to console.error
  */
  error() {
    this.print(console.error, 'font-weight: bold', ...arguments);
  }

  /**
   * @setter
   * @public
   * @returns {void}
   * @param {boolean} value
   * @description set logging enable/disable
   */
  set setLogging(value) {
    this.#isLogEnabled = value;
  }
}