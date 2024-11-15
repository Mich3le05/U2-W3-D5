const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTM1ZDhhZDEyOTAwMTU4NzZiZDgiLCJpYXQiOjE3MzE2NjI2ODUsImV4cCI6MTczMjg3MjI4NX0.27erXWgpdt9SXQiT0PysyUg3vKw_YQDOxIX5Z__vVmQ'

let productID = new URLSearchParams(window.location.search).get('productID')

const deleteProduct = () => {
  fetch(URL + productID, {
    method: 'DELETE',
    headers: { Authorization: token },
  })
    .then((response) => {
      console.log(response)
      if (response.ok) {
        alert('Prodotto eliminato correttamente')
        window.location.assign('../index.html')
      } else {
        alert("Problema nell'eliminazione del prodotto")
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const products = () => {
  fetch(URL + productID, {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Il prodotto esiste!', response.status)
        return response.json()
      } else {
        alert('Errore')
        throw new Error('Errore')
      }
    })
    .then((prodotto) => {
      console.log('Hai ottenuto:', prodotto)
      document.querySelector('#brand').value = prodotto.brand
      document.querySelector('#name').value = prodotto.name
      document.querySelector('#description').value = prodotto.description
      document.querySelector('#imageUrl').value = prodotto.imageUrl
      document.querySelector('#price').value = prodotto.price

      let btnDelete = document.querySelector('#delete')
      btnDelete.addEventListener('click', () => {
        if (window.confirm('Vuoi davvero eliminare il prodotto?')) {
          deleteProduct()
        } else {
          alert('Prodotto non eliminato')
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

if (productID) {
  products()
}

const saveProduct = (newProduct) => {
  let completeURL = productID ? URL + productID : URL
  let method = productID ? 'PUT' : 'POST'

  fetch(completeURL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        if (
          window.confirm(
            'Prodotto aggiunto correttamente! Desideri aggiungere altri prodotti?'
          )
        ) {
          alert('Verrai rendirizzato alla homepage.')
          window.location.assign('./index.html')
        }
      } else {
        alert('Problema nella creazione del prodotto')
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function addProduct() {
  let formReference = document.querySelector('#computer-form')
  formReference.addEventListener('click', (ev) => {
    ev.preventDefault()
    let newProduct = {
      brand: document.querySelector('#brand').value,
      name: document.querySelector('#name').value,
      description: document.querySelector('#description').value,
      imageUrl: document.querySelector('#imageUrl').value,
      price: document.querySelector('#price').value,
    }
    console.log('Prodotto che hai appena inserito ', newProduct)
    saveProduct(newProduct)
  })
}
