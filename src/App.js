import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1 className="text-center">
            <i className="bi bi-bank" style={{marginRight: '15px'}}></i>
            Gestion des Comptes Bancaires
          </h1>
          <p className="text-center text-white-50 mb-0 mt-2">
            Application de gestion des comptes courants et d'épargne
          </p>
        </div>
      </header>
      <div className="container">
        <CompteForm />
        <CompteList />
      </div>
    </div>
  );
}

export default App;
