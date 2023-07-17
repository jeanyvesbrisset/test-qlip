Hello Pamela,

Here is my test, both projects are startable via npm start.
Spoiler: Unfortunately, I didn't manage to finish within a reasonable time.

Unfortunately, I couldn't crack the syntax of ffmpeg. I wanted to do the whole process in a single complexFilter, but it didn't work as I intended.

If I had succeeded in that, the rest would have been a piece of cake.

During the ffmpeg process, I wanted to create a system that updates a "status" column in the "Video" entity, which would indicate at which stage of the process we are.

Then, when the status is updated to "done", I wanted to implement a notification system via websockets/mail, etc. If the status changes to an error, the same thing would happen.

This should be done asynchronously, using SQS and AWS Lambda, for example.

In any case, it's a very interesting project, and I'm available to discuss the theoretical architecture of such a project in a production context, my code in general, etc., and to have the syntax of ffmpeg in order to achieve the desired operation.
