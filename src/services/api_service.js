import theme_form_login from "../themes/theme_form_login";
import {isAuthenticated,  signout} from './auth-helper';

const API_URL = "http://localhost:3000";


export async function getProducts(name) {
  let response = await fetch(`${API_URL}/products/${name}`)
  let data = await response.json();
  return data
}

export function postProduct(category, name, numberPieces, price, availability, comment, jwt){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      },
      body:JSON.stringify({
        category:category,
        name: name,
        numberPieces: numberPieces,
        price: price,
        availability: availability,
        comment: comment,
      }) 
    }

    let request = new Request(`${API_URL}/products/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function updateProduct(id, numberPieces, price, availability, comment, jwt){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      },
      body:JSON.stringify({
        numberPieces: numberPieces,
        price: price,
        availability: availability,
        comment: comment,
      }) 
    }

    let request = new Request(`${API_URL}/products/`+id, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export async function getNames(jwt){
  let response = await fetch(`${API_URL}/names`,
  {
    method:'get',
    headers:{ 'Authorization': 'Bearer ' + jwt }
  })
  let data = await response.json();
  return data;
}

export async function getUserInformations(){
  let jwt = isAuthenticated();
  return new Promise((resolve, reject) => {
    let bodyRequest = {
      method : 'GET',
      headers :{ 
        'Authorization': 'Bearer ' + jwt,
      }
    }

    let request = new Request(`${API_URL}/informations/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => { 
      reject(err.message)
      })
    })
} 

export async function updateAddress(state){
  let jwt = isAuthenticated()
  return new Promise((resolve, reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        adresse: state.updateAddress,
        codePostal: state.updatePostalCode,
        ville: state.updateCity,
        password: state.addressPassword
      })
    }
 

  let request = new Request(`${API_URL}/address/`, bodyRequest)
  let checkFetch = function(response){
    if(!response.ok){
      throw Error(response.status)
    }
    return response
  }

  fetch(request)
  .then(checkFetch)
  .then((res) => res.json())
  .then((data) => {
    resolve(data)
  })
  .catch(err => {
    reject(err.message)
    })
  })

}

export async function updateContact(state){
  let jwt = isAuthenticated()
  let bodyFields = {};
  if(state.updatePhone != ''){
    bodyFields.phone = state.updatePhone
  }
  if(state.updateEmail != ''){
    bodyFields.email = state.updateEmail
  }

  return new Promise((resolve, reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        update : bodyFields,
        password: state.contactPassword
      })
    }
 

  let request = new Request(`${API_URL}/contact/`, bodyRequest)
  let checkFetch = function(response){
    if(!response.ok){
      console.log(response)
      throw Error(response.status)
    }
    return response
  }

  fetch(request)
  .then(checkFetch)
  .then((res) => res.json())
  .then((data) => {
    resolve(data)
  })
  .catch(err => {
    console.log(err)
    reject(err.message)
    })
  })

}

export function signUp(email, password, firstname, lastname, phone, address, city, postalCode){
  return new Promise((resolve, reject) => {
    let bodyRequest = {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phone : phone,
        address: address || null,
        city: city || null,
        postalCode: postalCode || null
      })
    }

    let request = new Request(`${API_URL}/signup/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.statusText + "-" + response.url)
      }
      return response
    }

    fetch(request)
      .then(checkFetch)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
      .catch(err => { 
        console.log("reject")
        let error = {error:"Une erreur s'est produite, veuillez recommencer svp"}
        reject(error) })


  })
  
}

export async function verifyAccount(email,token){
  return new Promise((resolve, reject) => {
    let bodyRequest = {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: email,
        secretToken: token
      })
    }
    let request = new Request(`${API_URL}/verify/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => { 
      console.log(err.message)
      if(err.message == 401){
        let error = {status:401, message: "Erreur de validation"}
        reject(error)
      }
      else {
        let error = {status:500, message:"Une erreur s'est produite, veuillez recommencer svp"}
        reject(error)
      }
       })
  })
}

export async function verifUnicityMail(address){
  let response = await fetch(`${API_URL}/loginAddress/${address}`);
  let data = await response.json();
  return data;
}

export async function login(address,password){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: address,
        password: password
      })
    }

    let request = new Request(`${API_URL}/login/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function regeneratePassword(email){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: email,
      })
    }

    let request = new Request(`${API_URL}/password_secret_token/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function getOrders(jwt){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    }

    let request = new Request(`${API_URL}/orders/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function getOrdersByDate(jwt,date){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },

    }

    let request = new Request(`${API_URL}/orders/date/`+date, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function getOrdersByMonth(jwt,monthYear,interval){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },

    }

    let request = new Request(`${API_URL}/orders/month/`+monthYear+'/'+interval, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function getOrdersById(jwt,id,interval){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
    }

    let request = new Request(`${API_URL}/orders/`+id+"/"+interval, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

// Get the distincts values of Month x Year of all the orders
export function getOrdersHistorique(jwt){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
    }

    let request = new Request(`${API_URL}/orders/historique/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function postOrder(products, mode, lastname, firstname, phone, address, city, postalcode, date, time, message, id){
  console.log("passage commande")
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        products: products,
        mode: mode,
        lastname: lastname,
        firstname: firstname,
        phone: phone,
        address: address,
        city: city,
        postalcode: postalcode,
        date: date,
        time: time,
        message: message,
        userId: id
      }) 
    }

    let request = new Request(`${API_URL}/orders/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function deleteOrder(id,jwt){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'DELETE',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    }

    let request = new Request(`${API_URL}/orders/`+id, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function updateOrderChosenTime(id,jwt,chosenTime){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id:id,
        chosenTime:chosenTime,
        state:"En préparation"
      })
    }

    let request = new Request(`${API_URL}/orders/`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function updateOrderState(id,jwt,stateValue,switchValue){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id:id,
        state:stateValue,
        switch:switchValue
      })
    }

    let request = new Request(`${API_URL}/orders/state`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function getTime(jwt){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'get',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    }

    let request = new Request(`${API_URL}/horaires`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function getTimeTodayTomorrow(today,tomorrow){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let request = new Request(`${API_URL}/horaires/`+today+'/'+tomorrow, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function updateTime(jwt,index,lunchOrDinner,start,stop,disabled){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        day:index,
        lunchOrDinner:lunchOrDinner,
        start: start,
        stop: stop,
        disabled:disabled
      })

    }

    let request = new Request(`${API_URL}/horaires`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}

export function updateTimeDisabled(jwt,id,lunchOrDinner,value,start,stop){
  console.log(start,stop)
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        _id:id,
        lunchOrDinner:lunchOrDinner,
        value: !value,
        start:start,
        stop:stop
      })

    }

    let request = new Request(`${API_URL}/horaires/disable`, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}


export function getUsers(jwt,interval){
  return new Promise((resolve,reject) => {
    let bodyRequest = {
      method:'get',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    }

    let request = new Request(`${API_URL}/users/`+interval, bodyRequest)
    let checkFetch = function(response){
      if(!response.ok){
        throw Error(response.status)
      }
      return response
    }

    fetch(request)
    .then(checkFetch)
    .then((res) => res.json())
    .then((data) => {
      resolve(data)
    })
    .catch(err => {
      reject(err.message)
    })

  })
}