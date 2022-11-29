# Playbot_football

`loaddata playbot/fixtures/user.json playbot/fixtures/city.json playbot/fixtures/cancel_reasons.json`

`eval "$(ssh-agent -s)"`

`ssh-add ~/github_key`

`sudo systemctl daemon-reload`

`sudo systemctl restart gunicorn`

`sudo nano /etc/nginx/sites-available/playbot_football.conf`

`sudo systemctl restart nginx`