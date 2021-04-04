# vote-app

Le but est de Mise en place d'une solution de vote basée sur une application serverless et une solution de type app engine . On aura besoin de deux fonctions Servless :

1. Affiche la liste des candidats
2. Fait la collecte des votes

Ces applications fourniront des données à une application app engine, qui pourra être couplée à une base de donnée.

# Implementation

Nous commencons par écrire deux lambda fonctions une pour lire les données de la base
de données et une autre pour écrire des données sur la base de données DynamoDB, et puis
on a utilisé des rôles IAM qui vas nous permet de faire une communication entre la base de
donnée et lambda fonction, après on a configuré api Gateway (API REST) pour que nous
puisse accéder à nos fonctions.

![Archi](images/archi.png)

## Création DynamoDB

Donc la première chose que nous voulons faire c’est de passer à dynamodb et de créer une table
des utilisateurs afin que nous puissions mettre ou avoir des données dedans.

il faut juste cliquez sur le bouton créer une table et puis lui donner le nom des  utilisateurs clé de partition qui est juste un identifiant unique pour chaque entrée dans le base de données.

![dynamodb_create](images/2.png)


## Création IAM

La prochaine étape sera de créer un rôle pour donner à notre fonction lambda les autorisations
de travailler avec cette table dynamoDB.

Donc tout d’abord ils vont nous demander quel type de rôle nous voulons créer donc on va
choisir le cas d’utilisation lambda car nous voulons donnée ces rôles a notre fonction lambda.

![IAM](images/iam-1.jpg)

Puis on va ajouter une politique lambda à notre service :

![IAM](images/iam-2.jpg)

Après on donne un nom à notre rôle IAM.

![IAM](images/iam-3.jpg)

Donc ici on voit que notre rôle a était créé avec succès.

![IAM](images/iam-4.jpg)

On a ajouté après une politique supplémentaire, on a ajouté des autorisations pour permettre à
cette fonction lambda d'appeler dynamoDB.

![IAM](images/iam-5.jpg)

Nous avons attribué essentiellement ce rôle à nos fonctions lambda afin qu'elles puissent
accéder à la table dynamoDB.
Donc la prochaine tâche sera d'entrer et de commencer à coder du lambda .

## Création des Fonctions Lambda.

On a commencé par créer des fonctions lambda et attribué le rôle IAM aux fonctions, donc on
donne un nom à notre fonction et puis on choisit le langage souhaiter puis on attribue le rôle
qu’on a écrit.

![Lambda](images/lambda-1.jpg)

Première fonction va nous mettre des éléments sur notre base de données :

![Lambda](images/lambda-2.jpg)

Apres on a eu pour but de faire une fonction qui récupère un élément de DynamoDB

![Lambda](images/lambda-3.jpg)

Donc quand on lance le test sur cette fonction on voit bien qu’il nous récupère les éléments
qu’on a sur la base de données, donc notre fonction lambda fonction bien :

![Lambda](images/lambda-4.jpg)

## Api Gateway

Maintenant on va passer à la création de l’api Gateway, nous utiliserons la passerelle API pour créer une API REST simple pour interagir avec nos fonctions lambda obtenir et définir données utilisateur afin que la passerelle API appelle nos fonctions lambda qui à leur tour obtiendront et définissez les données dans la base de données.

Donc on va commencer par crée l’api Gateway on cliquons sur créer une API :

![api](images/api-1.jpg)


Puis on va choisir API qu’on veut utiliser :

![api](images/api-2.jpg)



Puis on va donner un nom à notre api puis la région avec la quel on travaille sur aws.

![api](images/api-3.jpg)


Là on voit que notre API a était crée avec succès.

![api](images/api-4.jpg)


Après on a créé les ressources et les méthodes pour l’API REST

![api](images/api-5.jpg)


Sur la capture ci-dessous on voit bien que la communication entre l’api et les fonctions Lambda était établie.

![api](images/api-6.jpg)


Après on a déployer notre API.


![api](images/api-7.jpg)


La capture ci-dessous montre que notre API était déployée successivement.

![api](images/api-8.jpg)



Test de API après le déploiement.


![api](images/api-9.jpg)
