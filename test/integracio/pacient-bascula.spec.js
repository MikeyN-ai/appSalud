import { expect } from 'chai';
import sinon from 'sinon';
import { Pacient } from '../../src/pacient.js';
import { Bascula } from '../../src/bascula.js';

describe('Integració Pacient ↔ Bascula', function () {
  afterEach(function () {
    sinon.restore(); // deixa els objectes com estaven
  });

  it('el pacient obté l\'IMC real de la seua bàscula', function () {
    const bascula = new Bascula();
    const pacient = new Pacient('Pau', 'Llorca', '02/07/1995', bascula);
    pacient.obtenirBascula().anotarPes(80, 1.8);
    expect(pacient.calcularIMC()).to.equal(24.69);
    expect(Bascula.descriureIMC(pacient.calcularIMC())).to.equal('Pes normal');
  });

  it('modificarBascula() canvia la font de les dades', function () {
    const pacient = new Pacient('Pau', 'Llorca', '02/07/1995');
    const altra = new Bascula();
    altra.anotarPes(100, 2);
    pacient.modificarBascula(altra);
    expect(pacient.obtenirBascula()).to.equal(altra);
    expect(pacient.calcularIMC()).to.equal(25);
  });

  it('calcularIMC() delega en la bàscula (spy de Sinon)', function () {
    const bascula = new Bascula();
    const espia = sinon.spy(bascula, 'calcularIMC');
    const pacient = new Pacient('Pau', 'Llorca', '02/07/1995', bascula);

    pacient.calcularIMC();

    expect(espia.calledOnce).to.be.true;
  });

  it('funciona amb una bàscula simulada (stub de Sinon)', function () {
    const bascula = new Bascula();
    sinon.stub(bascula, 'calcularIMC').returns(31.2);
    const pacient = new Pacient('Pau', 'Llorca', '02/07/1995', bascula);

    expect(pacient.calcularIMC()).to.equal(31.2);
    expect(Bascula.descriureIMC(pacient.calcularIMC()))
      .to.equal('Obesitat (tipus I)');
  });

  
});
