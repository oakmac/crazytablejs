window.console = window.console || {};
console.log = console.log || function() {};

(function() {

var EXAMPLES,
  SECTIONS = [
  "Basic Usage",
  "Formatting",
  "Sorting",
  "Searching",
  "Pagination",
  "Async Mode",
  "Events",
  "Methods",
  "Advanced"
];

//------------------------------------------------------------------------------
// Data Wranglin'
//------------------------------------------------------------------------------

// TODO: store examples to localStorage with an expiration time
function fetchExamples(next) {
  $.getJSON('examples.json', function(result) {
    EXAMPLES = result;
    next();
  });
}

function getExamplesForSection(sectionNum) {
  var examples = [];

  for (var i in EXAMPLES) {
    if (EXAMPLES.hasOwnProperty(i) !== true ||
      parseInt(i.substr(0, 1), 10) !== sectionNum) continue;

    examples.push(EXAMPLES[i]);
  }

  examples.sort(function(a, b) {
    var a1 = parseInt(a.number, 10);
    var b1 = parseInt(b.number, 10);
    return a1 - b1;
  });

  return examples;
}

//------------------------------------------------------------------------------
// Markup Building
//------------------------------------------------------------------------------

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

function buildSectionHeader(name, sectionNum) {
  var html = '<div id="section' + sectionNum + '" class="section-9e097">' +
    name + '</div>';

  return html;
}

function buildExampleLink(example) {
  var html = '<div id="example' + example.number + '" class="example-e79a9">' +
    example.Name + '</div>';
  
  return html;
}

function buildExamplesNav() {
  var html = '';
  for (var i = 0; i < SECTIONS.length; i++) {
    html += buildSectionHeader(SECTIONS[i], i + 1) +
    '<div class="examples-cd361" id="examples' + (i + 1) +
      '" style="display:none">';

    var examples = getExamplesForSection(i + 1);
    for (var j = 0; j < examples.length; j++) {
      html += buildExampleLink(examples[j]);
    }

    html += '</div>';
  }

  return html;
}

//------------------------------------------------------------------------------
// Interaction
//------------------------------------------------------------------------------

function removeSectionHighlight() {
  $('#examplesNavContainer .section-9e097').removeClass('active-8820d');
}

function removeLinkHighlight() {
  $('#examplesNavContainer .example-e79a9').removeClass('active-d54f7');
}

function showExample(example) {
  var sectionNum = (example.number + '').substr(0, 1);

  // highlight section header
  removeSectionHighlight();
  $('#section' + sectionNum).addClass('active-8820d');

  // highlight example link
  removeLinkHighlight();
  $('#example' + example.number).addClass('active-d54f7');

  // make sure example links are visible
  $('#examples' + sectionNum).slideDown('fast');

  // populate the example
  $('#exampleName').html(example.Name);
  //$('#example_single_page_link').attr('href', 'examples/' + number);
  $('#exampleDescription').html(example.Description);
  $('#exampleHTML1').html(example.HTML);
  $('#exampleJS').html(escape(example.JS));
  $('#exampleHTML2').html(escape(example.HTML));
  
  prettyPrint();

  // run the example - omg! eval is evil ;)
  eval(example.JS);
}

function loadExampleFromHash() {
  var number = parseInt(window.location.hash.replace('#', ''), 10);
  if (EXAMPLES.hasOwnProperty(number) !== true) {
    number = 1000;
    window.location.hash = number;
  }
  showExample(EXAMPLES[number]);
}

//------------------------------------------------------------------------------
// Events
//------------------------------------------------------------------------------

function clickExample() {
  var number = $(this).attr('id').replace('example', '');

  if (EXAMPLES.hasOwnProperty(number) !== true) return;

  window.location.hash = number;
  loadExampleFromHash();
}

function clickSection() {
  var sectionNum = $(this).attr('id').replace('section', '');
  var examplesEl = $('#examples' + sectionNum);
  if (examplesEl.css('display') === 'none') {
    examplesEl.slideDown('fast');
  }
  else {
    examplesEl.slideUp('fast');
  }
}

function addEvents() {
  $('#examplesNavContainer')
    .on('click', '.example-e79a9', clickExample)
    .on("click", '.section-9e097', clickSection);
}

//------------------------------------------------------------------------------
// Page Init
//------------------------------------------------------------------------------

function init2() {
  $('#examplesNavContainer').html(buildExamplesNav());
  loadExampleFromHash();
}

function init() {
  addEvents();
  fetchExamples(init2);
}

$(document).ready(init);

})();