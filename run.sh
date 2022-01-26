#!/bin/bash
#source venv/scripts/activate/Scripts/activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000