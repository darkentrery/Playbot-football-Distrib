#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add /home/site/github_key
cd /home/site/Playbot_football && git pull distrib main
cd /home/site/Playbot_football/frontend && npm run build
cd /home/site/Playbot_football && source venv/bin/activate && python manage.py collectstatic --noinput
cd /home/site/Playbot_football && source venv/bin/activate && python manage.py migrate