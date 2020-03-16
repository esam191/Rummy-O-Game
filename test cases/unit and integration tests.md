# Unit and Integration Tests


Test Case #| Test Case Description | Expected Result
------------ | ------------- | -------------
TU01 | Check response on entering valid User Id & Password |Login should be successful
TU02 | Check response on entering Invalid User ID & Password | Login should be unsuccessful
TU03 | Check the response when a User ID is Empty & Login Button is pressed, and similar |Prompt for reentry
TU04 | Ensure that each room created by the players has a maximum of 4 players |  Room has up to 4 players
TU05 | Ensure that the game only starts when a room has  a minimum of 2 players and a maximum of 4 players | Game starts with 2 -4 players
TU06 | Check for the transfer of data between classes | Data is transferable 
TU07 | Check response on forming an initial meld | Must have a minimum of 25 points 
TU08 | Check response on forming a meld | Must be either a set or a run  
TU09 | Examine all local data structures to test temporarily stored data and algorithms | Temporarily stored data maintains its integrity during all steps in an algorithm’s execution
TU10 | Check all independent paths through the control structure to ensure that all statements in the Room module have been executed at least once. | All statements are executed at least once 
TU11 | Test boundary conditions to ensure that the Room module operates properly at boundaries established to restrict processing. | Module operates correctly
TU12 | Test data flow across each component interface | Data enters and exits properly 
TU13 | Test to execute each and every error-handling path unit | Path executes with no error 
TU14 | Ensure error description provides enough information to assist in the location of the cause of the error. | Error description is intelligible
TI15 | Check the interface link between the Login and Room module | To be directed to the Room box after the user logs in  
TI16 | Check the interface link between the create/join room box and Room Module | Player should have an option to create or join room 
TI17 | Verifying the interface link between the home page and the game page | Gameplay table screen should open up once joined room
TI18 | Verifying the interface link in the gameplay screen between pause/resume and quit box | To be directed back to homepage if quit button is clicked
TI19 | Check the response when each turn is played |Moves on to the next player if current turn either adds to the table or pick up a tile
TI20 | Check the response when player runs out of tiles | Game ended and winner is declared