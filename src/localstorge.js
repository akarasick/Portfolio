/**
 * @exports
 * @class LocalStorage
 * @description - local storage middleware
 */
export class LocalStorage {

  #PREFIX = 'RSP-';

  /**
   * @public
   * @returns {string}
   * @description get item from local storage
   */
  getItem(key) {
    return localStorage.getItem(`${this.#PREFIX}${key.toUpperCase()}`);
  }

  /**
   * @public
   * @returns {void}
   * @param {string} key
   * @param {string} value
   * @description - set item into local storage
   */
  setItem(key, value) {
    localStorage.setItem(`${this.#PREFIX}${key.toUpperCase()}`, value);
  }

  /**
   * @public
   * @returns {void}
   * @param {string} key
   * @description - remove item from local storage
   */
  removeItem(key) {
    localStorage.removeItem(`${this.#PREFIX}${key.toUpperCase()}`, value);
  }
}