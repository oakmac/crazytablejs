/*!
 * crazytable.js $version$
 *
 * Copyright 2014 Chris Oakman
 * Released under the MIT license
 * https://github.com/oakmac/crazytablejs/blob/master/LICENSE
 *
 * Date: $date$
 */

window['CrazyTable'] = function(elOrId, cfg) {
'use strict';

//------------------------------------------------------------------------------
// Util
//------------------------------------------------------------------------------

function byId(id) {
  return document.getElementById(id);
}

// http://tinyurl.com/3ttloxj
function uuid() {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function(c) {
    var r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}

function isDOMElement(el) {

}

function escape(str) {
  return (str + '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;');
}

function template(str, obj) {
  var html = '';

  return html;
}

//------------------------------------------------------------------------------
// Errors
//------------------------------------------------------------------------------

function error(code, msg) {
  // TODO: write me
}

//------------------------------------------------------------------------------
// DOM Elements
//------------------------------------------------------------------------------

var containerEl,
  tableEl,
  headerRowEl,
  rowEls = [],
  cellEls = {};

//------------------------------------------------------------------------------
// Validate Config
//------------------------------------------------------------------------------


// return the widget
return {};

// end window.CrazyTable
};