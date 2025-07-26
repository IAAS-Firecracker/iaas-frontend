# IaaS Frontend

Interface utilisateur moderne pour la plateforme IaaS Firecracker, offrant une gestion complète des machines virtuelles, clusters et ressources cloud.

## 🚀 Fonctionnalités

- **Authentification sécurisée** avec JWT
- **Gestion des utilisateurs** avec rôles et permissions
- **Dashboard** avec aperçu des ressources
- **Gestion des VMs**
  - Création, démarrage, arrêt des machines virtuelles
  - Visualisation des ressources consommées
  - Accès SSH direct
- **Gestion des clusters**
  - Création et configuration de clusters
  - Monitoring des performances
- **Catalogue d'images système**
  - Téléchargement et gestion d'images
  - Configuration des offres VM

## 🛠 Prérequis

- Node.js 16+ et npm 8+
- Service-proxy en cours d'exécution (port 8079)
- Accès aux microservices backend

## 🚀 Installation

1. Cloner le dépôt
   ```bash
   git clone [URL_DU_REPO]
   cd iaas-frontend
   ```

2. Installer les dépendances
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement
   ```bash
   cp .env.example .env
   ```
   Puis éditer le fichier `.env` avec vos configurations

## 🔧 Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
REACT_APP_API_URL=http://localhost:8079
REACT_APP_APP_NAME=iaas-frontend
REACT_APP_ENV=development
```

## 🖥 Démarrage en développement

```bash
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🏗 Structure du projet

```
iaas-frontend/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/             # Pages de l'application
│   ├── services/          # Services API
│   │   ├── user-backend.js
│   │   ├── vm-host-backend.js
│   │   └── ...
│   ├── store/             # Configuration Redux
│   ├── styles/            # Fichiers de style globaux
│   └── App.js             # Point d'entrée de l'application
├── .env.example           # Exemple de configuration
└── package.json
```

## 🔌 Services Intégrés

- **User Service** : Gestion des utilisateurs et authentification
- **VM Host Service** : Gestion des machines virtuelles
- **VM Offer Service** : Gestion des offres de VMs
- **Cluster Service** : Gestion des clusters
- **System Images Service** : Gestion des images système

## 🧪 Tests

```bash
# Exécuter les tests unitaires
npm test

# Lancer les tests avec couverture
npm test -- --coverage
```

## 🚀 Déploiement

Pour créer une version de production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `build/`.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou assistance, veuillez contacter l'équipe de développement.