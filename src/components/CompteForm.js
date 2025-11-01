import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
  // Initialisation de l'état pour stocker les données du formulaire
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Conversion du solde en nombre
    const compteToSend = {
      ...compte,
      solde: parseFloat(compte.solde)
    };

    axios.post(`${API_BASE_URL}/comptes`, compteToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) // Envoie une requête POST avec les données
      .then(response => {
        alert('Compte ajouté avec succès !'); // Confirmation de l'ajout
        // Réinitialiser le formulaire
        setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
        // Recharger la page pour afficher le nouveau compte
        window.location.reload();
      })
      .catch(error => {
        console.error('Erreur complète:', error);
        console.error('Réponse erreur:', error.response);
        const errorMessage = error.response?.data?.message || 
                            error.response?.statusText || 
                            error.message || 
                            'Erreur inconnue';
        alert(`Erreur lors de l'ajout du compte: ${errorMessage}\n\nVérifiez que le backend est démarré sur le port 8083.`);
      }); // Gestion des erreurs
  };

  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">
            <i className="bi bi-plus-circle-fill" style={{marginRight: '10px'}}></i>
            Ajouter un Nouveau Compte
          </h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-currency-euro" style={{marginRight: '5px'}}></i>
                  Solde
                </label>
                <input 
                  type="number" 
                  name="solde" 
                  className="form-control" 
                  value={compte.solde}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-calendar-event" style={{marginRight: '5px'}}></i>
                  Date de Création
                </label>
                <input 
                  type="date" 
                  name="dateCreation" 
                  className="form-control" 
                  value={compte.dateCreation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">
                  <i className="bi bi-tag" style={{marginRight: '5px'}}></i>
                  Type de Compte
                </label>
                <select 
                  name="type" 
                  className="form-select" 
                  value={compte.type}
                  onChange={handleChange}
                  required
                >
                  <option value="COURANT">💰 Compte Courant</option>
                  <option value="EPARGNE">💎 Compte Épargne</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                <i className="bi bi-check-circle" style={{marginRight: '8px'}}></i>
                Ajouter le Compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompteForm;

