// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js²
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/operations.json';

// fonctions d'affichage

function afficherBanniere(/*nombreOperation*/){
console.log(`==================================================`);
console.log(`REGISTRE DES OPÉRATIONS MARAÎCHÈRES`);
console.log(`Exploitation maraîchère pédagogique`);
console.log(`==================================================`);
//console.log(`${nombreOperations} opération(s) chargée(s) depuis   ${FICHIER_DONNEES}.\n` );
}
function afficherMenu(){
console.log(`--------------------- MENU ---------------------`);
console.log(`1. Ajouter une opération`);
console.log(`2. Lister les opérations`);
console.log(`3. Rechercher (identifiant, parcelle, culture)`);
console.log(`4. Trier (coût, date)`);
console.log(`5. Synthèse des dépenses`);
console.log(`0. Quitter`);
} 


  ouvrirSaisie();
afficherBanniere();
afficherMenu();
 
  async function chargerRegistre() {
  let operations = await chargerRegistre();
  try {
    const operations = await chargerJson(FICHIER_DONNEES);
    console.log("Les opérations ont été chargées."); 
    return operations;
  } catch (error) {
    console.log("Erreur : impossible de charger les données.");
    return [];
  }
}

async function sauvegarderRegistre(operations) {
  await enregistrerJson(FICHIER_DONNEES, operations);
  console.log("Les données ont été enregistrées.");
}
let continuer = true;

while (continuer) {
  afficherMenu();

  const choix = await demander("Votre choix : ");

  if (choix === null || choix === "0") {
    console.log("Au revoir !");
    continuer = false;
    continue;
  }

  switch (choix) {

    case "1": {
      const saisie = {
        id: await demander("Identifiant : "),
        date: await demander("Date (AAAA-MM-JJ) : "),
        parcelle: await demander("Parcelle : "),
        culture: await demander("Culture : "),
        operation: await demander(`Opération (${OPERATIONS.join(", ")}) : `),
        coutFCFA: await demander("Coût en FCFA : ")
      };

      const erreurs = ajouterOperation(OPERATIONS, saisie);

      if (erreurs.length > 0) {
        console.log("Erreurs :", erreurs);
      } else {
        console.log("Opération ajoutée avec succès !");
        await sauvegarderRegistre(OPERATIONS);
      }

      break;
    }

    case "2":
      afficherOperations(OPERATIONS);
      break;

    default:
      console.log("Choix invalide. Réessayez.");
  }
 }

 





  fermerSaisie();




main();
