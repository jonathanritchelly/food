import './produto-vitrine.css';
import bag from '../../assets/bag-black.png'
import { CartContex } from '../../context/cart-context';
import { useContext } from 'react';


function ProdutoVitrine(props) {

    const { AddItemCart } = useContext(CartContex);
   

    function AddItem() {
        const item = {
            id: props.id,
            nome: props.nome,
            preco: props.preco,
            foto: props.foto,
            qtd: 1
        }


        AddItemCart(item);
    }



    return <div className='produto-box text-center'>
        <img src={props.foto} alt="" />
        <div>
            <h2>{props.nome}</h2>
            <p className='prod-vitrine-descricao' >{props.descricao}</p>
            <p className='prod-vitrine-preco' >{new Intl.NumberFormat('pt-BR',
                { style: 'currency', currency: "BRL" }).format(props.preco)}</p>
        </div>

        <div>
            <button className='btn-card btn' onClick={AddItem}>
                <img className='icon' src={bag} alt="bag" />
                Adicionar
            </button>
        </div>
    </div >
}


export default ProdutoVitrine;