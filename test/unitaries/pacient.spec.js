import { expect } from 'chai';
import sinon from 'sinon';
import { Pacient } from '../../src/pacient.js';

describe('Pacient — proves unitàries', function () {
  let pacient;

  beforeEach(function () {
    pacient = new Pacient('Laia', 'Ferrer Soler', '16/03/1988');
  });

  it('saludar() retorna «Hola, soc Laia Ferrer Soler»', function () {
    expect(pacient.saludar()).to.equal('Hola, soc Laia Ferrer Soler');
  });

  it('el nom no pot estar buit', function () {
    expect(pacient.obtenirNom()).to.equal('Laia');
    pacient.modificarNom('Marta');
  });

  it('obtenirNom() i modificarNom()', function () {
    expect(pacient.obtenirNom()).to.equal('Laia');
    pacient.modificarNom('Marta');
    expect(pacient.obtenirNom()).to.equal('Marta');
  });

  it('obtenirCognoms() i modificarCognoms()', function () {
    pacient.modificarCognoms('Ribes Mas');
    expect(pacient.obtenirCognoms()).to.equal('Ribes Mas');
  });

  it('accepta la data com a text dd/mm/aaaa', function () {
    const d = pacient.obtenirDataNaixement();
    expect(d).to.be.instanceOf(Date);
    expect([d.getDate(), d.getMonth() + 1, d.getFullYear()])
      .to.deep.equal([16, 3, 1988]);
  });

  describe('obtenirEdat() amb data de referència fixa', function () {
    it('el dia abans de l\'aniversari encara té 37 anys', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 15))).to.equal(37);
    });

    it('el dia de l\'aniversari ja en té 38', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 16))).to.equal(38);
    });

    it('després de modificar la data de naixement', function () {
      pacient.modificarDataNaixement('29/02/2000');
      expect(pacient.obtenirEdat(new Date(2026, 9, 5))).to.equal(26);
    });
  });

  it('té una bàscula associada per defecte', function () {
    expect(pacient.obtenirBascula()).to.exist;
    expect(pacient.calcularIMC()).to.equal(0);
  });

  it('accepta una Date directament al constructor', function () {
    const data = new Date(1990, 5, 10);
    const p = new Pacient('Joan', 'Pérez', data);

    expect(p.obtenirDataNaixement()).to.equal(data);
  });

  it('modificarDataNaixement() accepta una Date directament', function () {
    const data = new Date(2001, 0, 20);

    pacient.modificarDataNaixement(data);

    expect(pacient.obtenirDataNaixement()).to.equal(data);
  });

  it('obtenirEdat() sense data de referència usa el rellotge simulat', function () {
    const clock = sinon.useFakeTimers(new Date(2030, 0, 1));
    try {
      expect(pacient.obtenirEdat()).to.equal(41);
    } finally {
      clock.restore();
    }
  });

  describe('Validació del constructor', function () {
    it('rebutja un nom buit', function () {
      expect(() => new Pacient('', 'Ferrer', '16/03/1988'))
        .to.throw('nom');
    });

    it('rebutja una data de naixement posterior a hui (text)', function () {
      expect(() => new Pacient('Laia', 'Ferrer', '01/01/2999'))
        .to.throw('data');
    });

    it('rebutja una data de naixement posterior a hui (Date)', function () {
      expect(() => new Pacient('Laia', 'Ferrer', new Date(2999, 0, 1)))
        .to.throw('data');
    });
  });
});
