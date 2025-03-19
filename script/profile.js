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
        user.innerHTML = `
            ${data.name}<br>
            ${data.email}<br>
            ${data.phone}<br>
            ${data.address}<br>
        `
    }).catch(e => alert(e.message))
})


document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://10.23.1.5:3003/cartItems', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        console.log(data)
        document.querySelector('.cart_box').innerHTML = data.map(item=>{
            return`
                <div class="av_card">
                    <div class="av_image">
                        <img src=${item.urlImage} alt="imaga_of_available">
                    </div>
                    <div class="av_info">
                        <h2>${item.product}</h2>
                        <h3>R$ ${Number(item.price).toFixed(2)} <span>Kg</span></h3>
                        <div class="av_icon">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <a class="av_btn">
                            Remover do carrinho
                        </a>
                    </div>
                </div>
            `
        })
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