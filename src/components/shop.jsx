import { bd } from "../assets/shirtsBD"
import { useState, useEffect } from "react"
import { FaShoppingCart } from "react-icons/fa";
import { Cart } from "./cart";

export function Shop(){

    
    const initialCart = ()=>{
        const LocalStorageCart = localStorage.getItem('cart');
        return LocalStorageCart ? JSON.parse(LocalStorageCart) : []; 
    }

    function initialTotal() {
        if(cart){
            return cart.reduce((acumulador, shirt) => acumulador + (shirt.precio * shirt.cantidad), 0);
        }
        else{
            return 0;
        }
    }

    const [data, setData] = useState(bd);
    const [visibleC, setVisibleC] = useState(false);
    const [cart, setCart] = useState(initialCart);
    const [total, setTotal] = useState(initialTotal);
    
    useEffect( ()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addCart = (shirt) =>{
    
        setVisibleC(true);
        const itemExist = cart.findIndex(guitar => guitar.nombre === shirt.nombre)
        if(itemExist >= 0){
            const updatedCart = [...cart];
            updatedCart[itemExist].cantidad++;
            setCart(updatedCart);
            setTotal(prevTotal => prevTotal + updatedCart[itemExist].precio)
        }
        else{
            shirt.cantidad = 1;
            setCart(prevCart => [...prevCart, shirt]);
            setTotal(prevTotal => prevTotal + shirt.precio);
        }
    }
    
    return(
        <>
        <header className=" h-[10vh] bg-gray-900 flex items-center p-5 justify-between">
            <Cart visible = {visibleC} dataCart={cart} setCart={setCart} total={total} setTotal={setTotal}></Cart>
            <div>
                <h1 className=" text-white font-black text-3xl">OUT-<span className=" text-yellow-500 font-black">FIT</span></h1>
                <p className=" text-sm text-gray-500 font-normal">Las mejores playeras para ponerte en forma</p>
            </div>
            <a onClick={ () => setVisibleC(!visibleC) }><FaShoppingCart size={40} color="white"></FaShoppingCart></a>
        </header>

        <section className="flex flex-col gap-10 items-center justify-center p-10">
            <h1 className=" text-5xl text-yellow-500 font-black text-center">NUESTRA COLECCION</h1>
            <div className="w-full grid grid-cols-[1fr_1fr_1fr] max-xl:grid-cols-[1fr_1fr] max-lg:grid max-md:grid-cols-[1fr]">
            {data.map( (shirt,index) =>(
                <div className=" w-full h-full grid grid-cols-[1fr_1fr]" key={index}>
                    <img className=" w-52 h-52" src={shirt.imagen} alt="" />
                    <div className=" flex flex-col justify-evenly items-start">
                        <div className="flex flex-col items-start gap-1">
                            <h1 className=" text-2xl font-bold">{shirt.nombre}</h1>
                            <p className=" text-lg font-light">{shirt.description}</p>
                            <h2 className=" text-3xl text-yellow-500 font-black">${shirt.precio}</h2>
                        </div>
                        <a className=" p-3 flex items-center justify-center bg-slate-900 text-white font-bold cursor-pointer" onClick={()=>addCart(shirt)}>
                            AGREGAR AL CARRITO
                        </a>
                    </div>
                </div>
            ))}
            </div>
        </section>
        </>
    )
}