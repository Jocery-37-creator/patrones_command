"use client"

import type { Producto } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Trash2, Undo2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CartSidebarProps {
  productos: Producto[]
  total: number
  cantidad: number
  historialLength: number
  onRemove: (producto: Producto) => void
  onUndo: () => void
}

export function CartSidebar({ productos, total, cantidad, historialLength, onRemove, onUndo }: CartSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
          <ShoppingCart className="h-6 w-6" />
          {cantidad > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {cantidad}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="font-mono">Carrito de Compras</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onUndo}
              disabled={historialLength === 0}
              className="gap-2 bg-transparent"
            >
              <Undo2 className="h-4 w-4" />
              Deshacer
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          {productos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="font-mono">Tu carrito está vacío</p>
              <p className="text-sm mt-2">Agrega algunas camisetas</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4 max-h-[calc(100vh-300px)]">
                {productos.map((producto, index) => (
                  <div
                    key={`${producto.id}-${index}`}
                    className="flex items-center gap-4 p-4 bg-card border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-mono font-semibold text-sm">{producto.nombre}</h4>
                      <p className="text-muted-foreground text-xs mt-1">Talla: {producto.talla}</p>
                      <p className="text-primary font-bold mt-2">${producto.precio}</p>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => onRemove(producto)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="font-mono">Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">
                  Proceder al Pago
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {historialLength} {historialLength === 1 ? "operación" : "operaciones"} en el historial
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
