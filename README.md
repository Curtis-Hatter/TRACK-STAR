# TRACKSTAR
## *Track Your Online Orders All in One Place!*

*Technologies used: Javascript, Heroku, XML-JS, Handlebars, Adobe Illustrator*

------------

Link to TRACK STAR application : https://track-star-2021.herokuapp.com/

------------


Our initial brain storming session lead us down some interesting paths. Originally, we wanted to create an app that would provide pairings for different types of snacks with different types of alcoholic beverages. We also wanted to add functionality for users to create profiles, and add their own drink + snack pairing. Once we realized the scope of a project that size, we quickly scrapped it for our backup. 

Everybody buys things online. Especially in a time when there is an actual world-wide pandemic running rampage, online shopping has become a solace for many. Unfortunately, emails can get cluttered, and notes apps don't automatically update once you've received your item on your doorstep. That's where TRACK STAR comes in. 

TRACK STAR allows a user to keep track of all their pending deliveries for their online orders. A registered user is presented a form in which they can input the name of the item they've ordered, as well as an item description, or the website/vendor they've purchased it from, and finally a tracking number. As of now, our program can only check the status of packages being delivered using the following mail services: FedEx, UPS, and the United States Postal Service. 

Once the information has been provided, they click the Add Package button, and handlebars takes care of adding their new package to their home page. Currently, we are able to display 3 different statuses of the shipping process; Placed, In Transit, and Delivered. Once a package has been delivered, 

<img src="public/image/wireframe1.jpg" alt="Wireframe Log-in Mockup"/>
<img src="public/image/wireframe2.jpg" alt="Wireframe Home Page Mockup"/>

We began with a wireframe, which was mocked up by our Front End Graphic Designer, Jessilin Lugo. As a team, we quickly decided the functionality and different elements within the application, and once we had the wireframe completed, we were ready to get started. After the wire frame was complete, and each individual element was decided and agreed upon, we split up into teams; front end and back end. 

Front end consisted of Megan Bryan and Jessilin Lugo. Megan quickly mocked up the general look of the site to match the wire frame, and Jessilin worked on finalizing the details to match exactly. Because we knew we wanted to have a database for different users, Avelica Rubio worked on the authentication of our program, and successfully included caveats such as: email must be valid, no input boxes can be empty/null, and usernames must be unique, and email addresses cannot be used more than once to sign up. 

Curtis Hatter and Garth Hammonds developed the back end. Curtis was able to connect our APIs and even converted XML data from a particularly old API to JSON, which is what we required. Garth worked on the routing of our program, which allows you to navigate within the application. 

Future implementation would be mostly user interface updates with the back end functionality to match. Firstly, we would like to upgrade the program to include all shipping carriers, not just USPS, UPS, and FedEx. Secondly, adding a sort-by feature would be incredibly useful and convenient. We also wanted to include an Archived Orders page, which would move all orders delivered over 30 days ago to a separate tab, to keep the Delivered tab less cluttered. Finally, more user account features such as being able to modify username or password, reset passwords, and even delete account should be standard among any database that takes in users. 

All in all, one could say Team TRACK STAR really hit it out of the park considering our goal and the provided time. We surprised not only our classmates but ourselves with our drive and determination. We had faith in our idea, ourselves, and each other, and for now, MVP was reached. 


<img src="#" alt="text"/>