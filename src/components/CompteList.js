import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
  // Déclaration d'un état pour stocker les comptes
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilisation de useEffect pour effectuer un appel à l'API dès le chargement
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/comptes`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        setComptes(response.data);
        setLoading(false);
      }) // Mise à jour de l'état avec les données récupérées
      .catch(error => {
        console.error('Erreur lors de la récupération des comptes:', error);
        console.error('Détails:', error.response?.data || error.message);
        setLoading(false);
        // Afficher un message si le backend n'est pas accessible
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          console.warn('Le backend semble ne pas être démarré ou accessible sur http://localhost:8083');
        }
      }); // Gestion des erreurs
  }, []); // Le tableau vide indique que l'effet s'exécute uniquement au montage du composant

  // Calculer les statistiques
  const totalSolde = comptes.reduce((sum, compte) => sum + compte.solde, 0);
  const compteCourant = comptes.filter(c => c.type === 'COURANT').length;
  const compteEpargne = comptes.filter(c => c.type === 'EPARGNE').length;

  const getTypeBadge = (type) => {
    if (type === 'COURANT') {
      return <span className="badge badge-custom bg-primary">💳 Compte Courant</span>;
    } else {
      return <span className="badge badge-custom bg-success">💎 Compte Épargne</span>;
    }
  };

  return (
    <div className="fade-in">
      {/* Section Statistiques */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="stats-card">
            <div className="stats-label">Total des Comptes</div>
            <div className="stats-number">{comptes.length}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-card">
            <div className="stats-label">Solde Total</div>
            <div className="stats-number">{totalSolde.toFixed(2)} €</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-card">
            <div className="stats-label">Répartition</div>
            <div className="mt-2">
              <span className="badge bg-primary me-2">Courant: {compteCourant}</span>
              <span className="badge bg-success">Épargne: {compteEpargne}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des Comptes */}
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">
            <i className="bi bi-list-ul" style={{marginRight: '10px'}}></i>
            Liste des Comptes ({comptes.length})
          </h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-3 text-muted">Chargement des comptes...</p>
            </div>
          ) : comptes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏦</div>
              <h4>Aucun compte trouvé</h4>
              <p className="text-muted">Commencez par ajouter un nouveau compte ci-dessus.</p>
            </div>
          ) : (
            <div className="row">
              {comptes.map(compte => (
                <div key={compte.id} className="col-md-6 col-lg-4 mb-3">
                  <div className={`card account-card ${compte.type.toLowerCase()}`}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="card-title mb-1">
                            <i className="bi bi-wallet2" style={{marginRight: '8px'}}></i>
                            Compte #{compte.id}
                          </h5>
                        </div>
                        {getTypeBadge(compte.type)}
                      </div>
                      <div className="mb-3">
                        <div className="text-muted small mb-1">Solde</div>
                        <h3 className="mb-0" style={{color: compte.solde >= 0 ? '#28a745' : '#dc3545'}}>
                          {compte.solde.toFixed(2)} €
                        </h3>
                      </div>
                      <div>
                        <div className="text-muted small mb-1">
                          <i className="bi bi-calendar" style={{marginRight: '5px'}}></i>
                          Date de Création
                        </div>
                        <div className="fw-semibold">
                          {new Date(compte.dateCreation).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompteList;

