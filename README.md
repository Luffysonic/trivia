# Trivia

Trivia est un type de jeu de société trivial.

Le but de celui-ci est d'avoir des joueurs qui répondent à des questions de cultures (Pop, Science, Sport et Rock). Le jeu enregistre les tours et le courant de partie avec les pièces.

A chaque question bien répondue, le joueur peut obtenir une pièce dans sa bourse en plus.

Le joueur peut sortir de la penalty box en répondant juste à une question.

A chaque mauvaise réponse, le joueur est envoyé dans la penalty box.

## Installation

1. Clonez le projet sur votre ordinateur.
2. Assurez-vous que Node.js est installé sur votre ordinateur.
3. Ouvrez une console dans le répertoire du projet.
4. Exécutez la commande :

```sh
npm install
```

pour installer les dépendances.

## Stack

-  ![javasccript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
-  ![jest](https://img.shields.io/badge/Jest-24.9.0-yellowgreen?style=for-the-badge&logo=jest)
-  ![nodejs](https://img.shields.io/badge/Node.js-v14.17.5-green?style=for-the-badge&logo=node.js)

## Utilisation

1. Ouvrez une console dans le répertoire du projet.
2. Exécutez la commande :

```sh
npm run dev
```

pour lancer l'application.

## To do List

1. Appliquer Principes Solides
2. Refacto le code et supprimer les codes Smells
3. Avoir des JDD pertinents

## Clean Code

1. Nettoyage des conditions avec l'utilisation de regroupement.
2. Création de la classe `Player` pour réduire les responsabilités de `Game` et pour pouvoir tester les instances de joueur individuellement.
3. Création de la classe `Players` pour réduire les responsabilités de `Game` et pour pouvoir tester les instances de `Players` individuellement.
4. Création de la classe `Questions` pour réduire les responsabilités de `Game`.
5. Refactorisation de `Player` avec l'ajout d'une interface et des changements dans `Player` pour avoir une classe plus globale.
6. Ajout des interfaces `IQuestion` et `IPlayers` pour que l'implémentation de `Game` ne dépende pas des classes `Questions` et `Player`.
7. Ajout de la classe `Game` et des tests pour que la classe `Game` ne fasse qu'une chose "gérer la partie".
8. Éclatement de la fonction `roll` car elle a trop de responsabilités en déterminant si le joueur sort de la penalty box, en mettant à jour la position du joueur et en lançant le dé.
9. Ajout de `wasCorrectlyAnswered` et `wrongAnswer` en fonction des refactorisations précédentes.
10.   Application du principe DRY pour `correctlyAnswer`.
11.   Refactorisation en séparant les classes dans différents fichiers pour pouvoir mieux se repérer.
12.   Refactorisation de `Question` pour séparer les questions des catégories pour pouvoir en ajouter de nouvelles si besoin.
13.   Refactorisation de `Game` pour que l'exécution de la partie se fasse dans un autre fichier appelé `GameExecution`.

## Tests

Le projet utilise Jest pour les tests. Pour exécuter les tests, ouvrez une console dans le répertoire du projet et exécutez la commande :

```sh
npm test
```

Les tests seront exécutés et vous obtiendrez un rapport sur la réussite ou l'échec des tests.

## Contribuer

<div align=center>

<img src="https://github.com/Luffysonic.png" width="100" style="border-radius: 50%">
<img src="https://github.com/Gabou33140.png" width="100" style="border-radius: 50%">

</div>
