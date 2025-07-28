const productos = [
  {
    id: "01",
    imagen: "Imagenes/Productos/aireacondicionado.png",
    nombre: "Aire acondicionado",
    descripcion: "3.000 Frigorias Frio-Calor",
    precio: 840000,
  },

  {
    id: "02",
    imagen: "Imagenes/Productos/aireinverter.png",
    nombre: "Aire acondicionado",
    descripcion: "Inverter 3.000 Frig. Frio-Calor",
    precio: 920000,
  },

  {
    id: "03",
    imagen: "Imagenes/Productos/caldera.png",
    nombre: "Caldera Dual",
    descripcion: "Peisa 24K/cal DS TF",
    precio: 1930000,
  },

  {
    id: "04",
    imagen: "Imagenes/Productos/calderanegra.png",
    nombre: "Caldera Smart",
    descripcion: "Peisa Smart 24K/cal DS TF",
    precio: 2140000,
  },

  {
    id: "05",
    imagen: "Imagenes/Productos/radiador.png",
    nombre: "Tropical 500",
    descripcion: "Radiador Peisa de 6 elementos",
    precio: 370000,
  },

  {
    id: "06",
    imagen: "Imagenes/Productos/termotanque.png",
    nombre: "Termotanque electrico",
    descripcion: "Termotanque electrico de 50lts",
    precio: 480000,
  },
];

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const menuList = document.querySelector('.MenuLista');
    if (hamburgerBtn && menuList) {
        hamburgerBtn.addEventListener('click', () => {
            menuList.classList.toggle('active');
        });
        menuList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuList.classList.remove('active');
            });
        });
    }
})


function manejarClicCarrito(evento) {
    const target = evento.target;

    if (target.classList.contains("btn-cantidad") || target.classList.contains("btn-eliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarProductoDelCarrito(productoId);
        } else if (accion === "restar") {
            restarCantidadProducto(productoId);
        } else if (accion === "sumar") {
            sumarCantidadProducto(productoId);
        }
    }
}

function actualizarCarritoHTML() 
  {
  const carritoCompras = document.querySelector(".carritoCompras");

    if (!carritoCompras) 
      {
        console.error("Error: No se encontró el contenedor con la clase 'CarritoCompras'. Asegúrate de que exista en tu HTML.");
        return;
      }

    carritoCompras.innerHTML = `
        <h2>Carrito de Compras</h2>
        <ul class="lista-carrito"></ul>
        <p class="total-carrito"></p>
        <p class="cantidad-carrito"></p>
    `;
    
    const listaCarrito = carritoCompras.querySelector(".lista-carrito");
    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    if (carrito.length === 0) 
      {
        listaCarrito.innerHTML = "<p>No hay nada dentro del carrito</p>";
      } 
      else 
        {
          for (let i = 0; i < carrito.length; i++) 
            {
              const item = carrito[i];
              const li = document.createElement("li");
              li.innerHTML = `
                <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
                <div>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="restar">-</button>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="sumar">+</button>
                    <button class="btn-eliminar" data-id="${item.id}" data-action="eliminar">x</button>
                </div>`;
                listaCarrito.appendChild(li);
                totalPagar += item.precio * item.cantidad;
                cantidadProductosUnicos++;
            }
        }
    carritoCompras.querySelector(".total-carrito").textContent = `Total a pagar: $${totalPagar}`;
    carritoCompras.querySelector(".cantidad-carrito").textContent = `Productos en carrito: ${cantidadProductosUnicos}`;
    const nuevoListaCarrito = carritoCompras.querySelector(".lista-carrito");
    nuevoListaCarrito.addEventListener("click", manejarClicCarrito);
  }


let carrito = [];

function AgregarProductosAlCarrito(idProducto)
{

  let productoEnCarrito = null;
    for(let i = 0; i < carrito.length; i++)
      {
        if(carrito[i].id === idProducto)
        {
          productoEnCarrito = carrito[i];
          break;
        }
      } 
  
    if(productoEnCarrito)
      {
        productoEnCarrito.cantidad++;
      } 
    else
      {
        let productoOriginal = null;
        for (let i = 0; i < productos.length; i++)
        {
          if (productos[i].id === idProducto)
          {
            productoOriginal = productos[i];
            break;
          }
        }
        
        if(productoOriginal)
        {
          carrito.push({ ...productoOriginal, cantidad: 1})
        }
        
      }
  actualizarCarritoHTML();
}
  

function manejarClicComprar(evento) {
    if (evento.target.classList.contains("btn-comprar")) {
        const botonComprar = evento.target; 
        const productoId = botonComprar.dataset.id;
        botonComprar.classList.add('clicked');
        AgregarProductosAlCarrito(productoId);
        setTimeout(() => {
            botonComprar.classList.remove('clicked');
        }, 150);
    }
}
function sumarCantidadProducto(idProducto) {
    let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarritoHTML(); 
    }
}

function restarCantidadProducto(idProducto) {
    let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idProducto); 
        } else {
            actualizarCarritoHTML(); 
        }
    }
}


function eliminarProductoDelCarrito(idProducto) {
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarritoHTML();
}




function AgregarProductos()
{
  const divContProductos = document.querySelector(".ContenidoProductos");
    
  for (let i = 0; i < productos.length; i++)
    {
      const producto = productos[i];
      divContProductos.insertAdjacentHTML("beforeend", 
        `
        <div class="Productos">
            <img
              src="${producto.imagen}" 
              alt="${producto.nombre}"
              title=""
            />
            <h3>${producto.nombre}</h3>
            <span>Codigo: ${producto.id} </span>
            <span><p>${producto.descripcion}</p></span>
            <span><p class="precio"> $ ${producto.precio.toLocaleString('es-AR')}</p></span>
            <button class="btn-comprar" type="button" data-id="${producto.id}">Comprar</button>
          </div>
        `
      );
    }

    divContProductos.addEventListener("click", manejarClicComprar);

}

AgregarProductos()
actualizarCarritoHTML()