# **silver-micro**

# 🔠 Description: 
The Spoune est une plateforme en ligne de réservation de restaurants conçue pour connecter les restaurateurs aux clients. Cette application web permet aux utilisateurs de trouver et de réserver des tables dans leurs restaurants préférés, tout en offrant aux chefs et aux propriétaires de restaurants un moyen efficace de gérer leurs réservations et de contrôler leur présence en ligne.
Les utilisateurs peuvent accéder à une variété de restaurants, explorer les menus, réserver des tables et modifier ou annuler leurs réservations existantes. Les chefs et les propriétaires de restaurants peuvent ajouter et gérer leur établissement, mettre à jour les menus et les informations de l'établissement, et surveiller les réservations via une interface de gestion de restaurateur intuitive.



# 🏗️ Instructions d'Installation

Ce projet utilise Express.js pour le framework back et Sequelize comme ORM pour interagir avec la base de données relationnelle. Suivez les étapes ci-dessous pour installer les dépendances nécessaires et configurer l'application.

## Prérequis

Assurez-vous d'avoir Node.js et npm (ou yarn) installés sur votre machine. Vous pouvez les installer en suivant les instructions sur le site officiel de Node.js : [https://nodejs.org/](https://nodejs.org/)

### Installation

Pour installer Express :

- exécutez la commande :
  ```
  npm install sequelize
  ```

Pour installer Sequelize :

- exécutez la commande :
  ```
  npm install sequelize
  ```

## Étapes d'Installation

1. **Cloner le Repository**

   ```
   git clone <URL_DU_REPOSITORY>
   ```

2. **Installation des Dépendances**

   Accédez au répertoire du projet (front ou back) et installez les dépendances en exécutant la commande suivante :

   ```
   cd <NOM_DU_REPERTOIRE>
   npm install
   ```

   Cette commande installera toutes les dépendances répertoriées dans le fichier `package.json`.

3. **Configuration de la Base de Données**

   Assurez-vous d'avoir une base de données MySQL configurée sur votre machine ou sur un serveur distant. Vous devrez également créer une base de données vide pour votre application.

   Modifiez le fichier de configuration de la base de données (`config/database.js`) pour spécifier les informations de connexion à votre base de données.
   Copiez le fichier 'dataEnv.js.example' en tant que 'dataEnv.js' et remplissez ce fichier comme indiqué dans l'exemple pour permettre la connection a votre base de donnée.

4. **Création des Tables dans la base de données**

   Une fois que votre 'dataEnv.js' est remplie, rendez-vous avec votre terminal dans le back à l'aide de cette commande (si vous êtes à la racine du projet):

   ```
   cd back
   ```

   Puis l'ORM va créer les tables en lançant votre back (si les configurations sont bonnes) à l'aide de cette commande :

   ```
   npm run dev
   ```

5. **Lancement de l'Application**

   Une fois que toutes les dépendances sont installées et la configuration est terminée, vous pouvez démarrer l'application en exécutant la commande suivante dans le dossier front (ainsi que le back si ce n'est pas déjà fait) :

   ```
   npm run dev
   ```

**Dans le back**
Cela démarrera le serveur Express sur le port indiqué dans le fichier `config.js` (port 3000 de base).
