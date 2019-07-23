# Bears Discord Bot

I created this bot to help with the organisation of trials within the Elder Scrolls Online.

The database creates the event in a default Elder Scrolls Online raid format:

* 2 tanks
* 2 healers
* 8 damage dealers

To find out all the commands type help in a direct message to the bot and it will send you everything you need to know.

## Getting started

### Create an event

To get started you will need to create an event. An event has 4 parameters that are required for it to work. All parameters are separated by commas, so for text fields such as name, don't use commas.

Use your local time when creating events, the bot converts times to users local time.

* Name of the event
* Date in YYYY-MM-DD format
* Start time in 24 hour HH:MM format
* End time in 24 hour HH:MM format

### Create example

!create Veteran Cloudrest, 2019-01-01, 20:30, 22:30

This will create an event on 1st January 2019 called Cloudrest and will start at 20:30 (UK time) and finish at 22:30.

### Add a description to an event

Adding a description requires two parameters.

* Event ID (this is just the date of the event in DD.MM.YY format)
* The text you want to add.

### Add a description example

!description 01.01.19, Cloudrest + 3 progression run. Bring Magicka DDs.

### Add a channel to an event

So that all messages are posted to a signups channel and to prevent users from signing up all over the place, a created event needs to have a channel associated with it before users can interact with it.

Channels require two parameters.

* Event ID (this is just the date of the event in DD.MM.YY format)
* Channel ID

### Add a channel to an event example

!channel 01.01.19, 123456.

### Editing role signup limits for an event

For some trials, such as Cloudrest, you will need to edit the number of signups per role. Cloudrest requires 3 tanks and 7 damage dealers.

To change the limits on the roles it requires 3 parameters

* Event ID
* Role you wish to change
* New number of this role.

### Changing role signup limits for an event example

!limit 01.01.19, tanks, 3
!limit 01.01.19, dds, 7

## Signing up

### Signing yourself up for a role

To sign yourself up for an event is pretty simple. There are 3 keywords to use and use event ID as the only parameter.

* tank
* healer
* dd

### Signing yourself up for a role example

!tank 01.01.2019

This will sign myself up as a tank. If there aren't any sign up space available the bot will post an error message in chat.

### Admin Only! Signing others up for a role

This the exact same as signing yourself up but requires an extra parameter which is the users ID.

### Admin Only! Signing others up for a role example

!tank 01.01.2019, 123456

This will sign user 123456 up as a tank if there is space available.

## Signing off an event

### Signing yourself off of an event

This uses one parameter which is the event ID.

### Signing yourself up for a role example

!signoff 01.01.2019

This will sign myself off the event and create an empty space for other users to sign up.

### Admin Only! Signing others off an event

This the exact same as signing yourself off an event but requires an extra parameter which is the users ID.

### Admin Only! Signing others up for a role example

!signoff 01.01.2019, 123456

This will sign off user 123456.

### Admin Only! Editing an event field

Sometimes things change and with this command you can make sure that the event information is correct. Please bare in mind as dates and event ID's are linked for simplicity, that changing date WILL NOT change the event ID.

This takes 3 parameters

* Event ID
* Field Name you wish to edit
* New value for the field

### Field names

* name
* description
* date
* startTime
* endTime
* channel

### Admin Only! Editing an event field example

!edit name, Veteran Hel Ra Citadel(formerly Cloudrest)

The name will change from Cloudrest to Veteran Hel Ra Citadel(formerly Cloudrest).

## Other commands

### Admin Only! Purge

This will delete a number of messages from the channel is was used in. The parameter is a number which is between 0 and 100.

### Purge example

!purge 50

### Admin Only! Summon

This will spam a user up to 10 times get their attention. This takes two parameters users ID and number of messages.

### Summon example
!summon 12345, 3

### Dice (random number generator)

This will generate a random number between 0 and the number you enter as a parameter.

### Dice example
!roll 15

### Math calculator

Simple calculator, the symbols are

* \+ for adding
* \- for subtracting
* \* for multiplication
* \/ for division

### Math example
!math 15 + 15

### Trial picker

This picks a random trial and whether its hardmode or a +1/+2 etc. The list of trials is up to date as of Elsweyr patch.

### Trial picker example

!trial

## To do

* Rework code so that embedded message can work in numerous files/folders

* Add a way to toggle whether the event will reoccur or not

* Refactor code

* Deploy project

* Write inital patch notes


## Setting up event cheat sheet

* !create EventName, YYYY-MM-DD, StartTime, EndTime

* !description EventID, DescriptionText

* !channel EventID, ChannelID

* !edit EventID, FieldName, NewValue

If you need to edit role signup limits.
* !limit EventID, Role, LimitNumber
