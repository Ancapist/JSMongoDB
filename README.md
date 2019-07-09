# JSMongoDB
I have created Tourists and Flights database and connected to them via JavaScript. 
Added CRUD and autofill flights numbers.

TO DO:
-NORMALIZATION- seriously, this database should be normalized. The flights column in Tourists table shall not be a list, better option is to make a new table with only ONE flight ID connected with ONE touristID. OK, DONE :)
-The 3rd collection should be TouristID object and FlightsID object (and its not -> it has FlightID instead of _id) and to change that I need to make promises
-instead of one remove/add option, better idea is to hide it and after clicking on a tourist in the tourist list show it (using ajax for example)
-in list of flights toursits the column name is TouristID and its components are not TouristsIDs- but to do it correctly i had to use promises 

PS: I couldnt sent whole program here, so I ve just uploaded most interesting files in here. To see how it works I ve also made a short video.
