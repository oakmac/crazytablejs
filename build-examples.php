<?php

// this script must be run from the command line
if (defined('STDIN') !== true) die;

file_put_contents("public/examples.json", json_encode(getExamples()));

die;

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------

// returns an array of all the examples
function getExamples() {
  $examples = array();
  $exampleFiles = glob('examples/*.example');
  foreach ($exampleFiles as $filename) {
    $contents = file_get_contents($filename);
    $example = parseExampleFile($contents);

    $number = str_replace('.example', '', $filename);
    $number = preg_replace('/.+\//', '', $number);

    $example['number'] = $number;

    $examples[$number] = $example;
  }

  return $examples;
}

function parseExampleFile($contents, $delimiter = '===') {
  $contents = explode("\n", $contents);
  $example = array();
  $currentSection = false;

  foreach ($contents as $line) {
    // new section
    if (preg_match('/^'.$delimiter.'/', $line) === 1) {
      $currentSection = trim(str_replace($delimiter, '', $line));
      $example[$currentSection] = '';
      continue;
    }

    if ($currentSection === false) continue;

    $example[$currentSection] .= $line."\n";
  }

  foreach ($example as $section => $content) {
    $example[$section] = trim($content);
  }

  return $example;
}

?>
