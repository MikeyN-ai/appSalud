import { Bascula } from './bascula.js';

/** Converteix 'dd/mm/aaaa' en un objecte Date. */
function parsejarData(text) {
  const [dia, mes, any] = text.split('/').map(Number);
  return new Date(any, mes - 1, dia);
}

/**
 * Pacient: dades bàsiques d'una persona i la seua
 * bàscula associada, on es registren les pesades.
 */
export class Pacient {
  constructor(nom, cognoms, dataNaixement, bascula = new Bascula()) {

    if (typeof nom !== 'string' || nom.trim() === '') {
      throw new Error('El nom no pot estar buit');
    }

    const data = dataNaixement instanceof Date
      ? dataNaixement
      : parsejarData(dataNaixement);

    if (data > new Date()) {
      throw new Error('La data de naixement no pot ser posterior a hui');
    }
    
    this.nom = nom;
    this.cognoms = cognoms;
    this.dataNaixement = data;
    this.bascula = bascula;
  }

  saludar() {
    return `Hola, soc ${this.nom} ${this.cognoms}`;
  }

  obtenirNom() { return this.nom; }
  modificarNom(nom) { this.nom = nom; }

  obtenirCognoms() { return this.cognoms; }
  modificarCognoms(cognoms) { this.cognoms = cognoms; }

  obtenirDataNaixement() { return this.dataNaixement; }
  modificarDataNaixement(data) {
    this.dataNaixement = data instanceof Date ? data : parsejarData(data);
  }

  /** Edat en anys complets. La data de referència és opcional
   *  (per defecte, hui) i permet que les proves siguen deterministes. */
  obtenirEdat(dataReferencia = new Date()) {
    const n = this.dataNaixement;
    let edat = dataReferencia.getFullYear() - n.getFullYear();
    const encaraNoHaFetAnys =
      dataReferencia.getMonth() < n.getMonth() ||
      (dataReferencia.getMonth() === n.getMonth() &&
        dataReferencia.getDate() < n.getDate());
    if (encaraNoHaFetAnys) edat--;
    return edat;
  }

  obtenirBascula() { return this.bascula; }
  modificarBascula(bascula) { this.bascula = bascula; }

  /** Delega el càlcul en la bàscula associada. */
  calcularIMC() {
    return this.bascula.calcularIMC();
  }
}
