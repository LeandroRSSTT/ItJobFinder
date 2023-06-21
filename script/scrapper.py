from bs4 import BeautifulSoup
import requests
import json
import re
import os
from datetime import datetime, timedelta
import dateparser

base_url = 'https://www.academicwork.ch'
search_url = '/offres-emploi?i={}&b=437e4063-6732-45ff-bcc2-c54422a87f45&l=ChIJ6-LQkwZljEcRObwLezWVtqA'

job_list = []

for i in range(10): 
    url = base_url + search_url.format(i)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    jobs = soup.find_all('div', class_=lambda value: value and value.startswith("sc-2b6a7254-5"))

    for job in jobs:
        job_dict = {}
        
        title = job.find('h2', class_=lambda value: value and value.startswith("sc-5013426e-5")).text
        title_parts = title.split(" - ")
        
        job_dict['name'] = title_parts[0].strip()
        
        if len(title_parts) > 1:
            if len(title_parts) == 2:
                # Seulement le nom et le secteur
                job_dict['duration'] = None
                job_dict['sector'] = title_parts[1].strip()
            else:
                # Nom, durée et secteur
                job_dict['duration'] = title_parts[1].strip()
                job_dict['sector'] = title_parts[2].strip()
        else:
            # Seulement le nom
            job_dict['duration'] = None
            job_dict['sector'] = None
        

        job_dict['location'] = job.find('p', class_=lambda value: value and value.startswith("sc-5013426e-6")).text
        
        date_text = job.find('p', class_=lambda value: value and value.startswith("sc-5013426e-12")).text
    
        # Convertir le texte de la date en une date réelle
        days_ago = re.search(r'il y a (\d+) jour', date_text)
        if days_ago:
            days = int(days_ago.group(1))
            real_date = datetime.now() - timedelta(days=days)
            job_dict['date_posted'] = int(real_date.timestamp())
        else:
            months_ago = re.search(r'il y a environ (\d+) mois', date_text)
            if months_ago:
                months = int(months_ago.group(1))
                real_date = datetime.now() - timedelta(days=months * 30)
                job_dict['date_posted'] = int(real_date.timestamp())
            else:
                try:
                    real_date = datetime.strptime(date_text, "%d %B %Y")
                    job_dict['date_posted'] = int(real_date.timestamp())
                except ValueError:
                    job_dict['date_posted'] = None






        
        job_dict['url'] = base_url + job.find('a')['href']
        job_dict['from'] = 'AW'
        job_dict['desc'] = 'No description'
        job_list.append(job_dict)


# Chemin du dossier 'datas' par rapport au dossier 'script'
datas_folder = os.path.join(os.path.dirname(__file__), '..', 'datas')

# Créer le dossier 'datas' s'il n'existe pas
if not os.path.exists(datas_folder):
    os.makedirs(datas_folder)

# Chemin du fichier de sortie
output_file = os.path.join(datas_folder, 'jobs.json')

# Écrire dans le fichier jobs.json
with open(output_file, 'w', encoding='utf8') as f:
    json.dump(job_list, f, ensure_ascii=False, indent=4)
