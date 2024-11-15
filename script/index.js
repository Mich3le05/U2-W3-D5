console.log('Ok')

const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTM1ZDhhZDEyOTAwMTU4NzZiZDgiLCJpYXQiOjE3MzE2NjI2ODUsImV4cCI6MTczMjg3MjI4NX0.27erXWgpdt9SXQiT0PysyUg3vKw_YQDOxIX5Z__vVmQ'

const getProducts = () => {
  fetch(URL, {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Connessione ok:', response.status)
        return response.json()
      } else {
        throw new Error('ERROR')
      }
    })
    .then((results) => {
      console.log('Hai ottenuto:', results)
      createProducts(results)
    })
    .catch((error) => {
      console.log(error)
    })
}

getProducts()

const createProducts = (results) => {
  const list = document.getElementById('computer-list')
  results.forEach((product) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
    newCol.innerHTML = `
      <div class="card h-100">
        <img src="${product.imageUrl}" class="card-img-top" alt="computer">
        <div class="card-body">
          <h5 class="card-title">${product.brand} ${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text text-primary">€${product.price}</p>
          <a href="./back_office.html" class="btn btn-primary">Edit</a>
          <a href="./details.html?productID=${product._id}" class="btn btn-info">Info</a>
        </div>
      </div>`
    list.appendChild(newCol)
  })
}

window.onload = function () {
  document.getElementById('loading-indicator').style.display = 'none'
}
