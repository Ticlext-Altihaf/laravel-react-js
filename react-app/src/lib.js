import Axios from 'axios'

export const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:9884/backend/api' : '/backend/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
})

function getToken() {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token')
    }
    if (sessionStorage.getItem('token')) {
        return sessionStorage.getItem('token')
    }
}

export function setToken(token, remember) {
    if (!token) {
        return
    }
    if (remember) {
        localStorage.setItem('token', token)
    } else {
        sessionStorage.setItem('token', token)
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export function removeToken() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
}

if (getToken()) {
    setToken(getToken())
}

export function getUser(setUser, beforeUser) {

    //run in the background
    axios.get('/user').then(response => {
        if (response.data && response.data.username) {
            const before = beforeUser ? JSON.stringify(beforeUser) : sessionStorage.getItem('user')
            const after = JSON.stringify(response.data)
            if (before !== after) {
                sessionStorage.setItem('user', JSON.stringify(response.data))
                if (setUser) {
                    setUser(response.data.user)
                }
            }

        }else{
            sessionStorage.removeItem('user')
        }
    }).catch(error =>{
        sessionStorage.removeItem('user')
        if(setUser) {
            setUser(null)
        }
    })
    let user = null
    if (sessionStorage.getItem('user')) {
        try {
            user = JSON.parse(sessionStorage.getItem('user'))
        } catch (e) {
            sessionStorage.removeItem('user')
        }
    }
    if (localStorage.getItem('user')) {
        try {
            user = JSON.parse(localStorage.getItem('user'))
        } catch (e) {
            localStorage.removeItem('user')
        }
    }

    return user

}

export async function login(username, password, role) {
    const response = await axios.post('/login', {
        username,
        password,
        role
    })
    if (response.data && response.data.token) {
        setToken(response.data.token, response.data.remember)
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response;
}


export async function logout() {
    await axios.post('/logout')
    removeToken()
    sessionStorage.removeItem('user')
    localStorage.removeItem('user')
}

export function parseErrors(error) {
    let errors = {}
    if(!error) {
        return errors
    }
    if(error.response && error.response.data) {
        error = error.response
    }
    if (error && error.data) {
        if (error.data.message) {
            errors['message'] = error.data.message
        }
        if (error.data.error) {
            errors['message'] = error.data.error
        }
        if (error.data.errors) {
            Object.keys(error.data.errors).forEach(key => {
                errors[key] = error.data.errors[key][0]
            })
        }
        if (Object.keys(errors).length === 0) {
            errors = error.data
        }
    } else {
        errors['message'] = error + ""
    }

    //check if still empty


    return errors
}


