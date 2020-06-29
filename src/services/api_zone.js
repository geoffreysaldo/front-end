import {isAuthenticated,  signout} from './auth-helper';

const API_URL = "http://localhost:3000";

export function getZones(){
    return new Promise((resolve,reject) => {
      let bodyRequest = {
        method:'get'
      }
      let request = new Request(`${API_URL}/zones/`, bodyRequest)
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


export function postZone(name, postalCode, minimum){
    return new Promise((resolve,reject) => {
      let bodyRequest = {
        method:'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + isAuthenticated(),
        },
        body:JSON.stringify({
            name: name,
            postalCode: postalCode,
            minimum: minimum,
          }) 
        }
      let request = new Request(`${API_URL}/zones/`, bodyRequest)
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

export function updateZone(id, minimum){
    return new Promise((resolve,reject) => {
      let bodyRequest = {
        method:'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + isAuthenticated() },
        body:JSON.stringify({
            id: id,
            minimum: minimum,
          })
      }
      let request = new Request(`${API_URL}/zones/`, bodyRequest)
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

  export function deleteZone(id){
    return new Promise((resolve,reject) => {
      let bodyRequest = {
        method:'delete',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + isAuthenticated() },
        body:JSON.stringify({
            id: id,
          })
      }
      let request = new Request(`${API_URL}/zones/`, bodyRequest)
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

  