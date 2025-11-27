// Producto: Representa una camiseta en la tienda
export interface Producto {
  id: number
  nombre: string
  precio: number
  imagen?: string
  talla?: string
}

// Carrito: Gestiona la lista de productos
export class Carrito {
  private productos: Producto[] = []

  agregarProducto(producto: Producto): void {
    this.productos.push(producto)
  }

  eliminarProducto(producto: Producto): void {
    const index = this.productos.findIndex((p) => p.id === producto.id)
    if (index !== -1) {
      this.productos.splice(index, 1)
    }
  }

  obtenerProductos(): Producto[] {
    return [...this.productos]
  }

  obtenerTotal(): number {
    return this.productos.reduce((total, p) => total + p.precio, 0)
  }

  obtenerCantidad(): number {
    return this.productos.length
  }
}

// <<Comando>>: Interfaz del patrón Command
export interface Comando {
  ejecutar(): void
  deshacer(): void
}

// CmdAgregarProducto: Comando concreto para agregar productos
export class CmdAgregarProducto implements Comando {
  constructor(
    private carrito: Carrito,
    private producto: Producto,
  ) {}

  ejecutar(): void {
    this.carrito.agregarProducto(this.producto)
  }

  deshacer(): void {
    this.carrito.eliminarProducto(this.producto)
  }
}

// CmdEliminarProducto: Comando concreto para eliminar productos
export class CmdEliminarProducto implements Comando {
  constructor(
    private carrito: Carrito,
    private producto: Producto,
  ) {}

  ejecutar(): void {
    this.carrito.eliminarProducto(this.producto)
  }

  deshacer(): void {
    this.carrito.agregarProducto(this.producto)
  }
}

// Invocador: Gestiona el historial de comandos
export class Invocador {
  private historial: Comando[] = []

  ejecutarComando(comando: Comando): void {
    comando.ejecutar()
    this.historial.push(comando)
  }

  deshacerUltimoComando(): boolean {
    const comando = this.historial.pop()
    if (comando) {
      comando.deshacer()
      return true
    }
    return false
  }

  obtenerHistorialLength(): number {
    return this.historial.length
  }
}
