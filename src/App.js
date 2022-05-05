import {useState} from "react"
import api from "./services/api";
import { FiSearch } from "react-icons/fi";
import { ToastContainer , toast } from "react-toastify"
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState("");

 async function handleSearch(){
    if(input === "") {
      // alert("Digite algum CEP");
      toast.warning("Precisa digitar um cep")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      // console.log(response.data)
      setCep(response.data)
      setInput("");
    }catch{
      
      toast.error("Ops,ocorreu um erro !")
      // alert("Ops,ocorreu um erro !")
      setInput("");
    }
  }


  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} maxlength="8" pattern="([0-9]{8})" onChange={(evento)=> setInput(evento.target.value)} />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fafafa" />
        </button>
      </div>

      {/* Object keys para conferir se tem algum cep na variavel cep e mostar a main so quando tiver */}
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP:{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
