// Ajouter et lister les opérations.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des opérations culturales acceptées, fournie par le coach agronomie.
export const OPERATIONS = ['semis', 'arrosage', 'désherbage', 'repiquage', 'récolte'];

// Renvoie une ligne de texte qui décrit l'opération.
// Exemple : 'O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA'
export function formaterOperation(operation) {
  return `${operation.id} | ${operation.date} | ${operation.parcelle} | ${operation.culture} | ${operation.operation} | ${operation.coutFCFA} FCFA`
  //throw new Error('TODO : coder formaterOperation dans src/registre.js');
}

// Renvoie un texte avec une opération par ligne (lignes séparées par '\n'),
// ou 'Aucune opération enregistrée.' si la liste est vide.
export function listerOperations(operations){

  if(operations.length===0){
    return "Aucune opération enregistrée.";
  }else{
    return operations.map(formaterOperation).join("\n");
  }
  //throw new Error('TODO : coder listerOperations dans src/registre.js');
}

// Renvoie l'opération qui a cet identifiant, ou undefined si elle n'existe pas.
export function trouverParId(operations, id) {
return operations.find(operation => operation.id===id)
 // throw new Error('TODO : coder trouverParId dans src/registre.js');
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'O11', date: '2026-10-27', parcelle: 'P1', culture: 'tomate', operation: 'récolte', coutFCFA: '2500' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · date réelle au format AAAA-MM-JJ · parcelle et culture
// obligatoires (n'importe quel texte non vide) · operation présente dans OPERATIONS
// · coutFCFA nombre positif ou nul.
export function verifierOperation(saisie, operations) {
  const erreur = [];

  if (saisie.id === "" || saisie.id === undefined) {
    erreur.push("id obligatoire");
  }

  if (operations.some(operation => operation.id === saisie.id)) {
    erreur.push("id existe déjà");
  }

  
  const date = saisie.date;

  if (date === undefined || date.length !== 10 || date[4] !== "-" || date[7] !== "-") {
    erreur.push("date invalide (format AAAA-MM-JJ attendu)");
  } else {
    const annee = Number(date.slice(0, 4));
    const mois = Number(date.slice(5, 7));
    const jour = Number(date.slice(8, 10));

    const d = new Date(annee, mois - 1, jour);

    if (d.getFullYear() !== annee || d.getMonth() !== mois - 1 || d.getDate() !== jour) {
      erreur.push("date inexistante");
    }
  }

  
  if (saisie.parcelle === undefined || saisie.parcelle.trim() === "") {
    erreur.push("parcelle obligatoire");
  }

  
  if (saisie.culture === undefined || saisie.culture.trim() === "") {
    erreur.push("culture obligatoire");
  }

  
  if (!OPERATIONS.includes(saisie.operation)) {
    erreur.push("opération non autorisée");
  }

  const cout = Number(saisie.coutFCFA);

  if (saisie.coutFCFA === undefined || saisie.coutFCFA.trim() === "" || Number.isNaN(cout) || cout < 0) {
    erreur.push("coût invalide (nombre positif ou nul attendu)");
  }

  return erreur;

}

//  throw new Error('TODO : coder verifierOperation dans src/registre.js');


// Fabrique l'opération à enregistrer à partir d'une saisie VALIDE : coutFCFA devient un nombre.
export function creerOperation(saisie) {

   const operation = {
    id: saisie.id,
    date: saisie.date,
    parcelle: saisie.parcelle,
    culture: saisie.culture,
    operation: saisie.operation,
    coutFCFA: Number(saisie.coutFCFA)
  };

  return operation;

 // throw new Error('TODO : coder creerOperation dans src/registre.js');
}

// Ajoute la saisie au registre si elle est valide (verifierOperation, puis creerOperation).
// Renvoie les erreurs : [] si l'opération a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterOperation(operations, saisie) {
  //throw new Error('TODO : coder ajouterOperation dans src/registre.js');
  const erreurs = verifierOperation(saisie, operations);

  if (erreurs.length === 0) {
    operations.push(creerOperation(saisie));
  }

  return erreurs;
}
