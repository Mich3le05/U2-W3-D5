const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTM1ZDhhZDEyOTAwMTU4NzZiZDgiLCJpYXQiOjE3MzE2NjI2ODUsImV4cCI6MTczMjg3MjI4NX0.27erXWgpdt9SXQiT0PysyUg3vKw_YQDOxIX5Z__vVmQ'

const productID = new URLSearchParams(window.location.search).get('productID')

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
        return response.json()
      } else {
        throw new Error('Errore')
      }
    })
    .then((prodotto) => {
      console.log('Hai ottenuto:', prodotto)
      document.querySelector('#name').value = prodotto.name
      document.querySelector('#description').value = prodotto.description
      document.querySelector('#brand').value = prodotto.brand
      document.querySelector('#imageUrl').value = prodotto.imageUrl
      document.querySelector('#price').value = prodotto.price

      let btnDelete = document.querySelector('#delete')
      btnDelete.addEventListener('click', () => {
        if (window.confirm('Vuoi eliminare il prodotto?')) {
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
  const method = productID ? 'PUT' : 'POST'

  fetch(completeURL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('Response received:', response)
      if (response.ok) {
        alert('Prodotto aggiunto correttamente!')
        window.location.assign('../index.html')
      } else {
        alert('Problema nella creazione del prodotto')
      }
    })
    .catch((error) => {
      console.log('Error during fetch:', error)
      alert('Si è verificato un errore. Riprova.')
    })
}

function addProduct() {
  let formReference = document.querySelector('#computer-form')
  formReference.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const newProduct = {
      name: document.querySelector('#name').value,
      description: document.querySelector('#description').value,
      brand: document.querySelector('#brand').value,
      imageUrl: document.querySelector('#imageUrl').value,
      price: document.querySelector('#price').value,
    }

    console.log('Prodotto che hai appena inserito:', newProduct)
    saveProduct(newProduct)
  })
}

function resetForm() {
  document.querySelector('#computer-form').reset()
}

addProduct()
