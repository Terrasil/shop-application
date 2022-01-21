# shop-application
Przykładowa aplikacja przeznaczona do konteneryzacji w ramach przedmiotu "Aplikacje w architekturze Klient-Serwer"

## Django
#### Komendy incjalizujące
source venv/scripts/activate/Scripts/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
winpty python manage.py createsuperuser
python manage.py runserver ${PORT}

## React
#### Komendy incjalizujące
npm install
npm run start

#### W razie problemów
npm cache clean --force
rm -rf node_modules package-lock.json
