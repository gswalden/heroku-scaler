#Heroku Scaler
`HEROKU_TOKEN=token-here APP_NAME=name-here npm start on` to scale up your free dyno.
`HEROKU_TOKEN=token-here APP_NAME=name-here npm start off` to scale down your free dyno.

To run from Heroku Scheduler, first `npm install --save heroku-scaler` and deploy to Heroku. Then, in Scheduler, schedule the command `HEROKU_TOKEN=token-here APP_NAME=name-here npm start on` (or `off`). Alternatively, set the environment variables beforehand, and just use `npm start on` or `npm start off`.
