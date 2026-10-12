/**
 * Bascula: registra pesades (pes en kg, alçada en m i data)
 * i calcula estadístiques i l'Índex de Massa Corporal (IMC).
 */
export class Bascula {
  #anotacions = [];

  obtenirNombreAnotacions() {
    return this.#anotacions.length;
  }

  anotarPes(pes, alcada = 1, data = new Date()) {
    if (typeof pes !== 'number' || Number.isNaN(pes) || pes <= 0) {
      throw new Error('El pes ha de ser un número positiu');
    }
    if (typeof alcada !== 'number' || Number.isNaN(alcada) || alcada <= 0) {
      throw new Error("L'alçada ha de ser un número positiu");
    }
    this.#anotacions.push({ pes, alcada, data });
  }

  obtenirPesMaxim() {
    if (this.#anotacions.length === 0) return 0;
    return Math.max(...this.#anotacions.map((a) => a.pes));
  }

  obtenirPesMinim() {
    if (this.#anotacions.length === 0) return 0;
    return Math.min(...this.#anotacions.map((a) => a.pes));
  }

  obtenirPesMitja() {
    if (this.#anotacions.length === 0) return 0;
    const suma = this.#anotacions.reduce((acc, a) => acc + a.pes, 0);
    return Math.round((suma / this.#anotacions.length) * 10) / 10;
  }

  calcularIMC() {
    if (this.#anotacions.length === 0) return 0;
    const { pes, alcada } = this.#anotacions.at(-1);
    return Math.round((pes / (alcada * alcada)) * 100) / 100;
  }

  static descriureIMC(imc) {
    if (imc < 16) return 'Infrapès (primesa severa)';
    if (imc < 17) return 'Infrapès (primesa moderada)';
    if (imc < 18.5) return 'Infrapès (primesa acceptable)';
    if (imc < 25) return 'Pes normal';
    if (imc < 30) return 'Sobrepès';
    if (imc < 35) return 'Obesitat (tipus I)';
    if (imc < 40) return 'Obesitat (tipus II)';
    return 'Obesitat (tipus III)';
  }

  obtenirTaulaPesosHTML() {
    const files = this.#anotacions
      .map((a) => `<tr><td>${a.data.toLocaleDateString('ca-ES')}</td>` +
        `<td>${a.pes}</td><td>${a.alcada}</td></tr>`)
      .join('');
    return `<table><tr><th>Data</th><th>Pes</th><th>Alçada</th></tr>${files}</table>`;
  }

  //Funció obtenir tota la evolució d'un pacient

  obtenirEvolucio() {
    if (this.#anotacions.length === 0) return "Bascula recent creada";
    if (this.#anotacions.length === 1) return 0;

    let primerPes = this.#anotacions[0];
    let ultimPes = this.#anotacions[this.#anotacions.length]

    return ultimPes - primerPes;
  }
}
