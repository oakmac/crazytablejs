crazytablejs
============

Goals:
- no dependencies
- progressive enhancement for existing tables in the DOM
- all options overridable
- support for 1,000,000 rows
- support for callback data (ie: ajax support)
- UUCSS classes for every element
- support for row drawers
- all of the event handlers in the config
- support for drag and drop column header sorting
- support for searching
- error codes ala autocomplete and chessboard

Methods:
table.sort(); // returns the current sort information

table.sort('col-id'); // sorts on "col-id"; toggles the direction
table.sort('col-id', 'toggle'); // same as line above, just being explicit
table.sort('col-id', 'asc'); // sets sort column and direction
table.sort('col-id', function(a, b) {...}); // sort using custom function

table.sort(2); // sorts on third column (zero-indexed)
table.sort(2, 'toggle'); // same as above line, just being explicit
table.sort(2, 'asc'); // sort ascending
table.sort(2, function(a, b) {...}); // sort third column using provided function
table.sort(2, 'asc', function(a, b) {...}); // sort third column ascending using the provided function

table.rowsPerPage(); // returns the current value
table.rowsPerPage(25); // sets the current value

table.search(); // returns current search value
table.search('foo'); // searches for "foo"
table.clearSearch(); // alias of table.search("")

// need to define what it means to lock the table
table.lock(); // locks the table
table.unlock(); // unlocks the table
table.toggleLock(); // toggle state
table.isLocked(); // boolean

table.refresh(); // make a call to requestData();

table.isLoading(); // boolean

table.nextPage();
table.prevPage();
table.page(); // returns the current page
table.page(2); // set to page 2

table.isLocked(); // returns locked state
table.lock(); // locks the table from sorting, searching, pagination, etc
table.unlock(); // unlocks the table
table.toggleLock();

table.state(); // returns an object of the table's current state (sort, search, page, etc)

Events:
- onMouseEnterRow
- onMouseLeaveRow
- onMouseEnterCell
- onMouseLeaveCell
- onClickCell
- onClickRow

Column level config:
cellClass - string or function to set the CSS class for the <td> cells in the column
cellHTML - string or function to set the innerHTML of the cell element
cellStyle - string or function, put inline styles on the <td> element
headerClass - string or function to set the CSS class for the <th> element
headerHTML - string or function to set the innerHTML of the <th> element
headerStyle - string or function, put inline styles on the <th> element
sortable - boolean, default true
sortBy - string or function
  if string, should be a property name of a data object (only goes one level deep)
  if function, custom sort function for the column
sortLike - "string" "number" "html", has no effect if sortBy is a function
(maybe?) width - shorthand for setting the width of a column
NOTE: all of these should be settable via data-props on the <th> element
  (where that makes sense)


Table level config:
paginationEnabled - boolean
searchEnabled - boolean
sortEnabled - boolean, superceded by column values
async - boolean to determine table mode
requestData - function to request data when in async mode
rowClass - string or function


Areas of concern:
- 

Areas of *no* concern:
- anything "inside" a cell or header (HTML)
- methods of requesting data (ie: AJAX)
- the way the table looks (ie: CSS), crazytable provides plenty of access to add CSS classes and even style attributes directly on <td> elements, but purposefully does not do any style calculations on the table

Open questions:
- how to handle colgroups?
- how to handle rowspans?
- tfoot?
- long-scrolling tables vs pagination?
- how to handle millions of rows? does this requirement make sense?