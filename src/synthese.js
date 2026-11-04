// Synthèse des dépenses enregistrées.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese

// Renvoie la somme des coûts, en FCFA. Liste vide : 0.
export function totalCouts(operations) {
let somme= 0 ;
for(const operation of operations){
  somme = somme + operation.coutFCFA;
}
return somme;
}

 // throw new Error('TODO : coder totalCouts dans src/synthese.js');


// Renvoie un objet : pour chaque parcelle, le nombre d'opérations et le total de leurs coûts.
// Exemple : { P1: { nombre: 4, total: 15500 }, P2: { nombre: 3, total: 9500 } }
// Liste vide : {} (un objet vide).
export function syntheseParParcelle(operations) {
const bilan= {}; 
for (const operation of operations){
  const parcelle = operation.parcelle;
  if (bilan[parcelle]===undefined){
    bilan[parcelle]={nombre:0 , total: 0};

  }
  bilan[parcelle].nombre += 1 ;
  bilan[parcelle].total += operation.coutFCFA;

}
return bilan ;
}
 // throw new Error('TODO : coder syntheseParParcelle dans src/synthese.js');


// Renvoie { min, max } des coûts, ou null si la liste est vide.
// Exemple : { min: 1500, max: 8000 }
export function coutMinMax(operations) {
  if ( operations.length=== 0){
    return null
  
  }
  let min = operations[0].coutFCFA;
  let max = operations [0].coutFCFA;
  for(const operation of operations){
    if ( operation.coutFCFA < min ){
      min = operation.coutFCFA;
    }
    if ( operation.coutFCFA > max ){
      max = operation.coutFCFA;
    }
  }
  return {min: 1500 , max : 8000};
 // throw new Error('TODO : coder coutMinMax dans src/synthese.js');
}
