import React, { useContext, useState } from 'react'
import { CartContext } from '../../CartContext'
import { Navigate, useNavigate } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

const FormCheckout = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [calle, setCalle] = useState('');
    const [pais, setPais] = useState('');
    const [email, setEmail] = useState('');
    const [confirmarEmail, setConfirmarEmail] = useState('');
    const navigate = useNavigate();

    const datosForm = { nombre, apellido, email };
    const datosEnvio = { ciudad, calle, codigoPostal, pais }
    const { db, productosCarrito, vaciarCarritoDeCompras } = useContext(CartContext);
    const totalCompra = (productos) => {
        let total = 0;
        productos.forEach((producto) => {
            total += producto.precio * producto.cantidad;
        });
        return total;
    };

    const mensajeCompra = (id) => {
        setTimeout(()=>{
            Swal.fire({
                title: "Compra realizada con éxito!",
                text: `El id de tu compra es: ${id}, guárdalo ya que será útil para verificar el envío.`,
                icon: "success",
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> Genial`
            });
        }, 1000)
    }

    const generarOrdenDeCompra = async (orden) => {
        try {
            const ordenRef = collection(db, "ordenes");
            const res = await addDoc(ordenRef, {
                ...orden,
                fecha: Timestamp.now(),
            });
            mensajeCompra(res.id)
            vaciarCarritoDeCompras(); 
        } catch (err) {
            console.error(err);
        }
    };

    const prepararOrdenDeCompra = () => ({
        comprador: {...datosForm},
        datosEnvio: {...datosEnvio},
        productos: [...productosCarrito],
        fecha: Timestamp.now(),
        total: totalCompra(productosCarrito),
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if(email===confirmarEmail){
            if (productosCarrito.length === 0) {
                Swal.fire({
                    title: "No hay productos en el carrito.",
                    text: "Mira el catálogo de productos para agregar un producto al carrito",
                    icon: "error"
                });
                return;
            }

            const ordenDeCompra = prepararOrdenDeCompra();
            generarOrdenDeCompra(ordenDeCompra).then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                setNombre('');
                setApellido('');
                setEmail('');
                setConfirmarEmail('');
                setPais('');
                setCiudad('');
                setCalle('');
                setCodigoPostal('');
                vaciarCarritoDeCompras();
            }).catch(error => {
                console.error("Error al generar la orden de compra:", error);
            });
        } else {
            Swal.fire({
                title: "Error en los correos.",
                text: "Los correos deben coincidir, intenta nuevamente",
                icon: "error"
            });
        }
    };

    return (
        <div className="leading-loose px-4 m-auto py-28 h-full">
            <form className="max-w-xl rounded-xl m-auto p-10 bg-white/20 shadow-xl" onSubmit={handleSubmit}>
                <p className="text-white sm:text-2xl pb-3 font-medium text-lg">Información personal:</p>
                <div className="">
                    <label className="block pb-2 text-sm text-white" htmlFor="cus_name">Nombre</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_name" 
                        name="nombre" 
                        type="text" 
                        required={true} 
                        placeholder="Nombre" 
                        aria-label="Name"
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label className="block pb-2 text-sm text-white" htmlFor="cus_apellido">Apellido</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_apellido" 
                        name="apellido" 
                        type="text" 
                        required={true} 
                        placeholder="Apellido" 
                        aria-label="Last Name"
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label className="block pb-2 text-sm text-white" htmlFor="cus_email">Email</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_email" 
                        name="email" 
                        type="text" 
                        required={true} 
                        placeholder="Email" 
                        aria-label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label className="block pb-2 text-sm text-white" htmlFor="cus_email">Repetir email</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_email" 
                        name="confirmarEmail" 
                        type="text" 
                        required={true} 
                        placeholder="Email" 
                        aria-label="Email"
                        onChange={(e) => setConfirmarEmail(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label className="block pb-2 text-sm text-white" htmlFor="cus_email">Dirección</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_email" 
                        name="calle" 
                        type="text" 
                        required={true} 
                        placeholder="Calle" 
                        aria-label="street"
                        onChange={(e) => setCalle(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label className="text-sm pb-2 block text-white" htmlFor="cus_email">Ciudad</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_email" 
                        name="ciudad" 
                        type="text" 
                        required={true} 
                        placeholder="Ciudad" 
                        aria-label="City"
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>
                <div className="sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                    <label className="block text-sm pb-2 text-white" htmlFor="cus_email">País</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_email" 
                        name="pais" 
                        type="text" 
                        required={true} 
                        placeholder="País" 
                        aria-label="Country"
                        onChange={(e) => setPais(e.target.value)}
                    />
                </div>
                <div className="sm:inline-block mt-2 -mx-1 pl-1 sm:w-1/2">
                    <label className="block pb-2 text-sm text-white" htmlFor="cus_email">Código Postal</label>
                    <input 
                        className="input w-full focus:outline-none focus:ring focus:ring-pink-400 bg-gray-700/55 rounded-xl py-2 pl-3 focus:border-pink-500" 
                        id="cus_email" 
                        name="codigoPostal" 
                        type="text" 
                        required={true} 
                        placeholder="Código Postal" 
                        aria-label="Zip"
                        onChange={(e) => setCodigoPostal(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <button className="sm:px-12 px-4  rounded-xl py-1 text-white bg-pink-500/55 hover:bg-pink-500 font-light tracking-wider" type="submit">Realizar compra</button>
                </div>
            </form>
        </div>
    )
};

export default FormCheckout

