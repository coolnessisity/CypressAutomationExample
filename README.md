 A simple cypress test suite for a web app that accepts a number and returns the median prime number(s) between 1 and the number entered

### Example

If n = 10, the set of prime numbers less than 10 is [2,3,5,7], and so the medians are [3,5]

If n = 18, the set of prime numbers less than 18 is [2,3,5,7,11,13,17], and so the median is [7]

## Running the application
node.js must be installed. Run `npm install` from the main folder of this project. 

1) start server using 'node server.js' or 'npm start'
2) Navigate to http://localhost:3000 to view app in browser to ensure server is running
3) Once the server is running, tests can be run through command line using 'npm test'
4) Tests can also be run by using the command 'npm cypress open' to open Cypress select the file tests are located in.
  - In this case, median.test.js is the file we're looking for

### NOTES
Failing tests are included, any that are expected fails are marked with comments
