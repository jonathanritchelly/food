import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import ProdutoVitrine from "../../components/produto-vitrine/produto-vitrine";
//import { produtos } from '../../dados.js'
import api from "../../services/api.js";

function Home() /*Sempre colocar o nome do componente começando com maiusculo*/ {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get("/produtos")
            .then((resp) => {
                setProdutos(resp.data)
            })
            .catch((err) => {
                console.error("Erro ao carregar produtos:", err); // Para visualizar o erro completo no console
                if (err.response) {
                    // O servidor respondeu com um código de status fora da faixa 2xx
                    console.error("Resposta do servidor:", err.response.data);
                    console.error("Status:", err.response.status);
                    console.error("Headers:", err.response.headers);
                } else if (err.request) {
                    // A requisição foi feita, mas nenhuma resposta foi recebida
                    console.error("Nenhuma resposta recebida:", err.request);
                } else {
                    // Alguma outra coisa causou o erro
                    console.error("Erro ao configurar a requisição:", err.message);
                }
                alert('Erro ao carregar produtos ' + err.message);
            })
    }, []);

    return <>
        <Navbar showMenu={true} />

        <div className="container">
            <div className="titulo text-center">
                <h1>Nosso cárdapio</h1>
                <p className="subtitulo">Clique para colocar os produtos na sacola de compras. Se necessário ligue para 11 94791-4560.</p></div>
        </div>

        <div className="text-center">
            {
                produtos.map(function (prod) {
                    return <ProdutoVitrine key={prod.id_produto}
                        id={prod.id_produto}
                        nome={prod.nome}
                        descricao={prod.descricao}
                        preco={prod.preco}
                        foto={prod.foto} />
                })
            }
        </div>


    </>
}

export default Home;