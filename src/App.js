import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import image from './pictures/noImage.jpg';


function App() {
    
  const [result, setResult] = useState([])
  const [value, setValue] = useState('');
  const [lang, setLang] = useState('it')
  
  function handleChange(event) {
      setValue(event.target.value);
  }
  
  function takeLang(event) {
    setLang(event.target.value);
  }

  function getBooks(event) {
    event.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&filter=free-ebooks&langRestrict=${lang}&maxResults=30`)
    .then(result => {
    setResult(result.data.items);
    })
    } 
    
    return (
    <div>
      <div className="search-section">
        <h3>Solo ebook gratis da <i>Google-Books</i></h3>
        <h4>Inserisci cosa vuoi cercare</h4>  
        <form onSubmit={getBooks}>
            <label>
              <input className="input-field"
                type="text"
                value={value}
                onChange={handleChange}
              />
            </label>
            <br/>
            <h4>Scegli una lingua</h4>
            <select 
                className="select-field"           
                lang={lang}
                onChange={takeLang}>

                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="fr">Francaise</option>
                <option value="es">Espanol</option>
     </select>
            <br/>
            <h4 className="message-h4">Clicca il Fantasmino GIGI per avviare la ricerca</h4>
            <br/>
            <button className="button-search" type="submit"></button>
          </form>
      </div>
        
        {result == undefined ? <p className="failed-search">Nessun ebook trovato con questa ricerca</p> : result.map(value => (
          <div className="container" key={value.id}>
            <a href={value.volumeInfo.previewLink} target="_blank">
              <p className="author-title"><strong>Autore:</strong> {value.volumeInfo.authors}</p>
              <img className="books" src={value.volumeInfo.imageLinks !== undefined ? value.volumeInfo.imageLinks.thumbnail : 
                image} alt={value.volumeInfo.title} />
              <p className="author-title"><strong>Titolo:</strong> {value.volumeInfo.title}</p>
            </a>
          </div>
        ))}
      </div>
    );
}

export default App;