import React, { useState, useEffect } from 'react';
import axios from 'axios';

import jobData from '../datas/jobs.json';

import Stats from '../Components/Stats';


const FeedList = () => {
  const [filteredItems, setFilteredItems] = useState([]);

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

  return (
    <div>
      <Stats totalJobs={filteredItems.length} newJobs={newItems.length} />
      {filteredItems.length > 0 && (
        <div className="mt-8 mb-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-0">Offres d'emploies </h1>
          </div>
          <div className="flex flex-wrap justify-center">
            {filteredItems.map((item) => (
              <div key={item.guid} className="card w-96 m-4 bg-base-200 text-base-content" style={{ padding: '5px' }}>

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
    </div>
  );
};

export default FeedList;
