export function authenticate(jwt){
    if(typeof window !== "undefined"){
        return sessionStorage.setItem('jwt',JSON.stringify(jwt))
    }
}

export function isAuthenticated(){
    if(typeof window =='undefined'){
        return undefined;
    }
    if(sessionStorage.getItem('jwt')){
        return JSON.parse(sessionStorage.getItem('jwt'))
    }
    else {
        return undefined
    }
}

export function signout(){
    if(typeof window !== 'undefined'){
        sessionStorage.removeItem('jwt')
    }

}
