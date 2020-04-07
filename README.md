Welcome to the Rummy-O game repository! Below is a short overview of our project followed by instructions on how to deploy and execute the code.

### Rummy-O game
A game similar to the rummy game where we play with tiles instead of cards. It is a mind game which excercises your memory and tests your mathematical ingenuity. This game teaches you how to be prudent and not act impulsively. Four players can play the game and each player takes 14 tiles. Each set must have atleast three tiles of the same number from different colour also play three or more tiles with consecutive numbers in the same colour. The number on the tile is its value.
The aim of the game is to be the first person to play out all your tiles by grouping them into sets.

### Product Deployment

Instructions on how to deploy and execute the game

A. Access the game directly by clicking on the following link:
________________________________________

B. Second alternative

1. Download / Clone the Repo
2. Find and locate the path of you folder directory in your terminal (command prompt for windows)
3. Complete the npm installation : npm install
4. Start it with : npm start
   *It should give you this message:  "listening at : ws://localhost://2567"
5. Now turn your local server on (using WampServer is recommended)
6. Copy and Paste http://localhost:2567/ on your local browser
7. Connect with your friends (max: 4 players) and enjoy the game!
NOTE. open the link four times to connect with 4 other players 


### Table of Contents

#### - workflows
The .github/workflows folder is where github expects to find our workflow(pipelines).
It includes a javascript.yml file, which is the configuration file for the workflow, in YAML.

#### - Code/my-colyseus-server
The Code/my-colyseus-server folder contains the following files:
* loadtest 
* rooms
* static
* .gitignore
* README.MD
* index.ts
* package-lock.json
* package.json
* tsconfig.json

#### - Requirements
This folder contains the stakeholders requirement for this project. It contains the following files:

* List of Requirements(2).pdf - contains a tabular list of requirements
* requirements_review_checklist(1).doc - a checklist which examines if the requirements are organized, completed, consistent and traceable. 

#### - Use cases 
It contains all the use cases which defines the interaction between the actor and system to achieve a goal. It contains the following files: 
* List of Requirements.pdf - contains a tabular list of requirements in a priority order (highest to lowest).
* Use case diagram.pdf - specifies the expected behavior and not the method of making it happen.

#### - Design
The Design folder contains all the design artifacts of the RummyO game. It includes the following files:
* UML Class.pdf - class diagram provides us with the structure of the game by showing the relationship among objects. 
* UML Sequence diagram.pdf - shows the functionality of the game
* design_review_checklist.doc - inspects on the completeness and correctness, consistency and traceability of our design

#### - test cases
The test case folder contain all the different type of test of the RummyO game. It include the following files:
* Unit and Integration tets.pdf/.md - In this file there are list of all the tets cases and the expected results of the test cases.
* Test case report.pdf - shows the result of the test cases bases of the test of the RummyO game and how the game meets the Use Cases criteria. 

##### - Prototype demo 
This pdf contains screenshots of our prototype when the game is started.


##### - Traceability Matrix
This main folder includes a Traceability-matrix which is a map that traces all the client's requirements with the test cases and discovered defects.
