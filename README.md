[![.github/workflows/azure-webapps-node.yml](https://github.com/sebastiannordby/pgr6301_exam/actions/workflows/azure-webapps-node.yml/badge.svg)](https://github.com/sebastiannordby/pgr6301_exam/actions/workflows/azure-webapps-node.yml)

## Exam in PG6301 Webutvikling og API-design
### Kandidatnr: 1009

## Important - Azure and Repo
This app could not be published to Azure since my account has been disabled.
The account was disabled because of insufficient credits(has been used up by other courses at Kristiania). Proof:
![image](https://user-images.githubusercontent.com/24465003/203160263-984c532d-59b4-4276-ab56-f67ec4cd3234.png)

### Task at hand
You are to make a website and support server for a catering business. The idea is that the
business organises and prepares food for events.

They have a catalogue of possible dishes (that is accessible online by potential customers) that
show all the dishes that they can provide, along with any relevant information (for example,
information relating to allergies, suitability for vegetarian/vegan diets, and ingredients).

A (potential) customer can access the website, show all available dishes, sort/filter them by
their preference, and place an order for some combination of dishes, for a specified
date/place. A customer can only place an order after making an account.

An admin (or some employee of the company) can add or remove dishes (but, obviously, only
while successfully logged in).

### Task spefific requirements
*[X] A visitor to the page should be able to see the menu of potential dishes being offered
*[ ] When the application starts in developer mode, you must have some basic test data,
  representing a valid menu. If you cannot setup the REST API (requirement for grade D, see
  requirement R2), then hardcode a menu in the frontend.
*[X] A customer should be able to create a customer account, but there should be no
  registration page for admin users (those are for employees, can be assumed to be added via
  some other mechanism). Your database should include some predefined admin accounts for
  testing purposes.
*[X] An admin should be able to log in, add and remove items to the menu, edit existing menu
    items (for example, update the ingredients of a menu item).
*[X] The server should have separate API paths for customers getting data and admins
  adding/removing items from the menu. Checks to ensure that only admins can add/remove
  items from the menu should be enforced.
*[ ] A chat system (based on WebSockets) should be provided, where a customer can discuss
    further details with one of the employees in real time.
*[ ] A customer can create an order specifying a time/place where they want a delivery, and
  how many portions of each dish they select. This order can be placed if the customer is logged
  in, and will be stored in a separate database (separate table/collection, not different
  technology).


### Checklist of technologies you should include in your application
* [X] Some form of Login and access control
* [ ] Jest tests
* [ ] Snapshot tests
* [ ] Simulate + jest.fn
* [ ] Supertest
* [ ] Github Actions with coverage report
* [ ] Deployment to cloud (in this case, Azure)
* [X] Mongodb
* [X] Navigating in the application using React Router (remember Express Middleware)
* [ ] Reading data from the server (remember error handling)
* [X] Writing data to the server
* [ ] Websockets

### General Requirements

*[X] Write a homepage with React
*[X] Have at least 2 other React pages that can be accessed via React-Router
*[X] At least one page should have some "state", with a change that should be triggered from
  the interface.
*[X] From each page, be able to navigate back (either to previous page or to homepage)
  without using the browser "Back" button.
*[ ] Create a RESTful API that handles at least one GET, one POST, one PUT, and one
  DELETE calls and uses JSON for data transfer.
*[X] The frontend must use that RESTful API (for example, using fetch).
*[ ] All endpoints must be listed in README.md
*[ ] The solution should use continuous integration (in this case GitHub actions). Your code
  should be uploaded onto a github repository, and on every push to the master branch, the CI
  script should run the tests associated with your project.
*[ ] Handle authentication/authorization, session-based via cookies
*[X] Frontend should have a login page (Register will depend on the topic)
*[ ] A logged-in user should get a personalized welcome message
*[X] On every page, there should be an option to logout
*[ ] Each REST endpoint MUST handle authentication (401), and possibly authorization
  (403) checks. If an endpoint is supposed to be “open” to everyone, explicitly add a codecomment for it in its Express handler.
*[ ] Create a test class called security-test.js, where each endpoint is tested for when it returns
  401 and 403 (if applicable, i.e., if they can return such codes).
*[ ] In the “readme.md” file, where you list the endpoints (recall R2), for each endpoint list
  the security tests written for it.
*[ ] Your solution should include continuous deployment to Azure.
*[ ] In the eventuality of you finishing all of the above requirements, and only then, if you
  have extra time left you should add new functionalities/features to your project.
  Those extra functionalities need to be briefly discussed/listed in the “readme.md” file
  (e.g., as bullet points). Note: in the marking, examiners will ignore new functionalities that
  are not listed in the readme document. What type of functionalities to add is completely up to
  you.

#### Predefined Admin Logins
Username: admin | Password: admin

#### Predefined Customer Logins

