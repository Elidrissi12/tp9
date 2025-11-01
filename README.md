
# 🏦 Application de Gestion des Comptes Bancaires

![tp9](https://github.com/user-attachments/assets/39eaaf5c-3666-434f-adb3-11409c8dd722)


Une application complète de gestion de comptes bancaires avec un backend Spring Boot et un frontend React moderne.

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Technologies Utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [API REST](#api-rest)
- [Structure du Projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Captures d'écran](#captures-décran)

## 🎯 Vue d'ensemble

Cette application permet de gérer des comptes bancaires (Compte Courant et Compte Épargne) avec une interface moderne et intuitive. Elle comprend :

- **Backend** : API REST Spring Boot avec support JSON et XML
- **Frontend** : Interface React moderne avec Bootstrap
- **Base de données** : H2 en mémoire (facilement remplaçable)

## 🛠 Technologies Utilisées

### Backend
- **Spring Boot 3.5.7** - Framework Java
- **Java 23** - Langage de programmation
- **Spring Data JPA** - Accès aux données
- **H2 Database** - Base de données en mémoire
- **Lombok** - Réduction du code boilerplate
- **SpringDoc OpenAPI** - Documentation Swagger
- **JAXB** - Support de la sérialisation XML

### Frontend
- **React 19.2.0** - Bibliothèque JavaScript
- **Bootstrap 5.3.8** - Framework CSS
- **Bootstrap Icons** - Bibliothèque d'icônes
- **Axios 1.13.1** - Client HTTP
- **React Scripts 5.0.1** - Outils de build

## 🏗 Architecture

```
┌─────────────────┐
│   React App     │  (Port 3000)
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/REST
         │ JSON/XML
         ▼
┌─────────────────┐
│  Spring Boot    │  (Port 8083)
│   (Backend)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   H2 Database   │  (En mémoire)
└─────────────────┘
```

## 📦 Prérequis

### Pour le Backend
- **Java 23** ou supérieur
- **Maven 3.6+** (ou utilisez le wrapper Maven inclus : `mvnw`)
- **IDE** (IntelliJ IDEA, Eclipse, VS Code) - optionnel

### Pour le Frontend
- **Node.js 16+** et **npm** (ou **yarn**)
- **Git** (optionnel)

### Installation de Node.js et npm

1. Téléchargez Node.js depuis [nodejs.org](https://nodejs.org/)
2. Installez la version LTS recommandée
3. Vérifiez l'installation :
   ```bash
   node -v
   npm -v
   ```

## 🚀 Installation

### 1. Cloner le projet (ou télécharger les dossiers)

```bash
# Backend
cd spring

# Frontend (dans un autre terminal ou dossier)
cd compte-client
```

### 2. Installation des dépendances

#### Backend
Le backend utilise Maven. Les dépendances seront téléchargées automatiquement lors de la compilation.

#### Frontend
```bash
cd compte-client
npm install
```

## ▶️ Démarrage

### Backend (Spring Boot)

1. Naviguez vers le dossier backend :
   ```bash
   cd spring
   ```

2. Démarrez l'application :
   
   **Windows :**
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   **Linux/Mac :**
   ```bash
   ./mvnw spring-boot:run
   ```

   **Ou avec Maven installé :**
   ```bash
   mvn spring-boot:run
   ```

3. L'API sera accessible sur : **http://localhost:8083**

4. Documentation Swagger : **http://localhost:8083/swagger-ui.html**

5. Console H2 Database : **http://localhost:8083/h2-console**
   - URL JDBC : `jdbc:h2:mem:banque`
   - Username : `sa`
   - Password : (vide)

### Frontend (React)

1. Naviguez vers le dossier frontend :
   ```bash
   cd compte-client
   ```

2. Démarrez l'application :
   ```bash
   npm start
   ```

3. L'application s'ouvrira automatiquement sur : **http://localhost:3000**

4. L'application se rechargera automatiquement lors des modifications de code.

## 📡 API REST

L'API REST est disponible à l'adresse : `http://localhost:8083/banque`

### Endpoints

#### 1. Récupérer tous les comptes
```http
GET /banque/comptes
Content-Type: application/json ou application/xml
```

**Réponse :**
```json
[
  {
    "id": 1,
    "solde": 2500.50,
    "dateCreation": "2025-10-27",
    "type": "COURANT"
  }
]
```

#### 2. Récupérer un compte par ID
```http
GET /banque/comptes/{id}
```

#### 3. Créer un nouveau compte
```http
POST /banque/comptes
Content-Type: application/json

{
  "solde": 1000.00,
  "dateCreation": "2025-10-27",
  "type": "EPARGNE"
}
```

#### 4. Mettre à jour un compte
```http
PUT /banque/comptes/{id}
Content-Type: application/json

{
  "solde": 1500.00,
  "dateCreation": "2025-10-27",
  "type": "COURANT"
}
```

#### 5. Supprimer un compte
```http
DELETE /banque/comptes/{id}
```

### Support des formats
- **JSON** : Format par défaut
- **XML** : Spécifiez `Content-Type: application/xml` et `Accept: application/xml`

## 📁 Structure du Projet

### Backend (`spring/`)
```
spring/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── org/example/spring/
│   │   │       ├── Application.java           # Classe principale
│   │   │       ├── controllers/
│   │   │       │   └── CompteController.java   # Contrôleur REST
│   │   │       ├── entities/
│   │   │       │   ├── Compte.java             # Entité JPA
│   │   │       │   └── TypeCompte.java         # Enum (COURANT, EPARGNE)
│   │   │       └── repositories/
│   │   │           └── CompteRepository.java   # Repository JPA
│   │   └── resources/
│   │       └── application.properties         # Configuration
│   └── test/
├── pom.xml                                     # Dépendances Maven
└── README.md
```

### Frontend (`compte-client/`)
```
compte-client/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── CompteList.js      # Liste des comptes
│   │   └── CompteForm.js      # Formulaire d'ajout
│   ├── config.js              # Configuration API
│   ├── App.js                 # Composant principal
│   ├── App.css                # Styles personnalisés
│   └── index.js
├── package.json
└── README.md
```

## ✨ Fonctionnalités

### Frontend
- ✅ Interface moderne avec design gradient
- ✅ Affichage des comptes en cartes élégantes
- ✅ Formulaire d'ajout de compte avec validation
- ✅ Statistiques en temps réel (Total comptes, Solde total, Répartition)
- ✅ Badges colorés pour les types de comptes
- ✅ Animations et transitions fluides
- ✅ Responsive design (mobile-friendly)
- ✅ Gestion des états de chargement
- ✅ Messages d'erreur détaillés

### Backend
- ✅ API REST complète (CRUD)
- ✅ Support JSON et XML
- ✅ Configuration CORS pour le frontend
- ✅ Base de données H2 en mémoire
- ✅ Documentation Swagger automatique
- ✅ Données d'exemple au démarrage
- ✅ Validation des données

## 🎨 Captures d'écran

L'application propose une interface moderne avec :
- Header avec gradient violet/bleu
- Cartes de statistiques
- Formulaire dans une carte stylisée
- Liste des comptes en cartes individuelles
- Animations au survol

## 🔧 Configuration

### Backend (`application.properties`)
```properties
server.port=8083
spring.datasource.url=jdbc:h2:mem:banque
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

### Frontend (`src/config.js`)
```javascript
const API_BASE_URL = "http://localhost:8083/banque";
```

## 🐛 Résolution de Problèmes

### Erreur CORS
- Vérifiez que le backend a l'annotation `@CrossOrigin` dans le contrôleur
- Assurez-vous que le backend est démarré sur le port 8083

### Backend non accessible
- Vérifiez que le port 8083 n'est pas déjà utilisé
- Consultez les logs du backend pour les erreurs

### Frontend ne se charge pas
- Vérifiez que Node.js est installé : `node -v`
- Réinstallez les dépendances : `npm install`
- Supprimez `node_modules` et `package-lock.json`, puis réexécutez `npm install`

## 📝 Notes

- Les données sont stockées en mémoire (H2), donc elles sont perdues au redémarrage
- Pour une base de données persistante, configurez PostgreSQL ou MySQL dans `application.properties`
- L'application est configurée pour le développement local

## 👨‍💻 Développement

### Ajouter de nouvelles fonctionnalités

1. **Backend** : Ajoutez de nouvelles entités et contrôleurs dans le package `org.example.spring`
2. **Frontend** : Créez de nouveaux composants dans `src/components`

### Build pour la production

**Backend :**
```bash
mvn clean package
java -jar target/spring-0.0.1-SNAPSHOT.jar
```

**Frontend :**
```bash
npm run build
# Les fichiers seront dans le dossier build/
```

## 📄 Licence

Ce projet est à des fins éducatives et de démonstration.

## 👥 Auteur

Projet développé dans le cadre d'un TP - Gestion des Comptes Bancaires

---

**Bon développement ! 🚀**
