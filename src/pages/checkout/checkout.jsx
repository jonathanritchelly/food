import './checkout.css'
import { useContext, useEffect, useState } from "react";
import '../../style/global.css'
import Navbar from "../../components/navbar/navbar";
import { CartContex } from "../../context/cart-context";
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';



function Checkout() /*Sempre colocar o nome do componente começando com maiusculo*/ {


    const navigate = useNavigate();

    const { totalCart, cartItens, setCartItens,
        LimparCarrinho, cep, handleCepChange, endereco, setEndereco, bairro,
        setBairro, cidade, setCidade, estado, setEstado } = useContext(CartContex);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [fone, setFone] = useState("");

    const [liberar, setLiberar] = useState(false);

    //const [cep, setCep] = useState("");
    //const [endereco, setEndereco] = useState("");
    //const [bairro, setBairro] = useState("");
    //const [cidade, setCidade] = useState("");
    //const [estado, setEstado] = useState("");


    useEffect(() => {
        if (localStorage.getItem("sessionUser")) {
            let dadosSalvos = JSON.parse(localStorage.getItem("sessionUser"))

            //console.log(dadosSalvos)
            setNome(dadosSalvos.nome);
        }
    }, [])


    useEffect(() => {

        if (nome && email && fone && cartItens.length > 0) 
            setLiberar(true)
        else
            setLiberar(false)

    }, [nome, email, fone, cartItens])



    function FinalizarPedido() {
        let produtos = []
        let novoItem = []
        cartItens.map(prod => {
            novoItem = {
                id_produto: prod.id,
                qtd: prod.qtd,
                vl_unitario: prod.preco,
                vl_total: prod.preco * prod.qtd
            }

            return produtos = [...produtos, novoItem]
        });


        const params = {
            id_usuario: 1,
            nome,
            email,
            fone,
            endereco,
            bairro,
            cidade,
            estado,
            cep,
            total: totalCart,
            itens: produtos
        }

        localStorage.setItem("sessionUser", JSON.stringify(params)); //salva as informações no navegador

        api.post("/pedidos", params)
            .then((resp) => {
                setCartItens([]);
                LimparCarrinho();
                navigate('/historico');
            })
            .catch((err) => {
                console.error("Erro ao inserir pedido:", err); // Para visualizar o erro completo no console
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
                alert('Erro ao inserir pedido ' + err.message);
            })
    };


    return <>
        <Navbar />
        <div className="container titulo-finaliza-pedido">
            <div className="titulo text-center">
                <h1>Finalizar pedido</h1>
            </div>
        </div>

        <div className="col-3">
            <div className="box-checkout">
                <h3>Dados pessoais</h3>

                <div className='input-group'>
                    <p>Nome completo</p>
                    <input type="text" id="nome" value={nome} onChange={(e) => { setNome(e.target.value) }} />
                </div>

                <div className='input-group'>
                    <p>E-mail</p>
                    <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className='input-group'>
                    <p>Telefone de contato</p>
                    <input type="text" id="telefone" onChange={(e) => { setFone(e.target.value) }} />
                </div>
            </div>
        </div>

        <div className="col-3">
            <div className="box-checkout">
                <h3>Endereço de entrega</h3>

                <div className='input-group'>
                    <p>CEP</p>
                    <input type="text" id="cep" maxLength="9" value={cep} onChange={handleCepChange} />
                </div>

                <div className='input-group'>
                    <p>Endereço</p>
                    <input type="text" id="endereco" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />
                </div>

                <div className='input-group'>
                    <p>Bairro</p>
                    <input type="text" id="bairro" onChange={(e) => { setBairro(e.target.value) }} />
                </div>

                <div className='input-group'>
                    <p>Cidade</p>
                    <input type="text" id="cidade" onChange={(e) => { setCidade(e.target.value) }} />
                </div>

                <div className='input-group'>
                    <p>UF</p>
                    <select id="uf" onChange={(e) => { setEstado(e.target.value) }}>
                        <option value="SP">São Paulo</option>
                        <option value="SP">Rio de Janeiro</option>
                        <option value="SP">Brasília</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="col-3">
            <div className="box-checkout">
                <h3>Valores</h3>

                <div className='checkout-valores'>
                    <span>Total</span>
                    <span><strong>{new Intl.NumberFormat('pt-BR',
                        { style: 'currency', currency: "BRL" }).format(totalCart)}</strong></span>
                </div>

                <div className='checkout_button'>
                    {
                        liberar
                            ?
                            <button onClick={() => { FinalizarPedido() }} className='btn-checkout'>Finalizar pedido</button>
                            :
                            <button disabled onClick={() => { FinalizarPedido() }} className='btn-checkout'>Finalizar pedido</button>}
                </div>

            </div>
        </div>


    </>
}
export default Checkout;