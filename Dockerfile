# Utiliser une version stable de Node.js
FROM node:14-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier les fichiers source de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer "serve" globalement pour servir l'application
RUN npm install -g serve

# Exposer le port sur lequel l'application sera disponible
EXPOSE 80

# Démarrer l'application avec "serve"
CMD ["serve", "-s", "build", "-l", "80"]