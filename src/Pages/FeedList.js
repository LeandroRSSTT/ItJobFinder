import React, { useState, useEffect } from 'react';
import axios from 'axios';

import jobData from '../datas/jobs.json';

import Stats from '../Components/Stats';
import Pagination from '../Components/Pagination';


const FeedList = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(6);

  // Calculate the number of jobs per page responsively
  useEffect(() => {
    const setResponsivelyJobsPerPage = () => {
      const width = window.innerWidth;

      if (width < 640) { // Tailwind's sm
        setJobsPerPage(2);
      } else if (width < 768) { // Tailwind's md
        setJobsPerPage(4);
      } else if (width < 1024) { // Tailwind's lg
        setJobsPerPage(6);
      } else { // Tailwind's xl
        setJobsPerPage(6);
      }
    };

    setResponsivelyJobsPerPage();
    window.addEventListener('resize', setResponsivelyJobsPerPage);

    return () => window.removeEventListener('resize', setResponsivelyJobsPerPage);
  }, []);

  useEffect(() => {
    const fetchFeed = async () => {
      const url =
        'https://api.allorigins.win/raw?url=' +
        encodeURIComponent(
          'https://www.ge.ch/rss/offres-emploi-etat-geneve?departement=&domaine_activite=83&classe_fonction_min=&type_contrat=&taux_activite_max='
        );

      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/rss+xml' },
      });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');
      const parsedItems = [];

      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].innerHTML;
        const link = items[i].getElementsByTagName('link')[0].innerHTML;
        const description = items[i].getElementsByTagName('description')[0].innerHTML;
        const pubDate = items[i].getElementsByTagName('pubDate')[0].innerHTML;
        const from = "Etat de Genève";
        const duration = "Non précisé";
        const sector = "Non précisé";
        const location = "Genève";

        const cleanedDescription = removeTags(description);

        parsedItems.push({
          title,
          duration,
          sector,
          location,
          pubDate,
          link,
          from,
          description: cleanedDescription,
        });
      }


      // Ajoute les données du fichier JSON aux articles parsés
      const allItems = [...parsedItems, ...jobData];

      setFilteredItems(allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)));
    };

    fetchFeed();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleString('fr-FR', options);
  };

  const isNewItem = (pubDate) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(pubDate) > oneWeekAgo;
  };

  function removeTags(text) {
    const htmlTagRegex = /&lt;\/?.*?&gt;/g;
    const cleanedText = text.replace(htmlTagRegex, '');
    return cleanedText;
  }

  let newItems = [];
  let oldItems = [];

  filteredItems.forEach(item => {
    if (isNewItem(item.pubDate)) {
      newItems.push(item);
    } else {
      oldItems.push(item);
    }
  });

  // Cette fonction est utilisée pour changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cette partie découpe la liste d'offres en pages appropriées
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredItems.slice(indexOfFirstJob, indexOfLastJob);

  // Calcule le nombre total de pages
  const totalPages = Math.ceil(filteredItems.length / jobsPerPage);


  return (
    <div>
      <Stats totalJobs={filteredItems.length} newJobs={newItems.length} />
      {currentJobs.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap justify-center">
            {currentJobs.map((item) => (
              <div key={item.guid} className="card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-4 bg-base-200 text-base-content" style={{ padding: '5px' }}>
                <div className="card-body" style={{ marginTop: '-10px' }}>
                  <h1 className="card-title text-2xl mb-2">
                    {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
                  </h1>
                  <hr className="mb-2" />
                  <p className="mb-2">
                    <strong>Date : </strong> {formatDate(item.pubDate)}
                  </p>
                  <p className="mt-2 text-md">
                    <strong>Description: </strong>
                    {item.description.length > 55
                      ? item.description.substring(0, 55) + "..."
                      : item.description}
                  </p>
                  <p className="mt-2 text-md">
                    <strong>Source: </strong>
                    {item.from}
                  </p>
                  <p className="mt-2 text-md">
                    <strong>Lieu: </strong>
                    {item.location}
                  </p>
                  <p className="mt-2 text-md">
                    <strong>Durée: </strong>
                    {item.duration}
                  </p>
                  <p className="mt-2 text-md">
                    <strong>Secteur: </strong>
                    {item.sector}
                  </p>
                </div>
                <div className="card-actions" style={{ marginTop: '-15px' }}>
                  <a href={item.link} target="_blank" rel="noreferrer" className="btn btn-primary ml-8 mb-4">
                    Voir l'offre
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  );
};

export default FeedList;
