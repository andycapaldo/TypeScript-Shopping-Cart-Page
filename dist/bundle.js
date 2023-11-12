/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

class User {
    static createUser(name, age) {
        if (age < 0) {
            throw new Error('Invalid age. Age must be a number greater than zero.');
        }
        document.getElementById("cartdiv").style.visibility = "visible";
        document.getElementById("shop").style.visibility = "visible";
        document.getElementById("login").remove();
        const newUser = new User(name, age);
        return newUser;
    }
    constructor(_name, _age, _cart = [], _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._age = _age;
        this._cart = _cart;
        this._id = _id;
    }
    addToCart(item) {
        this.cart.push(item);
        Shop.updateCart();
    }
    removeFromCart(itemToRemove) {
        this.cart = this.cart.filter(item => item.id !== itemToRemove.id);
        Shop.updateCart();
    }
    removeQuantityFromCart(itemToRemove, quantity) {
        for (let i = 0; i < quantity; i++) {
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
        Shop.updateCart();
    }
    cartTotal() {
        let total = 0;
        for (let x of this.cart) {
            total += x.price;
        }
        return total;
    }
    printCart() {
        for (let x of this.cart) {
            console.log(x.name);
        }
    }
    cartHTMLElement() {
        const cart = document.createElement('table');
        for (const item of new Set(this.cart)) {
            const minusOne = document.createElement("button");
            minusOne.id = `${item.id}-minus1`;
            minusOne.classList.add("btn", "btn-danger");
            minusOne.onclick = () => {
                Shop.myUser.removeQuantityFromCart(item, 1);
            };
            minusOne.innerText = "-1";
            const removeAll = document.createElement('button');
            removeAll.id = `${item.id}-removeall`;
            removeAll.innerText = "X";
            removeAll.classList.add("btn", "btn-dark-red", "btn-danger");
            removeAll.onclick = () => {
                Shop.myUser.removeFromCart(item);
            };
            cart.innerHTML += `<tr><td><strong>${item.name}</strong></td><td>$${item.price}</td>
            <td>${this.cart.filter((i) => i.id === item.id).length}</td>
            <td>${removeAll.outerHTML}</td>
            <td>${minusOne.outerHTML}</td>
            </tr>`;
        }
        ;
        cart.innerHTML += `<tr id="totalbar"><td><strong>${"Total:"}</strong></td><td>$${this.cartTotal().toFixed(2)}</td></tr>`;
        return cart;
    }
    addRemoveEventListeners() {
        for (const item of new Set(this.cart)) {
            const removeOne = document.getElementById(`${item.id}-minus1`) || null;
            if (removeOne) {
                removeOne.onclick = () => {
                    Shop.myUser.removeQuantityFromCart(item, 1);
                };
            }
            const removeAll = document.getElementById(`${item.id}-removeall`) || null;
            if (removeAll) {
                removeAll.onclick = () => {
                    Shop.myUser.removeFromCart(item);
                };
            }
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get cart() {
        return this._cart;
    }
    set cart(value) {
        this._cart = value;
    }
}
class Item {
    constructor(_name, _price, _description, _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._price = _price;
        this._description = _description;
        this._id = _id;
    }
    itemElement() {
        const displayShop = document.createElement('div');
        displayShop.classList.add('col-4');
        displayShop.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text">${this.price}</p>
                <button type="submit" class="btn" id="addtocart">Add to Cart</button>
            </div>
        </div>`;
        const addToCart = displayShop.querySelector("#addtocart");
        addToCart.onclick = () => {
            Shop.myUser.addToCart(this);
        };
        return displayShop;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
class Shop {
    constructor() {
        const item1 = new Item("Source Magazine", 8.99, "A copy of the latest issue of Source Magazine.");
        const item2 = new Item("Pack of Gum", 2.99, "35 pack of Wrigley's Polar Ice EXTRA chewing gum.");
        const item3 = new Item("ChapStick", 3.99, "A small container of lip moisturizer.");
        const item4 = new Item("Notebook", 19.99, "128-page College-Ruled Notebook");
        const item5 = new Item("Wireless Keyboard", 98.99, "Logitech MX Keys Wireless Keyboard");
        const item6 = new Item("Wireless Headset", 79.99, "Logitech G535 Lightspeed Wireless Gaming Headset");
        this._items = [item1, item2, item3, item4, item5, item6];
        this.showItems();
        Shop.myUser.cart = [];
        Shop.updateCart();
    }
    showItems() {
        for (let item of this.items) {
            document.getElementById("shop").appendChild(item.itemElement());
        }
    }
    static updateCart() {
        const cartDiv = document.getElementById("cartdiv");
        if (Shop.myUser.cart.length <= 0) {
            cartDiv.innerHTML =
                `<h2 id="cart-header">${Shop.myUser.name}'s Cart</h2>
            <p>Cart is Empty</p>`;
        }
        else {
            cartDiv.replaceChildren(Shop.myUser.cartHTMLElement());
            cartDiv.innerHTML = (`<h2 id="cart-header">${Shop.myUser.name}'s Cart</h2>` + cartDiv.innerHTML);
            Shop.myUser.addRemoveEventListeners();
        }
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    static loginUser(e) {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const ageInput = document.getElementById("age");
        Shop.myUser = User.createUser(nameInput.value, parseInt(ageInput.value));
        new Shop();
    }
}
document.getElementById("loginbutton").addEventListener("click", (e) => Shop.loginUser(e));

})();

/******/ })()
;