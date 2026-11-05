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
console.log(` REGISTRE DES OPÉRATIONS MARAÎCHÈRES `);
console.log(` Exploitation maraîchère pédagogique `);
console.log(`==================================================`);
//console.log(`${nombreOperations} opération(s) chargée(s) depuis   ${FICHIER_DONNEES}.\n` );
}
function afficherMenu(){
console.log(`\n = --------------------- MENU ---------------------`);
console.log(`1. Ajouter une opération`);
console.log(`2. Lister les opérations`);
console.log(`3. Rechercher (identifiant, parcelle, culture)`);
console.log(`4. Trier (coût, date)`);
console.log(`5. Synthèse des dépenses`);
console.log(`0. Quitter`);
} 
async function actionAjouter(operations){
console.log("--- Ajouter une opération ---");
const id = await demander('Identifiant (ex. O11) :');
if (id=== null) return;

const date = await demander('Date ( AAAA-MM-JJ) :');
if ( date === null) return;

const parcelle = await demander ('Parcelle (ex. P1) : ') ; 
if ( parcelle === null) return;

const culture = await demander ('Parcelle (ex . tomate) : ');
if ( culture === null) return ;

const operation = await demander (`Operation  (${OPERATIONS.join(',')}) :`);
if (operation === null) return;

const cout = await demander ('Coût en FCFA :');
if ( cout ===null) return;


const saisie = {
  id: id.toUpperCase(),
  date:date,
  parcelle: parcelle.toUpperCase(),
  culture:culture.toLowerCase(),
  operation: operation.toLowerCase(),
  coutFCFA: cout
};

const erreurs = ajouterOperation ( operations, saisie);

if (erreurs.length === 0){
  await enregistrerJson(FICHIER_DONNEES, operations);
  console.log (`Operation ${saisie.id} ajoutée.Le registre compte ${operations.length} opération(s).`);
}else {
  console.log (`Opération refusée :`);
  for (const erreur of erreurs){
    console.log(`  - ${erreur}`); 
  }
  console.log (`Le registre compte toujours ${ opérations.length} operation(s).`);

}

}


async function actionRechercher(operations){
 console.log('\n--- Rechercher ---');
 console.log('1. Par identifiant');
 console.log('2. Par parcelle');
 console.log('3. Les opérations d\`une culture'); 
 

 const souschoix = await demander('Votre choix :');
 if ( souschoix === null) return;

 if ( souschoix === '1'){
  const saisie = await demander ('Identifiant : ');
  if ( saisie === null) return;
  const id = saisie.toUpperCase();

  const operation = trouverParId ( operations, id);
  if (operation === undefined) {
    console.log(`Opération ${id} introuvable.`);
  }else{
    console.log(formaterOperation(operation));
  }
 }else if (souschoix  === '2'){
  const saisie = await demander (`Parcelle:`);
  if ( saisie === null) return ;
  const parcelle = saisie.toUpperCase();


  const resultat = filtrerParParcelle(operations, parcelle);
  console.log(`${resultat.length} operation(s) sur la parcelle ${parcelle} :`);
  console.log(listerOperations(resultat));
 }else if (souschoix === '3'){
  const saisie = await demander ('culture : ');
  if (saisie === null) return ;
  const culture = saisie.toLowerCase();
  
const resultat = filtrerParCulture (operations , culture);
console.log(`${resultat.length} operation(s) pour la culture ${culture} :`);
console.log(listerOperations(resultat)); 
 }else{
  console.log('Choix inconnu : retour au menu.');
 }

 
}



async function actionTrier (operations){
  console.log('\n--- Trier ---');
  console.log('1. Par coût croissant');
  console.log('2. Par date, de la plus ancienne à la plus récente');

  const sousChoix = await demander ('Votre choix :');
  if ( sousChoix === null) return;

  if ( sousChoix === '1'){
    console.log(listerOperations(trierParCout (operations)));

  }else if ( sousChoix === '2'){
    console.log(listerOperations(trierParCout(operations)));
  }else if (sousChoix === '2'){
    console.log(listerOperations(trierParDate(operations)));
  }else {
    console.log('Choix inconnu : retour au menu.');
  }
}

function actionSynthese( operations){
  console.log('\n--- Synthèse des dépenses enregistrées ---');
  console.log(`Nombre d'opérations : ${operations.length}`);
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);

  console.log('Par parcelle :');
  const bilan = syntheseParParcelle(operations);
  for ( const [parcelle, resume] of Object.entries(bilan)){
    console.log(`${parcelle} : ${resume.nombre} operation(s) , ${resume.total} FCFA`);
  }
  const extremes = coutMinMax(operations);
  if(extremes === null){
    console.log('Coût minimum et maximum : aucune donnée');
  }else{
    console.log(`Coût minimum : ${extremes.min} FCFA. Coût maximun : ${extremes.max} FCFA`);
    
  }
  console.log(`Rappel: ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.`)
}

async function main(){
  ouvrirSaisie();
  afficherBanniere();
  

  let operations = [];
  try {
     operations = await chargerJson(FICHIER_DONNEES);
    console.log("Les opérations ont été chargées."); 
    
  } catch (error) {
    console.log("Erreur : impossible de charger les données.");
    
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

  try{
    if ( choix=== '1'){
      await actionAjouter(OPERATIONS);
    }else if ( choix === '2'){
      console.log(`\n--- Liste des opérations (${OPERATIONS.length}) ---`);
      console.log ( listerOperations (OPERATIONS));
    }else if (choix === '3'){
    await actionRechercher(OPERATIONS);
    }else if ( choix === '4'){
      await actionTrier(OPERATIONS);
    }else if (choix === '5'){
      await actionSynthese(OPERATIONS);
    
    } else {
      console.log (`choix inconnu : << ${choix} >> . Tapez un chiffre du menu.`);
    }
  } catch ( erreur){
      if (erreur.message.startsWith('TODO')) {
        console.log( `À compléter : ${erreur.message}`);
      }else{
        console.log(`Erreur inattendue : ${ erreur.message}`);
     }
    }


 }
  fermerSaisie();
}


main();
