import { createContext, useState } from "react";


const CartContex = createContext();

function CartProvider(props) {

    const [cartItens, setCartItens] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [cep, setCep] = useState(""); // Estado para o CEP
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");



    // Função para aplicar a máscara de CEP e buscar o endereço
    const handleCepChange = (event) => {
        let value = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2"); // Aplica a máscara 12345-678
        }

        setCep(value); // Atualiza o estado com o valor formatado
    };

    function AddItemCart(item) {


        let cartItemsNovo = cartItens.map(prod =>
            prod.id === item.id ? { ...prod, qtd: prod.qtd + 1 } : prod
        );

        let findItem = cartItens.some(prod => prod.id === item.id);

        /* //verificia se o item ja existe no carrinho
         for (var prod of cartItens) {
 
             if (prod.id === item.id) {
                 item.qtd = prod.qtd + 1;
                 findItem = true;
                 //insiro o item no array
                 cartItemsNovo.push(item)
             } else {
                 cartItemsNovo.push(prod)
             }
         }
 
         if ((findItem === false) || (cartItens.length === 0)) {
             cartItemsNovo.push(item)
         }
 
         //insere item no carrinho
         //nessa linha estou complementando o array que ja existe com o conteudo dele + o novo item: setCartItens([...cartItens, item]);*/

        if (!findItem) {
            cartItemsNovo = [...cartItemsNovo, item];
        }

        setCartItens(cartItemsNovo);
        CalcTotal(cartItemsNovo);

    }

    function RemoveItemCart(id) {

        let cartItemsNovo = [];

        //verificia se o item ja existe no carrinho
        for (var prod of cartItens) {

            if (prod.id === id) {
                prod.qtd = prod.qtd - 1;

            }

            cartItemsNovo.push(prod)
        }

        //insere item no carrinho
        //nessa linha estou complementando o array que ja existe com o conteudo dele + o novo item: setCartItens([...cartItens, item]);

        cartItemsNovo = cartItemsNovo.filter(function (item) {
            return item.qtd > 0;
        })


        setCartItens(cartItemsNovo);
        CalcTotal(cartItemsNovo);


    }

    function CalcTotal(items) {
        let tot = 0;

        for (var item of items)
            tot = tot + (item.preco * item.qtd);

        setTotalCart(tot);
    }

    function LimparCarrinho() {
        CalcTotal([]);
        setCartItens([]);
    }




    return <CartContex.Provider value={{
        cartItens,
        setCartItens,
        AddItemCart,
        RemoveItemCart,
        totalCart,
        LimparCarrinho,
        cep,
        handleCepChange,
        endereco,
        setEndereco,
        bairro,
        setBairro,
        cidade,
        setCidade,
        estado,
        setEstado

    }}>
        {props.children}
    </CartContex.Provider>
}

export { CartContex, CartProvider };