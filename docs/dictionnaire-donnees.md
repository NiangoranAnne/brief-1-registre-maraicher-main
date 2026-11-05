# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | O03 |
|date | date de l'operation|texte |format reel de la date AAAA-MM-JJ |sans unite |2026-10-21 |
| parcelle |parcelle ou a lieu l'operation  | texte|non vide |sans unite |p1
|culture |espece cultivee  sur la parcelle |texte | non vide|sans unité |tomate |
| operation|ensembles des travaux et interventions technique |texte |présente dans la liste fermée des oprérations |sans unité |repiquage |
coutFCFA|dépenses enregistrèes  | chiffre| un nombre positif ou nul|FCFA |2000 | |                                
**Listes de valeurs autorisées** : * operations: désherbage,semis,arrosage,repiquage,recolte
*coutFCFA: un nombre positif ou nul,en FCFA.
*id: format O suivi de deux chiffres  uniques dans le registre.
*date: format AAAA-MM-JJ

**Sources** : SUJET.md(donnees).
