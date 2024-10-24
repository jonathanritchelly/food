import { useEffect, useState, useContext } from "react";
import { Dock } from "react-dock";
import ProdutoCart from "../produto-cart/produto-cart";
import './cart.css'
import { useNavigate } from "react-router-dom";
import { CartContex } from "../../context/cart-context";
import back from '../../assets/back.png'
import bag from '../../assets/bag-black.png'


function Cart() {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { cartItens, totalCart, LimparCarrinho } = useContext(CartContex);


    useEffect(function () {
        window.addEventListener('openSideBar', function () { setShow(true) })
        //setCartItens(carrinho);
    }, []);

    function checkout() {
        navigate('/checkout')
    }

    return <Dock position="right"
        isVisible={show}
        fluid={false} //indiica se o tamanho do dock é fixo ou se ajusta de acordo com a tela
        size={360} //nesse caso estou passando um valor fixo em pixels, se fosse em porcentagem seria por ex: 0.5 (aqui ocuparia 50% da tela)
        onVisibleChange={function (visible) {
            setShow(visible)
        }}>

        {
            cartItens.length === 0 ?
                <div className="cart-empty">
                    <img alt="" className="cart-btn-close" onClick={(e) => { setShow(false) }} src={back} />
                    <div className="text-center"><img src={bag} alt="" /> <p>Carrinho vazio</p></div>
                </div>
                :
                <>
                    <div className="text-center">
                        <h2>Meu pedido</h2>
                        <div className="cart-btn-limpar"><button onClick={LimparCarrinho} className="btn btn-red">Limpar carrinho</button></div>
                    </div>

                    <div className="lista-produtos">
                        {cartItens.map(function (car) {
                            return <ProdutoCart
                                key={car.id}
                                id={car.id}
                                nome={car.nome}
                                preco={car.preco}
                                foto={car.foto}
                                qtd={car.qtd}
                            />
                        })
                        }
                    </div>

                    <div className="footer-cart">
                        <div className="footer-cart-valor">
                            <span>total</span>
                            <span><strong>{new Intl.NumberFormat('pt-BR',
                                { style: 'currency', currency: "BRL" }).format(totalCart)}</strong></span>
                        </div>

                        <div>
                            <button onClick={checkout} className="btn-checkout">Finalizar pedido</button>
                        </div>
                    </div>
                </>

        }
    </Dock >
}

export default Cart;