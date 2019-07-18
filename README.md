To do:

Some sort repeated event,
  check current time in milliseconds compared to time of event + 2 hours in milliseconds
  if greater current time is greater, delete all messages from channel
  (maybe delete old event from database)
  do axios request check if its a repeated event
  if it is make new event for week later using moments

Reminder messages



Refactoring:

Sort something out so that you can use embedded message in numerous files/folders




INSTRUCTIONS

Create an event with !create EVENTNAME, DATE YYYY-MM-DD, START TIME HH:MM, END TIME HH:MM
Add a description with !description EVENTID, DESCRIPTION TEXT
Add the channel linked to the event, !channel EVENTID, CHANNELID
Edit roles numbers with !limit EVENTID, ROLE, NUM OF ROLE

To Sign up !ROLENAME EVENTID
Sign up others by !ROLENAME EVENTID, USERID
