from bs4 import BeautifulSoup
import requests
import json

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
        job_dict['title'] = job.find('h2', class_=lambda value: value and value.startswith("sc-5013426e-5")).text
        job_dict['location'] = job.find('p', class_=lambda value: value and value.startswith("sc-5013426e-6")).text
        job_dict['date_posted'] = job.find('p', class_=lambda value: value and value.startswith("sc-5013426e-12")).text
        job_dict['url'] = base_url + job.find('a')['href']
        job_dict['from'] = 'AW'
        job_dict['desc'] = 'No description'
        job_list.append(job_dict)

# Write to a json file
with open('jobs.json', 'w', encoding='utf8') as f:
    json.dump(job_list, f, ensure_ascii=False, indent=4)
