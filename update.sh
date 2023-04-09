#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add /home/site/github_key
cd /home/site/Playbot_football && git pull
cd /home/site/Playbot_football/frontend && npm run build
cd /home/site/Playbot_football && source venv/bin/activate && python manage.py collectstatic --noinput