export function authenticate(jwt,admin){
    if(typeof window !== "undefined"){
        sessionStorage.setItem('jwt',JSON.stringify(jwt))
        if(admin){
            sessionStorage.setItem('admin',JSON.stringify(admin))
        }
    }
}

export function isAuthenticated(){
    if(typeof window =='undefined'){
        return undefined;
    }
    if(sessionStorage.getItem('jwt')){
        return JSON.parse(sessionStorage.getItem('jwt'))}
    else {
        return undefined
    }
}

export function isAdmin(){
    if(typeof window =='undefined'){
        return undefined;
    }
    if(sessionStorage.getItem('admin')){
        return JSON.parse(sessionStorage.getItem('admin'))}
    else {
        return undefined
    }
}


export function signout(){
    if(typeof window !== 'undefined'){
        sessionStorage.removeItem('jwt')
        if(sessionStorage.getItem('admin')){
            sessionStorage.removeItem('admin')
        }
    }

}

