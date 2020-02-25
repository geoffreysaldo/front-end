import theme_form_login from "../themes/theme_form_login";

const API_URL = "http://localhost:3000";


export async function getProducts(name) {
  let response = await fetch(`${API_URL}/category/${name}`)
  let data = await response.json();
  return data
}

export async function verifUnicityMail(address){
  let response = await fetch(`${API_URL}/loginAddress/${address}`);
  let data = await response.json();
  return data;
}

export async function login(address,password){
  let response = await fetch(`${API_URL}/login/`,
    {
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: address,
        password: password
      })
    });
  let data = await response.json();
  return data
}

