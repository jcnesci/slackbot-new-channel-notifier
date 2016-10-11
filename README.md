# New Channel Notification Slackbot

Notifies everyone in Slack's __#general__ channel when a new (public) channel is created, so everyone is aware of new projects.

## How To Use

### Prerequisites:

  - Created a Bot (under [Custom Integrations](https://sosolimited.slack.com/apps/manage/custom-integrations) in Slack account) and have its API token.

### To run:

  - `sudo npm install forever -g`
  - `PORT=9111 token=YOUR_BOT_API_TOKEN forever start -l forever.log -o out.log -e err.log -a slack_bot.js`

__*NB:*__

  - chose port 9111 sort of randomly to try to not disrupt other background process on the server. Hope it works ok.

### Log files:

  - By default `forever` places all of the files it needs into `/$HOME/.forever`.

## Error notifications (if bot crashes)

  - __*TBD*__

