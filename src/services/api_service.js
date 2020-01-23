const API_URL = "http://localhost:3001";


export async function getProducts(name) {
  let response = await fetch(`${API_URL}/category/${name}`)
  let data = await response.json()
  return data
}

