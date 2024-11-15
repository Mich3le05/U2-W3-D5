const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTM1ZDhhZDEyOTAwMTU4NzZiZDgiLCJpYXQiOjE3MzE2NjI2ODUsImV4cCI6MTczMjg3MjI4NX0.27erXWgpdt9SXQiT0PysyUg3vKw_YQDOxIX5Z__vVmQ'

const productID = new URLSearchParams(window.location.search).get('productID')

fetch(URL + '/' + productID, {
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore')
    }
  })
  .then((prodotto) => {
    console.log('prodotto', prodotto)
    const col = document.getElementById('card-container')
    col.innerHTML = `
            <h2>${prodotto.brand} - ${prodotto.name}</h2>
            <img src="${prodotto.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${prodotto.brand} - ${prodotto.name}</h5>
                <p class="card-text">${prodotto.description}</p>
                <p class="card-text">€${prodotto.price}€</p>
                <ul>
                <li>createdAt: ${prodotto.createdAt}</li>
                <li>updatedAt: ${prodotto.updatedAt}</li>
                <li>userId: ${prodotto.userId}</li>
                <li>_v: ${prodotto.__v}</li>
                <li>_id: ${prodotto._id}</li>
            </ul>
                <a class="btn btn-warning" href="./back_office.html?concertId=${prodotto.userId}">MODIFICA</a>
                <button class="btn btn-danger" onclick="deleteConcert()">ELIMINA</button>
            </div>
        
    `
  })
  .catch((error) => {
    console.log('ERROR', error)
  })

const deleteConcert = function () {
  console.log('Elimino il prodotto')
  fetch(URL + productID, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('Prodotto eliminato!')
        window.location.assign('./index.html')
      } else {
        throw new Error('Errore')
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}
