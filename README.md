# slack-birthday
A small nodejs project to send notifications in slack when it's someone's birthday

# How to configure it
## 1. Configure Slack integrations
1. Go to https://yourteamname.slack.com/apps
2. Clic "manage" on top right
3. Clic "custom integrations" in the menu

### Slash command
Select **Slash Commands** and add a new one.

* Command: /birthdays (or customize to your liking)
* URL: your server address, for example http://myserver.com
* Method: POST
* Token: save that as we will need it later
* The other parameters are for customization, choose to your liking. I recommand checking "Show this command in the autocomplete list".

### Incoming hook
Go back to custom integrations and select **Incoming WebHooks**. Add a new one.

* Select a channel (all messages will be posted there)
* Save the **Webhook URL** as we will need it later
* Setup an icon and a name for the integration

## 2. Run the script on a server
You need a server that is accessible from slack server's. It requires nodejs, latest stable version (4.x at the moment) should be fine.

Pull the repo on your server and copy the file **./config/slack.example.json** to **./config/slack.json**
Edit the file and replace **slash_token** and **incoming_webhook_url** with proper values (from previous steps).

You may run the script manually

    node index.js

Or install PM2 globally, it's a great process manager for node

    npm install pm2 -g

Then launch the script for the first time

    npm start

Restart the script

    npm restart

## 3. How to use
In slack, type /birthdays help and follow the instructions.

I hope you will enjoy it !

