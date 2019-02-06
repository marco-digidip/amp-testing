(self.AMP=self.AMP||[]).push({n:"amp-digidip",v:"1902061022201",f:(function(AMP,_){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.AmpDigidip = void 0;

var _linkShifter = require("./link-shifter");

var _services = require("../../../src/services");

var _digidipOptions = require("./digidip-options");

var _helper = require("./helper");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AmpDigidip =
/*#__PURE__*/
function (_AMP$BaseElement) {
  _inheritsLoose(AmpDigidip, _AMP$BaseElement);

  /** @param {!AmpElement} element */
  function AmpDigidip(element) {
    var _this;

    _this = _AMP$BaseElement.call(this, element) || this;
    /** @private {?../../../src/service/ampdoc-impl.AmpDoc} */

    _this.ampDoc_ = null;
    /** @private {?../../../src/service/viewer-impl.Viewer} */

    _this.viewer_ = null;
    /* @private {?./link-shifter} */

    _this.shifter_ = null;
    /** @private {?Object} */

    _this.digidipOpts_ = {};
    return _this;
  }
  /** @override */


  var _proto = AmpDigidip.prototype;

  _proto.buildCallback = function buildCallback() {
    var _this2 = this;

    this.ampDoc_ = this.getAmpDoc();
    this.viewer_ = _services.Services.viewerForDoc(this.ampDoc_);
    this.digidipOpts_ = (0, _digidipOptions.getDigidipOptions)(this.element);
    return this.ampDoc_.whenBodyAvailable().then(function () {
      _this2.letsRockIt_();
    });
  };
  /**
   * @private
   */


  _proto.letsRockIt_ = function letsRockIt_() {
    var _this3 = this;

    var list = (0, _helper.getScopeElements)(this.ampDoc_, this.digidipOpts_);
    this.shifter_ = new _linkShifter.LinkShifter(this.element, this.viewer_, this.ampDoc_);
    list.forEach(function (nodeElement) {
      nodeElement.addEventListener('click', function (event) {
        _this3.shifter_.clickHandler(event);
      }, false);
      nodeElement.addEventListener('contextmenu', function (event) {
        _this3.shifter_.clickHandler(event);
      }, false);
    });
  };
  /** @override */


  _proto.isLayoutSupported = function isLayoutSupported() {
    return true;
  };

  return AmpDigidip;
}(AMP.BaseElement);

exports.AmpDigidip = AmpDigidip;
AMP.extension('amp-digidip', '0.1', function (AMP) {
  AMP.registerElement('amp-digidip', AmpDigidip);
});

},{"../../../src/services":28,"./digidip-options":3,"./helper":4,"./link-shifter":5}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.CTX_ATTR_VALUE = exports.CTX_ATTR_NAME = void 0;

/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CTX_ATTR_NAME = 'digidipctx';
exports.CTX_ATTR_NAME = CTX_ATTR_NAME;

var CTX_ATTR_VALUE = function CTX_ATTR_VALUE() {
  return Date.now();
};

exports.CTX_ATTR_VALUE = CTX_ATTR_VALUE;

},{}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getDigidipOptions = getDigidipOptions;

var _log = require("../../../src/log");

/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var errors = {
  REQUIRED_PUB_ID: 'attribute publisher-id is required'
};
/**
 * @param {!AmpElement} element
 * @return {!Object}
 */

function getDigidipOptions(element) {
  return {
    publisherId: getPublisherId(element),
    urlWorddipWords: element.getAttribute('url-worddip-words'),
    useWorddip: element.getAttribute('use-worddip'),
    newTab: element.getAttribute('new-tab'),
    encodedXhrCredentials: element.getAttribute('encoded-xhr-credentials'),
    hostsIgnore: element.getAttribute('hosts-ignore'),
    readingWordsExclude: element.getAttribute('reading-words-exclude'),
    elementClickhandler: element.getAttribute('element-clickhandler'),
    elementClickhandlerAttribute: element.getAttribute('element-clickhandler-attribute'),
    elementIgnoreAttribute: element.getAttribute('element-ignore-attribute'),
    elementIgnorePattern: element.getAttribute('element-ignore-pattern'),
    elementIgnoreConsiderParents: element.getAttribute('element-ignore-consider-parents')
  };
}
/**
 * @param {*} condition
 * @param {string} message
 */


function enforceDigipOptions(condition, message) {
  (0, _log.userAssert)(condition, "<amp-digidip> something is wrong with option: " + message);
}
/**
 * @param {!Element} element
 * @return {string}
 */


function getPublisherId(element) {
  var publisherId = element.getAttribute('publisher-id');
  enforceDigipOptions(publisherId, errors.REQUIRED_PUB_ID);
  return publisherId;
}

},{"../../../src/log":14}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getScopeElements = getScopeElements;

/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * @param {?../../../src/service/ampdoc-impl.AmpDoc} ampDoc
 * @param {!Object}  digidipOpts
 * @return {*}
 */
function getScopeElements(ampDoc, digidipOpts) {
  var doc = ampDoc.getRootNode();
  var scope = '';
  var scopeElements = doc.querySelectorAll('*');

  if (digidipOpts.elementClickhandlerAttribute !== '' && digidipOpts.elementClickhandler !== '') {
    if (digidipOpts.elementClickhandlerAttribute === 'id') {
      scope = '#' + digidipOpts.elementClickhandler;
      scopeElements = doc.querySelectorAll(scope);
    } else if (digidipOpts.elementClickhandlerAttribute === 'class') {
      scope = '.' + digidipOpts.elementClickhandler;
      var classElements = doc.querySelectorAll(scope);
      classElements = Object.keys(classElements).map(function (key) {
        return classElements[key];
      });

      if (classElements.length > 0) {
        classElements = classElements.filter(function (item) {
          for (var i in classElements) {
            if (classElements[i].contains(item) && classElements[i] !== item) {
              return false;
            }
          }

          return true;
        });
        scopeElements = classElements;
      }
    }
  }

  return scopeElements;
}

},{}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.LinkShifter = void 0;

var _constants = require("./constants");

var _digidipOptions = require("./digidip-options");

/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LinkShifter =
/*#__PURE__*/
function () {
  /**
   * @param {!AmpElement} ampElement
   * @param {?../../../src/service/viewer-impl.Viewer} viewer
   * @param {?../../../src/service/ampdoc-impl.AmpDoc} ampDoc
   */
  function LinkShifter(ampElement, viewer, ampDoc) {
    /** @private {?../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = viewer;
    /** @private {?../../../src/service/ampdoc-impl.AmpDoc} */

    this.ampDoc_ = ampDoc;
    /** @private {?Event} */

    this.event_ = null;
    /** @private {?Object} */

    this.digidipOpts_ = (0, _digidipOptions.getDigidipOptions)(ampElement);
    /** @private {?RegExp} */

    this.regexDomainUrl_ = /^https?:\/\/(www\.)?([^\/:]*)(:\d+)?(\/.*)?$/;
  }
  /**
   * @param {!Event} event
   */


  var _proto = LinkShifter.prototype;

  _proto.clickHandler = function clickHandler(event) {
    this.event_ = event;
    var htmlElement = event.srcElement;
    var trimmedDomain = this.viewer_.win.document.domain.replace(/(www\.)?(.*)/, '$2');
    this.event_.stopPropagation(); // avoid firefox to trigger the event twice

    if (this.event_.type !== 'contextmenu' && this.event_.button === 2) {
      return;
    } // check if the element or a parent element of it is a link in case we got
    // a element that is child of the link element that we need


    while (htmlElement && htmlElement.nodeName !== 'A') {
      htmlElement = htmlElement.parentNode;
    } // if we could not find a valid link element, there's nothing to do


    if (!htmlElement) {
      return;
    } // check if there is a ignore_attribute and and ignore_pattern defined
    // and check if the current element or it's parent has it


    if (this.checkIsIgnore_(htmlElement)) {
      return;
    }

    if (this.wasShifted_(htmlElement)) {
      return;
    }

    if (this.isInternalLink(htmlElement, trimmedDomain)) {
      return;
    }

    if (this.isOnBlackList_(htmlElement)) {
      return;
    }

    this.setDigidipUrl_(htmlElement);
  };
  /**
   * Check if the anchor element is placed in a section that
   * has being mark to ignore the anchors inside
   * @param {!Node} htmlElement
   */


  _proto.checkIsIgnore_ = function checkIsIgnore_(htmlElement) {
    var _this = this;

    var isIgnore = Boolean(this.digidipOpts_.elementIgnoreAttribute !== '' && this.digidipOpts_.elementIgnorePattern !== '');

    if (!isIgnore) {
      return false;
    }

    if (this.digidipOpts_.elementIgnoreConsiderParents === '1') {
      var _ret = function () {
        var rootNode = htmlElement.getRootNode();
        var parentSearch = htmlElement;

        while (parentSearch && [rootNode].filter(function (subItem) {
          return subItem === parentSearch;
        }).length === 0 && parentSearch !== document) {
          if (_this.hasPassCondition_(parentSearch)) {
            return {
              v: true
            };
          }

          parentSearch = parentSearch.parentNode;
        }
      }();

      if (typeof _ret === "object") return _ret.v;
    } else {
      if (this.hasPassCondition_(htmlElement)) {
        return true;
      }
    }

    if (this.digidipOpts_.elementClickhandler !== '') {
      // Note: Normally, this should not be necessary, because during the init
      // phase, we only subscribe to the events of the defined
      // element_clickhandler, but we had cases where the
      // respective element was not available at this
      // time. So following code is only for the 1% where
      // it doesn't work. :-(
      var selector = '#' + this.digidipOpts_.elementClickhandler;
      var elmTmpRootNode = htmlElement.getRootNode().querySelectorAll(selector);

      if (elmTmpRootNode && this.containsNode_(elmTmpRootNode, htmlElement)) {
        return true;
      }
    }

    return false;
  };
  /**
   * @param {!Object} NodeList
   * @param {!Node} node
   * @return {boolean}
   * @private
   */


  _proto.containsNode_ = function containsNode_(NodeList, node) {
    var result = false;
    Object.keys(NodeList).forEach(function (key) {
      if (NodeList[key].contains(node)) {
        result = true;
      }
    });
    return result;
  };
  /**
   * Check if the element has set the condition to ignore
   * @param {!Node} htmlElement
   */


  _proto.hasPassCondition_ = function hasPassCondition_(htmlElement) {
    var attributeValue = null;

    if (htmlElement.hasAttribute(this.digidipOpts_.elementIgnoreAttribute)) {
      attributeValue = htmlElement.getAttribute(this.digidipOpts_.elementIgnoreAttribute);
      var searchAttr = attributeValue.search(this.digidipOpts_.elementIgnorePattern);

      if (searchAttr !== -1) {
        return true;
      }
    }

    return false;
  };
  /**
   * Check if the anchor element was already shifted
   * @param {!Node} htmlElement
   * @return {boolean}
   * @private
   */


  _proto.wasShifted_ = function wasShifted_(htmlElement) {
    var ctxAttrValue = (0, _constants.CTX_ATTR_VALUE)().toString();
    return htmlElement.hasAttribute(_constants.CTX_ATTR_NAME) && htmlElement.getAttribute(_constants.CTX_ATTR_NAME) === ctxAttrValue;
  };
  /**
   * Check if the anchor element leads to an internal link
   * @param {!Node} htmlElement
   * @param {?string} trimmedDomain
   * @return {boolean}
   */


  _proto.isInternalLink = function isInternalLink(htmlElement, trimmedDomain) {
    var href = htmlElement.getAttribute('href');

    if (!(href && this.regexDomainUrl_.test(href) && RegExp.$2 !== trimmedDomain)) {
      return true;
    }

    return false;
  };
  /**
   * Check if the domain of the link is in a blacklist
   * @param {!Node} htmlElement
   * @return {boolean}
   * @private
   */


  _proto.isOnBlackList_ = function isOnBlackList_(htmlElement) {
    var href = htmlElement.getAttribute('href');
    this.regexDomainUrl_.test(href);
    var targetHost = RegExp.$2;

    if (this.digidipOpts_.hostsIgnore.length > 0) {
      var targetTest = new RegExp('(' + this.digidipOpts_.hostsIgnore.replace(/[\.]/g, '\\$&').replace(/'/g, "''") + ')$', 'i');

      if (targetTest.test(targetHost)) {
        return true;
      }
    }

    return false;
  };
  /**
   * set the digidip tracking link
   * @param {!Node} htmlElement
   */


  _proto.setDigidipUrl_ = function setDigidipUrl_(htmlElement) {
    var _this2 = this;

    var oldValHref = htmlElement['href'];
    var oldValTarget = htmlElement['target'];
    this.viewer_.getReferrerUrl().then(function (referrerUrl) {
      var urlParams = {
        ppRef: referrerUrl,
        currUrl: _this2.viewer_.getResolvedViewerUrl()
      };
      htmlElement.href = _this2.getDigidipUrl(htmlElement, urlParams);

      if (_this2.digidipOpts_.newTab === '1') {
        htmlElement.target = '_blank';
      } // If the link has been "activated" via contextmenu,
      // we have to keep the shifting in mind


      if (_this2.event_.type === 'contextmenu') {
        htmlElement.setAttribute(_constants.CTX_ATTR_NAME, (0, _constants.CTX_ATTR_VALUE)());
      }

      _this2.viewer_.win.setTimeout(function () {
        htmlElement.href = oldValHref;

        if (oldValTarget === '') {
          htmlElement.removeAttribute('target');
        } else {
          htmlElement.target = oldValTarget;
        }

        if (htmlElement.hasAttribute(_constants.CTX_ATTR_NAME)) {
          htmlElement.removeAttribute(_constants.CTX_ATTR_NAME);
        }
      }, _this2.event_.type === 'contextmenu' ? 15000 : 500);
    });
  };
  /**
   * @param {!Node} htmlElement
   * @param {!Object} urlParams
   * @return {string}
   */


  _proto.getDigidipUrl = function getDigidipUrl(htmlElement, urlParams) {
    return this.getUrlVisit_() + encodeURIComponent(htmlElement.href) + (htmlElement.rev ? '&ref=' + encodeURIComponent(htmlElement.rev) : '') + (htmlElement.getAttribute('data-ddid') ? '&wd_id=' + encodeURIComponent(htmlElement.getAttribute('data-ddid')) : '') + (urlParams.ppRef ? '&ppref=' + encodeURIComponent(urlParams.ppRef) : '') + (urlParams.currUrl ? '&currurl=' + encodeURIComponent(urlParams.currUrl) : '');
  };
  /**
   * @return {string}
   * @private
   */


  _proto.getUrlVisit_ = function getUrlVisit_() {
    return 'http://' + this.digidipOpts_.publisherId + '.digidip.net/visit?url=';
  };

  return LinkShifter;
}();

exports.LinkShifter = LinkShifter;

},{"./constants":2,"./digidip-options":3}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.installCustomElements = installCustomElements;

/*!

Copyright (C) 2014-2016 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
// global window Object
// optional polyfill info
//    'auto' used by default, everything is feature detected
//    'force' use the polyfill even if not fully needed
function installCustomElements(window, polyfill) {
  'use strict'; // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
  // THIS FILE IS JUST WRAPPED UP RESULTING IN
  // build/document-register-element.node.js

  var document = window.document,
      Object = window.Object;

  var htmlClass = function (info) {
    // (C) Andrea Giammarchi - @WebReflection - MIT Style
    var catchClass = /^[A-Z]+[a-z]/,
        filterBy = function filterBy(re) {
      var arr = [],
          tag;

      for (tag in register) {
        if (re.test(tag)) arr.push(tag);
      }

      return arr;
    },
        add = function add(Class, tag) {
      tag = tag.toLowerCase();

      if (!(tag in register)) {
        register[Class] = (register[Class] || []).concat(tag);
        register[tag] = register[tag.toUpperCase()] = Class;
      }
    },
        register = (Object.create || Object)(null),
        htmlClass = {},
        i,
        section,
        tags,
        Class;

    for (section in info) {
      for (Class in info[section]) {
        tags = info[section][Class];
        register[Class] = tags;

        for (i = 0; i < tags.length; i++) {
          register[tags[i].toLowerCase()] = register[tags[i].toUpperCase()] = Class;
        }
      }
    }

    htmlClass.get = function get(tagOrClass) {
      return typeof tagOrClass === 'string' ? register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '') : filterBy(tagOrClass);
    };

    htmlClass.set = function set(tag, Class) {
      return catchClass.test(tag) ? add(tag, Class) : add(Class, tag), htmlClass;
    };

    return htmlClass;
  }({
    "collections": {
      "HTMLAllCollection": ["all"],
      "HTMLCollection": ["forms"],
      "HTMLFormControlsCollection": ["elements"],
      "HTMLOptionsCollection": ["options"]
    },
    "elements": {
      "Element": ["element"],
      "HTMLAnchorElement": ["a"],
      "HTMLAppletElement": ["applet"],
      "HTMLAreaElement": ["area"],
      "HTMLAttachmentElement": ["attachment"],
      "HTMLAudioElement": ["audio"],
      "HTMLBRElement": ["br"],
      "HTMLBaseElement": ["base"],
      "HTMLBodyElement": ["body"],
      "HTMLButtonElement": ["button"],
      "HTMLCanvasElement": ["canvas"],
      "HTMLContentElement": ["content"],
      "HTMLDListElement": ["dl"],
      "HTMLDataElement": ["data"],
      "HTMLDataListElement": ["datalist"],
      "HTMLDetailsElement": ["details"],
      "HTMLDialogElement": ["dialog"],
      "HTMLDirectoryElement": ["dir"],
      "HTMLDivElement": ["div"],
      "HTMLDocument": ["document"],
      "HTMLElement": ["element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr"],
      "HTMLEmbedElement": ["embed"],
      "HTMLFieldSetElement": ["fieldset"],
      "HTMLFontElement": ["font"],
      "HTMLFormElement": ["form"],
      "HTMLFrameElement": ["frame"],
      "HTMLFrameSetElement": ["frameset"],
      "HTMLHRElement": ["hr"],
      "HTMLHeadElement": ["head"],
      "HTMLHeadingElement": ["h1", "h2", "h3", "h4", "h5", "h6"],
      "HTMLHtmlElement": ["html"],
      "HTMLIFrameElement": ["iframe"],
      "HTMLImageElement": ["img"],
      "HTMLInputElement": ["input"],
      "HTMLKeygenElement": ["keygen"],
      "HTMLLIElement": ["li"],
      "HTMLLabelElement": ["label"],
      "HTMLLegendElement": ["legend"],
      "HTMLLinkElement": ["link"],
      "HTMLMapElement": ["map"],
      "HTMLMarqueeElement": ["marquee"],
      "HTMLMediaElement": ["media"],
      "HTMLMenuElement": ["menu"],
      "HTMLMenuItemElement": ["menuitem"],
      "HTMLMetaElement": ["meta"],
      "HTMLMeterElement": ["meter"],
      "HTMLModElement": ["del", "ins"],
      "HTMLOListElement": ["ol"],
      "HTMLObjectElement": ["object"],
      "HTMLOptGroupElement": ["optgroup"],
      "HTMLOptionElement": ["option"],
      "HTMLOutputElement": ["output"],
      "HTMLParagraphElement": ["p"],
      "HTMLParamElement": ["param"],
      "HTMLPictureElement": ["picture"],
      "HTMLPreElement": ["pre"],
      "HTMLProgressElement": ["progress"],
      "HTMLQuoteElement": ["blockquote", "q", "quote"],
      "HTMLScriptElement": ["script"],
      "HTMLSelectElement": ["select"],
      "HTMLShadowElement": ["shadow"],
      "HTMLSlotElement": ["slot"],
      "HTMLSourceElement": ["source"],
      "HTMLSpanElement": ["span"],
      "HTMLStyleElement": ["style"],
      "HTMLTableCaptionElement": ["caption"],
      "HTMLTableCellElement": ["td", "th"],
      "HTMLTableColElement": ["col", "colgroup"],
      "HTMLTableElement": ["table"],
      "HTMLTableRowElement": ["tr"],
      "HTMLTableSectionElement": ["thead", "tbody", "tfoot"],
      "HTMLTemplateElement": ["template"],
      "HTMLTextAreaElement": ["textarea"],
      "HTMLTimeElement": ["time"],
      "HTMLTitleElement": ["title"],
      "HTMLTrackElement": ["track"],
      "HTMLUListElement": ["ul"],
      "HTMLUnknownElement": ["unknown", "vhgroupv", "vkeygen"],
      "HTMLVideoElement": ["video"]
    },
    "nodes": {
      "Attr": ["node"],
      "Audio": ["audio"],
      "CDATASection": ["node"],
      "CharacterData": ["node"],
      "Comment": ["#comment"],
      "Document": ["#document"],
      "DocumentFragment": ["#document-fragment"],
      "DocumentType": ["node"],
      "HTMLDocument": ["#document"],
      "Image": ["img"],
      "Option": ["option"],
      "ProcessingInstruction": ["node"],
      "ShadowRoot": ["#shadow-root"],
      "Text": ["#text"],
      "XMLDocument": ["xml"]
    }
  }); // passed at runtime, configurable
  // via nodejs module


  if (!polyfill) polyfill = 'auto';

  var // V0 polyfill entry
  REGISTER_ELEMENT = 'registerElement',
      // IE < 11 only + old WebKit for attributes + feature detection
  EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),
      // shortcuts and costants
  ADD_EVENT_LISTENER = 'addEventListener',
      ATTACHED = 'attached',
      CALLBACK = 'Callback',
      DETACHED = 'detached',
      EXTENDS = 'extends',
      ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
      ATTACHED_CALLBACK = ATTACHED + CALLBACK,
      CONNECTED_CALLBACK = 'connected' + CALLBACK,
      DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
      CREATED_CALLBACK = 'created' + CALLBACK,
      DETACHED_CALLBACK = DETACHED + CALLBACK,
      ADDITION = 'ADDITION',
      MODIFICATION = 'MODIFICATION',
      REMOVAL = 'REMOVAL',
      DOM_ATTR_MODIFIED = 'DOMAttrModified',
      DOM_CONTENT_LOADED = 'DOMContentLoaded',
      DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
      PREFIX_TAG = '<',
      PREFIX_IS = '=',
      // valid and invalid node names
  validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
      invalidNames = ['ANNOTATION-XML', 'COLOR-PROFILE', 'FONT-FACE', 'FONT-FACE-SRC', 'FONT-FACE-URI', 'FONT-FACE-FORMAT', 'FONT-FACE-NAME', 'MISSING-GLYPH'],
      // registered types and their prototypes
  types = [],
      protos = [],
      // to query subnodes
  query = '',
      // html shortcut used to feature detect
  documentElement = document.documentElement,
      // ES5 inline helpers || basic patches
  indexOf = types.indexOf || function (v) {
    for (var i = this.length; i-- && this[i] !== v;) {}

    return i;
  },
      // other helpers / shortcuts
  OP = Object.prototype,
      hOP = OP.hasOwnProperty,
      iPO = OP.isPrototypeOf,
      defineProperty = Object.defineProperty,
      empty = [],
      gOPD = Object.getOwnPropertyDescriptor,
      gOPN = Object.getOwnPropertyNames,
      gPO = Object.getPrototypeOf,
      sPO = Object.setPrototypeOf,
      // jshint proto: true
  hasProto = !!Object.__proto__,
      // V1 helpers
  fixGetClass = false,
      DRECEV1 = '__dreCEv1',
      customElements = window.customElements,
      usableCustomElements = polyfill !== 'force' && !!(customElements && customElements.define && customElements.get && customElements.whenDefined),
      Dict = Object.create || Object,
      Map = window.Map || function Map() {
    var K = [],
        V = [],
        i;
    return {
      get: function get(k) {
        return V[indexOf.call(K, k)];
      },
      set: function set(k, v) {
        i = indexOf.call(K, k);
        if (i < 0) V[K.push(k) - 1] = v;else V[i] = v;
      }
    };
  },
      Promise = window.Promise || function (fn) {
    var notify = [],
        done = false,
        p = {
      'catch': function _catch() {
        return p;
      },
      'then': function then(cb) {
        notify.push(cb);
        if (done) setTimeout(resolve, 1);
        return p;
      }
    };

    function resolve(value) {
      done = true;

      while (notify.length) {
        notify.shift()(value);
      }
    }

    fn(resolve);
    return p;
  },
      justCreated = false,
      constructors = Dict(null),
      waitingList = Dict(null),
      nodeNames = new Map(),
      secondArgument = function secondArgument(is) {
    return is.toLowerCase();
  },
      // used to create unique instances
  create = Object.create || function Bridge(proto) {
    // silly broken polyfill probably ever used but short enough to work
    return proto ? (Bridge.prototype = proto, new Bridge()) : this;
  },
      // will set the prototype if possible
  // or copy over all properties
  setPrototype = sPO || (hasProto ? function (o, p) {
    o.__proto__ = p;
    return o;
  } : gOPN && gOPD ? function () {
    function setProperties(o, p) {
      for (var key, names = gOPN(p), i = 0, length = names.length; i < length; i++) {
        key = names[i];

        if (!hOP.call(o, key)) {
          defineProperty(o, key, gOPD(p, key));
        }
      }
    }

    return function (o, p) {
      do {
        setProperties(o, p);
      } while ((p = gPO(p)) && !iPO.call(p, o));

      return o;
    };
  }() : function (o, p) {
    for (var key in p) {
      o[key] = p[key];
    }

    return o;
  }),
      // DOM shortcuts and helpers, if any
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      HTMLElementPrototype = (window.HTMLElement || window.Element || window.Node).prototype,
      IE8 = !iPO.call(HTMLElementPrototype, documentElement),
      safeProperty = IE8 ? function (o, k, d) {
    o[k] = d.value;
    return o;
  } : defineProperty,
      isValidNode = IE8 ? function (node) {
    return node.nodeType === 1;
  } : function (node) {
    return iPO.call(HTMLElementPrototype, node);
  },
      targets = IE8 && [],
      attachShadow = HTMLElementPrototype.attachShadow,
      cloneNode = HTMLElementPrototype.cloneNode,
      dispatchEvent = HTMLElementPrototype.dispatchEvent,
      getAttribute = HTMLElementPrototype.getAttribute,
      hasAttribute = HTMLElementPrototype.hasAttribute,
      removeAttribute = HTMLElementPrototype.removeAttribute,
      setAttribute = HTMLElementPrototype.setAttribute,
      // replaced later on
  createElement = document.createElement,
      patchedCreateElement = createElement,
      // shared observer for all attributes
  attributesObserver = MutationObserver && {
    attributes: true,
    characterData: true,
    attributeOldValue: true
  },
      // useful to detect only if there's no MutationObserver
  DOMAttrModified = MutationObserver || function (e) {
    doesNotSupportDOMAttrModified = false;
    documentElement.removeEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
  },
      // will both be used to make DOMNodeInserted asynchronous
  asapQueue,
      asapTimer = 0,
      // internal flags
  V0 = REGISTER_ELEMENT in document,
      setListener = true,
      justSetup = false,
      doesNotSupportDOMAttrModified = true,
      dropDomContentLoaded = true,
      // needed for the innerHTML helper
  notFromInnerHTMLHelper = true,
      // optionally defined later on
  onSubtreeModified,
      callDOMAttrModified,
      getAttributesMirror,
      observer,
      observe,
      // based on setting prototype capability
  // will check proto or the expando attribute
  // in order to setup the node once
  patchIfNotAlready,
      patch; // only if needed


  if (!V0) {
    if (sPO || hasProto) {
      patchIfNotAlready = function patchIfNotAlready(node, proto) {
        if (!iPO.call(proto, node)) {
          setupNode(node, proto);
        }
      };

      patch = setupNode;
    } else {
      patchIfNotAlready = function patchIfNotAlready(node, proto) {
        if (!node[EXPANDO_UID]) {
          node[EXPANDO_UID] = Object(true);
          setupNode(node, proto);
        }
      };

      patch = patchIfNotAlready;
    }

    if (IE8) {
      doesNotSupportDOMAttrModified = false;

      (function () {
        var descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
            addEventListener = descriptor.value,
            patchedRemoveAttribute = function patchedRemoveAttribute(name) {
          var e = new CustomEvent(DOM_ATTR_MODIFIED, {
            bubbles: true
          });
          e.attrName = name;
          e.prevValue = getAttribute.call(this, name);
          e.newValue = null;
          e[REMOVAL] = e.attrChange = 2;
          removeAttribute.call(this, name);
          dispatchEvent.call(this, e);
        },
            patchedSetAttribute = function patchedSetAttribute(name, value) {
          var had = hasAttribute.call(this, name),
              old = had && getAttribute.call(this, name),
              e = new CustomEvent(DOM_ATTR_MODIFIED, {
            bubbles: true
          });
          setAttribute.call(this, name, value);
          e.attrName = name;
          e.prevValue = had ? old : null;
          e.newValue = value;

          if (had) {
            e[MODIFICATION] = e.attrChange = 1;
          } else {
            e[ADDITION] = e.attrChange = 0;
          }

          dispatchEvent.call(this, e);
        },
            onPropertyChange = function onPropertyChange(e) {
          // jshint eqnull:true
          var node = e.currentTarget,
              superSecret = node[EXPANDO_UID],
              propertyName = e.propertyName,
              event;

          if (superSecret.hasOwnProperty(propertyName)) {
            superSecret = superSecret[propertyName];
            event = new CustomEvent(DOM_ATTR_MODIFIED, {
              bubbles: true
            });
            event.attrName = superSecret.name;
            event.prevValue = superSecret.value || null;
            event.newValue = superSecret.value = node[propertyName] || null;

            if (event.prevValue == null) {
              event[ADDITION] = event.attrChange = 0;
            } else {
              event[MODIFICATION] = event.attrChange = 1;
            }

            dispatchEvent.call(node, event);
          }
        };

        descriptor.value = function (type, handler, capture) {
          if (type === DOM_ATTR_MODIFIED && this[ATTRIBUTE_CHANGED_CALLBACK] && this.setAttribute !== patchedSetAttribute) {
            this[EXPANDO_UID] = {
              className: {
                name: 'class',
                value: this.className
              }
            };
            this.setAttribute = patchedSetAttribute;
            this.removeAttribute = patchedRemoveAttribute;
            addEventListener.call(this, 'propertychange', onPropertyChange);
          }

          addEventListener.call(this, type, handler, capture);
        };

        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
      })();
    } else if (!MutationObserver) {
      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
      documentElement.setAttribute(EXPANDO_UID, 1);
      documentElement.removeAttribute(EXPANDO_UID);

      if (doesNotSupportDOMAttrModified) {
        onSubtreeModified = function onSubtreeModified(e) {
          var node = this,
              oldAttributes,
              newAttributes,
              key;

          if (node === e.target) {
            oldAttributes = node[EXPANDO_UID];
            node[EXPANDO_UID] = newAttributes = getAttributesMirror(node);

            for (key in newAttributes) {
              if (!(key in oldAttributes)) {
                // attribute was added
                return callDOMAttrModified(0, node, key, oldAttributes[key], newAttributes[key], ADDITION);
              } else if (newAttributes[key] !== oldAttributes[key]) {
                // attribute was changed
                return callDOMAttrModified(1, node, key, oldAttributes[key], newAttributes[key], MODIFICATION);
              }
            } // checking if it has been removed


            for (key in oldAttributes) {
              if (!(key in newAttributes)) {
                // attribute removed
                return callDOMAttrModified(2, node, key, oldAttributes[key], newAttributes[key], REMOVAL);
              }
            }
          }
        };

        callDOMAttrModified = function callDOMAttrModified(attrChange, currentTarget, attrName, prevValue, newValue, action) {
          var e = {
            attrChange: attrChange,
            currentTarget: currentTarget,
            attrName: attrName,
            prevValue: prevValue,
            newValue: newValue
          };
          e[action] = attrChange;
          onDOMAttrModified(e);
        };

        getAttributesMirror = function getAttributesMirror(node) {
          for (var attr, name, result = {}, attributes = node.attributes, i = 0, length = attributes.length; i < length; i++) {
            attr = attributes[i];
            name = attr.name;

            if (name !== 'setAttribute') {
              result[name] = attr.value;
            }
          }

          return result;
        };
      }
    } // set as enumerable, writable and configurable


    document[REGISTER_ELEMENT] = function registerElement(type, options) {
      upperType = type.toUpperCase();

      if (setListener) {
        // only first time document.registerElement is used
        // we need to set this listener
        // setting it by default might slow down for no reason
        setListener = false;

        if (MutationObserver) {
          observer = function (attached, detached) {
            function checkEmAll(list, callback) {
              for (var i = 0, length = list.length; i < length; callback(list[i++])) {}
            }

            return new MutationObserver(function (records) {
              for (var current, node, newValue, i = 0, length = records.length; i < length; i++) {
                current = records[i];

                if (current.type === 'childList') {
                  checkEmAll(current.addedNodes, attached);
                  checkEmAll(current.removedNodes, detached);
                } else {
                  node = current.target;

                  if (notFromInnerHTMLHelper && node[ATTRIBUTE_CHANGED_CALLBACK] && current.attributeName !== 'style') {
                    newValue = getAttribute.call(node, current.attributeName);

                    if (newValue !== current.oldValue) {
                      node[ATTRIBUTE_CHANGED_CALLBACK](current.attributeName, current.oldValue, newValue);
                    }
                  }
                }
              }
            });
          }(executeAction(ATTACHED), executeAction(DETACHED));

          observe = function observe(node) {
            observer.observe(node, {
              childList: true,
              subtree: true
            });
            return node;
          };

          observe(document);

          if (attachShadow) {
            HTMLElementPrototype.attachShadow = function () {
              return observe(attachShadow.apply(this, arguments));
            };
          }
        } else {
          asapQueue = [];
          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
        }

        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);

        HTMLElementPrototype.cloneNode = function (deep) {
          var node = cloneNode.call(this, !!deep),
              i = getTypeIndex(node);
          if (-1 < i) patch(node, protos[i]);
          if (deep && query.length) loopAndSetup(node.querySelectorAll(query));
          return node;
        };
      }

      if (justSetup) return justSetup = false;

      if (-2 < indexOf.call(types, PREFIX_IS + upperType) + indexOf.call(types, PREFIX_TAG + upperType)) {
        throwTypeError(type);
      }

      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
        throw new Error('The type ' + type + ' is invalid');
      }

      var constructor = function constructor() {
        return extending ? document.createElement(nodeName, upperType) : document.createElement(nodeName);
      },
          opt = options || OP,
          extending = hOP.call(opt, EXTENDS),
          nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
          upperType,
          i;

      if (extending && -1 < indexOf.call(types, PREFIX_TAG + nodeName)) {
        throwTypeError(nodeName);
      }

      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
      query = query.concat(query.length ? ',' : '', extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName);
      constructor.prototype = protos[i] = hOP.call(opt, 'prototype') ? opt.prototype : create(HTMLElementPrototype);
      if (query.length) loopAndVerify(document.querySelectorAll(query), ATTACHED);
      return constructor;
    };

    document.createElement = patchedCreateElement = function patchedCreateElement(localName, typeExtension) {
      var is = getIs(typeExtension),
          node = is ? createElement.call(document, localName, secondArgument(is)) : createElement.call(document, localName),
          name = '' + localName,
          i = indexOf.call(types, (is ? PREFIX_IS : PREFIX_TAG) + (is || name).toUpperCase()),
          setup = -1 < i;

      if (is) {
        node.setAttribute('is', is = is.toLowerCase());

        if (setup) {
          setup = isInQSA(name.toUpperCase(), is);
        }
      }

      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    };
  }

  function ASAP() {
    var queue = asapQueue.splice(0, asapQueue.length);
    asapTimer = 0;

    while (queue.length) {
      queue.shift().call(null, queue.shift());
    }
  }

  function loopAndVerify(list, action) {
    for (var i = 0, length = list.length; i < length; i++) {
      verifyAndSetupAndAction(list[i], action);
    }
  }

  function loopAndSetup(list) {
    for (var i = 0, length = list.length, node; i < length; i++) {
      node = list[i];
      patch(node, protos[getTypeIndex(node)]);
    }
  }

  function executeAction(action) {
    return function (node) {
      if (isValidNode(node)) {
        verifyAndSetupAndAction(node, action);
        if (query.length) loopAndVerify(node.querySelectorAll(query), action);
      }
    };
  }

  function getTypeIndex(target) {
    var is = getAttribute.call(target, 'is'),
        nodeName = target.nodeName.toUpperCase(),
        i = indexOf.call(types, is ? PREFIX_IS + is.toUpperCase() : PREFIX_TAG + nodeName);
    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
  }

  function isInQSA(name, type) {
    return -1 < query.indexOf(name + '[is="' + type + '"]');
  }

  function onDOMAttrModified(e) {
    var node = e.currentTarget,
        attrChange = e.attrChange,
        attrName = e.attrName,
        target = e.target,
        addition = e[ADDITION] || 2,
        removal = e[REMOVAL] || 3;

    if (notFromInnerHTMLHelper && (!target || target === node) && node[ATTRIBUTE_CHANGED_CALLBACK] && attrName !== 'style' && (e.prevValue !== e.newValue || // IE9, IE10, and Opera 12 gotcha
    e.newValue === '' && (attrChange === addition || attrChange === removal))) {
      node[ATTRIBUTE_CHANGED_CALLBACK](attrName, attrChange === addition ? null : e.prevValue, attrChange === removal ? null : e.newValue);
    }
  }

  function onDOMNode(action) {
    var executor = executeAction(action);
    return function (e) {
      asapQueue.push(executor, e.target);
      if (asapTimer) clearTimeout(asapTimer);
      asapTimer = setTimeout(ASAP, 1);
    };
  }

  function onReadyStateChange(e) {
    if (dropDomContentLoaded) {
      dropDomContentLoaded = false;
      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    }

    if (query.length) loopAndVerify((e.target || document).querySelectorAll(query), e.detail === DETACHED ? DETACHED : ATTACHED);
    if (IE8) purge();
  }

  function patchedSetAttribute(name, value) {
    // jshint validthis:true
    var self = this;
    setAttribute.call(self, name, value);
    onSubtreeModified.call(self, {
      target: self
    });
  }

  function setupNode(node, proto) {
    setPrototype(node, proto);

    if (observer) {
      observer.observe(node, attributesObserver);
    } else {
      if (doesNotSupportDOMAttrModified) {
        node.setAttribute = patchedSetAttribute;
        node[EXPANDO_UID] = getAttributesMirror(node);
        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
      }

      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
    }

    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
      node.created = true;
      node[CREATED_CALLBACK]();
      node.created = false;
    }
  }

  function purge() {
    for (var node, i = 0, length = targets.length; i < length; i++) {
      node = targets[i];

      if (!documentElement.contains(node)) {
        length--;
        targets.splice(i--, 1);
        verifyAndSetupAndAction(node, DETACHED);
      }
    }
  }

  function throwTypeError(type) {
    throw new Error('A ' + type + ' type is already registered');
  }

  function verifyAndSetupAndAction(node, action) {
    var fn,
        i = getTypeIndex(node);

    if (-1 < i) {
      patchIfNotAlready(node, protos[i]);
      i = 0;

      if (action === ATTACHED && !node[ATTACHED]) {
        node[DETACHED] = false;
        node[ATTACHED] = true;
        i = 1;

        if (IE8 && indexOf.call(targets, node) < 0) {
          targets.push(node);
        }
      } else if (action === DETACHED && !node[DETACHED]) {
        node[ATTACHED] = false;
        node[DETACHED] = true;
        i = 1;
      }

      if (i && (fn = node[action + CALLBACK])) fn.call(node);
    }
  } // V1 in da House!


  function CustomElementRegistry() {}

  CustomElementRegistry.prototype = {
    constructor: CustomElementRegistry,
    // a workaround for the stubborn WebKit
    define: usableCustomElements ? function (name, Class, options) {
      if (options) {
        CERDefine(name, Class, options);
      } else {
        var NAME = name.toUpperCase();
        constructors[NAME] = {
          constructor: Class,
          create: [NAME]
        };
        nodeNames.set(Class, NAME);
        customElements.define(name, Class);
      }
    } : CERDefine,
    get: usableCustomElements ? function (name) {
      return customElements.get(name) || get(name);
    } : get,
    whenDefined: usableCustomElements ? function (name) {
      return Promise.race([customElements.whenDefined(name), whenDefined(name)]);
    } : whenDefined
  };

  function CERDefine(name, Class, options) {
    var is = options && options[EXTENDS] || '',
        CProto = Class.prototype,
        proto = create(CProto),
        attributes = Class.observedAttributes || empty,
        definition = {
      prototype: proto
    }; // TODO: is this needed at all since it's inherited?
    // defineProperty(proto, 'constructor', {value: Class});

    safeProperty(proto, CREATED_CALLBACK, {
      value: function value() {
        if (justCreated) justCreated = false;else if (!this[DRECEV1]) {
          this[DRECEV1] = true;
          new Class(this);
          if (CProto[CREATED_CALLBACK]) CProto[CREATED_CALLBACK].call(this);
          var info = constructors[nodeNames.get(Class)];

          if (!usableCustomElements || info.create.length > 1) {
            notifyAttributes(this);
          }
        }
      }
    });
    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
      value: function value(name) {
        if (-1 < indexOf.call(attributes, name)) CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
      }
    });

    if (CProto[CONNECTED_CALLBACK]) {
      safeProperty(proto, ATTACHED_CALLBACK, {
        value: CProto[CONNECTED_CALLBACK]
      });
    }

    if (CProto[DISCONNECTED_CALLBACK]) {
      safeProperty(proto, DETACHED_CALLBACK, {
        value: CProto[DISCONNECTED_CALLBACK]
      });
    }

    if (is) definition[EXTENDS] = is;
    name = name.toUpperCase();
    constructors[name] = {
      constructor: Class,
      create: is ? [is, secondArgument(name)] : [name]
    };
    nodeNames.set(Class, name);
    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
    whenDefined(name);
    waitingList[name].r();
  }

  function get(name) {
    var info = constructors[name.toUpperCase()];
    return info && info.constructor;
  }

  function getIs(options) {
    return typeof options === 'string' ? options : options && options.is || '';
  }

  function notifyAttributes(self) {
    var callback = self[ATTRIBUTE_CHANGED_CALLBACK],
        attributes = callback ? self.attributes : empty,
        i = attributes.length,
        attribute;

    while (i--) {
      attribute = attributes[i]; // || attributes.item(i);

      callback.call(self, attribute.name || attribute.nodeName, null, attribute.value || attribute.nodeValue);
    }
  }

  function whenDefined(name) {
    name = name.toUpperCase();

    if (!(name in waitingList)) {
      waitingList[name] = {};
      waitingList[name].p = new Promise(function (resolve) {
        waitingList[name].r = resolve;
      });
    }

    return waitingList[name].p;
  }

  function polyfillV1() {
    if (customElements) delete window.customElements;
    defineProperty(window, 'customElements', {
      configurable: true,
      value: new CustomElementRegistry()
    });
    defineProperty(window, 'CustomElementRegistry', {
      configurable: true,
      value: CustomElementRegistry
    });

    for (var patchClass = function patchClass(name) {
      var Class = window[name];

      if (Class) {
        window[name] = function CustomElementsV1(self) {
          var info, isNative;
          if (!self) self = this;

          if (!self[DRECEV1]) {
            justCreated = true;
            info = constructors[nodeNames.get(self.constructor)];
            isNative = usableCustomElements && info.create.length === 1;
            self = isNative ? Reflect.construct(Class, empty, info.constructor) : document.createElement.apply(document, info.create);
            self[DRECEV1] = true;
            justCreated = false;
            if (!isNative) notifyAttributes(self);
          }

          return self;
        };

        window[name].prototype = Class.prototype;

        try {
          Class.prototype.constructor = window[name];
        } catch (WebKit) {
          fixGetClass = true;
          defineProperty(Class, DRECEV1, {
            value: window[name]
          });
        }
      }
    }, Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/), i = Classes.length; i--; patchClass(Classes[i])) {}

    document.createElement = function (name, options) {
      var is = getIs(options);
      return is ? patchedCreateElement.call(this, name, secondArgument(is)) : patchedCreateElement.call(this, name);
    };

    if (!V0) {
      justSetup = true;
      document[REGISTER_ELEMENT]('');
    }
  } // if customElements is not there at all


  if (!customElements || polyfill === 'force') polyfillV1();else {
    // if available test extends work as expected
    try {
      (function (DRE, options, name) {
        options[EXTENDS] = 'a';
        DRE.prototype = create(HTMLAnchorElement.prototype);
        DRE.prototype.constructor = DRE;
        window.customElements.define(name, DRE, options);

        if (getAttribute.call(document.createElement('a', {
          is: name
        }), 'is') !== name || usableCustomElements && getAttribute.call(new DRE(), 'is') !== name) {
          throw options;
        }
      })(function DRE() {
        return Reflect.construct(HTMLAnchorElement, [], DRE);
      }, {}, 'document-register-element-a');
    } catch (o_O) {
      // or force the polyfill if not
      // and keep internal original reference
      polyfillV1();
    }
  }

  try {
    createElement.call(document, 'a', 'a');
  } catch (FireFox) {
    secondArgument = function secondArgument(is) {
      return {
        is: is.toLowerCase()
      };
    };
  }
}

},{}],7:[function(require,module,exports){
'use strict';
/**
 * Constructs a ES6/Promises A+ Promise instance.
 *
 * @constructor
 * @param {function(function(*=), function (*=))} resolver
 */

function Promise(resolver) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Constructor Promise requires `new`');
  }

  if (!isFunction(resolver)) {
    throw new TypeError('Must pass resolver function');
  }
  /**
   * @type {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise}
   * @private
   */


  this._state = PendingPromise;
  /**
   * @type {*}
   * @private
   */

  this._value = [];
  /**
   * @type {boolean}
   * @private
   */

  this._isChainEnd = true;
  doResolve(this, adopter(this, FulfilledPromise), adopter(this, RejectedPromise), {
    then: resolver
  });
}
/****************************
  Public Instance Methods
 ****************************/

/**
 * Creates a new promise instance that will receive the result of this promise
 * as inputs to the onFulfilled or onRejected callbacks.
 *
 * @param {function(*)} onFulfilled
 * @param {function(*)} onRejected
 */


Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : void 0;
  onRejected = isFunction(onRejected) ? onRejected : void 0;

  if (onFulfilled || onRejected) {
    this._isChainEnd = false;
  }

  return this._state(this._value, onFulfilled, onRejected);
};
/**
 * Creates a new promise that will handle the rejected state of this promise.
 *
 * @param {function(*)} onRejected
 * @returns {!Promise}
 */


Promise.prototype.catch = function (onRejected) {
  return this.then(void 0, onRejected);
};
/****************************
  Public Static Methods
 ****************************/

/**
 * Creates a fulfilled Promise of value. If value is itself a then-able,
 * resolves with the then-able's value.
 *
 * @this {!Promise}
 * @param {*=} value
 * @returns {!Promise}
 */


Promise.resolve = function (value) {
  var Constructor = this;
  var promise;

  if (isObject(value) && value instanceof this) {
    promise = value;
  } else {
    promise = new Constructor(function (resolve) {
      resolve(value);
    });
  }

  return (
    /** @type {!Promise} */
    promise
  );
};
/**
 * Creates a rejected Promise of reason.
 *
 * @this {!Promise}
 * @param {*=} reason
 * @returns {!Promise}
 */


Promise.reject = function (reason) {
  var Constructor = this;
  var promise = new Constructor(function (_, reject) {
    reject(reason);
  });
  return (
    /** @type {!Promise} */
    promise
  );
};
/**
 * Creates a Promise that will resolve with an array of the values of the
 * passed in promises. If any promise rejects, the returned promise will
 * reject.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */


Promise.all = function (promises) {
  var Constructor = this;
  var promise = new Constructor(function (resolve, reject) {
    var length = promises.length;
    var values = new Array(length);

    if (length === 0) {
      return resolve(values);
    }

    each(promises, function (promise, index) {
      Constructor.resolve(promise).then(function (value) {
        values[index] = value;

        if (--length === 0) {
          resolve(values);
        }
      }, reject);
    });
  });
  return (
    /** @type {!Promise} */
    promise
  );
};
/**
 * Creates a Promise that will resolve or reject based on the first
 * resolved or rejected promise.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */


Promise.race = function (promises) {
  var Constructor = this;
  var promise = new Constructor(function (resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Constructor.resolve(promises[i]).then(resolve, reject);
    }
  });
  return (
    /** @type {!Promise} */
    promise
  );
};

var onPossiblyUnhandledRejection = function onPossiblyUnhandledRejection(reason, promise) {
  throw reason;
};
/**
 * An internal use static function.
 */


Promise._overrideUnhandledExceptionHandler = function (handler) {
  onPossiblyUnhandledRejection = handler;
};
/****************************
  Private functions
 ****************************/

/**
 * The Fulfilled Promise state. Calls onFulfilled with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onFulfilled, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} value The current promise's resolved value.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} unused
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Fulfilled state from the
 *     Pending state.
 * @returns {!Promise}
 */


function FulfilledPromise(value, onFulfilled, unused, deferred) {
  if (!onFulfilled) {
    deferredAdopt(deferred, FulfilledPromise, value);
    return this;
  }

  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }

  defer(tryCatchDeferred(deferred, onFulfilled, value));
  return deferred.promise;
}
/**
 * The Rejected Promise state. Calls onRejected with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onRejected, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} reason The current promise's rejection reason.
 * @param {function(*=)=} unused
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Rejected state from the
 *     Pending state.
 * @returns {!Promise}
 */


function RejectedPromise(reason, unused, onRejected, deferred) {
  if (!onRejected) {
    deferredAdopt(deferred, RejectedPromise, reason);
    return this;
  }

  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }

  defer(tryCatchDeferred(deferred, onRejected, reason));
  return deferred.promise;
}
/**
 * The Pending Promise state. Eventually calls onFulfilled once the promise has
 * resolved, or onRejected once the promise rejects.
 *
 * If there is no onFulfilled and no onRejected, returns the current promise to
 * avoid an promise instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} queue The current promise's pending promises queue.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Pending state from the
 *     Pending state of another promise.
 * @returns {!Promise}
 */


function PendingPromise(queue, onFulfilled, onRejected, deferred) {
  if (!deferred) {
    if (!onFulfilled && !onRejected) {
      return this;
    }

    deferred = new Deferred(this.constructor);
  }

  queue.push({
    deferred: deferred,
    onFulfilled: onFulfilled || deferred.resolve,
    onRejected: onRejected || deferred.reject
  });
  return deferred.promise;
}
/**
 * Constructs a deferred instance that holds a promise and its resolve and
 * reject functions.
 *
 * @constructor
 */


function Deferred(Promise) {
  var deferred = this;
  /** @type {!Promise} */

  this.promise = new Promise(function (resolve, reject) {
    /** @type {function(*=)} */
    deferred.resolve = resolve;
    /** @type {function(*=)} */

    deferred.reject = reject;
  });
  return deferred;
}
/**
 * Transitions the state of promise to another state. This is only ever called
 * on with a promise that is currently in the Pending state.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */


function adopt(promise, state, value, adoptee) {
  var queue = promise._value;
  promise._state = state;
  promise._value = value;

  if (adoptee && state === PendingPromise) {
    adoptee._state(value, void 0, void 0, {
      promise: promise,
      resolve: void 0,
      reject: void 0
    });
  }

  for (var i = 0; i < queue.length; i++) {
    var next = queue[i];

    promise._state(value, next.onFulfilled, next.onRejected, next.deferred);
  }

  queue.length = 0; // Determine if this rejected promise will be "handled".

  if (state === RejectedPromise && promise._isChainEnd) {
    setTimeout(function () {
      if (promise._isChainEnd) {
        onPossiblyUnhandledRejection(value, promise);
      }
    }, 0);
  }
}
/**
 * A partial application of adopt.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @returns {function(*=)}
 */


function adopter(promise, state) {
  return function (value) {
    adopt(promise, state, value);
  };
}
/**
 * Updates a deferred promises state. Necessary for updating an adopting
 * promise's state when the adoptee resolves.
 *
 * @param {?Deferred} deferred
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */


function deferredAdopt(deferred, state, value) {
  if (deferred) {
    var promise = deferred.promise;
    promise._state = state;
    promise._value = value;
  }
}
/**
 * A no-op function to prevent double resolving.
 */


function noop() {}
/**
 * Tests if fn is a Function
 *
 * @param {*} fn
 * @returns {boolean}
 */


function isFunction(fn) {
  return typeof fn === 'function';
}
/**
 * Tests if fn is an Object
 *
 * @param {*} obj
 * @returns {boolean}
 */


function isObject(obj) {
  return obj === Object(obj);
}
/**
 * Iterates over each element of an array, calling the iterator with the
 * element and its index.
 *
 * @param {!Array} collection
 * @param {function(*=,number)} iterator
 */


function each(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i);
  }
}
/**
 * Creates a function that will attempt to resolve the deferred with the return
 * of fn. If any error is raised, rejects instead.
 *
 * @param {!Deferred} deferred
 * @param {function(*=)} fn
 * @param {*} arg
 * @returns {function()}
 */


function tryCatchDeferred(deferred, fn, arg) {
  var promise = deferred.promise;
  var resolve = deferred.resolve;
  var reject = deferred.reject;
  return function () {
    try {
      var result = fn(arg);
      doResolve(promise, resolve, reject, result, result);
    } catch (e) {
      reject(e);
    }
  };
}
/**
 * Queues and executes multiple deferred functions on another run loop.
 */


var defer = function () {
  /**
   * Defers fn to another run loop.
   */
  var scheduleFlush;

  if (typeof window !== 'undefined' && window.postMessage) {
    window.addEventListener('message', flush);

    scheduleFlush = function scheduleFlush() {
      window.postMessage('macro-task', '*');
    };
  } else {
    scheduleFlush = function scheduleFlush() {
      setTimeout(flush, 0);
    };
  }

  var queue = new Array(16);
  var length = 0;

  function flush() {
    for (var i = 0; i < length; i++) {
      var fn = queue[i];
      queue[i] = null;
      fn();
    }

    length = 0;
  }
  /**
   * @param {function()} fn
   */


  function defer(fn) {
    if (length === 0) {
      scheduleFlush();
    }

    queue[length++] = fn;
  }

  return defer;
}();
/**
 * The Promise resolution procedure.
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param {!Promise} promise
 * @param {function(*=)} resolve
 * @param {function(*=)} reject
 * @param {*} value
 * @param {*=} context
 */


function doResolve(promise, resolve, reject, value, context) {
  var _reject2 = reject;
  var then;

  var _resolve2;

  try {
    if (value === promise) {
      throw new TypeError('Cannot fulfill promise with itself');
    }

    var isObj = isObject(value);

    if (isObj && value instanceof promise.constructor) {
      adopt(promise, value._state, value._value, value);
    } else if (isObj && (then = value.then) && isFunction(then)) {
      _resolve2 = function _resolve(value) {
        _resolve2 = _reject2 = noop;
        doResolve(promise, resolve, reject, value, value);
      };

      _reject2 = function _reject(reason) {
        _resolve2 = _reject2 = noop;
        reject(reason);
      };

      then.call(context, function (value) {
        _resolve2(value);
      }, function (reason) {
        _reject2(reason);
      });
    } else {
      resolve(value);
    }
  } catch (e) {
    _reject2(e);
  }
}

module.exports = Promise;

},{}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.config = exports.urls = void 0;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Allows for runtime configuration. Internally, the runtime should
 * use the src/config.js module for various constants. We can use the
 * AMP_CONFIG global to translate user-defined configurations to this
 * module.
 * @type {!Object<string, string>}
 */
var env = self.AMP_CONFIG || {};
var thirdPartyFrameRegex = typeof env['thirdPartyFrameRegex'] == 'string' ? new RegExp(env['thirdPartyFrameRegex']) : env['thirdPartyFrameRegex'];
var cdnProxyRegex = typeof env['cdnProxyRegex'] == 'string' ? new RegExp(env['cdnProxyRegex']) : env['cdnProxyRegex'];
/** @type {!Object<string, string|boolean|RegExp>} */

var urls = {
  thirdParty: env['thirdPartyUrl'] || 'https://3p.ampproject.net',
  thirdPartyFrameHost: env['thirdPartyFrameHost'] || 'ampproject.net',
  thirdPartyFrameRegex: thirdPartyFrameRegex || /^d-\d+\.ampproject\.net$/,
  cdn: env['cdnUrl'] || 'https://cdn.ampproject.org',

  /* Note that cdnProxyRegex is only ever checked against origins
   * (proto://host[:port]) so does not need to consider path
   */
  cdnProxyRegex: cdnProxyRegex || /^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/,
  localhostRegex: /^https?:\/\/localhost(:\d+)?$/,
  errorReporting: env['errorReportingUrl'] || 'https://amp-error-reporting.appspot.com/r',
  localDev: env['localDev'] || false
};
exports.urls = urls;
var config = {
  urls: urls
};
exports.config = config;

},{}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getCookie = getCookie;
exports.setCookie = setCookie;

var _string = require("./string");

var _url = require("./url");

var _config = require("./config");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * Returns the cookie's value or `null`.
 *
 * @param {!Window} win
 * @param {string} name
 * @return {?string}
 */
function getCookie(win, name) {
  var cookieString = tryGetDocumentCookieNoInline(win);

  if (!cookieString) {
    return null;
  }

  var cookies = cookieString.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var eq = cookie.indexOf('=');

    if (eq == -1) {
      continue;
    }

    if ((0, _url.tryDecodeUriComponent)(cookie.substring(0, eq).trim()) == name) {
      var value = cookie.substring(eq + 1).trim();
      return (0, _url.tryDecodeUriComponent)(value, value);
    }
  }

  return null;
}
/**
 * This method should not be inlined to prevent TryCatch deoptimization.
 * NoInline keyword at the end of function name also prevents Closure compiler
 * from inlining the function.
 * @param {!Window} win
 * @return {string}
 */


function tryGetDocumentCookieNoInline(win) {
  try {
    return win.document.cookie;
  } catch (e) {
    // Act as if no cookie is available. Exceptions can be thrown when
    // AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
    return '';
  }
}
/**
 * Sets the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {{
 *   highestAvailableDomain:(boolean|undefined),
 *   domain:(string|undefined)
 * }=} opt_options
 *     - highestAvailableDomain: If true, set the cookie at the widest domain
 *       scope allowed by the browser. E.g. on example.com if we are currently
 *       on www.example.com.
 *     - domain: Explicit domain to set.
 *     - allowOnProxyOrigin: Allow setting a cookie on the AMP Cache.
 */


function setCookie(win, name, value, expirationTime, opt_options) {
  checkOriginForSettingCookie(win, opt_options, name);

  if (opt_options && opt_options.highestAvailableDomain) {
    var parts = win.location.hostname.split('.');
    var _domain = parts[parts.length - 1];

    for (var i = parts.length - 2; i >= 0; i--) {
      _domain = parts[i] + '.' + _domain;
      trySetCookie(win, name, value, expirationTime, _domain);

      if (getCookie(win, name) == value) {
        return;
      }
    }
  }

  var domain = undefined;

  if (opt_options && opt_options.domain) {
    domain = opt_options.domain;
  }

  trySetCookie(win, name, value, expirationTime, domain);
}
/**
 * Attempt to set a cookie with the given params.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {string|undefined} domain
 */


function trySetCookie(win, name, value, expirationTime, domain) {
  // We do not allow setting cookies on the domain that contains both
  // the cdn. and www. hosts.
  if (domain == 'ampproject.org') {
    // Actively delete them.
    value = 'delete';
    expirationTime = 0;
  }

  var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/' + (domain ? '; domain=' + domain : '') + '; expires=' + new Date(expirationTime).toUTCString();

  try {
    win.document.cookie = cookie;
  } catch (ignore) {// Do not throw if setting the cookie failed Exceptions can be thrown
    // when AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
  }
}
/**
 * Throws if a given cookie should not be set on the given origin.
 * This is a defense-in-depth. Callers should never run into this.
 *
 * @param {!Window} win
 * @param {!Object|undefined} options
 * @param {string} name For the error message.
 */


function checkOriginForSettingCookie(win, options, name) {
  if (options && options.allowOnProxyOrigin) {
    return;
  }

  if ((0, _url.isProxyOrigin)(win.location.href)) {
    throw new Error('Should never attempt to set cookie on proxy origin: ' + name);
  }

  var current = (0, _url.parseUrlDeprecated)(win.location.href).hostname.toLowerCase();
  var proxy = (0, _url.parseUrlDeprecated)(_config.urls.cdn).hostname.toLowerCase();

  if (current == proxy || (0, _string.endsWith)(current, '.' + proxy)) {
    throw new Error('Should never attempt to set cookie on proxy origin.' + ' (in depth check): ' + name);
  }
}

},{"./config":8,"./string":29,"./url":33}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.waitForChild = waitForChild;
exports.waitForChildPromise = waitForChildPromise;
exports.waitForBody = waitForBody;
exports.waitForBodyPromise = waitForBodyPromise;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.copyChildren = copyChildren;
exports.insertAfterOrAtStart = insertAfterOrAtStart;
exports.addAttributesToElement = addAttributesToElement;
exports.createElementWithAttributes = createElementWithAttributes;
exports.isConnectedNode = isConnectedNode;
exports.rootNodeFor = rootNodeFor;
exports.closest = closest;
exports.closestNode = closestNode;
exports.closestByTag = closestByTag;
exports.closestBySelector = closestBySelector;
exports.matches = matches;
exports.elementByTag = elementByTag;
exports.childElement = childElement;
exports.childElements = childElements;
exports.lastChildElement = lastChildElement;
exports.childNodes = childNodes;
exports.setScopeSelectorSupportedForTesting = setScopeSelectorSupportedForTesting;
exports.childElementByAttr = childElementByAttr;
exports.lastChildElementByAttr = lastChildElementByAttr;
exports.childElementsByAttr = childElementsByAttr;
exports.childElementByTag = childElementByTag;
exports.childElementsByTag = childElementsByTag;
exports.scopedQuerySelector = scopedQuerySelector;
exports.scopedQuerySelectorAll = scopedQuerySelectorAll;
exports.getDataParamsFromAttributes = getDataParamsFromAttributes;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
exports.ancestorElements = ancestorElements;
exports.ancestorElementsByTag = ancestorElementsByTag;
exports.templateContentClone = templateContentClone;
exports.iterateCursor = iterateCursor;
exports.openWindowDialog = openWindowDialog;
exports.isJsonScriptTag = isJsonScriptTag;
exports.isJsonLdScriptTag = isJsonLdScriptTag;
exports.isRTL = isRTL;
exports.escapeCssSelectorIdent = escapeCssSelectorIdent;
exports.escapeCssSelectorNth = escapeCssSelectorNth;
exports.escapeHtml = escapeHtml;
exports.tryFocus = tryFocus;
exports.isIframed = isIframed;
exports.isAmpElement = isAmpElement;
exports.whenUpgradedToCustomElement = whenUpgradedToCustomElement;
exports.fullscreenEnter = fullscreenEnter;
exports.fullscreenExit = fullscreenExit;
exports.isFullscreenElement = isFullscreenElement;
exports.isEnabled = isEnabled;
exports.domOrderComparator = domOrderComparator;
exports.UPGRADE_TO_CUSTOMELEMENT_RESOLVER = exports.UPGRADE_TO_CUSTOMELEMENT_PROMISE = void 0;

var _promise = require("./utils/promise");

var _cssEscape = require("../third_party/css-escape/css-escape");

var _log = require("./log");

var _object = require("./utils/object");

var _string = require("./string");

var _types = require("./types");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var HTML_ESCAPE_CHARS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
var HTML_ESCAPE_REGEX = /(&|<|>|"|'|`)/g;
/** @const {string} */

var UPGRADE_TO_CUSTOMELEMENT_PROMISE = '__AMP_UPG_PRM';
/** @const {string} */

exports.UPGRADE_TO_CUSTOMELEMENT_PROMISE = UPGRADE_TO_CUSTOMELEMENT_PROMISE;
var UPGRADE_TO_CUSTOMELEMENT_RESOLVER = '__AMP_UPG_RES';
/**
 * Waits until the child element is constructed. Once the child is found, the
 * callback is executed.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @param {function()} callback
 */

exports.UPGRADE_TO_CUSTOMELEMENT_RESOLVER = UPGRADE_TO_CUSTOMELEMENT_RESOLVER;

function waitForChild(parent, checkFunc, callback) {
  if (checkFunc(parent)) {
    callback();
    return;
  }
  /** @const {!Window} */


  var win = (0, _types.toWin)(parent.ownerDocument.defaultView);

  if (win.MutationObserver) {
    /** @const {MutationObserver} */
    var observer = new win.MutationObserver(function () {
      if (checkFunc(parent)) {
        observer.disconnect();
        callback();
      }
    });
    observer.observe(parent, {
      childList: true
    });
  } else {
    /** @const {number} */
    var interval = win.setInterval(function () {
      if (checkFunc(parent)) {
        win.clearInterval(interval);
        callback();
      }
    },
    /* milliseconds */
    5);
  }
}
/**
 * Waits until the child element is constructed. Once the child is found, the
 * promise is resolved.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @return {!Promise}
 */


function waitForChildPromise(parent, checkFunc) {
  return new Promise(function (resolve) {
    waitForChild(parent, checkFunc, resolve);
  });
}
/**
 * Waits for document's body to be available.
 * Will be deprecated soon; use {@link AmpDoc#whenBodyAvailable} or
 * @{link DocumentState#onBodyAvailable} instead.
 * @param {!Document} doc
 * @param {function()} callback
 */


function waitForBody(doc, callback) {
  waitForChild(doc.documentElement, function () {
    return !!doc.body;
  }, callback);
}
/**
 * Waits for document's body to be available.
 * @param {!Document} doc
 * @return {!Promise}
 */


function waitForBodyPromise(doc) {
  return new Promise(function (resolve) {
    waitForBody(doc, resolve);
  });
}
/**
 * Removes the element.
 * @param {!Element} element
 */


function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}
/**
 * Removes all child nodes of the specified element.
 * @param {!Element} parent
 */


function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/**
 * Copies all children nodes of element "from" to element "to". Child nodes
 * are deeply cloned. Notice, that this method should be used with care and
 * preferably on smaller subtrees.
 * @param {!Element} from
 * @param {!Element|!DocumentFragment} to
 */


function copyChildren(from, to) {
  var frag = to.ownerDocument.createDocumentFragment();

  for (var n = from.firstChild; n; n = n.nextSibling) {
    frag.appendChild(n.cloneNode(true));
  }

  to.appendChild(frag);
}
/**
 * Insert the element in the root after the element named after or
 * if that is null at the beginning.
 * @param {!Element|!ShadowRoot} root
 * @param {!Element} element
 * @param {?Node} after
 */


function insertAfterOrAtStart(root, element, after) {
  var before = after ? after.nextSibling : root.firstChild;
  root.insertBefore(element, before);
}
/**
 * Add attributes to an element.
 * @param {!Element} element
 * @param {!JsonObject<string, string>} attributes
 * @return {!Element} created element
 */


function addAttributesToElement(element, attributes) {
  for (var attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }

  return element;
}
/**
 * Create a new element on document with specified tagName and attributes.
 * @param {!Document} doc
 * @param {string} tagName
 * @param {!JsonObject<string, string>} attributes
 * @return {!Element} created element
 */


function createElementWithAttributes(doc, tagName, attributes) {
  var element = doc.createElement(tagName);
  return addAttributesToElement(element, attributes);
}
/**
 * Returns true if node is connected (attached).
 * @param {!Node} node
 * @return {boolean}
 * @see https://dom.spec.whatwg.org/#connected
 */


function isConnectedNode(node) {
  var connected = node.isConnected;

  if (connected !== undefined) {
    return connected;
  } // "An element is connected if its shadow-including root is a document."


  var n = node;

  do {
    n = rootNodeFor(n);

    if (n.host) {
      n = n.host;
    } else {
      break;
    }
  } while (true);

  return n.nodeType === Node.DOCUMENT_NODE;
}
/**
 * Returns the root for a given node. Does not cross shadow DOM boundary.
 * @param {!Node} node
 * @return {!Node}
 */


function rootNodeFor(node) {
  if (Node.prototype.getRootNode) {
    // Type checker says `getRootNode` may return null.
    return node.getRootNode() || node;
  }

  var n;

  for (n = node; !!n.parentNode; n = n.parentNode) {}

  return n;
}
/**
 * Finds the closest element that satisfies the callback from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {function(!Element):boolean} callback
 * @param {Element=} opt_stopAt optional elemnt to stop the search at.
 * @return {?Element}
 */


function closest(element, callback, opt_stopAt) {
  for (var el = element; el && el !== opt_stopAt; el = el.parentElement) {
    if (callback(el)) {
      return el;
    }
  }

  return null;
}
/**
 * Finds the closest node that satisfies the callback from this node
 * up the DOM subtree.
 * @param {!Node} node
 * @param {function(!Node):boolean} callback
 * @return {?Node}
 */


function closestNode(node, callback) {
  for (var n = node; n; n = n.parentNode) {
    if (callback(n)) {
      return n;
    }
  }

  return null;
}
/**
 * Finds the closest element with the specified name from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */


function closestByTag(element, tagName) {
  if (element.closest) {
    return element.closest(tagName);
  }

  tagName = tagName.toUpperCase();
  return closest(element, function (el) {
    return el.tagName == tagName;
  });
}
/**
 * Finds the closest element with the specified selector from this element
 * @param {!Element} element
 * @param {string} selector
 * @return {?Element} closest ancestor if found.
 */


function closestBySelector(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  return closest(element, function (el) {
    return matches(el, selector);
  });
}
/**
 * Checks if the given element matches the selector
 * @param  {!Element} el The element to verify
 * @param  {string} selector The selector to check against
 * @return {boolean} True if the element matched the selector. False otherwise.
 */


function matches(el, selector) {
  var matcher = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;

  if (matcher) {
    return matcher.call(el, selector);
  }

  return false; // IE8 always returns false.
}
/**
 * Finds the first descendant element with the specified name.
 * @param {!Element|!Document|!ShadowRoot} element
 * @param {string} tagName
 * @return {?Element}
 */


function elementByTag(element, tagName) {
  var elements; // getElementsByTagName() is not supported on ShadowRoot.

  if (typeof element.getElementsByTagName === 'function') {
    elements = element.getElementsByTagName(tagName);
  } else {
    elements = element.
    /*OK*/
    querySelectorAll(tagName);
  }

  return elements && elements[0] || null;
}
/**
 * Finds the first child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */


function childElement(parent, callback) {
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      return child;
    }
  }

  return null;
}
/**
 * Finds all child elements that satisfy the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {!Array<!Element>}
 */


function childElements(parent, callback) {
  var children = [];

  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      children.push(child);
    }
  }

  return children;
}
/**
 * Finds the last child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */


function lastChildElement(parent, callback) {
  for (var child = parent.lastElementChild; child; child = child.previousElementSibling) {
    if (callback(child)) {
      return child;
    }
  }

  return null;
}
/**
 * Finds all child nodes that satisfy the callback.
 * These nodes can include Text, Comment and other child nodes.
 * @param {!Node} parent
 * @param {function(!Node):boolean} callback
 * @return {!Array<!Node>}
 */


function childNodes(parent, callback) {
  var nodes = [];

  for (var child = parent.firstChild; child; child = child.nextSibling) {
    if (callback(child)) {
      nodes.push(child);
    }
  }

  return nodes;
}
/**
 * @type {boolean|undefined}
 * @visibleForTesting
 */


var scopeSelectorSupported;
/**
 * @param {boolean|undefined} val
 * @visibleForTesting
 */

function setScopeSelectorSupportedForTesting(val) {
  scopeSelectorSupported = val;
}
/**
 * Test that the :scope selector is supported and behaves correctly.
 * @param {!Element} parent
 * @return {boolean}
 */


function isScopeSelectorSupported(parent) {
  var doc = parent.ownerDocument;

  try {
    var testElement = doc.createElement('div');
    var testChild = doc.createElement('div');
    testElement.appendChild(testChild); // NOTE(cvializ, #12383): Firefox's implementation is incomplete,
    // therefore we test actual functionality of`:scope` as well.

    return testElement.
    /*OK*/
    querySelector(':scope div') === testChild;
  } catch (e) {
    return false;
  }
}
/**
 * Finds the first child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */


function childElementByAttr(parent, attr) {
  return scopedQuerySelector
  /*OK*/
  (parent, "> [" + attr + "]");
}
/**
 * Finds the last child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */


function lastChildElementByAttr(parent, attr) {
  return lastChildElement(parent, function (el) {
    return el.hasAttribute(attr);
  });
}
/**
 * Finds all child elements that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {!NodeList<!Element>}
 */


function childElementsByAttr(parent, attr) {
  return scopedQuerySelectorAll
  /*OK*/
  (parent, "> [" + attr + "]");
}
/**
 * Finds the first child element that has the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {?Element}
 */


function childElementByTag(parent, tagName) {
  return scopedQuerySelector
  /*OK*/
  (parent, "> " + tagName);
}
/**
 * Finds all child elements with the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {!NodeList<!Element>}
 */


function childElementsByTag(parent, tagName) {
  return scopedQuerySelectorAll
  /*OK*/
  (parent, "> " + tagName);
}
/**
 * Finds all elements that matche `selector`, scoped inside `root`
 * for user-agents that do not support native scoping.
 *
 * This method isn't required for modern builds, can be removed.
 *
 * @param {!Element} root
 * @param {string} selector
 * @return {!NodeList<!Element>}
 */


function scopedQuerySelectionFallback(root, selector) {
  var unique = 'i-amphtml-scoped';
  root.classList.add(unique);
  var element = root.
  /*OK*/
  querySelectorAll("." + unique + " " + selector);
  root.classList.remove(unique);
  return element;
}
/**
 * Finds the first element that matches `selector`, scoped inside `root`.
 * Note: in IE, this causes a quick mutation of the element's class list.
 * @param {!Element} root
 * @param {string} selector
 * @return {?Element}
 */


function scopedQuerySelector(root, selector) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(root);
  }

  if (scopeSelectorSupported) {
    return root.
    /*OK*/
    querySelector(":scope " + selector);
  } // Only IE.


  var fallbackResult = scopedQuerySelectionFallback(root, selector);
  return fallbackResult[0] === undefined ? null : fallbackResult[0];
}
/**
 * Finds every element that matches `selector`, scoped inside `root`.
 * Note: in IE, this causes a quick mutation of the element's class list.
 * @param {!Element} root
 * @param {string} selector
 * @return {!NodeList<!Element>}
 */


function scopedQuerySelectorAll(root, selector) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(root);
  }

  if (scopeSelectorSupported) {
    return root.
    /*OK*/
    querySelectorAll(":scope " + selector);
  } // Only IE.


  return scopedQuerySelectionFallback(root, selector);
}
/**
 * Returns element data-param- attributes as url parameters key-value pairs.
 * e.g. data-param-some-attr=value -> {someAttr: value}.
 * @param {!Element} element
 * @param {function(string):string=} opt_computeParamNameFunc to compute the
 *    parameter name, get passed the camel-case parameter name.
 * @param {!RegExp=} opt_paramPattern Regex pattern to match data attributes.
 * @return {!JsonObject}
 */


function getDataParamsFromAttributes(element, opt_computeParamNameFunc, opt_paramPattern) {
  var computeParamNameFunc = opt_computeParamNameFunc || function (key) {
    return key;
  };

  var dataset = element.dataset;
  var params = (0, _object.dict)();
  var paramPattern = opt_paramPattern ? opt_paramPattern : /^param(.+)/;

  for (var key in dataset) {
    var _matches = key.match(paramPattern);

    if (_matches) {
      var param = _matches[1][0].toLowerCase() + _matches[1].substr(1);

      params[computeParamNameFunc(param)] = dataset[key];
    }
  }

  return params;
}
/**
 * Whether the element have a next node in the document order.
 * This means either:
 *  a. The element itself has a nextSibling.
 *  b. Any of the element ancestors has a nextSibling.
 * @param {!Element} element
 * @param {?Node} opt_stopNode
 * @return {boolean}
 */


function hasNextNodeInDocumentOrder(element, opt_stopNode) {
  var currentElement = element;

  do {
    if (currentElement.nextSibling) {
      return true;
    }
  } while ((currentElement = currentElement.parentNode) && currentElement != opt_stopNode);

  return false;
}
/**
 * Finds all ancestor elements that satisfy predicate.
 * @param {!Element} child
 * @param {function(!Element):boolean} predicate
 * @return {!Array<!Element>}
 */


function ancestorElements(child, predicate) {
  var ancestors = [];

  for (var ancestor = child.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (predicate(ancestor)) {
      ancestors.push(ancestor);
    }
  }

  return ancestors;
}
/**
 * Finds all ancestor elements that has the specified tag name.
 * @param {!Element} child
 * @param {string} tagName
 * @return {!Array<!Element>}
 */


function ancestorElementsByTag(child, tagName) {
  tagName = tagName.toUpperCase();
  return ancestorElements(child, function (el) {
    return el.tagName == tagName;
  });
}
/**
 * Returns a clone of the content of a template element.
 *
 * Polyfill to replace .content access for browsers that do not support
 * HTMLTemplateElements natively.
 *
 * @param {!HTMLTemplateElement|!Element} template
 * @return {!DocumentFragment}
 */


function templateContentClone(template) {
  if ('content' in template) {
    return template.content.cloneNode(true);
  } else {
    var content = template.ownerDocument.createDocumentFragment();
    copyChildren(template, content);
    return content;
  }
}
/**
 * Iterate over an array-like.
 * Test cases: https://jsbench.github.io/#f638cacc866a1b2d6e517e6cfa900d6b
 * @param {!IArrayLike<T>} iterable
 * @param {function(T, number)} cb
 * @template T
 */


function iterateCursor(iterable, cb) {
  var length = iterable.length;

  for (var i = 0; i < length; i++) {
    cb(iterable[i], i);
  }
}
/**
 * This method wraps around window's open method. It first tries to execute
 * `open` call with the provided target and if it fails, it retries the call
 * with the `_top` target. This is necessary given that in some embedding
 * scenarios, such as iOS' WKWebView, navigation to `_blank` and other targets
 * is blocked by default.
 *
 * @param {!Window} win
 * @param {string} url
 * @param {string} target
 * @param {string=} opt_features
 * @return {?Window}
 */


function openWindowDialog(win, url, target, opt_features) {
  // Try first with the specified target. If we're inside the WKWebView or
  // a similar environments, this method is expected to fail by default for
  // all targets except `_top`.
  var res;

  try {
    res = win.open(url, target, opt_features);
  } catch (e) {
    (0, _log.dev)().error('DOM', 'Failed to open url on target: ', target, e);
  } // Then try with `_top` target.


  if (!res && target != '_top') {
    res = win.open(url, '_top');
  }

  return res;
}
/**
 * Whether the element is a script tag with application/json type.
 * @param {!Element} element
 * @return {boolean}
 */


function isJsonScriptTag(element) {
  return element.tagName == 'SCRIPT' && element.hasAttribute('type') && element.getAttribute('type').toUpperCase() == 'APPLICATION/JSON';
}
/**
 * Whether the element is a script tag with application/json type.
 * @param {!Element} element
 * @return {boolean}
 */


function isJsonLdScriptTag(element) {
  return element.tagName == 'SCRIPT' && element.getAttribute('type').toUpperCase() == 'APPLICATION/LD+JSON';
}
/**
 * Whether the page's direction is right to left or not.
 * @param {!Document} doc
 * @return {boolean}
 */


function isRTL(doc) {
  var dir = doc.body.getAttribute('dir') || doc.documentElement.getAttribute('dir') || 'ltr';
  return dir == 'rtl';
}
/**
 * Escapes an ident (ID or a class name) to be used as a CSS selector.
 *
 * See https://drafts.csswg.org/cssom/#serialize-an-identifier.
 *
 * @param {string} ident
 * @return {string}
 */


function escapeCssSelectorIdent(ident) {
  return (0, _cssEscape.cssEscape)(ident);
}
/**
 * Escapes an ident in a way that can be used by :nth-child() psuedo-class.
 *
 * See https://github.com/w3c/csswg-drafts/issues/2306.
 *
 * @param {string|number} ident
 * @return {string}
 */


function escapeCssSelectorNth(ident) {
  var escaped = String(ident); // Ensure it doesn't close the nth-child psuedo class.

  (0, _log.devAssert)(escaped.indexOf(')') === -1);
  return escaped;
}
/**
 * Escapes `<`, `>` and other HTML charcaters with their escaped forms.
 * @param {string} text
 * @return {string}
 */


function escapeHtml(text) {
  if (!text) {
    return text;
  }

  return text.replace(HTML_ESCAPE_REGEX, escapeHtmlChar);
}
/**
 * @param {string} c
 * @return {string}
 */


function escapeHtmlChar(c) {
  return HTML_ESCAPE_CHARS[c];
}
/**
 * Tries to focus on the given element; fails silently if browser throws an
 * exception.
 * @param {!Element} element
 */


function tryFocus(element) {
  try {
    element.
    /*OK*/
    focus();
  } catch (e) {// IE <= 7 may throw exceptions when focusing on hidden items.
  }
}
/**
 * Whether the given window is in an iframe or not.
 * @param {!Window} win
 * @return {boolean}
 */


function isIframed(win) {
  return win.parent && win.parent != win;
}
/**
 * Determines if this element is an AMP element
 * @param {!Element} element
 * @return {boolean}
 */


function isAmpElement(element) {
  var tag = element.tagName; // Use prefix to recognize AMP element. This is necessary because stub
  // may not be attached yet.

  return (0, _string.startsWith)(tag, 'AMP-') && // Some "amp-*" elements are not really AMP elements. :smh:
  !(tag == 'AMP-STICKY-AD-TOP-PADDING' || tag == 'AMP-BODY');
}
/**
 * Return a promise that resolve when an AMP element upgrade from HTMLElement
 * to CustomElement
 * @param {!Element} element
 * @return {!Promise<!Element>}
 */


function whenUpgradedToCustomElement(element) {
  (0, _log.devAssert)(isAmpElement(element), 'element is not AmpElement');

  if (element.createdCallback) {
    // Element already is CustomElement;
    return Promise.resolve(element);
  } // If Element is still HTMLElement, wait for it to upgrade to customElement
  // Note: use pure string to avoid obfuscation between versions.


  if (!element[UPGRADE_TO_CUSTOMELEMENT_PROMISE]) {
    var deferred = new _promise.Deferred();
    element[UPGRADE_TO_CUSTOMELEMENT_PROMISE] = deferred.promise;
    element[UPGRADE_TO_CUSTOMELEMENT_RESOLVER] = deferred.resolve;
  }

  return element[UPGRADE_TO_CUSTOMELEMENT_PROMISE];
}
/**
 * Replacement for `Element.requestFullscreen()` method.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
 * @param {!Element} element
 */


function fullscreenEnter(element) {
  var requestFs = element.requestFullscreen || element.requestFullScreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.webkitEnterFullscreen || element.webkitEnterFullScreen || element.msRequestFullscreen || element.msRequestFullScreen || element.mozRequestFullscreen || element.mozRequestFullScreen;

  if (requestFs) {
    requestFs.call(element);
  }
}
/**
 * Replacement for `Document.exitFullscreen()` method.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
 * @param {!Element} element
 */


function fullscreenExit(element) {
  var exitFs = element.cancelFullScreen || element.exitFullscreen || element.exitFullScreen || element.webkitExitFullscreen || element.webkitExitFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msExitFullscreen;

  if (exitFs) {
    exitFs.call(element);
    return;
  }

  if (element.ownerDocument) {
    exitFs = element.ownerDocument.cancelFullScreen || element.ownerDocument.exitFullscreen || element.ownerDocument.exitFullScreen || element.ownerDocument.webkitExitFullscreen || element.ownerDocument.webkitExitFullScreen || element.ownerDocument.webkitCancelFullScreen || element.ownerDocument.mozCancelFullScreen || element.ownerDocument.msExitFullscreen;
  }

  if (exitFs) {
    exitFs.call(element.ownerDocument);
    return;
  }
}
/**
 * Replacement for `Document.fullscreenElement`.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
 * @param {!Element} element
 * @return {boolean}
 */


function isFullscreenElement(element) {
  var isFullscreen = element.webkitDisplayingFullscreen;

  if (isFullscreen) {
    return true;
  }

  if (element.ownerDocument) {
    var fullscreenElement = element.ownerDocument.fullscreenElement || element.ownerDocument.webkitFullscreenElement || element.ownerDocument.mozFullScreenElement || element.webkitCurrentFullScreenElement;

    if (fullscreenElement == element) {
      return true;
    }
  }

  return false;
}
/**
 * Returns true if node is not disabled.
 *
 * IE8 can return false positives, see {@link matches}.
 * @param {!Element} element
 * @return {boolean}
 * @see https://www.w3.org/TR/html5/forms.html#concept-fe-disabled
 */


function isEnabled(element) {
  return !(element.disabled || matches(element, ':disabled'));
}

var PRECEDING_OR_CONTAINS = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
/**
 * A sorting comparator that sorts elements in DOM tree order.
 * A first sibling is sorted to be before its nextSibling.
 * A parent node is sorted to be before a child.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
 *
 * @param {!Element} element1
 * @param {!Element} element2
 * @return {number}
 */

function domOrderComparator(element1, element2) {
  if (element1 === element2) {
    return 0;
  }

  var pos = element1.compareDocumentPosition(element2); // if fe2 is preceeding or contains fe1 then, fe1 is after fe2

  if (pos & PRECEDING_OR_CONTAINS) {
    return 1;
  } // if fe2 is following or contained by fe1, then fe1 is before fe2


  return -1;
}

},{"../third_party/css-escape/css-escape":38,"./log":14,"./string":29,"./types":30,"./utils/object":36,"./utils/promise":37}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getElementService = getElementService;
exports.getElementServiceIfAvailable = getElementServiceIfAvailable;
exports.getElementServiceForDoc = getElementServiceForDoc;
exports.getElementServiceIfAvailableForDoc = getElementServiceIfAvailableForDoc;
exports.getElementServiceIfAvailableForDocInEmbedScope = getElementServiceIfAvailableForDocInEmbedScope;
exports.extensionScriptsInNode = extensionScriptsInNode;
exports.isExtensionScriptInNode = isExtensionScriptInNode;

var dom = _interopRequireWildcard(require("./dom"));

var _service = require("./service");

var _types = require("./types");

var _log = require("./log");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a promise for a service for the given id and window. Also expects an
 * element that has the actual implementation. The promise resolves when the
 * implementation loaded. Users should typically wrap this as a special purpose
 * function (e.g. Services.viewportForDoc(...)) for type safety and because the
 * factory should not be passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an element,
 *     not the extension.
 * @return {!Promise<*>}
 */
function getElementService(win, id, extension, opt_element) {
  return getElementServiceIfAvailable(win, id, extension, opt_element).then(function (service) {
    return assertService(service, id, extension);
  });
}
/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an
 *     element, not the extension.
 * @return {!Promise<?Object>}
 */


function getElementServiceIfAvailable(win, id, extension, opt_element) {
  var s = (0, _service.getServicePromiseOrNull)(win, id);

  if (s) {
    return (
      /** @type {!Promise<?Object>} */
      s
    );
  }

  return getElementServicePromiseOrNull(win, id, extension, opt_element);
}
/**
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @return {boolean} Whether this element is scheduled to be loaded.
 */


function isElementScheduled(win, elementName) {
  // Set in custom-element.js
  if (!win.ampExtendedElements) {
    return false;
  }

  return !!win.ampExtendedElements[elementName];
}
/**
 * Returns a promise for a service for the given id and window. Also expects an
 * element that has the actual implementation. The promise resolves when the
 * implementation loaded. Users should typically wrap this as a special purpose
 * function (e.g. Services.viewportForDoc(...)) for type safety and because the
 * factory should not be passed around.
 * @param {!Element|!ShadowRoot} element
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an element,
 *     not the extension.
 * @return {!Promise<*>}
 */


function getElementServiceForDoc(element, id, extension, opt_element) {
  return getElementServiceIfAvailableForDoc(element, id, extension, opt_element).then(function (service) {
    return assertService(service, id, extension);
  });
}
/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Element|!ShadowRoot} element
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an
 *     element, not the extension.
 * @return {!Promise<?Object>}
 */


function getElementServiceIfAvailableForDoc(element, id, extension, opt_element) {
  var s = (0, _service.getServicePromiseOrNullForDoc)(element, id);

  if (s) {
    return (
      /** @type {!Promise<?Object>} */
      s
    );
  }

  var ampdoc = (0, _service.getAmpdoc)(element);
  return ampdoc.whenBodyAvailable().then(function () {
    return waitForExtensionIfPresent(ampdoc.win, extension, ampdoc.win.document.head);
  }).then(function () {
    // If this service is provided by an element, then we can't depend on
    // the service (they may not use the element).
    if (opt_element) {
      return (0, _service.getServicePromiseOrNullForDoc)(element, id);
    } else if (isElementScheduled(ampdoc.win, extension)) {
      return (0, _service.getServicePromiseForDoc)(element, id);
    }

    return null;
  });
}
/**
 * Returns a promise for service for the given id in the embed scope of
 * a given element, if it exists. Falls back to ampdoc scope if the element
 * is not embedded.
 *
 * @param {!Element|!ShadowRoot} element
 * @param {string} id of the service.
 * @param {string} extension Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<?Object>}
 */


function getElementServiceIfAvailableForDocInEmbedScope(element, id, extension) {
  var s = (0, _service.getExistingServiceForDocInEmbedScope)(element, id);

  if (s) {
    return (
      /** @type {!Promise<?Object>} */
      Promise.resolve(s)
    );
  }

  var win = (0, _types.toWin)(element.ownerDocument.defaultView);
  var topWin = (0, _service.getTopWindow)(win); // In embeds, doc services are stored on the embed window.

  if (win !== topWin) {
    return getElementServicePromiseOrNull(win, id, extension);
  } else {
    // Only fallback to element's ampdoc (top-level) if not embedded.
    return getElementServiceIfAvailableForDoc(element, id, extension);
  }
}
/**
 * Throws user error if `service` is null.
 * @param {Object} service
 * @param {string} id
 * @param {string} extension
 * @return {!Object}
 * @private
 */


function assertService(service, id, extension) {
  return (
    /** @type {!Object} */
    (0, _log.userAssert)(service, 'Service %s was requested to be provided through %s, ' + 'but %s is not loaded in the current page. To fix this ' + 'problem load the JavaScript file for %s in this page.', id, extension, extension, extension)
  );
}
/**
 * Get list of all the extension JS files
 * @param {HTMLHeadElement|Element|ShadowRoot} head
 * @return {!Array<string>}
 */


function extensionScriptsInNode(head) {
  // ampdoc.getHeadNode() can return null
  if (!head) {
    return [];
  }

  var scripts = [];
  var list = head.querySelectorAll('script[custom-element]');

  for (var i = 0; i < list.length; i++) {
    scripts.push(list[i].getAttribute('custom-element'));
  }

  return scripts;
}
/**
 * Waits for body to be present then verifies that an extension script is
 * present in head for installation.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 * @param {string} extensionId
 * @return {!Promise<boolean>}
 */


function isExtensionScriptInNode(ampdoc, extensionId) {
  return ampdoc.whenBodyAvailable().then(function () {
    return extensionScriptInNode(ampdoc.getHeadNode(), extensionId);
  });
}
/**
 * Verifies that an extension script is present in head for
 * installation.
 * @param {HTMLHeadElement|Element|ShadowRoot} head
 * @param {string} extensionId
 * @private
 */


function extensionScriptInNode(head, extensionId) {
  return extensionScriptsInNode(head).includes(extensionId);
}
/**
 * Waits for an extension if its script is present
 * @param {!Window} win
 * @param {string} extension
 * @param {HTMLHeadElement|Element|ShadowRoot} head
 * @return {!Promise}
 * @private
 */


function waitForExtensionIfPresent(win, extension, head) {
  /**
   * If there is an extension script wait for it to load before trying
   * to get the service. Prevents a race condition when everything but
   * the extensions is in cache. If there is no script then it's either
   * not present, or the service was defined by a test. In those cases
   * we don't wait around for an extension that does not exist.
   */
  // TODO(jpettitt) investigate registerExtension to short circuit
  // the dom call in extensionScriptsInNode()
  if (!extensionScriptInNode(head, extension)) {
    return Promise.resolve();
  }

  var extensions = (0, _service.getService)(win, 'extensions');
  return (
    /** @type {!Promise<?Object>} */
    extensions.waitForExtension(win, extension)
  );
}
/**
 * Returns the promise for service with `id` on the given window if available.
 * Otherwise, resolves with null (service was not registered).
 * @param {!Window} win
 * @param {string} id
 * @param {string} extension
 * @param {boolean=} opt_element
 * @return {!Promise<Object>}
 * @private
 */


function getElementServicePromiseOrNull(win, id, extension, opt_element) {
  return dom.waitForBodyPromise(win.document).then(function () {
    return waitForExtensionIfPresent(win, extension, win.document.head);
  }).then(function () {
    // If this service is provided by an element, then we can't depend on
    // the service (they may not use the element).
    if (opt_element) {
      return (0, _service.getServicePromiseOrNull)(win, id);
    } else if (isElementScheduled(win, extension)) {
      return (0, _service.getServicePromise)(win, id);
    }

    return null;
  });
}

},{"./dom":10,"./log":14,"./service":27,"./types":30}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.isCanary = isCanary;
exports.getBinaryType = getBinaryType;
exports.isExperimentOn = isExperimentOn;
exports.toggleExperiment = toggleExperiment;
exports.experimentToggles = experimentToggles;
exports.experimentTogglesOrNull = experimentTogglesOrNull;
exports.getExperimentToglesFromCookieForTesting = getExperimentToglesFromCookieForTesting;
exports.resetExperimentTogglesForTesting = resetExperimentTogglesForTesting;
exports.randomlySelectUnsetExperiments = randomlySelectUnsetExperiments;
exports.getExperimentBranch = getExperimentBranch;
exports.forceExperimentBranch = forceExperimentBranch;
exports.RANDOM_NUMBER_GENERATORS = exports.ExperimentInfo = void 0;

var _cookies = require("./cookies");

var _object = require("./utils/object");

var _url = require("./url");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Experiments system allows a developer to opt-in to test
 * features that are not yet fully tested.
 *
 * Experiments page: https://cdn.ampproject.org/experiments.html *
 */

/** @const {string} */
var COOKIE_NAME = 'AMP_EXP';
/** @const {number} */

var COOKIE_MAX_AGE_DAYS = 180; // 6 month

/** @const {time} */

var COOKIE_EXPIRATION_INTERVAL = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
/** @const {string} */

var TOGGLES_WINDOW_PROPERTY = '__AMP__EXPERIMENT_TOGGLES';
/**
 * @typedef {{
 *   isTrafficEligible: function(!Window):boolean,
 *   branches: !Array<string>
 * }}
 */

var ExperimentInfo;
/**
 * Whether we are in canary.
 * @param {!Window} win
 * @return {boolean}
 */

exports.ExperimentInfo = ExperimentInfo;

function isCanary(win) {
  return !!(win.AMP_CONFIG && win.AMP_CONFIG.canary);
}
/**
 * Returns binary type, e.g., canary, production, control, or rc.
 * @param {!Window} win
 * @return {string}
 */


function getBinaryType(win) {
  return win.AMP_CONFIG && win.AMP_CONFIG.type ? win.AMP_CONFIG.type : 'unknown';
}
/**
 * Whether the specified experiment is on or off.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */


function isExperimentOn(win, experimentId) {
  var toggles = experimentToggles(win);
  return !!toggles[experimentId];
}
/**
 * Toggles the experiment on or off. Returns the actual value of the experiment
 * after toggling is done.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean=} opt_on
 * @param {boolean=} opt_transientExperiment  Whether to toggle the
 *     experiment state "transiently" (i.e., for this page load only) or
 *     durably (by saving the experiment IDs to the cookie after toggling).
 *     Default: false (save durably).
 * @return {boolean} New state for experimentId.
 */


function toggleExperiment(win, experimentId, opt_on, opt_transientExperiment) {
  var currentlyOn = isExperimentOn(win,
  /*OK*/
  experimentId);
  var on = !!(opt_on !== undefined ? opt_on : !currentlyOn);

  if (on != currentlyOn) {
    var toggles = experimentToggles(win);
    toggles[experimentId] = on;

    if (!opt_transientExperiment) {
      var cookieToggles = getExperimentTogglesFromCookie(win);
      cookieToggles[experimentId] = on;
      saveExperimentTogglesToCookie(win, cookieToggles);
    }
  }

  return on;
}
/**
 * Calculate whether the experiment is on or off based off of the
 * cookieFlag or the global config frequency given.
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 */


function experimentToggles(win) {
  if (win[TOGGLES_WINDOW_PROPERTY]) {
    return win[TOGGLES_WINDOW_PROPERTY];
  }

  win[TOGGLES_WINDOW_PROPERTY] = Object.create(null);
  var toggles = win[TOGGLES_WINDOW_PROPERTY]; // Read the default config of this build.

  if (win.AMP_CONFIG) {
    for (var experimentId in win.AMP_CONFIG) {
      var frequency = win.AMP_CONFIG[experimentId];

      if (typeof frequency === 'number' && frequency >= 0 && frequency <= 1) {
        toggles[experimentId] = Math.random() < frequency;
      }
    }
  } // Read document level override from meta tag.


  if (win.AMP_CONFIG && Array.isArray(win.AMP_CONFIG['allow-doc-opt-in']) && win.AMP_CONFIG['allow-doc-opt-in'].length > 0) {
    var allowed = win.AMP_CONFIG['allow-doc-opt-in'];
    var meta = win.document.head.querySelector('meta[name="amp-experiments-opt-in"]');

    if (meta) {
      var optedInExperiments = meta.getAttribute('content').split(',');

      for (var i = 0; i < optedInExperiments.length; i++) {
        if (allowed.indexOf(optedInExperiments[i]) != -1) {
          toggles[optedInExperiments[i]] = true;
        }
      }
    }
  }

  Object.assign(toggles, getExperimentTogglesFromCookie(win));

  if (win.AMP_CONFIG && Array.isArray(win.AMP_CONFIG['allow-url-opt-in']) && win.AMP_CONFIG['allow-url-opt-in'].length > 0) {
    var _allowed = win.AMP_CONFIG['allow-url-opt-in'];
    var hash = win.location.originalHash || win.location.hash;
    var params = (0, _url.parseQueryString)(hash);

    for (var _i = 0; _i < _allowed.length; _i++) {
      var param = params["e-" + _allowed[_i]];

      if (param == '1') {
        toggles[_allowed[_i]] = true;
      }

      if (param == '0') {
        toggles[_allowed[_i]] = false;
      }
    }
  }

  return toggles;
}
/**
 * Returns the cached experiments toggles, or null if they have not been
 * computed yet.
 * @param {!Window} win
 * @return {Object<string, boolean>}
 */


function experimentTogglesOrNull(win) {
  return win[TOGGLES_WINDOW_PROPERTY] || null;
}
/**
 * Returns a set of experiment IDs currently on.
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 */


function getExperimentTogglesFromCookie(win) {
  var experimentCookie = (0, _cookies.getCookie)(win, COOKIE_NAME);
  var tokens = experimentCookie ? experimentCookie.split(/\s*,\s*/g) : [];
  var toggles = Object.create(null);

  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].length == 0) {
      continue;
    }

    if (tokens[i][0] == '-') {
      toggles[tokens[i].substr(1)] = false;
    } else {
      toggles[tokens[i]] = true;
    }
  }

  return toggles;
}
/**
 * Saves a set of experiment IDs currently on.
 * @param {!Window} win
 * @param {!Object<string, boolean>} toggles
 */


function saveExperimentTogglesToCookie(win, toggles) {
  var experimentIds = [];

  for (var experiment in toggles) {
    experimentIds.push((toggles[experiment] === false ? '-' : '') + experiment);
  }

  (0, _cookies.setCookie)(win, COOKIE_NAME, experimentIds.join(','), Date.now() + COOKIE_EXPIRATION_INTERVAL, {
    // Set explicit domain, so the cookie gets send to sub domains.
    domain: win.location.hostname,
    allowOnProxyOrigin: true
  });
}
/**
 * See getExperimentTogglesFromCookie().
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 * @visibleForTesting
 */


function getExperimentToglesFromCookieForTesting(win) {
  return getExperimentTogglesFromCookie(win);
}
/**
 * Resets the experimentsToggle cache for testing purposes.
 * @param {!Window} win
 * @visibleForTesting
 */


function resetExperimentTogglesForTesting(win) {
  (0, _cookies.setCookie)(win, COOKIE_NAME, '', 0, {
    domain: win.location.hostname
  });
  win[TOGGLES_WINDOW_PROPERTY] = null;
}
/**
 * In some browser implementations of Math.random(), sequential calls of
 * Math.random() are correlated and can cause a bias.  In particular,
 * if the previous random() call was < 0.001 (as it will be if we select
 * into an experiment), the next value could be less than 0.5 more than
 * 50.7% of the time.  This provides an implementation that roots down into
 * the crypto API, when available, to produce less biased samples.
 *
 * @return {number} Pseudo-random floating-point value on the range [0, 1).
 */


function slowButAccuratePrng() {
  // TODO(tdrl): Implement.
  return Math.random();
}
/**
 * Container for alternate random number generator implementations.  This
 * allows us to set an "accurate" PRNG for branch selection, but to mock it
 * out easily in tests.
 *
 * @visibleForTesting
 * @const {!{accuratePrng: function():number}}
 */


var RANDOM_NUMBER_GENERATORS = {
  accuratePrng: slowButAccuratePrng
};
/**
 * Selects, uniformly at random, a single item from the array.
 * @param {!Array<string>} arr Object to select from.
 * @return {?string} Single item from arr or null if arr was empty.
 */

exports.RANDOM_NUMBER_GENERATORS = RANDOM_NUMBER_GENERATORS;

function selectRandomItem(arr) {
  var rn = RANDOM_NUMBER_GENERATORS.accuratePrng();
  return arr[Math.floor(rn * arr.length)] || null;
}
/**
 * Selects which page-level experiment branches are enabled. If a given
 * experiment name is already set (including to the null / no branches selected
 * state), this won't alter its state.
 *
 * Check whether a given experiment is set using isExperimentOn(win,
 * experimentName) and, if it is on, look for which branch is selected in
 * win.experimentBranches[experimentName].
 *
 * @param {!Window} win Window context on which to save experiment
 *     selection state.
 * @param {!Object<string, !ExperimentInfo>} experiments  Set of experiments to
 *     configure for this page load.
 * @return {!Object<string, string>} Map of experiment names to selected
 *     branches.
 */


function randomlySelectUnsetExperiments(win, experiments) {
  win.experimentBranches = win.experimentBranches || {};
  var selectedExperiments = {};

  for (var experimentName in experiments) {
    // Skip experimentName if it is not a key of experiments object or if it
    // has already been populated by some other property.
    if (!(0, _object.hasOwn)(experiments, experimentName)) {
      continue;
    }

    if ((0, _object.hasOwn)(win.experimentBranches, experimentName)) {
      selectedExperiments[experimentName] = win.experimentBranches[experimentName];
      continue;
    }

    if (!experiments[experimentName].isTrafficEligible || !experiments[experimentName].isTrafficEligible(win)) {
      win.experimentBranches[experimentName] = null;
      continue;
    } // If we're in the experiment, but we haven't already forced a specific
    // experiment branch (e.g., via a test setup), then randomize the branch
    // choice.


    if (!win.experimentBranches[experimentName] && isExperimentOn(win,
    /*OK*/
    experimentName)) {
      var branches = experiments[experimentName].branches;
      win.experimentBranches[experimentName] = selectRandomItem(branches);
      selectedExperiments[experimentName] = win.experimentBranches[experimentName];
    }
  }

  return selectedExperiments;
}
/**
 * Returns the experiment branch enabled for the given experiment ID.
 * For example, 'control' or 'experiment'.
 *
 * @param {!Window} win Window context to check for experiment state.
 * @param {string} experimentName Name of the experiment to check.
 * @return {?string} Active experiment branch ID for experimentName (possibly
 *     null if experimentName has been tested but no branch was enabled).
 */


function getExperimentBranch(win, experimentName) {
  return win.experimentBranches ? win.experimentBranches[experimentName] : null;
}
/**
 * Force enable (or disable) a specific branch of a given experiment name.
 * Disables the experiment name altogether if branchId is falseish.
 *
 * @param {!Window} win Window context to check for experiment state.
 * @param {string} experimentName Name of the experiment to check.
 * @param {?string} branchId ID of branch to force or null to disable
 *     altogether.
 * @visibleForTesting
 */


function forceExperimentBranch(win, experimentName, branchId) {
  win.experimentBranches = win.experimentBranches || {};
  toggleExperiment(win, experimentName, !!branchId, true);
  win.experimentBranches[experimentName] = branchId;
}

},{"./cookies":9,"./url":33,"./utils/object":36}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.recreateNonProtoObject = recreateNonProtoObject;
exports.getValueForExpr = getValueForExpr;
exports.parseJson = parseJson;
exports.tryParseJson = tryParseJson;
exports.getChildJsonConfig = getChildJsonConfig;
exports.deepEquals = deepEquals;

var _dom = require("./dom");

var _types = require("./types");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This module declares JSON types as defined in the
 * {@link http://json.org/}.
 */
// NOTE Type are changed to {*} because of
// https://github.com/google/closure-compiler/issues/1999

/**
 * JSON scalar. It's either string, number or boolean.
 * @typedef {*} should be string|number|boolean
 */
var JSONScalarDef;
/**
 * JSON object. It's a map with string keys and JSON values.
 * @typedef {*} should be !Object<string, ?JSONValueDef>
 */

var JSONObjectDef;
/**
 * JSON array. It's an array with JSON values.
 * @typedef {*} should be !Array<?JSONValueDef>
 */

var JSONArrayDef;
/**
 * JSON value. It's either a scalar, an object or an array.
 * @typedef {*} should be !JSONScalarDef|!JSONObjectDef|!JSONArrayDef
 */

var JSONValueDef;
/**
 * Recreates objects with prototype-less copies.
 * @param {!JsonObject} obj
 * @return {!JsonObject}
 */

function recreateNonProtoObject(obj) {
  var copy = Object.create(null);

  for (var k in obj) {
    if (!hasOwnProperty(obj, k)) {
      continue;
    }

    var v = obj[k];
    copy[k] = (0, _types.isObject)(v) ? recreateNonProtoObject(v) : v;
  }

  return (
    /** @type {!JsonObject} */
    copy
  );
}
/**
 * Returns a value from an object for a field-based expression. The expression
 * is a simple nested dot-notation of fields, such as `field1.field2`. If any
 * field in a chain does not exist or is not an object or array, the returned
 * value will be `undefined`.
 *
 * @param {!JsonObject} obj
 * @param {string} expr
 * @return {*}
 */


function getValueForExpr(obj, expr) {
  // The `.` indicates "the object itself".
  if (expr == '.') {
    return obj;
  } // Otherwise, navigate via properties.


  var parts = expr.split('.');
  var value = obj;

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];

    if (part && value && value[part] !== undefined && hasOwnProperty(value, part)) {
      value = value[part];
      continue;
    }

    value = undefined;
    break;
  }

  return value;
}
/**
 * Simple wrapper around JSON.parse that casts the return value
 * to JsonObject.
 * Create a new wrapper if an array return value is desired.
 * @param {*} json JSON string to parse
 * @return {?JsonObject} May be extend to parse arrays.
 */


function parseJson(json) {
  return (
    /** @type {?JsonObject} */
    JSON.parse(
    /** @type {string} */
    json)
  );
}
/**
 * Parses the given `json` string without throwing an exception if not valid.
 * Returns `undefined` if parsing fails.
 * Returns the `Object` corresponding to the JSON string when parsing succeeds.
 * @param {*} json JSON string to parse
 * @param {function(!Error)=} opt_onFailed Optional function that will be called
 *     with the error if parsing fails.
 * @return {?JsonObject|undefined} May be extend to parse arrays.
 */


function tryParseJson(json, opt_onFailed) {
  try {
    return parseJson(json);
  } catch (e) {
    if (opt_onFailed) {
      opt_onFailed(e);
    }

    return undefined;
  }
}
/**
 * Helper method to get the json config from an element <script> tag
 * @param {!Element} element
 * @return {?JsonObject}
 * @throws {!Error} If element does not have exactly one <script> child
 * with type="application/json", or if the <script> contents are not valid JSON.
 */


function getChildJsonConfig(element) {
  var scripts = (0, _dom.childElementsByTag)(element, 'script');
  var n = scripts.length;

  if (n !== 1) {
    throw new Error("Found " + scripts.length + " <script> children. Expected 1.");
  }

  var script = scripts[0];

  if (!(0, _dom.isJsonScriptTag)(script)) {
    throw new Error('<script> child must have type="application/json"');
  }

  try {
    return parseJson(script.textContent);
  } catch (unusedError) {
    throw new Error('Failed to parse <script> contents. Is it valid JSON?');
  }
}
/**
 * Deeply checks strict equality of items in nested arrays and objects.
 *
 * @param {JSONValueDef} a
 * @param {JSONValueDef} b
 * @param {number} depth The maximum depth. Must be finite.
 * @return {boolean}
 * @throws {Error} If depth argument is not finite.
 */


function deepEquals(a, b, depth) {
  if (depth === void 0) {
    depth = 5;
  }

  if (!isFinite(depth) || depth < 0) {
    throw new Error('Invalid depth: ' + depth);
  }

  if (a === b) {
    return true;
  }
  /** @type {!Array<{a: JSONValueDef, b: JSONValueDef, depth: number}>} */


  var queue = [{
    a: a,
    b: b,
    depth: depth
  }];

  while (queue.length > 0) {
    var _queue$shift = queue.shift(),
        _a = _queue$shift.a,
        _b = _queue$shift.b,
        _depth = _queue$shift.depth; // Only check deep equality if depth > 0.


    if (_depth > 0) {
      if (typeof _a !== typeof _b) {
        return false;
      } else if (Array.isArray(_a) && Array.isArray(_b)) {
        if (_a.length !== _b.length) {
          return false;
        }

        for (var i = 0; i < _a.length; i++) {
          queue.push({
            a: _a[i],
            b: _b[i],
            depth: _depth - 1
          });
        }

        continue;
      } else if (_a && _b && typeof _a === 'object' && typeof _b === 'object') {
        var keysA = Object.keys(
        /** @type {!Object} */
        _a);
        var keysB = Object.keys(
        /** @type {!Object} */
        _b);

        if (keysA.length !== keysB.length) {
          return false;
        }

        for (var _i = 0; _i < keysA.length; _i++) {
          var k = keysA[_i];
          queue.push({
            a: _a[k],
            b: _b[k],
            depth: _depth - 1
          });
        }

        continue;
      }
    } // If we get here, then depth == 0 or (a, b) are primitives.


    if (_a !== _b) {
      return false;
    }
  }

  return true;
}
/**
 * @param {*} obj
 * @param {string} key
 * @return {boolean}
 */


function hasOwnProperty(obj, key) {
  if (obj == null || typeof obj != 'object') {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(
  /** @type {!Object} */
  obj, key);
}

},{"./dom":10,"./types":30}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.isUserErrorMessage = isUserErrorMessage;
exports.isUserErrorEmbed = isUserErrorEmbed;
exports.setReportError = setReportError;
exports.overrideLogLevel = overrideLogLevel;
exports.duplicateErrorIfNecessary = duplicateErrorIfNecessary;
exports.createErrorVargs = createErrorVargs;
exports.rethrowAsync = rethrowAsync;
exports.initLogConstructor = initLogConstructor;
exports.resetLogConstructorForTesting = resetLogConstructorForTesting;
exports.user = user;
exports.dev = dev;
exports.isFromEmbed = isFromEmbed;
exports.devAssert = devAssert;
exports.userAssert = userAssert;
exports.Log = exports.LogLevel = exports.USER_ERROR_EMBED_SENTINEL = exports.USER_ERROR_SENTINEL = void 0;

var _mode = require("./mode");

var _modeObject = require("./mode-object");

var _types = require("./types");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Triple zero width space.
 *
 * This is added to user error messages, so that we can later identify
 * them, when the only thing that we have is the message. This is the
 * case in many browsers when the global exception handler is invoked.
 *
 * @const {string}
 */
var USER_ERROR_SENTINEL = "\u200B\u200B\u200B";
/**
 * Four zero width space.
 *
 * @const {string}
 */

exports.USER_ERROR_SENTINEL = USER_ERROR_SENTINEL;
var USER_ERROR_EMBED_SENTINEL = "\u200B\u200B\u200B\u200B";
/**
 * @param {string} message
 * @return {boolean} Whether this message was a user error.
 */

exports.USER_ERROR_EMBED_SENTINEL = USER_ERROR_EMBED_SENTINEL;

function isUserErrorMessage(message) {
  return message.indexOf(USER_ERROR_SENTINEL) >= 0;
}
/**
 * @param {string} message
 * @return {boolean} Whether this message was a a user error from an iframe embed.
 */


function isUserErrorEmbed(message) {
  return message.indexOf(USER_ERROR_EMBED_SENTINEL) >= 0;
}
/**
 * @enum {number}
 * @private Visible for testing only.
 */


var LogLevel = {
  OFF: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  FINE: 4
};
/**
 * Sets reportError function. Called from error.js to break cyclic
 * dependency.
 * @param {function(*, !Element=)|undefined} fn
 */

exports.LogLevel = LogLevel;

function setReportError(fn) {
  self.reportError = fn;
}
/**
 * @type {!LogLevel|undefined}
 * @private
 */


var levelOverride_ = undefined;
/**
 * @param {!LogLevel} level
 */

function overrideLogLevel(level) {
  levelOverride_ = level;
}
/**
 * Logging class. Use of sentinel string instead of a boolean to check user/dev
 * errors because errors could be rethrown by some native code as a new error,
 * and only a message would survive. Also, some browser don’t support a 5th
 * error object argument in window.onerror. List of supporting browser can be
 * found here:
 * https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
 * @final
 * @private Visible for testing only.
 */


var Log =
/*#__PURE__*/
function () {
  /**
   * opt_suffix will be appended to error message to identify the type of the
   * error message. We can't rely on the error object to pass along the type
   * because some browsers do not have this param in its window.onerror API.
   * See:
   * https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
   *
   * @param {!Window} win
   * @param {function(!./mode.ModeDef):!LogLevel} levelFunc
   * @param {string=} opt_suffix
   */
  function Log(win, levelFunc, opt_suffix) {
    /**
     * In tests we use the main test window instead of the iframe where
     * the tests runs because only the former is relayed to the console.
     * @const {!Window}
     */
    this.win = (0, _mode.getMode)().test && win.AMP_TEST_IFRAME ? win.parent : win;
    /** @private @const {function(!./mode.ModeDef):!LogLevel} */

    this.levelFunc_ = levelFunc;
    /** @private @const {!LogLevel} */

    this.level_ = this.defaultLevel_();
    /** @private @const {string} */

    this.suffix_ = opt_suffix || '';
  }
  /**
   * @return {!LogLevel}
   * @private
   */


  var _proto = Log.prototype;

  _proto.getLevel_ = function getLevel_() {
    return levelOverride_ !== undefined ? levelOverride_ : this.level_;
  };
  /**
   * @return {!LogLevel}
   * @private
   */


  _proto.defaultLevel_ = function defaultLevel_() {
    // No console - can't enable logging.
    if (!this.win.console || !this.win.console.log) {
      return LogLevel.OFF;
    } // Logging has been explicitly disabled.


    if ((0, _mode.getMode)().log == '0') {
      return LogLevel.OFF;
    } // Logging is enabled for tests directly.


    if ((0, _mode.getMode)().test && this.win.ENABLE_LOG) {
      return LogLevel.FINE;
    } // LocalDev by default allows INFO level, unless overriden by `#log`.


    if ((0, _mode.getMode)().localDev && !(0, _mode.getMode)().log) {
      return LogLevel.INFO;
    } // Delegate to the specific resolver.


    return this.levelFunc_((0, _modeObject.getModeObject)());
  };
  /**
   * @param {string} tag
   * @param {string} level
   * @param {!Array} messages
   */


  _proto.msg_ = function msg_(tag, level, messages) {
    if (this.getLevel_() != LogLevel.OFF) {
      var fn = this.win.console.log;

      if (level == 'ERROR') {
        fn = this.win.console.error || fn;
      } else if (level == 'INFO') {
        fn = this.win.console.info || fn;
      } else if (level == 'WARN') {
        fn = this.win.console.warn || fn;
      }

      if ((0, _mode.getMode)().localDev) {
        messages.unshift('[' + tag + ']');
      }

      fn.apply(this.win.console, messages);
    }
  };
  /**
   * Whether the logging is enabled.
   * @return {boolean}
   */


  _proto.isEnabled = function isEnabled() {
    return this.getLevel_() != LogLevel.OFF;
  };
  /**
   * Reports a fine-grained message.
   * @param {string} tag
   * @param {...*} var_args
   */


  _proto.fine = function fine(tag, var_args) {
    if (this.getLevel_() >= LogLevel.FINE) {
      this.msg_(tag, 'FINE', Array.prototype.slice.call(arguments, 1));
    }
  };
  /**
   * Reports a informational message.
   * @param {string} tag
   * @param {...*} var_args
   */


  _proto.info = function info(tag, var_args) {
    if (this.getLevel_() >= LogLevel.INFO) {
      this.msg_(tag, 'INFO', Array.prototype.slice.call(arguments, 1));
    }
  };
  /**
   * Reports a warning message.
   * @param {string} tag
   * @param {...*} var_args
   */


  _proto.warn = function warn(tag, var_args) {
    if (this.getLevel_() >= LogLevel.WARN) {
      this.msg_(tag, 'WARN', Array.prototype.slice.call(arguments, 1));
    }
  };
  /**
   * Reports an error message. If the logging is disabled, the error is rethrown
   * asynchronously.
   * @param {string} tag
   * @param {...*} var_args
   * @return {!Error|undefined}
   * @private
   */


  _proto.error_ = function error_(tag, var_args) {
    if (this.getLevel_() >= LogLevel.ERROR) {
      this.msg_(tag, 'ERROR', Array.prototype.slice.call(arguments, 1));
    } else {
      var error = createErrorVargs.apply(null, Array.prototype.slice.call(arguments, 1));
      this.prepareError_(error);
      return error;
    }
  };
  /**
   * Reports an error message.
   * @param {string} tag
   * @param {...*} var_args
   */


  _proto.error = function error(tag, var_args) {
    var error = this.error_.apply(this, arguments);

    if (error) {
      error.name = tag || error.name; // reportError is installed globally per window in the entry point.

      self.reportError(error);
    }
  };
  /**
   * Reports an error message and marks with an expected property. If the
   * logging is disabled, the error is rethrown asynchronously.
   * @param {string} unusedTag
   * @param {...*} var_args
   */


  _proto.expectedError = function expectedError(unusedTag, var_args) {
    var error = this.error_.apply(this, arguments);

    if (error) {
      error.expected = true; // reportError is installed globally per window in the entry point.

      self.reportError(error);
    }
  };
  /**
   * Creates an error object.
   * @param {...*} var_args
   * @return {!Error}
   */


  _proto.createError = function createError(var_args) {
    var error = createErrorVargs.apply(null, arguments);
    this.prepareError_(error);
    return error;
  };
  /**
   * Creates an error object with its expected property set to true.
   * @param {...*} var_args
   * @return {!Error}
   */


  _proto.createExpectedError = function createExpectedError(var_args) {
    var error = createErrorVargs.apply(null, arguments);
    this.prepareError_(error);
    error.expected = true;
    return error;
  };
  /**
   * Throws an error if the first argument isn't trueish.
   *
   * Supports argument substitution into the message via %s placeholders.
   *
   * Throws an error object that has two extra properties:
   * - associatedElement: This is the first element provided in the var args.
   *   It can be used for improved display of error messages.
   * - messageArray: The elements of the substituted message as non-stringified
   *   elements in an array. When e.g. passed to console.error this yields
   *   native displays of things like HTML elements.
   *
   * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
   *     not evaluate to true.
   * @param {string=} opt_message The assertion message
   * @param {...*} var_args Arguments substituted into %s in the message.
   * @return {T} The value of shouldBeTrueish.
   * @template T
   * eslint "google-camelcase/google-camelcase": 0
   */


  _proto.assert = function assert(shouldBeTrueish, opt_message, var_args) {
    var firstElement;

    if (!shouldBeTrueish) {
      var message = opt_message || 'Assertion failed';
      var splitMessage = message.split('%s');
      var first = splitMessage.shift();
      var formatted = first;
      var messageArray = [];
      var i = 2;
      pushIfNonEmpty(messageArray, first);

      while (splitMessage.length > 0) {
        var nextConstant = splitMessage.shift();
        var val = arguments[i++];

        if (val && val.tagName) {
          firstElement = val;
        }

        messageArray.push(val);
        pushIfNonEmpty(messageArray, nextConstant.trim());
        formatted += toString(val) + nextConstant;
      }

      var e = new Error(formatted);
      e.fromAssert = true;
      e.associatedElement = firstElement;
      e.messageArray = messageArray;
      this.prepareError_(e); // reportError is installed globally per window in the entry point.

      self.reportError(e);
      throw e;
    }

    return shouldBeTrueish;
  };
  /**
   * Throws an error if the first argument isn't an Element
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeElement
   * @param {string=} opt_message The assertion message
   * @return {!Element} The value of shouldBeTrueish.
   * @template T
   * eslint "google-camelcase/google-camelcase": 2
   */


  _proto.assertElement = function assertElement(shouldBeElement, opt_message) {
    var shouldBeTrueish = shouldBeElement && shouldBeElement.nodeType == 1;
    this.assert(shouldBeTrueish, (opt_message || 'Element expected') + ': %s', shouldBeElement);
    return (
      /** @type {!Element} */
      shouldBeElement
    );
  };
  /**
   * Throws an error if the first argument isn't a string. The string can
   * be empty.
   *
   * For more details see `assert`.
   *
   * @param {*} shouldBeString
   * @param {string=} opt_message The assertion message
   * @return {string} The string value. Can be an empty string.
   * eslint "google-camelcase/google-camelcase": 2
   */


  _proto.assertString = function assertString(shouldBeString, opt_message) {
    this.assert(typeof shouldBeString == 'string', (opt_message || 'String expected') + ': %s', shouldBeString);
    return (
      /** @type {string} */
      shouldBeString
    );
  };
  /**
   * Throws an error if the first argument isn't a number. The allowed values
   * include `0` and `NaN`.
   *
   * For more details see `assert`.
   *
   * @param {*} shouldBeNumber
   * @param {string=} opt_message The assertion message
   * @return {number} The number value. The allowed values include `0`
   *   and `NaN`.
   */


  _proto.assertNumber = function assertNumber(shouldBeNumber, opt_message) {
    this.assert(typeof shouldBeNumber == 'number', (opt_message || 'Number expected') + ': %s', shouldBeNumber);
    return (
      /** @type {number} */
      shouldBeNumber
    );
  };
  /**
   * Throws an error if the first argument is not an array.
   * The array can be empty.
   *
   * @param {*} shouldBeArray
   * @param {string=} opt_message The assertion message
   * @return {!Array} The array value
   */


  _proto.assertArray = function assertArray(shouldBeArray, opt_message) {
    this.assert(Array.isArray(shouldBeArray), (opt_message || 'Array expected') + ': %s', shouldBeArray);
    return (
      /** @type {!Array} */
      shouldBeArray
    );
  };
  /**
   * Throws an error if the first argument isn't a boolean.
   *
   * For more details see `assert`.
   *
   * @param {*} shouldBeBoolean
   * @param {string=} opt_message The assertion message
   * @return {boolean} The boolean value.
   */


  _proto.assertBoolean = function assertBoolean(shouldBeBoolean, opt_message) {
    this.assert(!!shouldBeBoolean === shouldBeBoolean, (opt_message || 'Boolean expected') + ': %s', shouldBeBoolean);
    return (
      /** @type {boolean} */
      shouldBeBoolean
    );
  };
  /**
   * Asserts and returns the enum value. If the enum doesn't contain such a
   * value, the error is thrown.
   *
   * @param {!Object<T>} enumObj
   * @param {string} s
   * @param {string=} opt_enumName
   * @return {T}
   * @template T
   * eslint "google-camelcase/google-camelcase": 2
   */


  _proto.assertEnumValue = function assertEnumValue(enumObj, s, opt_enumName) {
    if ((0, _types.isEnumValue)(enumObj, s)) {
      return s;
    }

    this.assert(false, 'Unknown %s value: "%s"', opt_enumName || 'enum', s);
  };
  /**
   * @param {!Error} error
   * @private
   */


  _proto.prepareError_ = function prepareError_(error) {
    error = duplicateErrorIfNecessary(error);

    if (this.suffix_) {
      if (!error.message) {
        error.message = this.suffix_;
      } else if (error.message.indexOf(this.suffix_) == -1) {
        error.message += this.suffix_;
      }
    } else if (isUserErrorMessage(error.message)) {
      error.message = error.message.replace(USER_ERROR_SENTINEL, '');
    }
  };

  return Log;
}();
/**
 * @param {string|!Element} val
 * @return {string}
 */


exports.Log = Log;

function toString(val) {
  // Do check equivalent to `val instanceof Element` without cross-window bug
  if (val && val.nodeType == 1) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }

  return (
    /** @type {string} */
    val
  );
}
/**
 * @param {!Array} array
 * @param {*} val
 */


function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}
/**
 * Some exceptions (DOMException, namely) have read-only message.
 * @param {!Error} error
 * @return {!Error};
 */


function duplicateErrorIfNecessary(error) {
  var messageProperty = Object.getOwnPropertyDescriptor(error, 'message');

  if (messageProperty && messageProperty.writable) {
    return error;
  }

  var message = error.message,
      stack = error.stack;
  var e = new Error(message); // Copy all the extraneous things we attach.

  for (var prop in error) {
    e[prop] = error[prop];
  } // Ensure these are copied.


  e.stack = stack;
  return e;
}
/**
 * @param {...*} var_args
 * @return {!Error}
 * @visibleForTesting
 */


function createErrorVargs(var_args) {
  var error = null;
  var message = '';

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];

    if (arg instanceof Error && !error) {
      error = duplicateErrorIfNecessary(arg);
    } else {
      if (message) {
        message += ' ';
      }

      message += arg;
    }
  }

  if (!error) {
    error = new Error(message);
  } else if (message) {
    error.message = message + ': ' + error.message;
  }

  return error;
}
/**
 * Rethrows the error without terminating the current context. This preserves
 * whether the original error designation is a user error or a dev error.
 * @param {...*} var_args
 */


function rethrowAsync(var_args) {
  var error = createErrorVargs.apply(null, arguments);
  setTimeout(function () {
    // reportError is installed globally per window in the entry point.
    self.reportError(error);
    throw error;
  });
}
/**
 * Cache for logs. We do not use a Service since the service module depends
 * on Log and closure literally can't even.
 * @type {{user: ?Log, dev: ?Log, userForEmbed: ?Log}}
 */


self.log = self.log || {
  user: null,
  dev: null,
  userForEmbed: null
};
var logs = self.log;
/**
 * Eventually holds a constructor for Log objects. Lazily initialized, so we
 * can avoid ever referencing the real constructor except in JS binaries
 * that actually want to include the implementation.
 * @type {?Function}
 */

var logConstructor = null;
/**
 * Initializes log contructor.
 */

function initLogConstructor() {
  logConstructor = Log; // Initialize instances for use. If a binary (an extension for example) that
  // does not call `initLogConstructor` invokes `dev()` or `user()` earlier than
  // the binary that does call `initLogConstructor` (amp.js), the extension will
  // throw an error as that extension will never be able to initialize the log
  // instances and we also don't want it to call `initLogConstructor` either
  // (since that will cause the Log implementation to be bundled into that
  // binary). So we must initialize the instances eagerly so that they are ready
  // for use (stored globally) after the main binary calls `initLogConstructor`.

  dev();
  user();
}
/**
 * Resets log contructor for testing.
 */


function resetLogConstructorForTesting() {
  logConstructor = null;
}
/**
 * Publisher level log.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Development mode is enabled via `#development=1` or logging is explicitly
 *     enabled via `#log=D` where D >= 1.
 *  3. AMP.setLogLevel(D) is called, where D >= 1.
 *
 * @param {!Element=} opt_element
 * @return {!Log}
 */


function user(opt_element) {
  if (!logs.user) {
    logs.user = getUserLogger(USER_ERROR_SENTINEL);
  }

  if (!isFromEmbed(logs.user.win, opt_element)) {
    return logs.user;
  } else {
    if (logs.userForEmbed) {
      return logs.userForEmbed;
    }

    return logs.userForEmbed = getUserLogger(USER_ERROR_EMBED_SENTINEL);
  }
}
/**
 * Getter for user logger
 * @param {string=} suffix
 * @return {!Log}
 */


function getUserLogger(suffix) {
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }

  return new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);

    if (mode.development || logNum >= 1) {
      return LogLevel.FINE;
    }

    return LogLevel.WARN;
  }, suffix);
}
/**
 * AMP development log. Calls to `devLog().assert` and `dev.fine` are stripped
 * in the PROD binary. However, `devLog().assert` result is preserved in either
 * case.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Logging is explicitly enabled via `#log=D`, where D >= 2.
 *  3. AMP.setLogLevel(D) is called, where D >= 2.
 *
 * @return {!Log}
 */


function dev() {
  if (logs.dev) {
    return logs.dev;
  }

  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }

  return logs.dev = new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);

    if (logNum >= 3) {
      return LogLevel.FINE;
    }

    if (logNum >= 2) {
      return LogLevel.INFO;
    }

    return LogLevel.OFF;
  });
}
/**
 * @param {!Window} win
 * @param {!Element=} opt_element
 * @return {boolean} isEmbed
 */


function isFromEmbed(win, opt_element) {
  if (!opt_element) {
    return false;
  }

  return opt_element.ownerDocument.defaultView != win;
}
/**
 * Throws an error if the first argument isn't trueish.
 *
 * Supports argument substitution into the message via %s placeholders.
 *
 * Throws an error object that has two extra properties:
 * - associatedElement: This is the first element provided in the var args.
 *   It can be used for improved display of error messages.
 * - messageArray: The elements of the substituted message as non-stringified
 *   elements in an array. When e.g. passed to console.error this yields
 *   native displays of things like HTML elements.
 *
 * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
 *     not evaluate to true.
 * @param {string=} opt_message The assertion message
 * @param {*=} opt_1 Optional argument (Var arg as individual params for better
 * @param {*=} opt_2 Optional argument inlining)
 * @param {*=} opt_3 Optional argument
 * @param {*=} opt_4 Optional argument
 * @param {*=} opt_5 Optional argument
 * @param {*=} opt_6 Optional argument
 * @param {*=} opt_7 Optional argument
 * @param {*=} opt_8 Optional argument
 * @param {*=} opt_9 Optional argument
 * @return {T} The value of shouldBeTrueish.
 * @template T
 * eslint "google-camelcase/google-camelcase": 0
 */


function devAssert(shouldBeTrueish, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9) {
  if ((0, _mode.getMode)().minified) {
    return shouldBeTrueish;
  }

  return dev().
  /*Orig call*/
  assert(shouldBeTrueish, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9);
}
/**
 * Throws an error if the first argument isn't trueish.
 *
 * Supports argument substitution into the message via %s placeholders.
 *
 * Throws an error object that has two extra properties:
 * - associatedElement: This is the first element provided in the var args.
 *   It can be used for improved display of error messages.
 * - messageArray: The elements of the substituted message as non-stringified
 *   elements in an array. When e.g. passed to console.error this yields
 *   native displays of things like HTML elements.
 *
 * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
 *     not evaluate to true.
 * @param {string=} opt_message The assertion message
 * @param {*=} opt_1 Optional argument (Var arg as individual params for better
 * @param {*=} opt_2 Optional argument inlining)
 * @param {*=} opt_3 Optional argument
 * @param {*=} opt_4 Optional argument
 * @param {*=} opt_5 Optional argument
 * @param {*=} opt_6 Optional argument
 * @param {*=} opt_7 Optional argument
 * @param {*=} opt_8 Optional argument
 * @param {*=} opt_9 Optional argument
 * @return {T} The value of shouldBeTrueish.
 * @template T
 * eslint "google-camelcase/google-camelcase": 0
 */


function userAssert(shouldBeTrueish, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9) {
  return user().
  /*Orig call*/
  assert(shouldBeTrueish, opt_message, opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, opt_7, opt_8, opt_9);
}

},{"./mode":16,"./mode-object":15,"./types":30}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getModeObject = getModeObject;

var _mode = require("./mode");

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provides info about the current app. This return value may be cached and
 * passed around as it will always be DCE'd.
 * @param {?Window=} opt_win
 * @return {!./mode.ModeDef}
 */
function getModeObject(opt_win) {
  return {
    localDev: (0, _mode.getMode)(opt_win).localDev,
    development: (0, _mode.getMode)(opt_win).development,
    filter: (0, _mode.getMode)(opt_win).filter,
    minified: (0, _mode.getMode)(opt_win).minified,
    lite: (0, _mode.getMode)(opt_win).lite,
    test: (0, _mode.getMode)(opt_win).test,
    log: (0, _mode.getMode)(opt_win).log,
    version: (0, _mode.getMode)(opt_win).version,
    rtvVersion: (0, _mode.getMode)(opt_win).rtvVersion,
    singlePassType: (0, _mode.getMode)(opt_win).singlePassType
  };
}

},{"./mode":16}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getMode = getMode;
exports.getRtvVersionForTesting = getRtvVersionForTesting;
exports.resetRtvVersionForTesting = resetRtvVersionForTesting;
exports.ModeDef = void 0;

var _urlParseQueryString = require("./url-parse-query-string");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   localDev: boolean,
 *   development: boolean,
 *   filter: (string|undefined),
 *   minified: boolean,
 *   lite: boolean,
 *   test: boolean,
 *   log: (string|undefined),
 *   version: string,
 *   rtvVersion: string,
 *   runtime: (null|string|undefined),
 *   a4aId: (null|string|undefined),
 *   singlePassType: (string|undefined)
 * }}
 */
var ModeDef;
/** @type {string} */

exports.ModeDef = ModeDef;
var version = '1902061022201';
/**
 * `rtvVersion` is the prefixed version we serve off of the cdn.
 * The prefix denotes canary(00) or prod(01) or an experiment version ( > 01).
 * @type {string}
 */

var rtvVersion = '';
/**
 * Provides info about the current app.
 * @param {?Window=} opt_win
 * @return {!ModeDef}
 */

function getMode(opt_win) {
  var win = opt_win || self;

  if (win.AMP_MODE) {
    return win.AMP_MODE;
  }

  return win.AMP_MODE = getMode_(win);
}
/**
 * Provides info about the current app.
 * @param {!Window} win
 * @return {!ModeDef}
 */


function getMode_(win) {
  // TODO(erwinmombay): simplify the logic here
  var AMP_CONFIG = self.AMP_CONFIG || {}; // Magic constants that are replaced by closure compiler.
  // IS_MINIFIED is always replaced with true when closure compiler is used
  // while IS_DEV is only replaced when `gulp dist` is called without the
  // --fortesting flag.

  var IS_DEV = true;
  var IS_MINIFIED = false;
  var localDevEnabled = !!AMP_CONFIG.localDev;
  var runningTests = !!AMP_CONFIG.test || IS_DEV && !!(win.AMP_TEST || win.__karma__);
  var isLocalDev = IS_DEV && (localDevEnabled || runningTests);
  var hashQuery = (0, _urlParseQueryString.parseQueryString_)( // location.originalHash is set by the viewer when it removes the fragment
  // from the URL.
  win.location.originalHash || win.location.hash);
  var singlePassType = AMP_CONFIG.spt;
  var searchQuery = (0, _urlParseQueryString.parseQueryString_)(win.location.search);

  if (!rtvVersion) {
    rtvVersion = getRtvVersion(win, isLocalDev);
  } // The `minified`, `test` and `localDev` properties are replaced
  // as boolean literals when we run `gulp dist` without the `--fortesting`
  // flags. This improved DCE on the production file we deploy as the code
  // paths for localhost/testing/development are eliminated.


  return {
    localDev: isLocalDev,
    // Triggers validation or enable pub level logging. Validation can be
    // bypassed via #validate=0.
    // Note that AMP_DEV_MODE flag is used for testing purposes.
    development: !!(hashQuery['development'] == '1' || win.AMP_DEV_MODE),
    examiner: hashQuery['development'] == '2',
    // Allows filtering validation errors by error category. For the
    // available categories, see ErrorCategory in validator/validator.proto.
    filter: hashQuery['filter'],
    // amp-geo override
    geoOverride: hashQuery['amp-geo'],
    minified: IS_MINIFIED,
    // Whether document is in an amp-lite viewer. It signal that the user
    // would prefer to use less bandwidth.
    lite: searchQuery['amp_lite'] != undefined,
    test: runningTests,
    log: hashQuery['log'],
    version: version,
    rtvVersion: rtvVersion,
    singlePassType: singlePassType
  };
}
/**
 * Retrieve the `rtvVersion` which will have a numeric prefix
 * denoting canary/prod/experiment (unless `isLocalDev` is true).
 *
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 */


function getRtvVersion(win, isLocalDev) {
  // If it's local dev then we won't actually have a full version so
  // just use the version.
  if (isLocalDev) {
    return version;
  }

  if (win.AMP_CONFIG && win.AMP_CONFIG.v) {
    return win.AMP_CONFIG.v;
  } // Currently `1902061022201` and thus `mode.version` contain only
  // major version. The full version however must also carry the minor version.
  // We will default to production default `01` minor version for now.
  // TODO(erwinmombay): decide whether 1902061022201 should contain
  // minor version.


  return "01" + version;
}
/**
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 * @visibleForTesting
 */


function getRtvVersionForTesting(win, isLocalDev) {
  return getRtvVersion(win, isLocalDev);
}
/** @visibleForTesting */


function resetRtvVersionForTesting() {
  rtvVersion = '';
}

},{"./url-parse-query-string":31}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.erwinmHack = void 0;

var _mode = require("./mode");

var _arrayIncludes = require("./polyfills/array-includes");

var _customElements = require("./polyfills/custom-elements");

var _domtokenlistToggle = require("./polyfills/domtokenlist-toggle");

var _documentContains = require("./polyfills/document-contains");

var _fetch = require("./polyfills/fetch");

var _mathSign = require("./polyfills/math-sign");

var _objectAssign = require("./polyfills/object-assign");

var _objectValues = require("./polyfills/object-values");

var _promise = require("./polyfills/promise");

var _documentRegisterElement = require("document-register-element/build/document-register-element.patched");

var _experiments = require("./experiments");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0, _domtokenlistToggle.install)(self);
(0, _fetch.install)(self);
(0, _mathSign.install)(self);
(0, _objectAssign.install)(self);
(0, _objectValues.install)(self);
(0, _promise.install)(self);
(0, _documentContains.install)(self);
(0, _arrayIncludes.install)(self); // isExperimentOn() must be called after Object.assign polyfill is installed.
// TODO(jridgewell): Ship custom-elements-v1. For now, we use this hack so it
// is DCE'd from production builds.

if (false && (0, _experiments.isExperimentOn)(self, 'custom-elements-v1') || (0, _mode.getMode)().test) {
  (0, _customElements.install)(self);
} else {
  (0, _documentRegisterElement.installCustomElements)(self, 'auto');
} // TODO(#18268, erwinm): For whatever reason imports to modules that have no
// export currently break for singlepass runs. This is a temporary workaround
// until we figure the issue out.


var erwinmHack = 'this export is a temporary hack for single pass';
exports.erwinmHack = erwinmHack;

},{"./experiments":12,"./mode":16,"./polyfills/array-includes":18,"./polyfills/custom-elements":19,"./polyfills/document-contains":20,"./polyfills/domtokenlist-toggle":21,"./polyfills/fetch":22,"./polyfills/math-sign":23,"./polyfills/object-assign":24,"./polyfills/object-values":25,"./polyfills/promise":26,"document-register-element/build/document-register-element.patched":6}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.install = install;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns true if the element is in the array and false otherwise.
 *
 * @param {*} value
 * @param {number=} opt_fromIndex
 * @return {boolean}
 * @this {Array}
 */
function includes(value, opt_fromIndex) {
  var fromIndex = opt_fromIndex || 0;
  var len = this.length;
  var i = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);

  for (; i < len; i++) {
    var other = this[i]; // If value has been found OR (value is NaN AND other is NaN)

    /*eslint "no-self-compare": 0*/

    if (other === value || value !== value && other !== other) {
      return true;
    }
  }

  return false;
}
/**
* Sets the Array.contains polyfill if it does not exist.
* @param {!Window} win
*/


function install(win) {
  if (!win.Array.prototype.includes) {
    win.Object.defineProperty(Array.prototype, 'includes', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: includes
    });
  }
}

},{}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.install = install;

/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   promise: !Promise<undefined>,
 *   resolve: function(),
 * }}
 */
var DeferredDef;
/**
 * @typedef {!Function}
 */

var CustomElementConstructorDef;
/**
 * @typedef {{
 *  name: string,
 *  ctor: !CustomElementConstructorDef,
 * }}
 */

var CustomElementDef;
/**
 * Validates the custom element's name.
 * This intentionally ignores "valid" higher Unicode Code Points.
 * https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
 */

var VALID_NAME = /^[a-z][a-z0-9._]*-[a-z0-9._-]*$/;
var INVALID_NAMES = ['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph'];
/**
 * A MutationObserverInit dictionary to track subtree modifications.
 */

var TRACK_SUBTREE = {
  'childList': true,
  'subtree': true
};
/**
 * Asserts that the custom element name conforms to the spec.
 *
 * @param {!Function} SyntaxError
 * @param {string} name
 */

function assertValidName(SyntaxError, name) {
  if (!VALID_NAME.test(name) || INVALID_NAMES.includes(name)) {
    throw new SyntaxError("invalid custom element name \"" + name + "\"");
  }
}
/**
 * Does win have a full Custom Elements registry?
 *
 * @param {!Window} win
 * @return {boolean}
 */


function hasCustomElements(win) {
  var customElements = win.customElements;
  return !!(customElements && customElements.define && customElements.get && customElements.whenDefined);
}
/**
 * Was HTMLElement already patched for this window?
 *
 * @param {!Window} win
 * @return {boolean}
 */


function isPatched(win) {
  var tag = win.HTMLElement.toString();
  return tag.indexOf('[native code]') === -1;
}
/**
 * Throws the error outside the current event loop.
 *
 * @param {!Error} error
 */


function rethrowAsync(error) {
  new
  /*OK*/
  Promise(function () {
    throw error;
  });
}
/**
 * The public Custom Elements API.
 */


var CustomElementRegistry =
/*#__PURE__*/
function () {
  /**
   * @param {!Window} win
   * @param {!Registry} registry
   */
  function CustomElementRegistry(win, registry) {
    /**
     * @const @private
     */
    this.win_ = win;
    /**
     * @const @private
     */

    this.registry_ = registry;
    /**
     * @type {!Object<string, DeferredDef>}
     * @private
     * @const
     */

    this.pendingDefines_ = win.Object.create(null);
  }
  /**
   * Register the custom element.
   *
   * @param {string} name
   * @param {!CustomElementConstructorDef} ctor
   * @param {!Object=} options
   */


  var _proto = CustomElementRegistry.prototype;

  _proto.define = function define(name, ctor, options) {
    this.registry_.define(name, ctor, options); // If anyone is waiting for this custom element to be defined, resolve
    // their promise.

    var pending = this.pendingDefines_;
    var deferred = pending[name];

    if (deferred) {
      deferred.resolve();
      delete pending[name];
    }
  };
  /**
   * Get the constructor of the (already defined) custom element.
   *
   * @param {string} name
   * @return {!CustomElementConstructorDef|undefined}
   */


  _proto.get = function get(name) {
    var def = this.registry_.getByName(name);

    if (def) {
      return def.ctor;
    }
  };
  /**
   * Returns a promise that waits until the custom element is defined.
   * If the custom element is already defined, returns a resolved promise.
   *
   * @param {string} name
   * @return {!Promise<undefined>}
   */


  _proto.whenDefined = function whenDefined(name) {
    var _this$win_ = this.win_,
        Promise = _this$win_.Promise,
        SyntaxError = _this$win_.SyntaxError;
    assertValidName(SyntaxError, name);

    if (this.registry_.getByName(name)) {
      return Promise.resolve();
    }

    var pending = this.pendingDefines_;
    var deferred = pending[name];

    if (deferred) {
      return deferred.promise;
    }

    var resolve;
    var promise = new
    /*OK*/
    Promise(function (res) {
      return resolve = res;
    });
    pending[name] = {
      promise: promise,
      resolve: resolve
    };
    return promise;
  };
  /**
   * Upgrade all custom elements inside root.
   *
   * @param {!Node} root
   */


  _proto.upgrade = function upgrade(root) {
    this.registry_.upgrade(root);
  };

  return CustomElementRegistry;
}();
/**
 * This internal APIs necessary to run the CustomElementRegistry.
 * Since Registry is never exposed externally, all methods are actually
 * available on the instance.
 */


var Registry =
/*#__PURE__*/
function () {
  /**
   * @param {!Window} win
   */
  function Registry(win) {
    /**
     * @private @const
     */
    this.win_ = win;
    /**
     * @private @const
     */

    this.doc_ = win.document;
    /**
     * @type {!Object<string, !CustomElementDef>}
     * @private
     * @const
     */

    this.definitions_ = win.Object.create(null);
    /**
     * A up-to-date DOM selector for all custom elements.
     * @type {string}
     */

    this.query_ = '';
    /**
     * The currently upgrading element.
     * @private {Element}
     */

    this.current_ = null;
    /**
     * Once started (after the first Custom Element definition), this tracks
     * DOM append and removals.
     *
     * @private {MutationObserver}
     */

    this.mutationObserver_ = null;
    /**
     * All the observed DOM trees, including shadow trees. This is cleared out
     * when the mutation observer is created.
     *
     * @private @const {!Array<!Node>}
     */

    this.observed_ = [win.document];
  }
  /**
   * The currently-being-upgraded custom element.
   *
   * When an already created (through the DOM parsing APIs, or innerHTML)
   * custom element node is being upgraded, we can't just create a new node
   * (it's illegal in the spec). But we still need to run the custom element's
   * constructor code on the node. We avoid this conundrum by running the
   * constructor while returning this current node in the HTMLElement
   * class constructor (the base class of all custom elements).
   *
   * @return {Element}
   */


  var _proto2 = Registry.prototype;

  _proto2.current = function current() {
    var current = this.current_;
    this.current_ = null;
    return current;
  };
  /**
   * Finds the custom element definition by name.
   *
   * @param {string} name
   * @return {CustomElementDef|undefined}
   */


  _proto2.getByName = function getByName(name) {
    var definition = this.definitions_[name];

    if (definition) {
      return definition;
    }
  };
  /**
   * Finds the custom element definition by constructor instance.
   *
   * @param {CustomElementConstructorDef} ctor
   * @return {CustomElementDef|undefined}
   */


  _proto2.getByConstructor = function getByConstructor(ctor) {
    var definitions = this.definitions_;

    for (var name in definitions) {
      var def = definitions[name];

      if (def.ctor === ctor) {
        return def;
      }
    }
  };
  /**
   * Registers the custom element definition, and upgrades all elements by that
   * name in the root document.
   *
   * @param {string} name
   * @param {!CustomElementConstructorDef} ctor
   * @param {!Object|undefined} options
   */


  _proto2.define = function define(name, ctor, options) {
    var _this$win_2 = this.win_,
        Error = _this$win_2.Error,
        SyntaxError = _this$win_2.SyntaxError;

    if (options) {
      throw new Error('Extending native custom elements is not supported');
    }

    assertValidName(SyntaxError, name);

    if (this.getByName(name) || this.getByConstructor(ctor)) {
      throw new Error("duplicate definition \"" + name + "\"");
    } // TODO(jridgewell): Record connectedCallback, disconnectedCallback,
    // adoptedCallback, attributeChangedCallback, and observedAttributes.
    // TODO(jridgewell): If attributeChangedCallback, gather observedAttributes


    this.definitions_[name] = {
      name: name,
      ctor: ctor
    };
    this.observe_(name);
    this.upgrade(this.doc_, name);
  };
  /**
   * Upgrades custom elements descendants of root (but not including root).
   *
   * When called with an opt_query, it both upgrades and connects the custom
   * elements (this is used during the custom element define algorithm).
   *
   * @param {!Node} root
   * @param {string=} opt_query
   */


  _proto2.upgrade = function upgrade(root, opt_query) {
    // Only CustomElementRegistry.p.define provides a query (the newly defined
    // custom element). In this case, we are both upgrading _and_ connecting
    // the custom elements.
    var newlyDefined = !!opt_query;
    var query = opt_query || this.query_;
    var upgradeCandidates = this.queryAll_(root, query);

    for (var i = 0; i < upgradeCandidates.length; i++) {
      var candidate = upgradeCandidates[i];

      if (newlyDefined) {
        this.connectedCallback_(candidate);
      } else {
        this.upgradeSelf(candidate);
      }
    }
  };
  /**
   * Upgrades the custom element node, if a custom element has been registered
   * by this name.
   *
   * @param {!Node} node
   */


  _proto2.upgradeSelf = function upgradeSelf(node) {
    var def = this.getByName(node.localName);

    if (!def) {
      return;
    }

    this.upgradeSelf_(
    /** @type {!Element} */
    node, def);
  };
  /**
   * @param {!Node} root
   * @param {string} query
   * @return {!Array|!NodeList}
   */


  _proto2.queryAll_ = function queryAll_(root, query) {
    if (!query || !root.querySelectorAll) {
      // Nothing to do...
      return [];
    }

    return root.querySelectorAll(query);
  };
  /**
   * Upgrades the (already created via DOM parsing) custom element.
   *
   * @param {!Element} node
   * @param {!CustomElementDef} def
   */


  _proto2.upgradeSelf_ = function upgradeSelf_(node, def) {
    var ctor = def.ctor;

    if (node instanceof ctor) {
      return;
    } // Despite how it looks, this is not a useless construction.
    // HTMLElementPolyfill (the base class of all custom elements) will return
    // the current node, allowing the custom element's subclass constructor to
    // run on the node. The node itself is already constructed, so the return
    // value is just the node.


    this.current_ = node;

    try {
      var el = new ctor();

      if (el !== node) {
        throw new this.win_.Error('Constructor illegally returned a different instance.');
      }
    } catch (e) {
      rethrowAsync(e);
    }
  };
  /**
   * Fires connectedCallback on the custom element, if it has one.
   * This also upgrades the custom element, since it may not have been
   * accessible via the root document before (a detached DOM tree).
   *
   * @param {!Node} node
   */


  _proto2.connectedCallback_ = function connectedCallback_(node) {
    var def = this.getByName(node.localName);

    if (!def) {
      return;
    }

    this.upgradeSelf_(
    /** @type {!Element} */
    node, def); // TODO(jridgewell): It may be appropriate to adoptCallback, if the node
    // used to be in another doc.
    // TODO(jridgewell): I should be calling the definitions connectedCallback
    // with node as the context.

    if (node.connectedCallback) {
      try {
        node.connectedCallback();
      } catch (e) {
        rethrowAsync(e);
      }
    }
  };
  /**
   * Fires disconnectedCallback on the custom element, if it has one.
   *
   * @param {!Node} node
   */


  _proto2.disconnectedCallback_ = function disconnectedCallback_(node) {
    // TODO(jridgewell): I should be calling the definitions connectedCallback
    // with node as the context.
    if (node.disconnectedCallback) {
      try {
        node.disconnectedCallback();
      } catch (e) {
        rethrowAsync(e);
      }
    }
  };
  /**
   * Records name as a registered custom element to observe.
   *
   * Starts the Mutation Observer if this is the first registered custom
   * element. This is deferred until the first custom element is defined to
   * speed up initial rendering of the page.
   *
   * Mutation Observers are conveniently available in every browser we care
   * about. When a node is connected to the root document, all custom
   * elements (including that node iteself) will be upgraded and call
   * connectedCallback. When a node is disconnectedCallback from the root
   * document, all custom elements will call disconnectedCallback.
   *
   * @param {string} name
   */


  _proto2.observe_ = function observe_(name) {
    var _this = this;

    if (this.query_) {
      this.query_ += "," + name;
      return;
    }

    this.query_ = name; // The first registered name starts the mutation observer.

    var mo = new this.win_.MutationObserver(function (records) {
      if (records) {
        _this.handleRecords_(records);
      }
    });
    this.mutationObserver_ = mo;
    this.observed_.forEach(function (tree) {
      mo.observe(tree, TRACK_SUBTREE);
    });
    this.observed_.length = 0;
    installPatches(this.win_, this);
  };
  /**
   * Adds the shadow tree to be observed by the polyfill.
   *
   * @param {!Node} tree
   */


  _proto2.observe = function observe(tree) {
    if (this.mutationObserver_) {
      this.mutationObserver_.observe(tree, TRACK_SUBTREE);
    } else {
      this.observed_.push(tree);
    }
  };
  /**
   * This causes a synchronous handling of all the Mutation Observer's tracked
   * mutations. This does nothing until the mutation observer is actually
   * registered on the first Custom Element definition.
   */


  _proto2.sync = function sync() {
    if (this.mutationObserver_) {
      this.handleRecords_(this.mutationObserver_.takeRecords());
    }
  };
  /**
   * Handle all the Mutation Observer's Mutation Records.
   * All added custom elements will be upgraded (if not already) and call
   * connectedCallback. All removed custom elements will call
   * disconnectedCallback.
   *
   * @param {!Array<!MutationRecord>} records
   */


  _proto2.handleRecords_ = function handleRecords_(records) {
    for (var i = 0; i < records.length; i++) {
      var record = records[i];

      if (!record) {
        continue;
      }

      var addedNodes = record.addedNodes,
          removedNodes = record.removedNodes;

      for (var _i = 0; _i < addedNodes.length; _i++) {
        var node = addedNodes[_i];
        var connectedCandidates = this.queryAll_(node, this.query_);
        this.connectedCallback_(node);

        for (var _i2 = 0; _i2 < connectedCandidates.length; _i2++) {
          this.connectedCallback_(connectedCandidates[_i2]);
        }
      }

      for (var _i3 = 0; _i3 < removedNodes.length; _i3++) {
        var _node = removedNodes[_i3];
        var disconnectedCandidates = this.queryAll_(_node, this.query_);
        this.disconnectedCallback_(_node);

        for (var _i4 = 0; _i4 < disconnectedCandidates.length; _i4++) {
          this.disconnectedCallback_(disconnectedCandidates[_i4]);
        }
      }
    }
  };

  return Registry;
}();
/**
 * Patches the DOM APIs to support synchronous Custom Elements.
 * @param {!Window} win
 * @param {!Registry} registry
 */


function installPatches(win, registry) {
  var Document = win.Document,
      Element = win.Element,
      Node = win.Node,
      Object = win.Object;
  var docProto = Document.prototype;
  var elProto = Element.prototype;
  var nodeProto = Node.prototype;
  var createElement = docProto.createElement,
      importNode = docProto.importNode;
  var appendChild = nodeProto.appendChild,
      cloneNode = nodeProto.cloneNode,
      insertBefore = nodeProto.insertBefore,
      removeChild = nodeProto.removeChild,
      replaceChild = nodeProto.replaceChild; // Patch createElement to immediately upgrade the custom element.
  // This has the added benefit that it avoids the "already created but needs
  // constructor code run" chicken-and-egg problem.

  docProto.createElement = function (name) {
    var def = registry.getByName(name);

    if (def) {
      return new def.ctor();
    }

    return createElement.apply(this, arguments);
  }; // Patch importNode to immediately upgrade custom elements.
  // TODO(jridgewell): Can fire adoptedCallback for cross doc imports.


  docProto.importNode = function () {
    var imported = importNode.apply(this, arguments);

    if (imported) {
      registry.upgradeSelf(imported);
      registry.upgrade(imported);
    }

    return imported;
  }; // Patch appendChild to upgrade custom elements before returning.


  nodeProto.appendChild = function () {
    var appended = appendChild.apply(this, arguments);
    registry.sync();
    return appended;
  }; // Patch insertBefore to upgrade custom elements before returning.


  nodeProto.insertBefore = function () {
    var inserted = insertBefore.apply(this, arguments);
    registry.sync();
    return inserted;
  }; // Patch removeChild to upgrade custom elements before returning.


  nodeProto.removeChild = function () {
    var removed = removeChild.apply(this, arguments);
    registry.sync();
    return removed;
  }; // Patch replaceChild to upgrade and detach custom elements before returning.


  nodeProto.replaceChild = function () {
    var replaced = replaceChild.apply(this, arguments);
    registry.sync();
    return replaced;
  }; // Patch cloneNode to immediately upgrade custom elements.


  nodeProto.cloneNode = function () {
    var cloned = cloneNode.apply(this, arguments);
    registry.upgradeSelf(cloned);
    registry.upgrade(cloned);
    return cloned;
  }; // Patch the innerHTML setter to immediately upgrade custom elements.
  // Note, this could technically fire connectedCallbacks if this node was
  // connected, but we leave that to the Mutation Observer.


  var innerHTMLDesc = Object.getOwnPropertyDescriptor(elProto, 'innerHTML');
  var innerHTMLSetter = innerHTMLDesc.set;

  innerHTMLDesc.set = function (html) {
    innerHTMLSetter.call(this, html);
    registry.upgrade(this);
  };

  Object.defineProperty(elProto, 'innerHTML', innerHTMLDesc);
}
/**
 * Does the polyfilling.
 * @param {!Window} win
 */


function polyfill(win) {
  var Element = win.Element,
      HTMLElement = win.HTMLElement,
      Object = win.Object,
      document = win.document;
  var createElement = document.createElement;
  var registry = new Registry(win);
  var customElements = new CustomElementRegistry(win, registry); // Expose the custom element registry.
  // Object.getOwnPropertyDescriptor(window, 'customElements')
  // {get: ƒ, set: undefined, enumerable: true, configurable: true}

  Object.defineProperty(win, 'customElements', {
    enumerable: true,
    configurable: true,
    // writable: false,
    value: customElements
  }); // Have to patch shadow methods now, since there's no way to find shadow trees
  // later.

  var elProto = Element.prototype;
  var attachShadow = elProto.attachShadow,
      createShadowRoot = elProto.createShadowRoot;

  if (attachShadow) {
    /**
    * @param {!{mode: string}} unused
    * @return {!ShadowRoot}
    */
    elProto.attachShadow = function (unused) {
      var shadow = attachShadow.apply(this, arguments);
      registry.observe(shadow);
      return shadow;
    }; // Necessary for Shadow AMP


    elProto.attachShadow.toString = function () {
      return attachShadow.toString();
    };
  }

  if (createShadowRoot) {
    /**
    * @return {!ShadowRoot}
    */
    elProto.createShadowRoot = function () {
      var shadow = createShadowRoot.apply(this, arguments);
      registry.observe(shadow);
      return shadow;
    }; // Necessary for Shadow AMP


    elProto.createShadowRoot.toString = function () {
      return createShadowRoot.toString();
    };
  }
  /**
   * You can't use the real HTMLElement constructor, because you can't subclass
   * it without using native classes. So, mock its approximation using
   * createElement.
   */


  function HTMLElementPolyfill() {
    var constructor = this.constructor; // If we're upgrading an already created custom element, we can't create
    // another new node (by the spec, it must be the same node).

    var el = registry.current(); // If there's not a already created custom element, we're being invoked via
    // `new`ing the constructor.
    //
    // Technically, we could get here via createElement, but we patched that.
    // If it the custom element was registered, the patch turned it into a
    // `new` call.
    // If it was not registered, the native createElement is used. And if
    // native createElement is being used and we got to this code, we're really
    // in an infinite loop (a native createElement call just below) so we've
    // got bigger problems.
    //
    // So just take my word we got here via `new`.

    if (!el) {
      // The custom element definition is an invariant. If the custom element
      // is registered, everything works. If it's not, it throws in the member
      // property access (only defined custom elements can be directly
      // constructed via `new`).
      var def = registry.getByConstructor(constructor);
      el = createElement.call(document, def.name);
    } // Finally, if the node was already constructed, we need to reset it's
    // prototype to the custom element prototype. And if it wasn't already
    // constructed, we created a new node via native createElement, and we need
    // to reset it's prototype. Basically always reset the prototype.


    Object.setPrototypeOf(el, constructor.prototype);
    return el;
  }

  subClass(Object, HTMLElement, HTMLElementPolyfill); // Expose the polyfilled HTMLElement constructor for everyone to extend from.

  win.HTMLElement = HTMLElementPolyfill;
}
/**
 * Wraps HTMLElement in a Reflect.construct constructor, so that transpiled
 * classes can `_this = superClass.call(this)` during their construction.
 *
 * This is only used when Custom Elements v1 is already available _and_ we're
 * using transpiled classes (which use ES5 construction idioms).
 *
 * @param {!Window} win
 * @suppress {globalThis}
 */


function wrapHTMLElement(win) {
  var HTMLElement = win.HTMLElement,
      Reflect = win.Reflect,
      Object = win.Object;
  /**
   */

  function HTMLElementWrapper() {
    var ctor =
    /** @type {function(...?):?|undefined} */
    this.constructor; // Reflect.construct allows us to construct a new HTMLElement without using
    // `new` (which will always fail because native HTMLElement is a restricted
    // constructor).

    return Reflect.construct(HTMLElement, [], ctor);
  }

  subClass(Object, HTMLElement, HTMLElementWrapper); // Expose the wrapped HTMLElement constructor for everyone to extend from.

  win.HTMLElement = HTMLElementWrapper;
}
/**
 * Setups up prototype inheritance
 *
 * @param {!Object} Object
 * @param {!Function} superClass
 * @param {!Function} subClass
 */


function subClass(Object, superClass, subClass) {
  // Object.getOwnPropertyDescriptor(superClass.prototype, 'constructor')
  // {value: ƒ, writable: true, enumerable: false, configurable: true}
  subClass.prototype = Object.create(superClass.prototype, {
    constructor: {
      // enumerable: false,
      configurable: true,
      writable: true,
      value: subClass
    }
  });
}
/**
 * Polyfills Custom Elements v1 API. This has 5 modes:
 *
 * 1. Custom elements v1 already supported, using native classes
 * 2. Custom elements v1 already supported, using transpiled classes
 * 3. Custom elements v1 not supported, using native classes
 * 4. Custom elements v1 not supported, using transpiled classes
 * 5. No sample class constructor provided
 *
 * In mode 1, nothing is done. In mode 2, a minimal polyfill is used to support
 * extending the HTMLElement base class. In mode 3, 4, and 5 a full polyfill is
 * done.
 *
 * @param {!Window} win
 * @param {!Function=} opt_ctor
 */


function install(win, opt_ctor) {
  if (isPatched(win)) {
    return;
  }

  var install = true;
  var installWrapper = false;

  if (opt_ctor && hasCustomElements(win)) {
    // If ctor is constructable without new, it's a function. That means it was
    // compiled down, and we need to do the minimal polyfill because all you
    // cannot extend HTMLElement without native classes.
    try {
      var _Object = win.Object,
          _Reflect = win.Reflect; // "Construct" ctor using ES5 idioms

      var instance = _Object.create(opt_ctor.prototype);

      opt_ctor.call(instance); // If that succeeded, we're in a transpiled environment
      // Let's find out if we can wrap HTMLElement and avoid a full patch.

      installWrapper = !!(_Reflect && _Reflect.construct);
    } catch (e) {
      // The ctor threw when we constructed is via ES5, so it's a real class.
      // We're ok to not install the polyfill.
      install = false;
    }
  }

  if (installWrapper) {
    wrapHTMLElement(win);
  } else if (install) {
    polyfill(win);
  }
}

},{}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.install = install;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `document.contains()` method. Notice that according to spec
 * `document.contains` is inclusionary.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {?Node} node
 * @return {boolean}
 * @this {Node}
 */
function documentContainsPolyfill(node) {
  // Per spec, "contains" method is inclusionary
  // i.e. `node.contains(node) == true`. However, we still need to test
  // equality to the document itself.
  return node == this || this.documentElement.contains(node);
}
/**
 * Polyfills `HTMLDocument.contains` API.
 * @param {!Window} win
 */


function install(win) {
  // HTMLDocument is undefined in Internet Explorer 10, but it has Document,
  // so we use that as a fallback.
  var documentClass = win.HTMLDocument || win.Document;

  if (!documentClass.prototype.contains) {
    win.Object.defineProperty(documentClass.prototype, 'contains', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: documentContainsPolyfill
    });
  }
}

},{}],21:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.install = install;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `DOMTokenList.prototype.toggle(token, opt_force)` method. This
 * is specially important because IE does not support `opt_force` attribute. See
 * https://goo.gl/hgKNYY for details.
 * @param {string} token
 * @param {boolean=} opt_force
 * @this {DOMTokenList}
 * @return {boolean}
 */
function domTokenListTogglePolyfill(token, opt_force) {
  var remove = opt_force === undefined ? this.contains(token) : !opt_force;

  if (remove) {
    this.remove(token);
    return false;
  } else {
    this.add(token);
    return true;
  }
}
/**
 * Polyfills `DOMTokenList.prototype.toggle` API in IE.
 * @param {!Window} win
 */


function install(win) {
  if (isIe(win) && win.DOMTokenList) {
    win.Object.defineProperty(win.DOMTokenList.prototype, 'toggle', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: domTokenListTogglePolyfill
    });
  }
}
/**
 * Whether the current browser is a IE browser.
 * @param {!Window} win
 * @return {boolean}
 */


function isIe(win) {
  return /Trident|MSIE|IEMobile/i.test(win.navigator.userAgent);
}

},{}],22:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.fetchPolyfill = fetchPolyfill;
exports.install = install;
exports.Response = void 0;

var _log = require("../log");

var _object = require("../utils/object");

var _types = require("../types");

var _json = require("../json");

var _bytes = require("../utils/bytes");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @enum {number} Allowed fetch responses. */
var allowedFetchTypes = {
  document: 1,
  text: 2
};
/** @const {!Array<string>} */

var allowedMethods = ['GET', 'POST'];
/**
 * A record version of `XMLHttpRequest` that has all the necessary properties
 * and methods of `XMLHttpRequest` to construct a `FetchResponse` from a
 * serialized response returned by the viewer.
 * @typedef {{
 *   status: number,
 *   statusText: string,
 *   responseText: string,
 *   getResponseHeader: function(this:XMLHttpRequestDef, string): string,
 * }}
 */

var XMLHttpRequestDef;
/**
 * A minimal polyfill of Fetch API. It only polyfills what we currently use.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * Notice that the "fetch" method itself is not exported as that would require
 * us to immediately support a much wide API.
 *
 * @param {string} input
 * @param {!Object|RequestInit=} init
 * @return {!Promise<!FetchResponse>}
 */

function fetchPolyfill(input, init) {
  if (init === void 0) {
    init = {};
  }

  return new Promise(function (resolve, reject) {
    var requestMethod = normalizeMethod(init.method || 'GET');
    var xhr = createXhrRequest(requestMethod, input);

    if (init.credentials == 'include') {
      xhr.withCredentials = true;
    }

    if (init.responseType in allowedFetchTypes) {
      xhr.responseType = init.responseType;
    }

    if (init.headers) {
      Object.keys(init.headers).forEach(function (header) {
        xhr.setRequestHeader(header, init.headers[header]);
      });
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState <
      /* STATUS_RECEIVED */
      2) {
        return;
      }

      if (xhr.status < 100 || xhr.status > 599) {
        xhr.onreadystatechange = null;
        reject((0, _log.user)().createExpectedError("Unknown HTTP status " + xhr.status));
        return;
      } // TODO(dvoytenko): This is currently simplified: we will wait for the
      // whole document loading to complete. This is fine for the use cases
      // we have now, but may need to be reimplemented later.


      if (xhr.readyState ==
      /* COMPLETE */
      4) {
        resolve(new FetchResponse(xhr));
      }
    };

    xhr.onerror = function () {
      reject((0, _log.user)().createExpectedError('Network failure'));
    };

    xhr.onabort = function () {
      reject((0, _log.user)().createExpectedError('Request aborted'));
    };

    if (requestMethod == 'POST') {
      xhr.send(init.body);
    } else {
      xhr.send();
    }
  });
}
/**
 * @param {string} method
 * @param {string} url
 * @return {!XMLHttpRequest}
 */


function createXhrRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else {
    throw (0, _log.dev)().createExpectedError('CORS is not supported');
  }

  return xhr;
}
/**
 * Response object in the Fetch API.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 */


var FetchResponse =
/*#__PURE__*/
function () {
  /**
   * @param {!XMLHttpRequest|!XMLHttpRequestDef} xhr
   */
  function FetchResponse(xhr) {
    /** @private @const {!XMLHttpRequest|!XMLHttpRequestDef} */
    this.xhr_ = xhr;
    /** @const {number} */

    this.status = this.xhr_.status;
    /** @const {string} */

    this.statusText = this.xhr_.statusText;
    /** @const {boolean} */

    this.ok = this.status >= 200 && this.status < 300;
    /** @const {!FetchResponseHeaders} */

    this.headers = new FetchResponseHeaders(xhr);
    /** @type {boolean} */

    this.bodyUsed = false;
    /** @type {?ReadableStream} */

    this.body = null;
  }
  /**
   * Create a copy of the response and return it.
   * @return {!FetchResponse}
   */


  var _proto = FetchResponse.prototype;

  _proto.clone = function clone() {
    (0, _log.devAssert)(!this.bodyUsed, 'Body already used');
    return new FetchResponse(this.xhr_);
  };
  /**
   * Drains the response and returns the text.
   * @return {!Promise<string>}
   * @private
   */


  _proto.drainText_ = function drainText_() {
    (0, _log.devAssert)(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    return Promise.resolve(this.xhr_.responseText);
  };
  /**
   * Drains the response and returns a promise that resolves with the response
   * text.
   * @return {!Promise<string>}
   */


  _proto.text = function text() {
    return this.drainText_();
  };
  /**
   * Drains the response and returns the JSON object.
   * @return {!Promise<!JsonObject>}
   */


  _proto.json = function json() {
    return (
      /** @type {!Promise<!JsonObject>} */
      this.drainText_().then(_json.parseJson)
    );
  };
  /**
   * Drains the response and returns a promise that resolves with the response
   * ArrayBuffer.
   * @return {!Promise<!ArrayBuffer>}
   */


  _proto.arrayBuffer = function arrayBuffer() {
    return (
      /** @type {!Promise<!ArrayBuffer>} */
      this.drainText_().then(_bytes.utf8Encode)
    );
  };

  return FetchResponse;
}();
/**
 * Normalized method name by uppercasing.
 * @param {string|undefined} method
 * @return {string}
 * @private
 */


function normalizeMethod(method) {
  if (method === undefined) {
    return 'GET';
  }

  method = method.toUpperCase();
  (0, _log.devAssert)(allowedMethods.includes(method), 'Only one of %s is currently allowed. Got %s', allowedMethods.join(', '), method);
  return method;
}
/**
 * Provides access to the response headers as defined in the Fetch API.
 * @private Visible for testing.
 */


var FetchResponseHeaders =
/*#__PURE__*/
function () {
  /**
   * @param {!XMLHttpRequest|!XMLHttpRequestDef} xhr
   */
  function FetchResponseHeaders(xhr) {
    /** @private @const {!XMLHttpRequest|!XMLHttpRequestDef} */
    this.xhr_ = xhr;
  }
  /**
   * @param {string} name
   * @return {string}
   */


  var _proto2 = FetchResponseHeaders.prototype;

  _proto2.get = function get(name) {
    return this.xhr_.getResponseHeader(name);
  };
  /**
   * @param {string} name
   * @return {boolean}
   */


  _proto2.has = function has(name) {
    return this.xhr_.getResponseHeader(name) != null;
  };

  return FetchResponseHeaders;
}();

var Response =
/*#__PURE__*/
function (_FetchResponse) {
  _inheritsLoose(Response, _FetchResponse);

  /**
   * Returns instance of Response.
   * @param {?ResponseBodyInit=} body
   * @param {!ResponseInit=} init
   */
  function Response(body, init) {
    if (init === void 0) {
      init = {};
    }

    var lowercasedHeaders = (0, _object.map)();
    var data = Object.assign({
      status: 200,
      statusText: 'OK',
      responseText: body ? String(body) : '',

      /**
       * @param {string} name
       * @return {string}
       */
      getResponseHeader: function getResponseHeader(name) {
        var headerName = String(name).toLowerCase();
        return (0, _object.hasOwn)(lowercasedHeaders, headerName) ? lowercasedHeaders[headerName] : null;
      }
    }, init);
    data.status = init.status === undefined ? 200 : parseInt(init.status, 10);

    if ((0, _types.isArray)(init.headers)) {
      init.headers.forEach(function (entry) {
        var headerName = entry[0];
        var headerValue = entry[1];
        lowercasedHeaders[String(headerName).toLowerCase()] = String(headerValue);
      });
    } else if ((0, _types.isObject)(init.headers)) {
      for (var key in init.headers) {
        lowercasedHeaders[String(key).toLowerCase()] = String(init.headers[key]);
      }
    }

    if (init.statusText) {
      data.statusText = String(init.statusText);
    }

    return _FetchResponse.call(this,
    /** @type {XMLHttpRequestDef} */
    data) || this;
  }

  return Response;
}(FetchResponse);
/**
 * Installs fetch and Response polyfill
 *
 * @export
 * @param {Window} win
 */


exports.Response = Response;

function install(win) {
  if (!win.fetch) {
    Object.defineProperty(win, 'fetch', {
      value: fetchPolyfill,
      writable: true,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(win, 'Response', {
      value: Response,
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
}

},{"../json":13,"../log":14,"../types":30,"../utils/bytes":34,"../utils/object":36}],23:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.sign = sign;
exports.install = install;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Parses the number x and returns its sign. For positive x returns 1, for
 * negative, -1. For 0 and -0, returns 0 and -0 respectively. For any number
 * that parses to NaN, returns NaN.
 *
 * @param {number} x
 * @return {number}
 */
function sign(x) {
  x = Number(x); // If x is 0, -0, or NaN, return it.

  if (!x) {
    return x;
  }

  return x > 0 ? 1 : -1;
}
/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Math.sign) {
    win.Object.defineProperty(win.Math, 'sign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: sign
    });
  }
}

},{}],24:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.assign = assign;
exports.install = install;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Copies values of all enumerable own properties from one or more source
 * objects (provided as extended arguments to the function) to a target object.
 *
 * @param {!Object} target
 * @param {...Object} var_args
 * @return {!Object}
 */

function assign(target, var_args) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    if (source != null) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
}
/**
 * Sets the Object.assign polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Object.assign) {
    win.Object.defineProperty(win.Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

},{}],25:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.values = values;
exports.install = install;

/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Implements `Object.values` API.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values.
 *
 * @param {!Object} target
 * @return {!Array<*>}
 */
function values(target) {
  return Object.keys(target).map(function (k) {
    return target[k];
  });
}
/**
 * Sets the Object.values polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Object.values) {
    win.Object.defineProperty(win.Object, 'values', {
      configurable: true,
      writable: true,
      value: values
    });
  }
}

},{}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.install = install;

var _promise = _interopRequireDefault(require("promise-pjs/promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sets the Promise polyfill if it does not exist.
 * @param {!Window} win
 */
function install(win) {
  if (!win.Promise) {
    win.Promise =
    /** @type {?} */
    _promise.default; // In babel the * export is an Object with a default property.
    // In closure compiler it is the Promise function itself.

    if (_promise.default.default) {
      win.Promise = _promise.default.default;
    } // We copy the individual static methods, because closure
    // compiler flattens the polyfill namespace.


    win.Promise.resolve = _promise.default.resolve;
    win.Promise.reject = _promise.default.reject;
    win.Promise.all = _promise.default.all;
    win.Promise.race = _promise.default.race;
  }
}

},{"promise-pjs/promise":7}],27:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getExistingServiceForDocInEmbedScope = getExistingServiceForDocInEmbedScope;
exports.installServiceInEmbedScope = installServiceInEmbedScope;
exports.registerServiceBuilder = registerServiceBuilder;
exports.registerServiceBuilderForDoc = registerServiceBuilderForDoc;
exports.getService = getService;
exports.getServicePromise = getServicePromise;
exports.getExistingServiceOrNull = getExistingServiceOrNull;
exports.getServicePromiseOrNull = getServicePromiseOrNull;
exports.getServiceForDoc = getServiceForDoc;
exports.getServicePromiseForDoc = getServicePromiseForDoc;
exports.getServicePromiseOrNullForDoc = getServicePromiseOrNullForDoc;
exports.setParentWindow = setParentWindow;
exports.getParentWindow = getParentWindow;
exports.getTopWindow = getTopWindow;
exports.getParentWindowFrameElement = getParentWindowFrameElement;
exports.getAmpdoc = getAmpdoc;
exports.isDisposable = isDisposable;
exports.assertDisposable = assertDisposable;
exports.disposeServicesForDoc = disposeServicesForDoc;
exports.disposeServicesForEmbed = disposeServicesForEmbed;
exports.installServiceInEmbedIfEmbeddable = installServiceInEmbedIfEmbeddable;
exports.resetServiceForTesting = resetServiceForTesting;
exports.EmbeddableService = exports.Disposable = void 0;

require("./polyfills");

var _promise = require("./utils/promise");

var _log = require("./log");

var _types = require("./types");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Registration and getter functions for AMP services.
 *
 * Invariant: Service getters never return null for registered services.
 */
// src/polyfills.js must be the first import.
// eslint-disable-line sort-imports-es6-autofix/sort-imports-es6

/**
 * Holds info about a service.
 * - obj: Actual service implementation when available.
 * - promise: Promise for the obj.
 * - resolve: Function to resolve the promise with the object.
 * - context: Argument for ctor, either a window or an ampdoc.
 * - ctor: Function that constructs and returns the service.
 * @typedef {{
 *   obj: (?Object),
 *   promise: (?Promise),
 *   resolve: (?function(!Object)),
 *   context: (?Window|?./service/ampdoc-impl.AmpDoc),
 *   ctor: (?function(new:Object, !Window)|
 *          ?function(new:Object, !./service/ampdoc-impl.AmpDoc)),
 * }}
 */
var ServiceHolderDef;
/**
 * This interface provides a `dispose` method that will be called by
 * runtime when a service needs to be disposed of.
 * @interface
 */

var Disposable =
/*#__PURE__*/
function () {
  function Disposable() {}

  var _proto = Disposable.prototype;

  /**
   * Instructs the service to release any resources it might be holding. Can
   * be called only once in the lifecycle of a service.
   */
  _proto.dispose = function dispose() {};

  return Disposable;
}();
/**
 * Services must implement this interface to be embeddable in FIEs.
 * @interface
 */


exports.Disposable = Disposable;

var EmbeddableService =
/*#__PURE__*/
function () {
  function EmbeddableService() {}

  /**
   * Installs a new instance of the service in the given FIE window.
   * @param {!Window} unusedEmbedWin
   * @param {!./service/ampdoc-impl.AmpDoc} unusedAmpDoc
   */
  EmbeddableService.installInEmbedWindow = function installInEmbedWindow(unusedEmbedWin, unusedAmpDoc) {};

  return EmbeddableService;
}();
/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 *
 * @param {!Element|!ShadowRoot} element
 * @param {string} id
 * @param {boolean=} opt_fallbackToTopWin
 * @return {?Object}
 */


exports.EmbeddableService = EmbeddableService;

function getExistingServiceForDocInEmbedScope(element, id, opt_fallbackToTopWin) {
  var document = element.ownerDocument;
  var win = (0, _types.toWin)(document.defaultView); // First, try to resolve via local embed window (if applicable).

  var isEmbed = win != getTopWindow(win);

  if (isEmbed) {
    if (isServiceRegistered(win, id)) {
      var embedService = getServiceInternal(win, id);

      if (embedService) {
        return embedService;
      }
    } // Don't continue if fallback is not allowed.


    if (!opt_fallbackToTopWin) {
      return null;
    }
  } // Resolve via the element's ampdoc. This falls back to the top-level service.


  return getServiceForDocOrNullInternal(element, id);
}
/**
 * Installs a service override on amp-doc level.
 * @param {!Window} embedWin
 * @param {string} id
 * @param {!Object} service The service.
 */


function installServiceInEmbedScope(embedWin, id, service) {
  var topWin = getTopWindow(embedWin);
  (0, _log.devAssert)(embedWin != topWin, 'Service override can only be installed in embed window: %s', id);
  (0, _log.devAssert)(!isServiceRegistered(embedWin, id), 'Service override has already been installed: %s', id);
  registerServiceInternal(embedWin, embedWin, id, function () {
    return service;
  });
  getServiceInternal(embedWin, id); // Force service to build.
}
/**
 * Registers a service given a class to be used as implementation.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(new:Object, !Window)} constructor
 * @param {boolean=} opt_instantiate Whether to immediately create the service
 */


function registerServiceBuilder(win, id, constructor, opt_instantiate) {
  win = getTopWindow(win);
  registerServiceInternal(win, win, id, constructor);

  if (opt_instantiate) {
    getServiceInternal(win, id);
  }
}
/**
 * Returns a service and registers it given a class to be used as
 * implementation.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {function(new:Object, !./service/ampdoc-impl.AmpDoc)} constructor
 * @param {boolean=} opt_instantiate Whether to immediately create the service
 */


function registerServiceBuilderForDoc(nodeOrDoc, id, constructor, opt_instantiate) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  var holder = getAmpdocServiceHolder(ampdoc);
  registerServiceInternal(holder, ampdoc, id, constructor);

  if (opt_instantiate) {
    getServiceInternal(holder, id);
  }
}
/**
 * Returns a service for the given id and window (a per-window singleton). Users
 * should typically wrap this as a special purpose function (e.g.
 * `Services.vsyncFor(win)`) for type safety and because the factory should not
 * be passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @template T
 * @return {T}
 */


function getService(win, id) {
  win = getTopWindow(win);
  return getServiceInternal(win, id);
}
/**
 * Returns a promise for a service for the given id and window. Also expects an
 * element that has the actual implementation. The promise resolves when the
 * implementation loaded. Users should typically wrap this as a special purpose
 * function (e.g. `Services.vsyncFor(win)`) for type safety and because the
 * factory should not be passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */


function getServicePromise(win, id) {
  return getServicePromiseInternal(win, id);
}
/**
 * Returns a service or null with the given id.
 * @param {!Window} win
 * @param {string} id
 * @return {?Object} The service.
 */


function getExistingServiceOrNull(win, id) {
  win = getTopWindow(win);

  if (isServiceRegistered(win, id)) {
    return getServiceInternal(win, id);
  } else {
    return null;
  }
}
/**
 * Like getServicePromise but returns null if the service was never registered.
 * @param {!Window} win
 * @param {string} id
 * @return {?Promise<!Object>}
 */


function getServicePromiseOrNull(win, id) {
  return getServicePromiseOrNullInternal(win, id);
}
/**
 * Returns a service for the given id and ampdoc (a per-ampdoc singleton).
 * Expects service `id` to be registered.
 * @param {!Element|!ShadowRoot|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
 * @param {string} id
 * @return {T}
 * @template T
 */


function getServiceForDoc(elementOrAmpDoc, id) {
  var ampdoc = getAmpdoc(elementOrAmpDoc);
  var holder = getAmpdocServiceHolder(ampdoc);
  return getServiceInternal(holder, id);
}
/**
 * Returns a service for the given id and ampdoc (a per-ampdoc singleton).
 * If service `id` is not registered, returns null.
 * @param {!Element|!ShadowRoot} element
 * @param {string} id
 */


function getServiceForDocOrNullInternal(element, id) {
  var ampdoc = getAmpdoc(element);
  var holder = getAmpdocServiceHolder(ampdoc);

  if (isServiceRegistered(holder, id)) {
    return getServiceInternal(holder, id);
  } else {
    return null;
  }
}
/**
 * Returns a promise for a service for the given id and ampdoc. Also expects
 * a service that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * @param {!Element|!ShadowRoot|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
 * @param {string} id
 * @return {!Promise<!Object>}
 */


function getServicePromiseForDoc(elementOrAmpDoc, id) {
  return getServicePromiseInternal(getAmpdocServiceHolder(elementOrAmpDoc), id);
}
/**
 * Like getServicePromiseForDoc but returns null if the service was never
 * registered for this ampdoc.
 * @param {!Element|!ShadowRoot|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
 * @param {string} id
 * @return {?Promise<!Object>}
 */


function getServicePromiseOrNullForDoc(elementOrAmpDoc, id) {
  return getServicePromiseOrNullInternal(getAmpdocServiceHolder(elementOrAmpDoc), id);
}
/**
 * Set the parent and top windows on a child window (friendly iframe).
 * @param {!Window} win
 * @param {!Window} parentWin
 */


function setParentWindow(win, parentWin) {
  win.__AMP_PARENT = parentWin;
  win.__AMP_TOP = getTopWindow(parentWin);
}
/**
 * Returns the parent window for a child window (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */


function getParentWindow(win) {
  return win.__AMP_PARENT || win;
}
/**
 * Returns the top window where AMP Runtime is installed for a child window
 * (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */


function getTopWindow(win) {
  return win.__AMP_TOP || win;
}
/**
 * Returns the parent "friendly" iframe if the node belongs to a child window.
 * @param {!Node} node
 * @param {!Window} topWin
 * @return {?HTMLIFrameElement}
 */


function getParentWindowFrameElement(node, topWin) {
  var childWin = (node.ownerDocument || node).defaultView;

  if (childWin && childWin != topWin && getTopWindow(childWin) == topWin) {
    try {
      return (
        /** @type {?HTMLIFrameElement} */
        childWin.frameElement
      );
    } catch (e) {// Ignore the error.
    }
  }

  return null;
}
/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc}
 */


function getAmpdoc(nodeOrDoc) {
  if (nodeOrDoc.nodeType) {
    var win = (0, _types.toWin)(
    /** @type {!Document} */
    (nodeOrDoc.ownerDocument || nodeOrDoc).defaultView);
    return getAmpdocService(win).getAmpDoc(
    /** @type {!Node} */
    nodeOrDoc);
  }

  return (
    /** @type {!./service/ampdoc-impl.AmpDoc} */
    nodeOrDoc
  );
}
/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc|!Window}
 */


function getAmpdocServiceHolder(nodeOrDoc) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return ampdoc.isSingleDoc() ? ampdoc.win : ampdoc;
}
/**
 * This is essentially a duplicate of `ampdoc.js`, but necessary to avoid
 * circular dependencies.
 * @param {!Window} win
 * @return {!./service/ampdoc-impl.AmpDocService}
 */


function getAmpdocService(win) {
  return (
    /** @type {!./service/ampdoc-impl.AmpDocService} */
    getService(win, 'ampdoc')
  );
}
/**
 * Get service `id` from `holder`. Assumes the service
 * has already been registered.
 * @param {!Object} holder Object holding the service instance.
 * @param {string} id of the service.
 * @return {Object}
 * @template T
 */


function getServiceInternal(holder, id) {
  (0, _log.devAssert)(isServiceRegistered(holder, id), "Expected service " + id + " to be registered");
  var services = getServices(holder);
  var s = services[id];

  if (!s.obj) {
    (0, _log.devAssert)(s.ctor, "Service " + id + " registered without ctor nor impl.");
    (0, _log.devAssert)(s.context, "Service " + id + " registered without context.");
    s.obj = new s.ctor(s.context);
    (0, _log.devAssert)(s.obj, "Service " + id + " constructed to null.");
    s.ctor = null;
    s.context = null; // The service may have been requested already, in which case we have a
    // pending promise we need to fulfill.

    if (s.resolve) {
      s.resolve(s.obj);
    }
  }

  return s.obj;
}
/**
 * @param {!Object} holder Object holding the service instance.
 * @param {!Window|!./service/ampdoc-impl.AmpDoc} context Win or AmpDoc.
 * @param {string} id of the service.
 * @param {?function(new:Object, !Window)|?function(new:Object, !./service/ampdoc-impl.AmpDoc)} ctor Constructor function to new the service. Called with context.
 */


function registerServiceInternal(holder, context, id, ctor) {
  var services = getServices(holder);
  var s = services[id];

  if (!s) {
    s = services[id] = {
      obj: null,
      promise: null,
      resolve: null,
      context: null,
      ctor: null
    };
  }

  if (s.ctor || s.obj) {
    // Service already registered.
    return;
  }

  s.ctor = ctor;
  s.context = context; // The service may have been requested already, in which case there is a
  // pending promise that needs to fulfilled.

  if (s.resolve) {
    // getServiceInternal will resolve the promise.
    getServiceInternal(holder, id);
  }
}
/**
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */


function getServicePromiseInternal(holder, id) {
  var cached = getServicePromiseOrNullInternal(holder, id);

  if (cached) {
    return cached;
  } // Service is not registered.
  // TODO(@cramforce): Add a check that if the element is eventually registered
  // that the service is actually provided and this promise resolves.


  var deferred = new _promise.Deferred();
  var promise = deferred.promise,
      resolve = deferred.resolve;
  var services = getServices(holder);
  services[id] = {
    obj: null,
    promise: promise,
    resolve: resolve,
    context: null,
    ctor: null
  };
  return promise;
}
/**
 * Returns a promise for service `id` if the service has been registered
 * on `holder`.
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */


function getServicePromiseOrNullInternal(holder, id) {
  var services = getServices(holder);
  var s = services[id];

  if (s) {
    if (s.promise) {
      return s.promise;
    } else {
      // Instantiate service if not already instantiated.
      getServiceInternal(holder, id);
      return s.promise = Promise.resolve(
      /** @type {!Object} */
      s.obj);
    }
  }

  return null;
}
/**
 * Returns the object that holds the services registered in a holder.
 * @param {!Object} holder
 * @return {!Object<string,!ServiceHolderDef>}
 */


function getServices(holder) {
  var services = holder.services;

  if (!services) {
    services = holder.services = {};
  }

  return services;
}
/**
 * Whether the specified service implements `Disposable` interface.
 * @param {!Object} service
 * @return {boolean}
 */


function isDisposable(service) {
  return typeof service.dispose == 'function';
}
/**
 * Asserts that the specified service implements `Disposable` interface and
 * typecasts the instance to `Disposable`.
 * @param {!Object} service
 * @return {!Disposable}
 */


function assertDisposable(service) {
  (0, _log.devAssert)(isDisposable(service), 'required to implement Disposable');
  return (
    /** @type {!Disposable} */
    service
  );
}
/**
 * Disposes all disposable (implements `Disposable` interface) services in
 * ampdoc scope.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 */


function disposeServicesForDoc(ampdoc) {
  disposeServicesInternal(ampdoc);
}
/**
 * Disposes all disposable (implements `Disposable` interface) services in
 * embed scope.
 * @param {!Window} embedWin
 */


function disposeServicesForEmbed(embedWin) {
  disposeServicesInternal(embedWin);
}
/**
 * @param {!Object} holder Object holding the service instances.
 */


function disposeServicesInternal(holder) {
  // TODO(dvoytenko): Consider marking holder as destroyed for later-arriving
  // service to be canceled automatically.
  var services = getServices(holder);

  var _loop = function _loop(id) {
    if (!Object.prototype.hasOwnProperty.call(services, id)) {
      return "continue";
    }

    var serviceHolder = services[id];

    if (serviceHolder.obj) {
      disposeServiceInternal(id, serviceHolder.obj);
    } else if (serviceHolder.promise) {
      serviceHolder.promise.then(function (instance) {
        return disposeServiceInternal(id, instance);
      });
    }
  };

  for (var id in services) {
    var _ret = _loop(id);

    if (_ret === "continue") continue;
  }
}
/**
 * @param {string} id
 * @param {!Object} service
 */


function disposeServiceInternal(id, service) {
  if (!isDisposable(service)) {
    return;
  }

  try {
    assertDisposable(service).dispose();
  } catch (e) {
    // Ensure that a failure to dispose a service does not disrupt other
    // services.
    (0, _log.dev)().error('SERVICE', 'failed to dispose service', id, e);
  }
}
/**
 * Adopts an embeddable (implements `EmbeddableService` interface) service
 * in embed scope.
 * @param {!Window} embedWin
 * @param {function(new:Object, !./service/ampdoc-impl.AmpDoc)} serviceClass
 * @return {boolean}
 */


function installServiceInEmbedIfEmbeddable(embedWin, serviceClass) {
  var isEmbeddableService = typeof serviceClass.installInEmbedWindow === 'function';

  if (!isEmbeddableService) {
    return false;
  }

  var frameElement = (0, _log.dev)().assertElement(embedWin.frameElement, 'frameElement not found for embed');
  var ampdoc = getAmpdoc(frameElement);
  serviceClass.installInEmbedWindow(embedWin, ampdoc);
  return true;
}
/**
 * Resets a single service, so it gets recreated on next getService invocation.
 * @param {!Object} holder
 * @param {string} id of the service.
 */


function resetServiceForTesting(holder, id) {
  if (holder.services) {
    holder.services[id] = null;
  }
}
/**
 * @param {!Object} holder Object holding the service instance.
 * @param {string} id of the service.
 * @return {boolean}
 */


function isServiceRegistered(holder, id) {
  var service = holder.services && holder.services[id]; // All registered services must have an implementation or a constructor.

  return !!(service && (service.ctor || service.obj));
}

},{"./log":14,"./polyfills":17,"./types":30,"./utils/promise":37}],28:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Services = exports.SubscriptionService = void 0;

var _service = require("./service");

var _elementService = require("./element-service");

/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @typedef {!../extensions/amp-subscriptions/0.1/amp-subscriptions.SubscriptionService} */
var SubscriptionService;
exports.SubscriptionService = SubscriptionService;

var Services =
/*#__PURE__*/
function () {
  function Services() {}

  /**
   * Hint: Add extensions folder path to compile.js with
   * warnings cannot find modules.
   */

  /**
   * Returns a promise for the Access service.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<!../extensions/amp-access/0.1/amp-access.AccessService>}
   */
  Services.accessServiceForDoc = function accessServiceForDoc(element) {
    return (
      /** @type {!Promise<!../extensions/amp-access/0.1/amp-access.AccessService>} */
      (0, _elementService.getElementServiceForDoc)(element, 'access', 'amp-access')
    );
  };
  /**
   * Returns a promise for the Access service or a promise for null if the
   * service is not available on the current page.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-access/0.1/amp-access.AccessService>}
   */


  Services.accessServiceForDocOrNull = function accessServiceForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-access/0.1/amp-access.AccessService>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'access', 'amp-access')
    );
  };
  /**
   * Returns a promise for the Subscriptions service.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<!SubscriptionService>}
   */


  Services.subscriptionsServiceForDoc = function subscriptionsServiceForDoc(element) {
    return (
      /** @type {!Promise<!SubscriptionService>} */
      (0, _elementService.getElementServiceForDoc)(element, 'subscriptions', 'amp-subscriptions')
    );
  };
  /**
   * Returns a promise for the Subscriptions service.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?SubscriptionService>}
   */


  Services.subscriptionsServiceForDocOrNull = function subscriptionsServiceForDocOrNull(element) {
    return (
      /** @type {!Promise<?SubscriptionService>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'subscriptions', 'amp-subscriptions')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!./service/action-impl.ActionService}
   */


  Services.actionServiceForDoc = function actionServiceForDoc(element) {
    return (
      /** @type {!./service/action-impl.ActionService} */
      (0, _service.getExistingServiceForDocInEmbedScope)(element, 'action')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!./service/standard-actions-impl.StandardActions}
   */


  Services.standardActionsForDoc = function standardActionsForDoc(element) {
    return (
      /** @type {!./service/standard-actions-impl.StandardActions} */
      (0, _service.getExistingServiceForDocInEmbedScope)(element, 'standard-actions')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<!../extensions/amp-analytics/0.1/activity-impl.Activity>}
   */


  Services.activityForDoc = function activityForDoc(element) {
    return (
      /** @type {!Promise<!../extensions/amp-analytics/0.1/activity-impl.Activity>} */
      (0, _elementService.getElementServiceForDoc)(element, 'activity', 'amp-analytics')
    );
  };
  /**
   * Returns the global instance of the `AmpDocService` service that can be
   * used to resolve an ampdoc for any node: either in the single-doc or
   * shadow-doc environment.
   * @param {!Window} window
   * @return {!./service/ampdoc-impl.AmpDocService}
   */


  Services.ampdocServiceFor = function ampdocServiceFor(window) {
    return (
      /** @type {!./service/ampdoc-impl.AmpDocService} */
      (0, _service.getService)(window, 'ampdoc')
    );
  };
  /**
   * Returns the AmpDoc for the specified context node.
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/ampdoc-impl.AmpDoc}
   */


  Services.ampdoc = function ampdoc(elementOrAmpDoc) {
    return (0, _service.getAmpdoc)(elementOrAmpDoc);
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @param {boolean=} loadAnalytics
   * @return {!Promise<!../extensions/amp-analytics/0.1/instrumentation.InstrumentationService>}
   */


  Services.analyticsForDoc = function analyticsForDoc(element, loadAnalytics) {
    if (loadAnalytics === void 0) {
      loadAnalytics = false;
    }

    if (loadAnalytics) {
      // Get Extensions service and force load analytics extension.
      var ampdoc = (0, _service.getAmpdoc)(element);
      Services.extensionsFor(ampdoc.win).
      /*OK*/
      installExtensionForDoc(ampdoc, 'amp-analytics');
    }

    return (
      /** @type {!Promise<!../extensions/amp-analytics/0.1/instrumentation.InstrumentationService>} */
      (0, _elementService.getElementServiceForDoc)(element, 'amp-analytics-instrumentation', 'amp-analytics')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-analytics/0.1/instrumentation.InstrumentationService>}
   */


  Services.analyticsForDocOrNull = function analyticsForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-analytics/0.1/instrumentation.InstrumentationService>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'amp-analytics-instrumentation', 'amp-analytics')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/batched-xhr-impl.BatchedXhr}
   */


  Services.batchedXhrFor = function batchedXhrFor(window) {
    return (
      /** @type {!./service/batched-xhr-impl.BatchedXhr} */
      (0, _service.getService)(window, 'batched-xhr')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-bind/0.1/bind-impl.Bind>}
   */


  Services.bindForDocOrNull = function bindForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-bind/0.1/bind-impl.Bind>} */
      (0, _elementService.getElementServiceIfAvailableForDocInEmbedScope)(element, 'bind', 'amp-bind')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!Promise<!./service/cid-impl.Cid>}
   */


  Services.cidForDoc = function cidForDoc(elementOrAmpDoc) {
    return (
      /** @type {!Promise<!./service/cid-impl.Cid>} */
      (0, _service.getServicePromiseForDoc)(elementOrAmpDoc, 'cid')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/navigation.Navigation}
   */


  Services.navigationForDoc = function navigationForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/navigation.Navigation} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'navigation')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/crypto-impl.Crypto}
   */


  Services.cryptoFor = function cryptoFor(window) {
    return (
      /** @type {!./service/crypto-impl.Crypto} */
      (0, _service.getService)(window, 'crypto')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/document-info-impl.DocumentInfoDef} Info about the doc
   */


  Services.documentInfoForDoc = function documentInfoForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/document-info-impl.DocInfo} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'documentInfo').get()
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/document-state.DocumentState}
   */


  Services.documentStateFor = function documentStateFor(window) {
    return (0, _service.getService)(window, 'documentState');
  };
  /**
   * @param {!Window} window
   * @return {!./service/extensions-impl.Extensions}
   */


  Services.extensionsFor = function extensionsFor(window) {
    return (
      /** @type {!./service/extensions-impl.Extensions} */
      (0, _service.getService)(window, 'extensions')
    );
  };
  /**
   * Returns a service to register callbacks we wish to execute when an
   * amp-form is submitted. This is the sync version used by amp-form only, all
   * other extensions should use `formSubmitPromiseForDoc` below.
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {../extensions/amp-form/0.1/form-submit-service.FormSubmitService}
   */


  Services.formSubmitForDoc = function formSubmitForDoc(elementOrAmpDoc) {
    return (
      /** @type {!../extensions/amp-form/0.1/form-submit-service.FormSubmitService} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'form-submit-service')
    );
  };
  /**
   * Returns a service to register callbacks we wish to execute when an
   * amp-form is submitted.
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!Promise<../extensions/amp-form/0.1/form-submit-service.FormSubmitService>}
   */


  Services.formSubmitPromiseForDoc = function formSubmitPromiseForDoc(elementOrAmpDoc) {
    return (
      /** @type {!Promise<../extensions/amp-form/0.1/form-submit-service.FormSubmitService>} */
      (0, _service.getServicePromiseForDoc)(elementOrAmpDoc, 'form-submit-service')
    );
  };
  /**
   * Returns service implemented in service/history-impl.
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/history-impl.History}
   */


  Services.historyForDoc = function historyForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/history-impl.History} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'history')
    );
  };
  /**
   * @param {!Window} win
   * @return {!./input.Input}
   */


  Services.inputFor = function inputFor(win) {
    return (0, _service.getService)(win, 'input');
  };
  /**s
   * Returns a promise for the Inputmask service.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-inputmask/0.1/amp-inputmask.AmpInputmaskService>}
   */


  Services.inputmaskServiceForDocOrNull = function inputmaskServiceForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-inputmask/0.1/amp-inputmask.AmpInputmaskService>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'inputmask', 'amp-inputmask')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/layers-impl.LayoutLayers}
   */


  Services.layersForDoc = function layersForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/layers-impl.LayoutLayers} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'layers')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/performance-impl.Performance}
   */


  Services.performanceFor = function performanceFor(window) {
    return (
      /** @type {!./service/performance-impl.Performance}*/
      (0, _service.getService)(window, 'performance')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/performance-impl.Performance}
   */


  Services.performanceForOrNull = function performanceForOrNull(window) {
    return (
      /** @type {!./service/performance-impl.Performance}*/
      (0, _service.getExistingServiceOrNull)(window, 'performance')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/platform-impl.Platform}
   */


  Services.platformFor = function platformFor(window) {
    return (
      /** @type {!./service/platform-impl.Platform} */
      (0, _service.getService)(window, 'platform')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/resources-impl.Resources}
   */


  Services.resourcesForDoc = function resourcesForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/resources-impl.Resources} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'resources')
    );
  };
  /**
   * @param {!Window} win
   * @return {?Promise<?{incomingFragment: string, outgoingFragment: string}>}
   */


  Services.shareTrackingForOrNull = function shareTrackingForOrNull(win) {
    return (
      /** @type {!Promise<?{incomingFragment: string, outgoingFragment: string}>} */
      (0, _elementService.getElementServiceIfAvailable)(win, 'share-tracking', 'amp-share-tracking', true)
    );
  };
  /**
   * @param {!Window} win
   * @return {?Promise<?../extensions/amp-story/1.0/variable-service.StoryVariableDef>}
   */


  Services.storyVariableServiceForOrNull = function storyVariableServiceForOrNull(win) {
    return (
      /** @type {!Promise<?../extensions/amp-story/1.0/variable-service.StoryVariableDef>} */
      (0, _elementService.getElementServiceIfAvailable)(win, 'story-variable', 'amp-story', true)
    );
  };
  /**
   * Version of the story store service depends on which version of amp-story
   * the publisher is loading. They all have the same implementation.
   * @param {!Window} win
   * @return {?Promise<?../extensions/amp-story/1.0/amp-story-store-service.AmpStoryStoreService|?../extensions/amp-story/0.1/amp-story-store-service.AmpStoryStoreService>}
   */


  Services.storyStoreServiceForOrNull = function storyStoreServiceForOrNull(win) {
    return (
      /** @type {!Promise<?../extensions/amp-story/1.0/amp-story-store-service.AmpStoryStoreService|?../extensions/amp-story/0.1/amp-story-store-service.AmpStoryStoreService>} */
      (0, _elementService.getElementServiceIfAvailable)(win, 'story-store', 'amp-story')
    );
  };
  /**
   * @param {!Window} win
   * @return {?../extensions/amp-story/1.0/amp-story-store-service.AmpStoryStoreService}
   */


  Services.storyStoreService = function storyStoreService(win) {
    return (
      /** @type {?../extensions/amp-story/1.0/amp-story-store-service.AmpStoryStoreService} */
      (0, _service.getExistingServiceOrNull)(win, 'story-store')
    );
  };
  /**
   * @param {!Window} win
   * @return {?../extensions/amp-story/1.0/amp-story-request-service.AmpStoryRequestService}
   */


  Services.storyRequestService = function storyRequestService(win) {
    return (
      /** @type {?../extensions/amp-story/1.0/amp-story-request-service.AmpStoryRequestService} */
      (0, _service.getExistingServiceOrNull)(win, 'story-request')
    );
  };
  /**
   * @param {!Window} win
   * @return {!Promise<?../extensions/amp-story/1.0/localization.LocalizationService>}
   */


  Services.localizationServiceForOrNull = function localizationServiceForOrNull(win) {
    return (
      /** @type {!Promise<?../extensions/amp-story/1.0/localization.LocalizationService>} */
      (0, _elementService.getElementServiceIfAvailable)(win, 'localization', 'amp-story', true)
    );
  };
  /**
   * @param {!Window} win
   * @return {!../extensions/amp-story/1.0/localization.LocalizationService}
   */


  Services.localizationService = function localizationService(win) {
    return (0, _service.getService)(win, 'localization');
  };
  /**
   * TODO(#14357): Remove this when amp-story:0.1 is deprecated.
   * @param {!Window} win
   * @return {!../extensions/amp-story/0.1/amp-story-store-service.AmpStoryStoreService}
   */


  Services.storyStoreServiceV01 = function storyStoreServiceV01(win) {
    return (0, _service.getService)(win, 'story-store');
  };
  /**
   * TODO(#14357): Remove this when amp-story:0.1 is deprecated.
   * @param {!Window} win
   * @return {!../extensions/amp-story/0.1/amp-story-request-service.AmpStoryRequestService}
   */


  Services.storyRequestServiceV01 = function storyRequestServiceV01(win) {
    return (0, _service.getService)(win, 'story-request-v01');
  };
  /**
   * TODO(#14357): Remove this when amp-story:0.1 is deprecated.
   * @param {!Window} win
   * @return {!Promise<?../extensions/amp-story/0.1/localization.LocalizationService>}
   */


  Services.localizationServiceForOrNullV01 = function localizationServiceForOrNullV01(win) {
    return (
      /** @type {!Promise<?../extensions/amp-story/0.1/localization.LocalizationService>} */
      (0, _elementService.getElementServiceIfAvailable)(win, 'localization-v01', 'amp-story', true)
    );
  };
  /**
   * TODO(#14357): Remove this when amp-story:0.1 is deprecated.
   * @param {!Window} win
   * @return {!../extensions/amp-story/0.1/localization.LocalizationService}
   */


  Services.localizationServiceV01 = function localizationServiceV01(win) {
    return (0, _service.getService)(win, 'localization-v01');
  };
  /**
   * @param {!Window} win
   * @return {?Promise<?../extensions/amp-viewer-integration/0.1/variable-service.ViewerIntegrationVariableDef>}
   */


  Services.viewerIntegrationVariableServiceForOrNull = function viewerIntegrationVariableServiceForOrNull(win) {
    return (
      /** @type {!Promise<?../extensions/amp-viewer-integration/0.1/variable-service.ViewerIntegrationVariableDef>} */
      (0, _elementService.getElementServiceIfAvailable)(win, 'viewer-integration-variable', 'amp-viewer-integration', true)
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<!../extensions/amp-animation/0.1/web-animation-service.WebAnimationService>}
   */


  Services.webAnimationServiceFor = function webAnimationServiceFor(element) {
    return (
      /** @type {!Promise<!../extensions/amp-animation/0.1/web-animation-service.WebAnimationService>} */
      (0, _elementService.getElementServiceForDoc)(element, 'web-animation', 'amp-animation')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!Promise<!./service/storage-impl.Storage>}
   */


  Services.storageForDoc = function storageForDoc(elementOrAmpDoc) {
    return (
      /** @type {!Promise<!./service/storage-impl.Storage>} */
      (0, _service.getServicePromiseForDoc)(elementOrAmpDoc, 'storage')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/template-impl.Templates}
   */


  Services.templatesFor = function templatesFor(window) {
    return (
      /** @type {!./service/template-impl.Templates} */
      (0, _service.getService)(window, 'templates')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/timer-impl.Timer}
   */


  Services.timerFor = function timerFor(window) {
    // TODO(alabiaga): This will always return the top window's Timer service.
    return (
      /** @type {!./service/timer-impl.Timer} */
      (0, _service.getService)(window, 'timer')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!./service/url-replacements-impl.UrlReplacements}
   */


  Services.urlReplacementsForDoc = function urlReplacementsForDoc(element) {
    return (
      /** @type {!./service/url-replacements-impl.UrlReplacements} */
      (0, _service.getExistingServiceForDocInEmbedScope)(element, 'url-replace')
    );
  };
  /**
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<!../extensions/amp-user-notification/0.1/amp-user-notification.UserNotificationManager>}
   */


  Services.userNotificationManagerForDoc = function userNotificationManagerForDoc(element) {
    return (
      /** @type {!Promise<!../extensions/amp-user-notification/0.1/amp-user-notification.UserNotificationManager>} */
      (0, _elementService.getElementServiceForDoc)(element, 'userNotificationManager', 'amp-user-notification')
    );
  };
  /**
   * Returns a promise for the consentPolicy Service or a promise for null if
   * the service is not available on the current page.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-consent/0.1/consent-policy-manager.ConsentPolicyManager>}
   */


  Services.consentPolicyServiceForDocOrNull = function consentPolicyServiceForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-consent/0.1/consent-policy-manager.ConsentPolicyManager>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'consentPolicyManager', 'amp-consent')
    );
  };
  /**
   * Returns a promise for the geo service or a promise for null if
   * the service is not available on the current page.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-geo/0.1/amp-geo.GeoDef>}
   */


  Services.geoForDocOrNull = function geoForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-geo/0.1/amp-geo.GeoDef>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'geo', 'amp-geo', true)
    );
  };
  /**
   * Unlike most service getters, passing `Node` is necessary for some FIE-scope
   * services since sometimes we only have the FIE Document for context.
   * @param {!Element|!ShadowRoot} element
   * @return {!./service/url-impl.Url}
   */


  Services.urlForDoc = function urlForDoc(element) {
    return (
      /** @type {!./service/url-impl.Url} */
      (0, _service.getExistingServiceForDocInEmbedScope)(element, 'url')
    );
  };
  /**
   * Returns a promise for the experiment variants or a promise for null if it
   * is not available on the current page.
   * @param {!Element|!ShadowRoot} element
   * @return {!Promise<?../extensions/amp-experiment/0.1/variant.Variants>}
   */


  Services.variantsForDocOrNull = function variantsForDocOrNull(element) {
    return (
      /** @type {!Promise<?../extensions/amp-experiment/0.1/variant.Variants>} */
      (0, _elementService.getElementServiceIfAvailableForDoc)(element, 'variant', 'amp-experiment', true)
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/video-service-interface.VideoServiceInterface}
   */


  Services.videoManagerForDoc = function videoManagerForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/video-service-interface.VideoServiceInterface} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'video-manager')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/viewer-impl.Viewer}
   */


  Services.viewerForDoc = function viewerForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/viewer-impl.Viewer} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'viewer')
    );
  };
  /**
   * Returns promise for the viewer. This is an unusual case and necessary only
   * for services that need reference to the viewer before it has been
   * initialized. Most of the code, however, just should use `viewerForDoc`.
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!Promise<!./service/viewer-impl.Viewer>}
   */


  Services.viewerPromiseForDoc = function viewerPromiseForDoc(elementOrAmpDoc) {
    return (
      /** @type {!Promise<!./service/viewer-impl.Viewer>} */
      (0, _service.getServicePromiseForDoc)(elementOrAmpDoc, 'viewer')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/vsync-impl.Vsync}
   */


  Services.vsyncFor = function vsyncFor(window) {
    return (
      /** @type {!./service/vsync-impl.Vsync} */
      (0, _service.getService)(window, 'vsync')
    );
  };
  /**
   * @param {!Element|!./service/ampdoc-impl.AmpDoc} elementOrAmpDoc
   * @return {!./service/viewport/viewport-impl.Viewport}
   */


  Services.viewportForDoc = function viewportForDoc(elementOrAmpDoc) {
    return (
      /** @type {!./service/viewport/viewport-impl.Viewport} */
      (0, _service.getServiceForDoc)(elementOrAmpDoc, 'viewport')
    );
  };
  /**
   * @param {!Window} window
   * @return {!./service/xhr-impl.Xhr}
   */


  Services.xhrFor = function xhrFor(window) {
    return (
      /** @type {!./service/xhr-impl.Xhr} */
      (0, _service.getService)(window, 'xhr')
    );
  };

  return Services;
}();

exports.Services = Services;

},{"./element-service":11,"./service":27}],29:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.dashToCamelCase = dashToCamelCase;
exports.camelCaseToDash = camelCaseToDash;
exports.dashToUnderline = dashToUnderline;
exports.endsWith = endsWith;
exports.startsWith = startsWith;
exports.expandTemplate = expandTemplate;
exports.stringHash32 = stringHash32;

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {string} _match
 * @param {string} character
 * @return {string}
 */
function toUpperCase(_match, character) {
  return character.toUpperCase();
}
/**
 * @param {string} match
 * @return {string}
 */


function prependDashAndToLowerCase(match) {
  return '-' + match.toLowerCase();
}
/**
 * @param {string} name Attribute name containing dashes.
 * @return {string} Dashes removed and successive character sent to upper case.
 * visibleForTesting
 */


function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, toUpperCase);
}
/**
 * Converts a string that is in camelCase to one that is in dash-case.
 *
 * @param {string} string The string to convert.
 * @return {string} The string in dash-case.
 */


function camelCaseToDash(string) {
  return string.replace(/(?!^)[A-Z]/g, prependDashAndToLowerCase);
}
/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes replaced by underlines.
 */


function dashToUnderline(name) {
  return name.replace('-', '_');
}
/**
 * Polyfill for String.prototype.endsWith.
 * @param {string} string
 * @param {string} suffix
 * @return {boolean}
 */


function endsWith(string, suffix) {
  var index = string.length - suffix.length;
  return index >= 0 && string.indexOf(suffix, index) == index;
}
/**
 * Polyfill for String.prototype.startsWith.
 * @param {string} string
 * @param {string} prefix
 * @return {boolean}
 */


function startsWith(string, prefix) {
  if (prefix.length > string.length) {
    return false;
  }

  return string.lastIndexOf(prefix, 0) == 0;
}
/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=} opt_maxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */


function expandTemplate(template, getter, opt_maxIterations) {
  var maxIterations = opt_maxIterations || 1;

  var _loop = function _loop(i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });

    if (!matches) {
      return "break";
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  return template;
}
/**
 * Hash function djb2a
 * This is intended to be a simple, fast hashing function using minimal code.
 * It does *not* have good cryptographic properties.
 * @param {string} str
 * @return {string} 32-bit unsigned hash of the string
 */


function stringHash32(str) {
  var length = str.length;
  var hash = 5381;

  for (var i = 0; i < length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  } // Convert from 32-bit signed to unsigned.


  return String(hash >>> 0);
}

},{}],30:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.isArray = isArray;
exports.toArray = toArray;
exports.isObject = isObject;
exports.isFiniteNumber = isFiniteNumber;
exports.isEnumValue = isEnumValue;
exports.toWin = toWin;

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @const */
var toString_ = Object.prototype.toString;
/**
 * Returns the ECMA [[Class]] of a value
 * @param {*} value
 * @return {string}
 */

function toString(value) {
  return toString_.call(value);
}
/**
 * Determines if value is actually an Array.
 * @param {*} value
 * @return {boolean}
 */


function isArray(value) {
  return Array.isArray(value);
}
/**
 * Converts an array-like object to an array.
 * @param {?IArrayLike<T>|string} arrayLike
 * @return {!Array<T>}
 * @template T
 */


function toArray(arrayLike) {
  return arrayLike ? Array.prototype.slice.call(arrayLike) : [];
}
/**
 * Determines if value is actually an Object.
 * @param {*} value
 * @return {boolean}
 */


function isObject(value) {
  return toString(value) === '[object Object]';
}
/**
 * Determines if value is of number type and finite.
 * NaN and Infinity are not considered a finite number.
 * String numbers are not considered numbers.
 * @param {*} value
 * @return {boolean}
 */


function isFiniteNumber(value) {
  return typeof value === 'number' && isFinite(value);
}
/**
 * Checks whether `s` is a valid value of `enumObj`.
 *
 * @param {!Object<T>} enumObj
 * @param {T} s
 * @return {boolean}
 * @template T
 */


function isEnumValue(enumObj, s) {
  for (var k in enumObj) {
    if (enumObj[k] === s) {
      return true;
    }
  }

  return false;
}
/**
 * Externs declare that access `defaultView` from `document` or
 * `ownerDocument` is of type `(Window|null)` but most of our parameter types
 * assume that it is never null. This is OK in practice as we ever only get
 * null on disconnected documents or old IE.
 * This helper function casts it into just a simple Window return type.
 *
 * @param {!Window|null} winOrNull
 * @return {!Window}
 */


function toWin(winOrNull) {
  return (
    /** @type {!Window} */
    winOrNull
  );
}

},{}],31:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.parseQueryString_ = parseQueryString_;

var _urlTryDecodeUriComponent = require("./url-try-decode-uri-component");

/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var regex = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;
/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 *
 * DO NOT import the function from this file. Instead, import parseQueryString
 * from `src/url.js`.
 *
 * @param {string} queryString
 * @return {!JsonObject}
 */

function parseQueryString_(queryString) {
  var params =
  /** @type {!JsonObject} */
  Object.create(null);

  if (!queryString) {
    return params;
  }

  var match;

  while (match = regex.exec(queryString)) {
    var name = (0, _urlTryDecodeUriComponent.tryDecodeUriComponent_)(match[1], match[1]);
    var value = match[2] ? (0, _urlTryDecodeUriComponent.tryDecodeUriComponent_)(match[2], match[2]) : '';
    params[name] = value;
  }

  return params;
}

},{"./url-try-decode-uri-component":32}],32:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tryDecodeUriComponent_ = tryDecodeUriComponent_;

/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Tries to decode a URI component, falling back to opt_fallback (or an empty
 * string)
 *
 * DO NOT import the function from this file. Instead, import
 * tryDecodeUriComponent from `src/url.js`.
 *
 * @param {string} component
 * @param {string=} fallback
 * @return {string}
 */
function tryDecodeUriComponent_(component, fallback) {
  if (fallback === void 0) {
    fallback = '';
  }

  try {
    return decodeURIComponent(component);
  } catch (e) {
    return fallback;
  }
}

},{}],33:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getWinOrigin = getWinOrigin;
exports.parseUrlDeprecated = parseUrlDeprecated;
exports.parseUrlWithA = parseUrlWithA;
exports.appendEncodedParamStringToUrl = appendEncodedParamStringToUrl;
exports.addParamToUrl = addParamToUrl;
exports.addParamsToUrl = addParamsToUrl;
exports.addMissingParamsToUrl = addMissingParamsToUrl;
exports.serializeQueryString = serializeQueryString;
exports.isSecureUrlDeprecated = isSecureUrlDeprecated;
exports.assertHttpsUrl = assertHttpsUrl;
exports.assertAbsoluteHttpOrHttpsUrl = assertAbsoluteHttpOrHttpsUrl;
exports.parseQueryString = parseQueryString;
exports.removeFragment = removeFragment;
exports.getFragment = getFragment;
exports.isProxyOrigin = isProxyOrigin;
exports.getProxyServingType = getProxyServingType;
exports.isLocalhostOrigin = isLocalhostOrigin;
exports.isProtocolValid = isProtocolValid;
exports.removeAmpJsParamsFromUrl = removeAmpJsParamsFromUrl;
exports.removeSearch = removeSearch;
exports.removeParamsFromSearch = removeParamsFromSearch;
exports.getSourceUrl = getSourceUrl;
exports.getSourceOrigin = getSourceOrigin;
exports.resolveRelativeUrl = resolveRelativeUrl;
exports.resolveRelativeUrlFallback_ = resolveRelativeUrlFallback_;
exports.getCorsUrl = getCorsUrl;
exports.checkCorsUrl = checkCorsUrl;
exports.tryDecodeUriComponent = tryDecodeUriComponent;
exports.SOURCE_ORIGIN_PARAM = void 0;

var _lruCache = require("./utils/lru-cache");

var _object = require("./utils/object");

var _string = require("./string");

var _mode = require("./mode");

var _types = require("./types");

var _urlParseQueryString = require("./url-parse-query-string");

var _urlTryDecodeUriComponent = require("./url-try-decode-uri-component");

var _config = require("./config");

var _log = require("./log");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @type {!JsonObject}
 */
var SERVING_TYPE_PREFIX = (0, _object.dict)({
  // No viewer
  'c': true,
  // In viewer
  'v': true,
  // Ad landing page
  'a': true,
  // Ad
  'ad': true
});
/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */

var a;
/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {LruCache}
 */

var cache;
/** @private @const Matches amp_js_* parameters in query string. */

var AMP_JS_PARAMS_REGEX = /[?&]amp_js[^&]*/;
/** @private @const Matches amp_gsa parameters in query string. */

var AMP_GSA_PARAMS_REGEX = /[?&]amp_gsa[^&]*/;
/** @private @const Matches amp_r parameters in query string. */

var AMP_R_PARAMS_REGEX = /[?&]amp_r[^&]*/;
/** @private @const Matches amp_kit parameters in query string. */

var AMP_KIT_PARAMS_REGEX = /[?&]amp_kit[^&]*/;
/** @private @const Matches usqp parameters from goog experiment in query string. */

var GOOGLE_EXPERIMENT_PARAMS_REGEX = /[?&]usqp[^&]*/;
var INVALID_PROTOCOLS = [
/*eslint no-script-url: 0*/
'javascript:',
/*eslint no-script-url: 0*/
'data:',
/*eslint no-script-url: 0*/
'vbscript:'];
/** @const {string} */

var SOURCE_ORIGIN_PARAM = '__amp_source_origin';
/**
 * Returns the correct origin for a given window.
 * @param {!Window} win
 * @return {string} origin
 */

exports.SOURCE_ORIGIN_PARAM = SOURCE_ORIGIN_PARAM;

function getWinOrigin(win) {
  return win.origin || parseUrlDeprecated(win.location.href).origin;
}
/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {string} url
 * @param {boolean=} opt_nocache
 * @return {!Location}
 */


function parseUrlDeprecated(url, opt_nocache) {
  if (!a) {
    a =
    /** @type {!HTMLAnchorElement} */
    self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = new _lruCache.LruCache(100));
  }

  return parseUrlWithA(a, url, opt_nocache ? null : cache);
}
/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {!HTMLAnchorElement} a
 * @param {string} url
 * @param {LruCache=} opt_cache
 * @return {!Location}
 * @restricted
 */


function parseUrlWithA(a, url, opt_cache) {
  if (opt_cache && opt_cache.has(url)) {
    return opt_cache.get(url);
  }

  a.href = url; // IE11 doesn't provide full URL components when parsing relative URLs.
  // Assigning to itself again does the trick #3449.

  if (!a.protocol) {
    a.href = a.href;
  }

  var info =
  /** @type {!Location} */
  {
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: null // Set below.

  }; // Some IE11 specific polyfills.
  // 1) IE11 strips out the leading '/' in the pathname.

  if (info.pathname[0] !== '/') {
    info.pathname = '/' + info.pathname;
  } // 2) For URLs with implicit ports, IE11 parses to default ports while
  // other browsers leave the port field empty.


  if (info.protocol == 'http:' && info.port == 80 || info.protocol == 'https:' && info.port == 443) {
    info.port = '';
    info.host = info.hostname;
  } // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.


  if (a.origin && a.origin != 'null') {
    info.origin = a.origin;
  } else if (info.protocol == 'data:' || !info.host) {
    info.origin = info.href;
  } else {
    info.origin = info.protocol + '//' + info.host;
  } // Freeze during testing to avoid accidental mutation.


  var frozen = (0, _mode.getMode)().test && Object.freeze ? Object.freeze(info) : info;

  if (opt_cache) {
    opt_cache.put(url, frozen);
  }

  return frozen;
}
/**
 * Appends the string just before the fragment part (or optionally
 * to the front of the query string) of the URL.
 * @param {string} url
 * @param {string} paramString
 * @param {boolean=} opt_addToFront
 * @return {string}
 */


function appendEncodedParamStringToUrl(url, paramString, opt_addToFront) {
  if (!paramString) {
    return url;
  }

  var mainAndFragment = url.split('#', 2);
  var mainAndQuery = mainAndFragment[0].split('?', 2);
  var newUrl = mainAndQuery[0] + (mainAndQuery[1] ? opt_addToFront ? "?" + paramString + "&" + mainAndQuery[1] : "?" + mainAndQuery[1] + "&" + paramString : "?" + paramString);
  newUrl += mainAndFragment[1] ? "#" + mainAndFragment[1] : '';
  return newUrl;
}
/**
 * Appends a query string field and value to a url. `key` and `value`
 * will be ran through `encodeURIComponent` before appending.
 * @param {string} url
 * @param {string} key
 * @param {string} value
 * @param {boolean=} opt_addToFront
 * @return {string}
 */


function addParamToUrl(url, key, value, opt_addToFront) {
  var field = encodeURIComponent(key) + "=" + encodeURIComponent(value);
  return appendEncodedParamStringToUrl(url, field, opt_addToFront);
}
/**
 * Appends query string fields and values to a url. The `params` objects'
 * `key`s and `value`s will be transformed into query string keys/values.
 * @param {string} url
 * @param {!JsonObject<string, string|!Array<string>>} params
 * @return {string}
 */


function addParamsToUrl(url, params) {
  return appendEncodedParamStringToUrl(url, serializeQueryString(params));
}
/**
 * Append query string fields and values to a url, only if the key does not
 * exist in current query string.
 * @param {string} url
 * @param {!JsonObject<string, string|!Array<string>>} params
 */


function addMissingParamsToUrl(url, params) {
  var location = parseUrlDeprecated(url);
  var existingParams = parseQueryString(location.search);
  var paramsToAdd = (0, _object.dict)({});
  var keys = Object.keys(params);

  for (var i = 0; i < keys.length; i++) {
    if (!(0, _object.hasOwn)(existingParams, keys[i])) {
      paramsToAdd[keys[i]] = params[keys[i]];
    }
  }

  return addParamsToUrl(url, paramsToAdd);
}
/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!JsonObject<string, string|!Array<string>>} params
 * @return {string}
 */


function serializeQueryString(params) {
  var s = [];

  for (var k in params) {
    var v = params[k];

    if (v == null) {
      continue;
    } else if ((0, _types.isArray)(v)) {
      for (var i = 0; i < v.length; i++) {
        var sv =
        /** @type {string} */
        v[i];
        s.push(encodeURIComponent(k) + "=" + encodeURIComponent(sv));
      }
    } else {
      var _sv =
      /** @type {string} */
      v;
      s.push(encodeURIComponent(k) + "=" + encodeURIComponent(_sv));
    }
  }

  return s.join('&');
}
/**
 * Returns `true` if the URL is secure: either HTTPS or localhost (for testing).
 * @param {string|!Location} url
 * @return {boolean}
 */


function isSecureUrlDeprecated(url) {
  if (typeof url == 'string') {
    url = parseUrlDeprecated(url);
  }

  return url.protocol == 'https:' || url.hostname == 'localhost' || (0, _string.endsWith)(url.hostname, '.localhost');
}
/**
 * Asserts that a given url is HTTPS or protocol relative. It's a user-level
 * assert.
 *
 * Provides an exception for localhost.
 *
 * @param {?string|undefined} urlString
 * @param {!Element|string} elementContext Element where the url was found.
 * @param {string=} sourceName Used for error messages.
 * @return {string}
 */


function assertHttpsUrl(urlString, elementContext, sourceName) {
  if (sourceName === void 0) {
    sourceName = 'source';
  }

  (0, _log.userAssert)(urlString != null, '%s %s must be available', elementContext, sourceName); // (erwinm, #4560): type cast necessary until #4560 is fixed.

  var theUrlString =
  /** @type {string} */
  urlString;
  (0, _log.userAssert)(isSecureUrlDeprecated(theUrlString) || /^(\/\/)/.test(theUrlString), '%s %s must start with ' + '"https://" or "//" or be relative and served from ' + 'either https or from localhost. Invalid value: %s', elementContext, sourceName, theUrlString);
  return theUrlString;
}
/**
 * Asserts that a given url is an absolute HTTP or HTTPS URL.
 * @param {string} urlString
 * @return {string}
 */


function assertAbsoluteHttpOrHttpsUrl(urlString) {
  (0, _log.userAssert)(/^https?\:/i.test(urlString), 'URL must start with "http://" or "https://". Invalid value: %s', urlString);
  return parseUrlDeprecated(urlString).href;
}
/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 *
 * This function is implemented in a separate file to avoid a circular
 * dependency.
 *
 * @param {string} queryString
 * @return {!JsonObject}
 */


function parseQueryString(queryString) {
  return (0, _urlParseQueryString.parseQueryString_)(queryString);
}
/**
 * Returns the URL without fragment. If URL doesn't contain fragment, the same
 * string is returned.
 * @param {string} url
 * @return {string}
 */


function removeFragment(url) {
  var index = url.indexOf('#');

  if (index == -1) {
    return url;
  }

  return url.substring(0, index);
}
/**
 * Returns the fragment from the URL. If the URL doesn't contain fragment,
 * the empty string is returned.
 * @param {string} url
 * @return {string}
 */


function getFragment(url) {
  var index = url.indexOf('#');

  if (index == -1) {
    return '';
  }

  return url.substring(index);
}
/**
 * Returns whether the URL has the origin of a proxy.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */


function isProxyOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrlDeprecated(url);
  }

  return _config.urls.cdnProxyRegex.test(url.origin);
}
/**
 * For proxy-origin URLs, returns the serving type. Otherwise, returns null.
 * E.g., 'https://amp-com.cdn.ampproject.org/a/s/amp.com/amp_document.html'
 * returns 'a'.
 * @param {string|!Location} url URL of an AMP document.
 * @return {?string}
 */


function getProxyServingType(url) {
  if (typeof url == 'string') {
    url = parseUrlDeprecated(url);
  }

  if (!isProxyOrigin(url)) {
    return null;
  }

  var path = url.pathname.split('/', 2);
  return path[1];
}
/**
 * Returns whether the URL origin is localhost.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */


function isLocalhostOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrlDeprecated(url);
  }

  return _config.urls.localhostRegex.test(url.origin);
}
/**
 * Returns whether the URL has valid protocol.
 * Deep link protocol is valid, but not javascript etc.
 * @param {string|!Location} url
 * @return {boolean}
 */


function isProtocolValid(url) {
  if (!url) {
    return true;
  }

  if (typeof url == 'string') {
    url = parseUrlDeprecated(url);
  }

  return !INVALID_PROTOCOLS.includes(url.protocol);
}
/**
 * Returns a URL without AMP JS parameters.
 * @param {string} url
 * @return {string}
 */


function removeAmpJsParamsFromUrl(url) {
  var parsed = parseUrlDeprecated(url);
  var search = removeAmpJsParamsFromSearch(parsed.search);
  return parsed.origin + parsed.pathname + search + parsed.hash;
}
/**
 * Returns a URL without a query string.
 * @param {string} url
 * @return {string}
 */


function removeSearch(url) {
  var index = url.indexOf('?');

  if (index == -1) {
    return url;
  }

  var fragment = getFragment(url);
  return url.substring(0, index) + fragment;
}
/**
 * Removes parameters that start with amp js parameter pattern and returns the
 * new search string.
 * @param {string} urlSearch
 * @return {string}
 */


function removeAmpJsParamsFromSearch(urlSearch) {
  if (!urlSearch || urlSearch == '?') {
    return '';
  }

  var search = urlSearch.replace(AMP_JS_PARAMS_REGEX, '').replace(AMP_GSA_PARAMS_REGEX, '').replace(AMP_R_PARAMS_REGEX, '').replace(AMP_KIT_PARAMS_REGEX, '').replace(GOOGLE_EXPERIMENT_PARAMS_REGEX, '').replace(/^[?&]/, ''); // Removes first ? or &.

  return search ? '?' + search : '';
}
/**
 * Removes parameters with param name and returns the new search string.
 * @param {string} urlSearch
 * @param {string} paramName
 * @return {string}
 */


function removeParamsFromSearch(urlSearch, paramName) {
  // TODO: reuse the function in removeAmpJsParamsFromSearch. Accept paramNames
  // as an array.
  if (!urlSearch || urlSearch == '?') {
    return '';
  }

  var paramRegex = new RegExp("[?&]" + paramName + "=[^&]*", 'g');
  var search = urlSearch.replace(paramRegex, '').replace(/^[?&]/, '');
  return search ? '?' + search : '';
}
/**
 * Returns the source URL of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string}
 */


function getSourceUrl(url) {
  if (typeof url == 'string') {
    url = parseUrlDeprecated(url);
  } // Not a proxy URL - return the URL itself.


  if (!isProxyOrigin(url)) {
    return url.href;
  } // A proxy URL.
  // Example path that is being matched here.
  // https://cdn.ampproject.org/c/s/www.origin.com/foo/
  // The /s/ is optional and signals a secure origin.


  var path = url.pathname.split('/');
  var prefix = path[1];
  (0, _log.userAssert)(SERVING_TYPE_PREFIX[prefix], 'Unknown path prefix in url %s', url.href);
  var domainOrHttpsSignal = path[2];
  var origin = domainOrHttpsSignal == 's' ? 'https://' + decodeURIComponent(path[3]) : 'http://' + decodeURIComponent(domainOrHttpsSignal); // Sanity test that what we found looks like a domain.

  (0, _log.userAssert)(origin.indexOf('.') > 0, 'Expected a . in origin %s', origin);
  path.splice(1, domainOrHttpsSignal == 's' ? 3 : 2);
  return origin + path.join('/') + removeAmpJsParamsFromSearch(url.search) + (url.hash || '');
}
/**
 * Returns the source origin of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string} The source origin of the URL.
 */


function getSourceOrigin(url) {
  return parseUrlDeprecated(getSourceUrl(url)).origin;
}
/**
 * Returns absolute URL resolved based on the relative URL and the base.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 */


function resolveRelativeUrl(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrlDeprecated(baseUrl);
  }

  if (typeof URL == 'function') {
    return new URL(relativeUrlString, baseUrl.href).toString();
  }

  return resolveRelativeUrlFallback_(relativeUrlString, baseUrl);
}
/**
 * Fallback for URL resolver when URL class is not available.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 * @private Visible for testing.
 */


function resolveRelativeUrlFallback_(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrlDeprecated(baseUrl);
  }

  relativeUrlString = relativeUrlString.replace(/\\/g, '/');
  var relativeUrl = parseUrlDeprecated(relativeUrlString); // Absolute URL.

  if ((0, _string.startsWith)(relativeUrlString.toLowerCase(), relativeUrl.protocol)) {
    return relativeUrl.href;
  } // Protocol-relative URL.


  if ((0, _string.startsWith)(relativeUrlString, '//')) {
    return baseUrl.protocol + relativeUrlString;
  } // Absolute path.


  if ((0, _string.startsWith)(relativeUrlString, '/')) {
    return baseUrl.origin + relativeUrlString;
  } // Relative path.


  return baseUrl.origin + baseUrl.pathname.replace(/\/[^/]*$/, '/') + relativeUrlString;
}
/**
 * Add "__amp_source_origin" query parameter to the URL.
 * @param {!Window} win
 * @param {string} url
 * @return {string}
 */


function getCorsUrl(win, url) {
  checkCorsUrl(url);
  var sourceOrigin = getSourceOrigin(win.location.href);
  return addParamToUrl(url, SOURCE_ORIGIN_PARAM, sourceOrigin);
}
/**
 * Checks if the url has __amp_source_origin and throws if it does.
 * @param {string} url
 */


function checkCorsUrl(url) {
  var parsedUrl = parseUrlDeprecated(url);
  var query = parseQueryString(parsedUrl.search);
  (0, _log.userAssert)(!(SOURCE_ORIGIN_PARAM in query), 'Source origin is not allowed in %s', url);
}
/**
 * Tries to decode a URI component, falling back to opt_fallback (or an empty
 * string)
 *
 * @param {string} component
 * @param {string=} opt_fallback
 * @return {string}
 */


function tryDecodeUriComponent(component, opt_fallback) {
  return (0, _urlTryDecodeUriComponent.tryDecodeUriComponent_)(component, opt_fallback);
}

},{"./config":8,"./log":14,"./mode":16,"./string":29,"./types":30,"./url-parse-query-string":31,"./url-try-decode-uri-component":32,"./utils/lru-cache":35,"./utils/object":36}],34:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.utf8Decode = utf8Decode;
exports.utf8Encode = utf8Encode;
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
exports.bytesToUInt32 = bytesToUInt32;
exports.getCryptoRandomBytesArray = getCryptoRandomBytesArray;

var _log = require("../log");

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!BufferSource} bytes
 * @return {string}
 */
function utf8Decode(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8').decode(bytes);
  }

  var asciiString = bytesToString(new Uint8Array(bytes.buffer || bytes));
  return decodeURIComponent(escape(asciiString));
}
/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Uint8Array}
 */


function utf8Encode(string) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder('utf-8').encode(string);
  }

  return stringToBytes(unescape(encodeURIComponent(string)));
}
/**
 * Converts a string which holds 8-bit code points, such as the result of atob,
 * into a Uint8Array with the corresponding bytes.
 * If you have a string of characters, you probably want to be using utf8Encode.
 * @param {string} str
 * @return {!Uint8Array}
 */


function stringToBytes(str) {
  var bytes = new Uint8Array(str.length);

  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    (0, _log.devAssert)(charCode <= 255, 'Characters must be in range [0,255]');
    bytes[i] = charCode;
  }

  return bytes;
}
/**
 * Converts a 8-bit bytes array into a string
 * @param {!Uint8Array} bytes
 * @return {string}
 */


function bytesToString(bytes) {
  // Intentionally avoids String.fromCharCode.apply so we don't suffer a
  // stack overflow. #10495, https://jsperf.com/bytesToString-2
  var array = new Array(bytes.length);

  for (var i = 0; i < bytes.length; i++) {
    array[i] = String.fromCharCode(bytes[i]);
  }

  return array.join('');
}
/**
 * Converts a 4-item byte array to an unsigned integer.
 * Assumes bytes are big endian.
 * @param {!Uint8Array} bytes
 * @return {number}
 */


function bytesToUInt32(bytes) {
  if (bytes.length != 4) {
    throw new Error('Received byte array with length != 4');
  }

  var val = (bytes[0] & 0xFF) << 24 | (bytes[1] & 0xFF) << 16 | (bytes[2] & 0xFF) << 8 | bytes[3] & 0xFF; // Convert to unsigned.

  return val >>> 0;
}
/**
 * Generate a random bytes array with specific length using
 * win.crypto.getRandomValues. Return null if it is not available.
 * @param {!Window} win
 * @param {number} length
 * @return {?Uint8Array}
 */


function getCryptoRandomBytesArray(win, length) {
  if (!win.crypto || !win.crypto.getRandomValues) {
    return null;
  } // Widely available in browsers we support:
  // http://caniuse.com/#search=getRandomValues


  var uint8array = new Uint8Array(length);
  win.crypto.getRandomValues(uint8array);
  return uint8array;
}

},{"../log":14}],35:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.LruCache = void 0;

var _log = require("../log");

/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {string} */
var TAG = 'lru-cache';
/**
 * @template T
 */

var LruCache =
/*#__PURE__*/
function () {
  /**
   * @param {number} capacity
   */
  function LruCache(capacity) {
    /** @private @const {number} */
    this.capacity_ = capacity;
    /** @private {number} */

    this.size_ = 0;
    /**
     * An incrementing counter to define the last access.
     * @private {number}
     */

    this.access_ = 0;
    /** @private {!Object<(number|string), {payload: T, access: number}>} */

    this.cache_ = Object.create(null);
  }
  /**
   * Returns whether key is cached.
   *
   * @param {number|string} key
   * @return {boolean}
   */


  var _proto = LruCache.prototype;

  _proto.has = function has(key) {
    return !!this.cache_[key];
  };
  /**
   * @param {number|string} key
   * @return {T} The cached payload.
   */


  _proto.get = function get(key) {
    var cacheable = this.cache_[key];

    if (cacheable) {
      cacheable.access = ++this.access_;
      return cacheable.payload;
    }

    return undefined;
  };
  /**
   * @param {number|string} key
   * @param {T} payload The payload to cache.
   */


  _proto.put = function put(key, payload) {
    if (!this.has(key)) {
      this.size_++;
    }

    this.cache_[key] = {
      payload: payload,
      access: this.access_
    };
    this.evict_();
  };
  /**
   * Evicts the oldest cache entry, if we've exceeded capacity.
   */


  _proto.evict_ = function evict_() {
    if (this.size_ <= this.capacity_) {
      return;
    }

    (0, _log.dev)().warn(TAG, 'Trimming LRU cache');
    var cache = this.cache_;
    var oldest = this.access_ + 1;
    var oldestKey;

    for (var key in cache) {
      var access = cache[key].access;

      if (access < oldest) {
        oldest = access;
        oldestKey = key;
      }
    }

    if (oldestKey !== undefined) {
      delete cache[oldestKey];
      this.size_--;
    }
  };

  return LruCache;
}();

exports.LruCache = LruCache;

},{"../log":14}],36:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.map = map;
exports.dict = dict;
exports.hasOwn = hasOwn;
exports.ownProperty = ownProperty;
exports.deepMerge = deepMerge;
exports.omit = omit;

var _types = require("../types");

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @const */
var hasOwn_ = Object.prototype.hasOwnProperty;
/**
 * Returns a map-like object.
 * If opt_initial is provided, copies its own properties into the
 * newly created object.
 * @param {T=} opt_initial This should typically be an object literal.
 * @return {T}
 * @template T
 */

function map(opt_initial) {
  var obj = Object.create(null);

  if (opt_initial) {
    Object.assign(obj, opt_initial);
  }

  return obj;
}
/**
 * Return an empty JsonObject or makes the passed in object literal
 * an JsonObject.
 * The JsonObject type is just a simple object that is at-dict.
 * See
 * https://github.com/google/closure-compiler/wiki/@struct-and-@dict-Annotations
 * for what a dict is type-wise.
 * The linter enforces that the argument is, in fact, at-dict like.
 * @param {!Object=} opt_initial
 * @return {!JsonObject}
 */


function dict(opt_initial) {
  // We do not copy. The linter enforces that the passed in object is a literal
  // and thus the caller cannot have a reference to it.
  return (
    /** @type {!JsonObject} */
    opt_initial || {}
  );
}
/**
 * Checks if the given key is a property in the map.
 *
 * @param {T}  obj a map like property.
 * @param {string}  key
 * @return {boolean}
 * @template T
 */


function hasOwn(obj, key) {
  return hasOwn_.call(obj, key);
}
/**
 * Returns obj[key] iff key is obj's own property (is not inherited).
 * Otherwise, returns undefined.
 *
 * @param {Object} obj
 * @param {string} key
 * @return {*}
 */


function ownProperty(obj, key) {
  if (hasOwn(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}
/**
 * Deep merges source into target.
 *
 * @param {!Object} target
 * @param {!Object} source
 * @param {number} depth The maximum merge depth. If exceeded, Object.assign
 *                       will be used instead.
 * @return {!Object}
 * @throws {Error} If source contains a circular reference.
 * Note: Only nested objects are deep-merged, primitives and arrays are not.
 */


function deepMerge(target, source, depth) {
  if (depth === void 0) {
    depth = 10;
  }

  // Keep track of seen objects to detect recursive references.
  var seen = [];
  /** @type {!Array<{t: !Object, s: !Object, d: number}>} */

  var queue = [];
  queue.push({
    t: target,
    s: source,
    d: 0
  }); // BFS to ensure objects don't have recursive references at shallower depths.

  var _loop = function _loop() {
    var _queue$shift = queue.shift(),
        t = _queue$shift.t,
        s = _queue$shift.s,
        d = _queue$shift.d;

    if (seen.includes(s)) {
      throw new Error('Source object has a circular reference.');
    }

    seen.push(s);

    if (t === s) {
      return "continue";
    }

    if (d > depth) {
      Object.assign(t, s);
      return "continue";
    }

    Object.keys(s).forEach(function (key) {
      var newValue = s[key]; // Perform a deep merge IFF both target and source have the same key
      // whose corresponding values are objects.

      if (hasOwn(t, key)) {
        var oldValue = t[key];

        if ((0, _types.isObject)(newValue) && (0, _types.isObject)(oldValue)) {
          queue.push({
            t: oldValue,
            s: newValue,
            d: d + 1
          });
          return;
        }
      }

      t[key] = newValue;
    });
  };

  while (queue.length > 0) {
    var _ret = _loop();

    if (_ret === "continue") continue;
  }

  return target;
}
/**
 * @param {!Object} o An object to remove properties from
 * @param {!Array<string>} props A list of properties to remove from the Object
 * @return {!Object} An object with the given properties removed
 */


function omit(o, props) {
  return Object.keys(o).reduce(function (acc, key) {
    if (!props.includes(key)) {
      acc[key] = o[key];
    }

    return acc;
  }, {});
}

},{"../types":30}],37:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tryResolve = tryResolve;
exports.some = some;
exports.LastAddedResolver = exports.Deferred = void 0;

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a Deferred struct, which holds a pending promise and its associated
 * resolve and reject functions.
 *
 * This is preferred instead of creating a Promise instance to extract the
 * resolve/reject functions yourself:
 *
 * ```
 * // Avoid doing
 * let resolve;
 * const promise = new Promise(res => {
 *   resolve = res;
 * });
 *
 * // Good
 * const deferred = new Deferred();
 * const { promise, resolve } = deferred;
 * ```
 *
 * @template T
 */
var Deferred =
/**
 * Creates an instance of Deferred.
 */
function Deferred() {
  var resolve, reject;
  /**
   * @const {!Promise<T>}
   */

  this.promise = new
  /*OK*/
  Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });
  /**
   * @const {function(T=)}
   */

  this.resolve = resolve;
  /**
   * @const {function(*=)}
   */

  this.reject = reject;
};
/**
 * Creates a promise resolved to the return value of fn.
 * If fn sync throws, it will cause the promise to reject.
 *
 * @param {function():T} fn
 * @return {!Promise<T>}
 * @template T
 */


exports.Deferred = Deferred;

function tryResolve(fn) {
  return new Promise(function (resolve) {
    resolve(fn());
  });
}
/**
 * Returns a promise which resolves if a threshold amount of the given promises
 * resolve, and rejects otherwise.
 * @param {!Array<!Promise>} promises The array of promises to test.
 * @param {number} count The number of promises that must resolve for the
 *     returned promise to resolve.
 * @return {!Promise} A promise that resolves if any of the given promises
 *     resolve, and which rejects otherwise.
 */


function some(promises, count) {
  if (count === void 0) {
    count = 1;
  }

  return new Promise(function (resolve, reject) {
    count = Math.max(count, 0);
    var extra = promises.length - count;

    if (extra < 0) {
      reject(new Error('not enough promises to resolve'));
    }

    if (promises.length == 0) {
      resolve([]);
    }

    var values = [];
    var reasons = [];

    var onFulfilled = function onFulfilled(value) {
      if (values.length < count) {
        values.push(value);
      }

      if (values.length == count) {
        resolve(values);
      }
    };

    var onRejected = function onRejected(reason) {
      if (reasons.length <= extra) {
        reasons.push(reason);
      }

      if (reasons.length > extra) {
        reject(reasons);
      }
    };

    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(onFulfilled, onRejected);
    }
  });
}
/**
 * Resolves with the result of the last promise added.
 * @implements {IThenable}
 */


var LastAddedResolver =
/*#__PURE__*/
function () {
  /**
   * @param {!Array<!Promise>=} opt_promises
   */
  function LastAddedResolver(opt_promises) {
    var resolve_, reject_;
    /** @private @const {!Promise} */

    this.promise_ = new Promise(function (resolve, reject) {
      resolve_ = resolve;
      reject_ = reject;
    });
    /** @private */

    this.resolve_ = resolve_;
    /** @private */

    this.reject_ = reject_;
    /** @private */

    this.count_ = 0;

    if (opt_promises) {
      for (var i = 0; i < opt_promises.length; i++) {
        this.add(opt_promises[i]);
      }
    }
  }
  /**
   * Add a promise to possibly be resolved.
   * @param {!Promise} promise
   * @return {!Promise}
   */


  var _proto = LastAddedResolver.prototype;

  _proto.add = function add(promise) {
    var _this = this;

    var countAtAdd = ++this.count_;
    Promise.resolve(promise).then(function (result) {
      if (_this.count_ === countAtAdd) {
        _this.resolve_(result);
      }
    }, function (error) {
      // Don't follow behavior of Promise.all and Promise.race error so that
      // this will only reject when most recently added promise fails.
      if (_this.count_ === countAtAdd) {
        _this.reject_(error);
      }
    });
    return this.promise_;
  };
  /** @override */


  _proto.then = function then(opt_resolve, opt_reject) {
    return this.promise_.then(opt_resolve, opt_reject);
  };

  return LastAddedResolver;
}();

exports.LastAddedResolver = LastAddedResolver;

},{}],38:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.cssEscape = cssEscape;

/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */

/**
 * This regex consists of 4 matching capture groups and one (non-matching) fallback:
 *
 * - (\0), catch the null terminator character so it may be replaced by UTF
 *   Replacement Char
 * - ^(-)$, catch a solitary dash char, so that it may be backslash escaped.
 *   This is a separate capture group so that the legal-chars (group 4) doesn't
 *   capture it first, since that group doesn't need to escape its dash.
 * - ([\x01-\x1f\x7f]|^-?[0-9]), catch a UTF control char, or any leading
 *   number (with an optional leading dash). The control or the number (but not
 *   the leading dash) must be hex-escaped,.
 * - ([\x80-\uffff0-9a-zA-Z_-]+), catch legal-chars, with the exception of a
 *   solitary dash, which will already have matched in group 1.
 * - [^], finally, a catch-all that allows us to backslash escape the char.
 *
 * Together, this matches everything necessary for CSS.escape.
 */
var regex = /(\0)|^(-)$|([\x01-\x1f\x7f]|^-?[0-9])|([\x80-\uffff0-9a-zA-Z_-]+)|[^]/g;

function escaper(match, nil, dash, hexEscape, chars) {
  // Chars is the legal-chars (group 4) capture
  if (chars) {
    return chars;
  } // Nil is the null terminator (group 1) capture


  if (nil) {
    return "\uFFFD";
  } // Both UTF control chars, and leading numbers (with optional leading dash)
  // (group 3) must be backslash escaped with a trailing space.  Funnily, the
  // leading dash must not be escaped, but the number. :shrug:


  if (hexEscape) {
    return match.slice(0, -1) + '\\' + match.slice(-1).charCodeAt(0).toString(16) + ' ';
  } // Finally, the solitary dash and the catch-all chars require backslash
  // escaping.


  return '\\' + match;
}
/**
 * https://drafts.csswg.org/cssom/#serialize-an-identifier
 * @param {string} value
 * @return {string}
 */


function cssEscape(value) {
  return String(value).replace(regex, escaper);
}

},{}]},{},[1])


})});
//# sourceMappingURL=amp-digidip-0.1.max.js.map
