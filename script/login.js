const email = document.getElementById('email').value = 'visitante@email.com'
const password = document.getElementById('password').value = '123456'
const form = document.getElementById('form')
const eye = document.getElementById('eye-icon')
const BASE_URL = 'https://hortifruti-api.vercel.app'




document.addEventListener('DOMContentLoaded', ()=>{
    const token = localStorage.getItem('token')

    if(token){
        window.location.href = 'profile.html'
    }
})


eye.addEventListener('click', ()=>{
    eye.classList.toggle('fa-eye')

    if(password.type === 'password'){
        password.type = 'text'
    }else {
        password.type = 'password'
    }
})


form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const formData = {
        email: email,
        password: password
    }

    fetch(`${BASE_URL}/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(async res =>{
        if(!res.ok){
            const errorText = await res.text()
            alert(errorText)

            return Promise.reject()
        }

        return res.text()
    }).then(data =>{
        localStorage.setItem('token', data)
        window.location.href = 'profile.html'
    })
    .catch(e => alert(e.message))
})