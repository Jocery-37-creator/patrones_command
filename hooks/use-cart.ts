"use client"

import { useState, useCallback } from "react"
import { Carrito, Invocador, CmdAgregarProducto, CmdEliminarProducto, type Producto } from "@/lib/types"

export function useCart() {
  const [carrito] = useState(() => new Carrito())
  const [invocador] = useState(() => new Invocador())
  const [, setUpdateTrigger] = useState(0)

  const forceUpdate = useCallback(() => {
    setUpdateTrigger((prev) => prev + 1)
  }, [])

  const agregarProducto = useCallback(
    (producto: Producto) => {
      const comando = new CmdAgregarProducto(carrito, producto)
      invocador.ejecutarComando(comando)
      forceUpdate()
    },
    [carrito, invocador, forceUpdate],
  )

  const eliminarProducto = useCallback(
    (producto: Producto) => {
      const comando = new CmdEliminarProducto(carrito, producto)
      invocador.ejecutarComando(comando)
      forceUpdate()
    },
    [carrito, invocador, forceUpdate],
  )

  const deshacer = useCallback(() => {
    const result = invocador.deshacerUltimoComando()
    if (result) {
      forceUpdate()
    }
    return result
  }, [invocador, forceUpdate])

  return {
    productos: carrito.obtenerProductos(),
    total: carrito.obtenerTotal(),
    cantidad: carrito.obtenerCantidad(),
    historialLength: invocador.obtenerHistorialLength(),
    agregarProducto,
    eliminarProducto,
    deshacer,
  }
}
