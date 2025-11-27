"use client"

import { ProductCard } from "@/components/product-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/hooks/use-cart"
import { productosDisponibles } from "@/lib/productos-data"
import { Terminal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { productos, total, cantidad, historialLength, agregarProducto, eliminarProducto, deshacer } = useCart()
  const { toast } = useToast()

  const handleAgregarProducto = (producto: (typeof productosDisponibles)[0]) => {
    agregarProducto(producto)
    toast({
      title: "Producto agregado",
      description: `${producto.nombre} se agregó al carrito`,
    })
  }

  const handleEliminarProducto = (producto: (typeof productos)[0]) => {
    eliminarProducto(producto)
    toast({
      title: "Producto eliminado",
      description: `${producto.nombre} se eliminó del carrito`,
      variant: "destructive",
    })
  }

  const handleDeshacer = () => {
    const resultado = deshacer()
    if (resultado) {
      toast({
        title: "Operación deshecha",
        description: "Se deshizo la última operación del carrito",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Terminal className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold font-mono text-balance">404 Not Found</h1>
              <p className="text-sm text-muted-foreground font-mono">{"> Camisetas para Programadores"}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 font-mono">Nuestra Colección</h2>
          <p className="text-muted-foreground">
            Implementación del <span className="font-mono text-primary">Patrón Command</span> en React
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosDisponibles.map((producto) => (
            <ProductCard key={producto.id} producto={producto} onAdd={handleAgregarProducto} />
          ))}
        </div>

        {/* Command Pattern Info */}
        <div className="mt-16 p-6 bg-card border rounded-lg">
          <h3 className="text-xl font-bold mb-4 font-mono flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            Patrón Command Implementado
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-mono text-primary">• Invocador</p>
              <p className="text-muted-foreground pl-4">Gestiona el historial de comandos</p>
              <p className="font-mono text-primary">• CmdAgregarProducto</p>
              <p className="text-muted-foreground pl-4">Comando para agregar productos</p>
              <p className="font-mono text-primary">• CmdEliminarProducto</p>
              <p className="text-muted-foreground pl-4">Comando para eliminar productos</p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-primary">• Carrito</p>
              <p className="text-muted-foreground pl-4">Receptor que maneja productos</p>
              <p className="font-mono text-primary">• Deshacer (Undo)</p>
              <p className="text-muted-foreground pl-4">Revierte la última operación</p>
              <p className="font-mono text-primary">• Historial</p>
              <p className="text-muted-foreground pl-4">Lista de comandos ejecutados</p>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        productos={productos}
        total={total}
        cantidad={cantidad}
        historialLength={historialLength}
        onRemove={handleEliminarProducto}
        onUndo={handleDeshacer}
      />
    </div>
  )
}
