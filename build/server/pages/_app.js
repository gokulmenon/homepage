/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./lib/ga/index.js":
/*!*************************!*\
  !*** ./lib/ga/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   event: () => (/* binding */ event),\n/* harmony export */   pageview: () => (/* binding */ pageview)\n/* harmony export */ });\n// log the pageview with their URL\nconst pageview = (url)=>{\n    if (false) {}\n};\n// log specific events happening.\nconst event = ({ action, params })=>{\n    if (false) {}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvZ2EvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrQ0FBa0M7QUFDM0IsTUFBTUEsV0FBVyxDQUFDQztJQUN2QixJQUFJLEtBQTRDLEVBQUUsRUFJakQ7QUFDSCxFQUFDO0FBRUQsaUNBQWlDO0FBQzFCLE1BQU1PLFFBQVEsQ0FBQyxFQUFFQyxNQUFNLEVBQUVDLE1BQU0sRUFBRTtJQUNyQyxJQUFJLEtBQTRDLEVBQUUsRUFFakQ7QUFDSixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ29rdWxfbmV4dGpzX2hvbWVwYWdlLy4vbGliL2dhL2luZGV4LmpzPzlhNzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbG9nIHRoZSBwYWdldmlldyB3aXRoIHRoZWlyIFVSTFxuZXhwb3J0IGNvbnN0IHBhZ2V2aWV3ID0gKHVybCkgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lmd0YWcpIHtcbiAgICB3aW5kb3cuZ3RhZygnY29uZmlnJywgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR09PR0xFX0FOQUxZVElDU19JRCwge1xuICAgICAgcGFnZV9wYXRoOiB1cmwsXG4gICAgfSlcbiAgfVxufVxuXG4vLyBsb2cgc3BlY2lmaWMgZXZlbnRzIGhhcHBlbmluZy5cbmV4cG9ydCBjb25zdCBldmVudCA9ICh7IGFjdGlvbiwgcGFyYW1zIH0pID0+IHtcbiAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZ3RhZykge1xuICAgIHdpbmRvdy5ndGFnKCdldmVudCcsIGFjdGlvbiwgcGFyYW1zKVxuICAgfVxufVxuIl0sIm5hbWVzIjpbInBhZ2V2aWV3IiwidXJsIiwid2luZG93IiwiZ3RhZyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19HT09HTEVfQU5BTFlUSUNTX0lEIiwicGFnZV9wYXRoIiwiZXZlbnQiLCJhY3Rpb24iLCJwYXJhbXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/ga/index.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/script */ \"./node_modules/next/script.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_ga__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/ga */ \"./lib/ga/index.js\");\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/main.scss */ \"./styles/main.scss\");\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleRouteChange = (url)=>{\n            _lib_ga__WEBPACK_IMPORTED_MODULE_4__.pageview(url);\n        };\n        router.events.on(\"routeChangeComplete\", handleRouteChange);\n        return ()=>{\n            router.events.off(\"routeChangeComplete\", handleRouteChange);\n        };\n    }, [\n        router.events\n    ]);\n    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || process.env.CLARITY_ID;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        strategy: \"afterInteractive\",\n                        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`\n                    }, void 0, false, {\n                        fileName: \"/home/hatch/workspace/homepage-migration/homepage/pages/_app.js\",\n                        lineNumber: 26,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        id: \"gtag-init\",\n                        strategy: \"afterInteractive\",\n                        children: `\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);} \n              gtag('js', new Date());\n              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', { page_path: window.location.pathname });\n            `\n                    }, void 0, false, {\n                        fileName: \"/home/hatch/workspace/homepage-migration/homepage/pages/_app.js\",\n                        lineNumber: 30,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        id: \"gtm-init\",\n                        strategy: \"afterInteractive\",\n                        children: `\n              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n              })(window,document,'script','dataLayer','GTM-WSBBKQ9');\n            `\n                    }, void 0, false, {\n                        fileName: \"/home/hatch/workspace/homepage-migration/homepage/pages/_app.js\",\n                        lineNumber: 38,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true),\n            clarityId && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {\n                src: `https://www.clarity.ms/tag/${clarityId}`,\n                strategy: \"lazyOnload\"\n            }, void 0, false, {\n                fileName: \"/home/hatch/workspace/homepage-migration/homepage/pages/_app.js\",\n                lineNumber: 51,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/hatch/workspace/homepage-migration/homepage/pages/_app.js\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDTTtBQUNQO0FBRUQ7QUFDSDtBQUU1QixTQUFTSSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE1BQU1DLFNBQVNOLHNEQUFTQTtJQUN4QkQsZ0RBQVNBLENBQUM7UUFDUixNQUFNUSxvQkFBb0IsQ0FBQ0M7WUFDekJOLDZDQUFXLENBQUNNO1FBQ2Q7UUFDQUYsT0FBT0ksTUFBTSxDQUFDQyxFQUFFLENBQUMsdUJBQXVCSjtRQUN4QyxPQUFPO1lBQ0xELE9BQU9JLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLHVCQUF1Qkw7UUFDM0M7SUFDRixHQUFHO1FBQUNELE9BQU9JLE1BQU07S0FBQztJQUVsQixNQUFNRyxZQUFZQyxRQUFRQyxHQUFHLENBQUNDLHNCQUFzQixJQUFJRixRQUFRQyxHQUFHLENBQUNFLFVBQVU7SUFFOUUscUJBQ0U7O1lBQ0dILFFBQVFDLEdBQUcsQ0FBQ0csK0JBQStCLGtCQUMxQzs7a0NBQ0UsOERBQUNqQixvREFBTUE7d0JBQ0xrQixVQUFTO3dCQUNUQyxLQUFLLENBQUMsNENBQTRDLEVBQUVOLFFBQVFDLEdBQUcsQ0FBQ0csK0JBQStCLENBQUMsQ0FBQzs7Ozs7O2tDQUVuRyw4REFBQ2pCLG9EQUFNQTt3QkFBQ29CLElBQUc7d0JBQVlGLFVBQVM7a0NBQzdCLENBQUM7Ozs7OEJBSWdCLEVBQUVMLFFBQVFDLEdBQUcsQ0FBQ0csK0JBQStCLENBQUM7WUFDaEUsQ0FBQzs7Ozs7O2tDQUVILDhEQUFDakIsb0RBQU1BO3dCQUFDb0IsSUFBRzt3QkFBV0YsVUFBUztrQ0FDNUIsQ0FBQzs7Ozs7O1lBTUYsQ0FBQzs7Ozs7Ozs7WUFLTk4sMkJBQ0MsOERBQUNaLG9EQUFNQTtnQkFDTG1CLEtBQUssQ0FBQywyQkFBMkIsRUFBRVAsVUFBVSxDQUFDO2dCQUM5Q00sVUFBUzs7Ozs7OzBCQUliLDhEQUFDZjtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7OztBQUc5QjtBQUVBLGlFQUFlRixLQUFLQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ29rdWxfbmV4dGpzX2hvbWVwYWdlLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgU2NyaXB0IGZyb20gJ25leHQvc2NyaXB0J1xuXG5pbXBvcnQgKiBhcyBnYSBmcm9tICcuLi9saWIvZ2EnXG5pbXBvcnQgJy4uL3N0eWxlcy9tYWluLnNjc3MnXG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVJvdXRlQ2hhbmdlID0gKHVybCkgPT4ge1xuICAgICAgZ2EucGFnZXZpZXcodXJsKVxuICAgIH1cbiAgICByb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgaGFuZGxlUm91dGVDaGFuZ2UpXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgaGFuZGxlUm91dGVDaGFuZ2UpXG4gICAgfVxuICB9LCBbcm91dGVyLmV2ZW50c10pXG5cbiAgY29uc3QgY2xhcml0eUlkID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0xBUklUWV9JRCB8fCBwcm9jZXNzLmVudi5DTEFSSVRZX0lEXG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dPT0dMRV9BTkFMWVRJQ1NfSUQgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxTY3JpcHRcbiAgICAgICAgICAgIHN0cmF0ZWd5PVwiYWZ0ZXJJbnRlcmFjdGl2ZVwiXG4gICAgICAgICAgICBzcmM9e2BodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPSR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR09PR0xFX0FOQUxZVElDU19JRH1gfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNjcmlwdCBpZD1cImd0YWctaW5pdFwiIHN0cmF0ZWd5PVwiYWZ0ZXJJbnRlcmFjdGl2ZVwiPlxuICAgICAgICAgICAge2BcbiAgICAgICAgICAgICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gICAgICAgICAgICAgIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO30gXG4gICAgICAgICAgICAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgIGd0YWcoJ2NvbmZpZycsICcke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dPT0dMRV9BTkFMWVRJQ1NfSUR9JywgeyBwYWdlX3BhdGg6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSB9KTtcbiAgICAgICAgICAgIGB9XG4gICAgICAgICAgPC9TY3JpcHQ+XG4gICAgICAgICAgPFNjcmlwdCBpZD1cImd0bS1pbml0XCIgc3RyYXRlZ3k9XCJhZnRlckludGVyYWN0aXZlXCI+XG4gICAgICAgICAgICB7YFxuICAgICAgICAgICAgICAoZnVuY3Rpb24odyxkLHMsbCxpKXt3W2xdPXdbbF18fFtdO3dbbF0ucHVzaCh7J2d0bS5zdGFydCc6XG4gICAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpLGV2ZW50OidndG0uanMnfSk7dmFyIGY9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxcbiAgICAgICAgICAgICAgaj1kLmNyZWF0ZUVsZW1lbnQocyksZGw9bCE9J2RhdGFMYXllcic/JyZsPScrbDonJztqLmFzeW5jPXRydWU7ai5zcmM9XG4gICAgICAgICAgICAgICdodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndG0uanM/aWQ9JytpK2RsO2YucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaixmKTtcbiAgICAgICAgICAgICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCdkYXRhTGF5ZXInLCdHVE0tV1NCQktROScpO1xuICAgICAgICAgICAgYH1cbiAgICAgICAgICA8L1NjcmlwdD5cbiAgICAgICAgPC8+XG4gICAgICApfVxuXG4gICAgICB7Y2xhcml0eUlkICYmIChcbiAgICAgICAgPFNjcmlwdFxuICAgICAgICAgIHNyYz17YGh0dHBzOi8vd3d3LmNsYXJpdHkubXMvdGFnLyR7Y2xhcml0eUlkfWB9XG4gICAgICAgICAgc3RyYXRlZ3k9XCJsYXp5T25sb2FkXCJcbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIlNjcmlwdCIsImdhIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJyb3V0ZXIiLCJoYW5kbGVSb3V0ZUNoYW5nZSIsInVybCIsInBhZ2V2aWV3IiwiZXZlbnRzIiwib24iLCJvZmYiLCJjbGFyaXR5SWQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQ0xBUklUWV9JRCIsIkNMQVJJVFlfSUQiLCJORVhUX1BVQkxJQ19HT09HTEVfQU5BTFlUSUNTX0lEIiwic3RyYXRlZ3kiLCJzcmMiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();