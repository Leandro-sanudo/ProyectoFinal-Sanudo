//Carrito
const cart = JSON.parse(localStorage.getItem("totalCart"))  ?? [];
const total = cart.reduce((total, manga) => total + manga.price, 0);
document.getElementById("cart-total").innerHTML = `${cart.length} - $${Number(total)}`;

//Generador de Cards
const cardGenerator = () => {
    fetch('datos.json')
    .then((response) => response.json())
    .then(information => {
        let accumulator = ``;
        information.forEach((manga) => {
            console.log(manga)
            const idButton = "btn-add"+manga.id
            accumulator += `<div class="card mb-3" style="max-width: 750px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${manga.image}" class="img-fluid rounded-start" id="image" alt="${manga.name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${manga.name} - $${manga.price}</h5>                  
                  <p class="card-text">${manga.info}</p>
                  <a href="#" class="btn btn-primary" data-id="${manga.id}" id="${idButton}">Agregar al carrito</a>
                </div>
              </div>
            </div>
          </div>`
        })
        document.getElementById('cards').innerHTML = accumulator;
    })
}

//Llamado al generador de cards
cardGenerator();

//Generador de botones
const buttonGenerator = () => {
  fetch('datos.json')
  .then((response) => response.json())
  .then(information => {
    information.forEach((manga) => {
      const idButton = `btn-add${manga.id}`
      document.getElementById(idButton).addEventListener('click', () => {
        console.log(manga);
        cart.push(manga);
        localStorage.setItem("totalCart", JSON.stringify(cart));
        const total = cart.reduce((total, manga) => total + manga.price, 0);
        console.log(cart);
        document.getElementById("cart-total").innerHTML = `${cart.length} - $${Number(total)}`;
        Swal.fire({
          position: 'top',
          imageUrl: 'Imagenes/Success.gif',
          title: '¡Agregado al carrito!',
          showConfirmButton: false,
          timer: 2500
        })          
      })
    })
  })
}

//Llamado al generador de botones
buttonGenerator();

//Llamados a los botones estaticos en el html para agregarle un evento
let btnClean = document.querySelector("#clean")

btnClean.onclick = () => {
  localStorage.clear()
  cart.splice(0, cart.length)
  console.log(cart)
  document.getElementById("cart-total").innerHTML = cart.length;
  Swal.fire({
    position: 'top',
    imageUrl: 'Imagenes/Clean.gif',
    title: 'Limpiaste el carrito...',
    showConfirmButton: false,
    timer: 2500
  })
}

let btnPayment = document.querySelector("#payment")

btnPayment.onclick = () => {
  Swal.fire({
    position: 'top',
    imageUrl: 'Imagenes/Cart.png',
    title: 'Aún estamos trabajando en los metodos de pago. ¡Pero es solo cuestion de tiempo!',
    showConfirmButton: false,
    timer: 2500
  })
}