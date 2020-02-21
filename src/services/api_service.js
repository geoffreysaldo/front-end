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

