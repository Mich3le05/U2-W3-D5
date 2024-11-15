const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTM1ZDhhZDEyOTAwMTU4NzZiZDgiLCJpYXQiOjE3MzE2NjI2ODUsImV4cCI6MTczMjg3MjI4NX0.27erXWgpdt9SXQiT0PysyUg3vKw_YQDOxIX5Z__vVmQ'

const productID = new URLSearchParams(window.location.search).get('productID')

// const pDetails = () => {
//   fetch(URL + productID, {
//     headers: {
//       Authorization: token,
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json()
//       } else {
//         throw new Error('Error')
//       }
//     })
//     .then((product) => {
//       console.log('prodotto:', product)

//       const productImageReference = document.querySelector('#productImage')
//       const productImage = document.createElement('img')
//       productImage.setAttribute('src', product.imageUrl)
//       productImage.classList.add('w-100')
//       productImageReference.appendChild(productImage)

//       const productInfoReference = document.querySelector('#productInfo')
//       productInfoReference.innerHTML = `
//               <h2>${product.brand} - ${product.name}</h2>
//               <p>${product.description}</p>
//               <p>Price: €${product.price}</p>
//               <p>Image Url: <br> ${product.imageUrl}</p>
//               <p>SERVER GENERATED: </p>
//               <ul>
//                   <li>createdAt: ${product.createdAt}</li>
//                   <li>updatedAt: ${product.updatedAt}</li>
//                   <li>userId: ${product.userId}</li>
//                   <li>_v: ${product.__v}</li>
//                   <li>_id: ${product._id}</li>
//               </ul>`
//     })
//     .catch((error) => {
//       console.log('Errore:', error)
//     })
// }
// console.log('Product ID:', productID)

fetch(URL + '/' + productID, {
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'evento")
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
  console.log('PROVO A ELIMINARE IL CONCERTO')
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
