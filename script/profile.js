const logout = document.getElementById('logout-icon')
const menuIcon = document.getElementById('menu-icon')
const navUl = document.querySelector('ul')
const user = document.querySelector('.user-data')



document.addEventListener('DOMContentLoaded', ()=>{
    const token = localStorage.getItem('token')

    fetch('http://10.23.1.5:3003/client', {
        headers: {
            'Authorization': token
        }
    }).then(res => res.json()).then(data=>{
        console.log(data)
        user.innerHTML = `
            ${data.name}<br>
            ${data.email}<br>
            ${data.phone}<br>
            ${data.address}<br>
        `
    }).catch(e => alert(e.message))
})

menuIcon.addEventListener('click', ()=>{
    menuIcon.classList.toggle('fa-xmark')
    navUl.classList.toggle('active')
})




logout.addEventListener('click', ()=>{
    const decide = window.confirm('Tem certeza que deseja deslogar da sua conta?')

    if(decide){
        localStorage.clear()
        window.location.href = '../index.html'
    }
})