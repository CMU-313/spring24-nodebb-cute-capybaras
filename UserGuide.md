Sort buttons:

Our feature for sort buttons are on pages of user categories.

In order to test our feature, first run ./nodebb build to build the project. Then, run ./nodebb start.

To begin, create an account and sign into the nodebb platform. Then, create some posts and bookmark / upvote / downvote some of them. After that, go to your profile page at http://127.0.0.1:4567/user/your_username.

Click on the blue button with three white dots in the center, and select the category of posts / topics that you want to look at in the dropdown. After selecting the category of posts, there should be a sort button where you can select which criteria you want the posts / topics to be sorted based on. Sorting by votes should sort the posts in according to the number of votes received, with the most votes being on the top. Sorting by first post should have the most recent post on top, and the least recent on the bottom, and vice versa for sorting by last post.

Anonymous posting:

Our feature for anonymous posting can be tested on any post.

Follow the same steps above to create some posts inside a topic.

Then, to test toggle anonymity, after clicking on toggle anonymity, the username of the post should now be hidden and become a place holder name instead. However, we were not able to connect the frontend to the backend so the feature is not yet functional, we will go into further details why we weren't able to complete this feature in the milestones.
