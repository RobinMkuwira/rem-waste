# rem-waste
project name: rem-waste

# to run the project
1. install node versing 18.15.0
2. clone the project from https://github.com/RobinMkuwira/rem-waste.git
3. cd into the project /front-end/rem-waste
4. run npm i (to install the npm packages)
5. then run npm start (to start the project)

## my approach
1. project setup
   a. used node.js version 18.15.0
   b. used react.js
   c. used typescript

2. main libaries used
   a. rxjs
      - for fetching data from the data source (https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft)
   b. tailwindcss
      - for styling the page select skip page
   c. redux & redux persist
      - for storing and persisting the state when a skip is selected
      - once a selected skip is selected even after reloading the page the saved skip will still be selected.

3. ui/ux improvements
   a. added a navbar
   b. added a search input field for filtering the skips, for example on mobile devices users might need to search for a skip.
   c. added an icon for sorting the skips in a descending and asscending order based on the skip size.
   d. updated the card design for a card.
   e. updated the card outline for a selected card to have a yellow large outline.
   f. added a loader to show the user when the skip data is being loaded. 
   g. updated the systems color scheme
   h. updated the stepper that shows the step at which the user is at.
   i. updated the drawer at the bottom that is shown one a user has selected a skip.
   j. made the system responsive to mobile and destop applications

4. my approach in summary
a.when the user gets to the select skip page the system fetched data from back-end using rxjs then adds the skip images to the data, then the system updates the user interface using the details
that have fetched from the back-end.

b. Users can also filter the skips by searching for skip deatils using the search in put field, the updated system when searching the data it goes through all the skip's details to filter the data 
and show it to the user

c. Users can also sort the data by clicking the icon that is to the left of the search field to sort it in an ascending or descending order using the skip's size.

d. the system also uses redux and redux persist to save the entered details so that the user's can be accessed later on.


regards,
robin mkuwira.