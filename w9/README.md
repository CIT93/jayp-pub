# My Understanding of the Code
### as of Week 8

## index.html

The elements for the form are coded here in standard HTML. These include
standard text fields for first and last name, limited to a maximum of 50
characters, a numeric field for the household members with a minimum of
1, and a selector (dropdown) for the house size. There is also a submit
button whose functionality is enabled within main.js.

## main.js

This contains the primary controlling code and is loaded deferred as a
module from **index.html**. It imports two utility modules, **render.js**
and **footprint.js**. It also defines our global variables, two for HTML
element access and one for our primary data structure.

For initialization, we add an Event Listener for the *submit* event which
immediately defines an anonymous function that retrieves the data from the
HTML form fields and uses the *addCFRecord()* function to store the data.

The *addCFRecord()* function creates an object to store the data passed to
it and then pushes this object to our primary data structure, the global
*cfpDataList[]* array. It makes use of two functions from **footprint.js**
to calculate the CF points associated with the given data.

## footprint.js

This module contains two calculation functions that determine the number of
Carbon Footprint (CF) points to be assigned based upon the data passed to
them.

## render.js

This module defines a global variable for HTML access to the division elment
where our report should be drawn. It also contains the *renderTbl()* function
used to display all records within the provided data structure to the report
element in table format.

It also contains the helper functions *makeTblHead()*, *makeTblBody()*,
*makeTblField()*, and *makeActionButtons()* to create specific parts of the
table.

## Week 8 Feedback

Although I did not end up needing any information from the video, it was
still helpful to follow along and ensure that I did in fact understand all
of the concepts and constructs properly.

## How We Handle the Edit

Retrieve the form elements by any of the various methods, I used
getElementById(), and then fill it using its .value property. We should then
also delete the old record, otherwise when the user hits "Submit" it will
create a duplicate record, and also re-render the table.

# About localStorage

This appears to be persistent storage associated with one's web browser,
accessible via key-value pairs. The storage space appears to be unique at the
TLD level, with subdomains having their own space, e.g. accounts.youtube.com
has a different storage space than www.youtube.com though both appear when
you view localStorage while on YouTube.

It appears that they key used for localStorage must always be a string but the
value may be a string, or stringified structure, or it may be an object. This
leads me to my question:

How is localStorage stored internally? In the video when displaying the
contents of localStorage when it is an object, it shows as an object with
a string value, but that value is literally '[object Object]'. Presumably,
the use of getItem() will return the original object and not the literal
string '[object Object]'. So it must be storing the original object itself.
Of course, this object *might* be a stringified version, but if so then I
wonder why the Inspector doesn't just display this stringified version instead
of literally '[object Object]'.

