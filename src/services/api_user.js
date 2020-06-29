const API_URL = "http://localhost:3000";


export function validateAccount(key){
    return new Promise((resolve,reject) => {
      let bodyRequest = {
        method:'PATCH'
      }
      let request = new Request(`${API_URL}/verify/`+key, bodyRequest)
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


  export function updatePassword(key, password){
    return new Promise((resolve,reject) => {
      let bodyRequest = {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          password: password,
        })
      }
      let request = new Request(`${API_URL}/password/`+key, bodyRequest)
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
        reject("Echec, votre mot de passe n'a pas pu être modifié")
      })
    })
  }