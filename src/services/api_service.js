import theme_form_login from "../themes/theme_form_login";
import {isAuthenticated,  signout} from './auth-helper';

const API_URL = "http://localhost:3000";


export async function getProducts(name) {
  let response = await fetch(`${API_URL}/category/${name}`)
  let data = await response.json();
  return data
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

