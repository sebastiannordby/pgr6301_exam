[![.github/workflows/azure-webapps-node.yml](https://github.com/sebastiannordby/pgr6301_exam/actions/workflows/azure-webapps-node.yml/badge.svg)](https://github.com/sebastiannordby/pgr6301_exam/actions/workflows/azure-webapps-node.yml)

## Exam in PG6301 Webutvikling og API-design
### Kandidatnr: 1009

## Important - Azure and Repo
This app could not be published to Azure since my account has been disabled.
The account was disabled because of insufficient credits(has been used up by other courses at Kristiania). Proof:
![image](https://user-images.githubusercontent.com/24465003/203160263-984c532d-59b4-4276-ab56-f67ec4cd3234.png)

I also had to move my repository, because the Github classroom was not configured correctly(Settings button invisible):
![image](https://user-images.githubusercontent.com/24465003/203274089-f98ef49f-d368-424b-bd6e-0089686b8099.png)

This led to alot of frustration and i ended up settleing with a lower grade.

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
*[X] A customer can create an order specifying a time/place where they want a delivery, and
  how many portions of each dish they select. This order can be placed if the customer is logged
  in, and will be stored in a separate database (separate table/collection, not different
  technology).

#### Predefined Admin Logins
Username: admin | Password: admin

#### Predefined Customer Logins

### Documentation
Section marked in green is for the customer.
Section marked in red is for the administrator.

![image](https://user-images.githubusercontent.com/24465003/203337828-24114dc1-9c3a-46d5-a18f-54a782202896.png)

### Customer

Login - Customer
- Cookie with the customer's id is set on the client. There is no encryption/not safe for production.
![image](https://user-images.githubusercontent.com/24465003/203337949-d2be04da-b75f-4543-acdf-11bc5851af9b.png)

Welcome message - Customer
![image](https://user-images.githubusercontent.com/24465003/203338062-ece73811-04d0-493e-a5b6-ccdb3e4b20d0.png)

Support chat - Customer
- Messages saves to the database for later reference.
![image](https://user-images.githubusercontent.com/24465003/203338181-16675558-b8d7-455b-aa31-d45946fa7c57.png)

Order - Customer
- To create an order fill in the fields in the dialog
- When order is created click on the order to see details
- In the orderdetails page you can add dishes, change address and save
- To add a click on the dish, enter a quantity then click add
- Rememeber to click save to keep your changes.
- Signout.

![image](https://user-images.githubusercontent.com/24465003/203338456-e645b719-20c5-4648-a041-e22c336511da.png)

![image](https://user-images.githubusercontent.com/24465003/203338584-66325c95-9ea2-432f-b30a-8779839756bc.png)

![image](https://user-images.githubusercontent.com/24465003/203338663-4ce1b84c-7b60-4f93-8869-00a1868e412d.png)

![image](https://user-images.githubusercontent.com/24465003/203338879-47b9eb98-d6bb-4ca1-9062-96d19d674236.png)

![image](https://user-images.githubusercontent.com/24465003/203338968-b521a439-d292-4ca4-b4c8-a87813eb71b9.png)

![image](https://user-images.githubusercontent.com/24465003/203339164-e6d2ea00-1dd8-45a2-bad8-5fdf9d9c5796.png)

![image](https://user-images.githubusercontent.com/24465003/203339637-b2e50080-41e9-46b2-a5c7-706a1579192b.png)

### Admin


