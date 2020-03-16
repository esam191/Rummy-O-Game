# Unit and Integration Tests


Test Case #| Test Case Description | Expected Result
------------ | ------------- | -------------
TC-001 | Check response on entering valid User Id & Password |Login should be successful
TC-002 | Check response on entering Invalid User ID & Password | Login should be unsuccessful
TC-003 | Check the response when a User ID is Empty & Login Button is pressed, and similar |Prompt for reentry
TC-004 | Ensure that each room created by the players has a maximum of 4 players |  Room has up to 4 players
TC-005 | Ensure that the game only starts when a room has  a minimum of 2 players and a maximum of 4 players | Game starts with 2 -4 players
TC-006 | Check for the transfer of data between classes | Data is transferable 
TC-007| Check response on forming an initial meld | Must have a minimum of 25 points 
TC-008 | Check response on forming a meld | Must be either a set or a run  
TC-009 | Examine all local data structures to test temporarily stored data and algorithms | Temporarily stored data maintains its integrity during all steps in an algorithm’s execution
TC-010 | Check all independent paths through the control structure to ensure that all statements in the Room module have been executed at least once. | All statements are executed at least once 
TC-011 | Test boundary conditions to ensure that the Room module operates properly at boundaries established to restrict processing. | Module operates correctly
TC-012 | Test data flow across each component interface | Data enters and exits properly 
TC-013 | Test to execute each and every error-handling path unit | Path executes with no error 
TC-014 | Ensure error description provides enough information to assist in the location of the cause of the error. | Error description is intelligible
TC-015 | Check the interface link between the Login and Room module | To be directed to the Room box after the user logs in  
TC-016 | Check the interface link between the create/join room box and Room Module | Player should have an option to create or join room 
TC-017 | Verifying the interface link between the home page and the game page | Gameplay table screen should open up once joined room
TC-018 | Verifying the interface link in the gameplay screen between pause/resume and quit box | To be directed back to homepage if quit button is clicked
TC-019 | Check the response when each turn is played |Moves on to the next player if current turn either adds to the table or pick up a tile
TC-020 | Check the response when player runs out of tiles | Game ended and winner is declared