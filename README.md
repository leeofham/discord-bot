To do:

Some sort repeated event,
  check current time in milliseconds compared to time of event + 2 hours in milliseconds
  if greater current time is greater, delete all messages from channel
  (maybe delete old event from database)
  do axios request check if its a repeated event
  if it is make new event for week later using moments


Some sort of loop for tanks, healers and dds in embedded messages


Sort something out so that you can use embedded message in numerous files/folders


Get event info posted to certain channels,
  store channel id on database with event and then use that info to post to that channel
-----
if channel is deleted will cause some issues,
  add function so that you can manually update the channel info


Reminder messages
