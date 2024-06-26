import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../CartContext';

const CartWidget = () => {
    const { contador } = useContext(CartContext);
    const location = useLocation();

    return (
        <Link to="/carrito" className={`item-center flex font-semibold px-4 rounded-lg transition duration-300 glob false tracking-widest md:text-[16px] hover:text-main/90 gap-3 items-center py-2 text-white ${location.pathname === '/carrito' ? 'bg-pink-500/85 shadow-black/30 font-bold drop-shadow-md backdrop-blur-[4rem] shadow-lg' : 'bg-pink-500/55 hover:bg-pink-500/75 hover:shadow-black/30 hover:shadow-lg hover:shadow-sm hover:backdrop-blur-[.2rem]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            <span className='cartCount'>{contador}</span>
        </Link>
    );
};

export default CartWidget;