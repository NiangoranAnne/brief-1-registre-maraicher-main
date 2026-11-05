# Registre des opérations maraîchères

> Projet individuel du SAS DFS, brief 1 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

La responsable d'une exploitation maraichère pédagogique note ses operations( semis, arrosage , desherbage...) dans un carnet , elle veut les saisir dans un terminal afin de  retrouver  une intervention et totaliser les depenses par  parcelle. Etant Agritech junior je quis amené à lui concevoir un registre JavaScript avec node.js.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
cd brief-1-registre-maraicher
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

 *Cochez seulement ce qui marche : `- [x]`.*

- [ X] Données lues et enregistrées dans `donnees/operations.json`
- [X ] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [X ] Lister les opérations, message si le registre est vide
- [ X] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [ X] Trier par coût ou par date
- [ X] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [ ] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [ ] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données

donnees-test.json, 10 OPERATIONS du 2026-10-20 au 2026-10-2026, chacune des operations contient six champs(id,date,parcelle,culture,operation et coutFCFA).Les dates et les données sont fictives. (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), les unités. Rappelez qu'elles sont fictives.*

## Limites
le registre ne note que les depenses(coût),il ne calcule pas les benefices et le rendemant en hectar.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur
Niangoran Okpo Anne Juliette : compte github : NiangoranAnne
