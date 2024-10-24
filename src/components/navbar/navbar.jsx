import './navbar.css';
import logo from '../../assets/logo.png'
import bag from '../../assets/bag.png'
import Cart from '../cart/cart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContex } from '../../context/cart-context';

function Navbar(props) {

    function openSideBar() {
        const event = new CustomEvent('openSideBar');
        window.dispatchEvent(event);
    }

    const { cartItens } = useContext(CartContex);

    return <div className='navbar'>
        <Link to="/">
            <img src={logo} alt='Logotipo' className='logotipo'></img>
        </Link>



        {/* Jeito 1 de fazer, usando ? (then) e : (else) */}
        {/*
            props.showMenu ?
                <div className='menu'>
                    <a href='#'>Sacola</a>
                    <button onClick={openSideBar} className='btn btn-red' >
                        <img src={bag} className='icon' />
                        Sacola
                    </button>

                </div>


                : null

        */}

        {/* Jeito 2 de fazer, usando && (then) sem else */}
        {
            props.showMenu &&
            <div className='menu'>
                <Link to="/historico" >Histórico</Link>
                <button onClick={openSideBar} className='btn btn-red' >
                    <img src={bag} className='icon' alt='' />
                    Sacola ({cartItens.reduce((total, item) => total + item.qtd, 0)})
                </button>

            </div>



        }


        <Cart />
    </div>
}

export default Navbar;