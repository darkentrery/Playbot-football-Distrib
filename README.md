# Playbot_football

`loaddata playbot/fixtures/user.json playbot/fixtures/city.json playbot/fixtures/cancel_reasons.json
playbot/fixtures/count_circles.json playbot/fixtures/distribution_method.json playbot/fixtures/duration.json
playbot/fixtures/format.json playbot/fixtures/position.json`

`cd Playbot_football && bash update.sh`

`eval "$(ssh-agent -s)"`

`ssh-add ~/github_key`

`cd /home/site/Playbot_football && git pull`

`cd frontend && npm run build`

`cd .. && source venv/bin/activate && python manage.py collectstatic --noinput`

`sudo systemctl daemon-reload`

`sudo systemctl restart gunicorn`

`sudo nano /etc/nginx/sites-available/playbot_football.conf`

`sudo systemctl restart nginx`

`sudo systemctl daemon-reload && sudo systemctl restart gunicorn`

`sudo tail -F /var/log/nginx/error.log`