# Notflix

Deployed live on Heroku: [Notflix](https://notflix-ify.herokuapp.com)

### Live site notes:
- With site inactivity heroku servers shut down, so initial load times may be 30+ seconds. (we're sorry, it isn't our fault we promise)

## Project overview

For the Lighthouse labs midterm project we were given the choice of 10 projects to choose from, and under a week to create an MVP. My partner and I obviously didn't think the 10 options were too inspired, so we decided on a loose spinoff of one of the options - "the decision maker".

Have you ever been stuck scrolling endlessly through movies on Netflix, unable to find that perfect movie for your friday date night, or slumber party with the boys/girls? Well fear no more, NOTFLIX is here for you (please don't sue us Netflix).

With Notflix, you generate a session which will pull randomized movie options from a Netflix API. You then share your session link with your friends and all of you can like, hate or super like the options. Once everyone is finished, you simply move to the results page and a list of the most popular choices will be there for you!

## Features
### Session Creation
- Create a session with at minimum 2 people (not sure why we made you have 2, but we had a good reason at the time)
- Choose how many randomized movies you would like to swipe through
- If you have an idea or two in mind, search through our DB to find known Netflix movies and add them to the list of choices
- Filter your options by Genre (if you leave it blank there is no filter, and every filter selected thereafter is inclusive)
- Simply share the browser URL or the session code link in the top right corner on the sessions page


## Tech Stack
- jQuery, AJAX, Express/Node, Axios, SASS, Postgres, Heroku
