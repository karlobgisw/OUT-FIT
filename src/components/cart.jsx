
export function Cart ({visible, dataCart, setCart, total, setTotal}){

    const dropItem = (indexToRemove) => {
        const updatedCart = [...dataCart];
        setCart(updatedCart.filter((_, index) => index !== indexToRemove));
        setTotal(prevTotal => prevTotal - (updatedCart[indexToRemove].precio * updatedCart[indexToRemove].cantidad));
    };

    const increseQuantity = (indexToIncrease) =>{
        const updatedCart = [...dataCart];
        if(updatedCart[indexToIncrease].cantidad <= 14){
            updatedCart[indexToIncrease].cantidad++;
            setCart(updatedCart);
            setTotal(prevTotal => prevTotal + updatedCart[indexToIncrease].precio)
        }
    };
    const decreseQuantity = (indexToDecrease) =>{
        const updatedCart = [...dataCart];
        if(updatedCart[indexToDecrease].cantidad > 1){
            updatedCart[indexToDecrease].cantidad--;
            setCart(updatedCart);
            setTotal(prevTotal => prevTotal - updatedCart[indexToDecrease].precio)
        }
    };


    const emptyCart = ()=>{
        setCart([]);
        setTotal(0);
    }

    if (visible){
        return (
            <div className={`w-96 h-72 bg-white absolute top-[11vh] shadow-2xl right-5 flex flex-col ${dataCart.length !== 0 ? ('justify-between') : ('justify-center')} items-center overflow-auto`}>
                {dataCart.length !== 0 ? (
                <>
                <table className="w-full">
                <thead>
                    <tr className="text-center  border border-b-black">
                        <th className="text-center">Imagen</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-center"></th>
                    </tr>
                </thead>
                <tbody className="">
                {dataCart.map( (item,index)=>(
                    <tr key={index} className=" text-center border border-b-gray-300">
                        <td className="flex items-center justify-center"><img className="w-10 h-10" src={item.imagen} alt="" /></td>
                        <td className="">{item.nombre}</td>
                        <td className="">{item.precio}</td>
                        <td className="">
                            <a className="bg-black text-white cursor-pointer p-1 font-bold" onClick={()=>decreseQuantity(index)}>-</a>
                                {item.cantidad}
                            <a className="bg-black text-white cursor-pointer p-1 font-bold" onClick={()=>increseQuantity(index)}>+</a>
                        </td>
                        <td className="">
                            <div className=" cursor-pointer h-8 w-8 rounded-full bg-red-700 text-white items-center justify-center text-center" onClick={()=>dropItem(index)}>
                                x
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
                <div>
                    <h1 className="font-bold text-gray-500">TOTAL: ${total}</h1>
                </div>
                <div className="flex items-center justify-center pb-2 mt-2">
                    <a className="flex items-center justify-center bg-black text-white font-bold p-1 rounded-md cursor-pointer" onClick={()=>emptyCart()}>VACIAR CARRITO</a>
                </div>
                </>
                ) : (
                    <h1 className=" text-2xl text-slate-400">EL CARRITO ESTA VACIO</h1>
                )}
            </div>
        )
    }
}