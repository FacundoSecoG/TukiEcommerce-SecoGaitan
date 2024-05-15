import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react"

const CardProducto = ({producto}) => {
    return (
        <Card className="w-96 ">
            <CardHeader shadow={false} floated={false} className="h-96">
                <img
                src={producto.imagen}
                alt="card-image"
                className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
            <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
                {producto.producto}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
                ${producto.precio}
            </Typography>
            </div>
            <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
            >
                {producto.descripcion}
            </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                        ripple={false}
                        fullWidth={true}
                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                    Agregar al Carrito
                </Button>
        </CardFooter>
    </Card>
)}

export default CardProducto