//import express from 'express' 
const express = require('express')
//const http = require('http') //es como hacer  import http from 'http' 
const cors = require('cors')

//instalamos nodemon, express
const app = express()
const logger = require('./loggerMiddleware')  

app.use(cors())
app.use(express.json())

app.use(logger)

let productos = [
    {
        'id' : 1,
        'codigo' : 111111,
        'descripcion' : 'Triple miga jaon y queso',
        'vidaUtil' : 14,
        'marca' : 'La Escalada',
        'rubro' : 'Panificacion',
        'subRubro' : 'Al vacio',
        'embalaje' : 12,
    },
    {
        'id' : 2,
        'codigo' : 111112,
        'descripcion' : 'Triple miga salame y queso',
        'vidaUtil' : 14,
        'marca' : 'La Escalada',
        'rubro' : 'Panificacion',
        'subRubro' : 'Al vacio',
        'embalaje' : 12,
    },
    {
        'id' : 3,
        'codigo' : 11121,
        'descripcion' : 'Pizza 8 porciones mozzarela',
        'vidaUtil' : 30,
        'marca' : 'La Escalada',
        'rubro' : 'Precocido',
        'subRubro' : 'Congelado',
        'embalaje' : 2,
    },
]


app.get('/', (request, response) => {
    response.send('Holaaa')
})

app.get('/api/productos', (request, response) => {
    response.json(productos)
})

app.get('/api/productos/:id', (request, response) => {
    const id = Number(request.params.id)
    const prod = productos.find( prod => prod.id === id)  
    if (prod) {
        response.json(prod)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/productos/:id', (request, response) => {
    const id = Number(request.params.id)
    productos = productos.filter( prod => prod.id !== id)
    response.status(204).end()
})

app.post('/api/productos', (request, response) => {
    const prod = request.body
    if (!prod || !prod.codigo || !prod.descripcion || !prod.vidaUtil || !prod.marca || !prod.rubro || !prod.subRubro || !prod.embalaje) {
        return response.status(400).json({
            error: 'Falta el producto o algun dato del mismo'
        })
    }
    const ids = productos.map(prod => prod.id)
    const maxId = Math.max(...ids)
    const newProd = {
        'id': maxId+1,
        'codigo' : prod.codigo,
        'descripcion': prod.descripcion,
        'vidaUtil': prod.vidaUtil,
        'marca': prod.marca,
        'rubro' : prod.rubro,
        'subRubro' : prod.subRubro,
        'embalaje' : prod.subRubro,
    }
    productos = [...productos, newProd]
    response.status(201).json(newProd)
})

app.use((request, response) => {
    response.status(404).json({
        error: 'si llego hasta aca, no entro en ningun path'
    }) 
})

const PORT = process.env.PORT || 3001 //no podemos elegir el puerto en produccion asi que se pone asi, si hay variable usala, sino el que elegimos
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
