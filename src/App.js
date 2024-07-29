import { useEffect, useState } from 'react';
import './App.css';
import Menu from './layout/Menu';
import TacheList from './components/taches/TacheList';

function App() {

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [somme, setSomme] = useState(0);

  const [nombreInitial, setNombreInitial] = useState(0);
  const [carre, setCarre] = useState(0);

  const [forme, setForme] = useState('input-border');

  const handleInput = (e) => {
    if (e.target.name === 'a') {
      setA(parseInt(e.target.value));
      console.log(a, "valeur de a");
    } else {
      setB(parseInt(e.target.value));
    }
  }

  useEffect(() => {
    let total = a + b;
    setSomme(total);
  }, [a, b])

  useEffect(() => {
    let carre = nombreInitial * nombreInitial;
    setCarre(carre);
  }, [nombreInitial])

  return (
    <div className='container'>
      <Menu />
      <main>
        <TacheList />
        <section>
          <h1>Calculatrice</h1>
          <form>
            <div className='row'>
              <div className='col'>
                <input className='form-control' type="number" name="a" value={a} onChange={handleInput} />
              </div>
              <div className='col'>
                <input className='form-control' type="number" name="b" value={b} onChange={handleInput} />
              </div>
            </div>
            <p>La somme de {a} et {b} est {somme}</p>
          </form>
        </section>
        <section>
          <h1>Calcul du carré</h1>
          <form>
            <input className='form-control' type="number" name="nombreInitial" value={nombreInitial} onChange={(e) => setNombreInitial(parseInt(e.target.value))} />
            <p>Le carré de {nombreInitial} est {carre}</p>
          </form>
        </section>
        <section>
          <h1>Changement de forme</h1>
          <form>
            <input type="text" className={forme} value={forme} onChange={(e) => setForme(e.target.value)} />
          </form>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
