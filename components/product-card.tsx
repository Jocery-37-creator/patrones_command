"use client"

import type { Producto } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  producto: Producto
  onAdd: (producto: Producto) => void
}

export function ProductCard({ producto, onAdd }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square relative bg-secondary/20">
          <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-mono font-semibold text-lg text-balance">{producto.nombre}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-muted-foreground text-sm">Talla: {producto.talla}</p>
            <p className="text-xl font-bold text-primary">${producto.precio}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" onClick={() => onAdd(producto)}>
          <ShoppingCart className="h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
