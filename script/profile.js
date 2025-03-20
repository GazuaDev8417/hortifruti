const logout = document.getElementById('logout-icon')
const menuIcon = document.getElementById('menu-icon')
const navUl = document.querySelector('ul')
const user = document.querySelector('.user-data')
const BASE_URL = 'https://hortifruti-api.vercel.app'




document.addEventListener('DOMContentLoaded', ()=>{
    const token = localStorage.getItem('token')

    fetch(`${BASE_URL}/client`, {
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


const removeFromCart = (elemnt)=>{
    const item = JSON.parse(elemnt.getAttribute('data-item'))
    
    fetch(`${BASE_URL}/cartItem/${item.id}`, {
        method:'DELETE',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(async res =>{
        if(!res.ok){
            const errorText = await res.text()
            alert(errorText)

            return Promise.reject()
        }
        return res.text()
    }).then(() =>{
        alert(`${item.product} removido do carrinho`)
        
        elemnt.closest('.av_card').remove()
    })
    .catch(e => alert(e.message))
}


document.addEventListener('DOMContentLoaded', ()=>{
    fetch(`${BASE_URL}/cartItems`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        document.querySelector('.cart_box').innerHTML = data.map(item=>{
            return`
                <div class="av_card">
                    <div class="av_image">
                        <img src="${item.urlImage}" alt="imaga_of_available">
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
                        <a class="av_btn" data-item='${JSON.stringify(item)}' onclick="removeFromCart(this)">
                            Remover do carrinho
                        </a>
                    </div>
                </div>
            `
        })
    }).catch(e => console.error(e.message))
})


document.addEventListener('DOMContentLoaded', ()=>{
    fetch(`${BASE_URL}/orders`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(async res=>{
        if(!res.ok){
            const errorText = await res.text()
            console.error(errorText)

            return Promise.reject()
        }

        return res.json()
    }).then(data=>{
        document.querySelector('.order_box').innerHTML = data.map(item=>{
            return`
                <div class="order_card">
                    <b>Pedido</b>: ${item.product}<br>
                    <b>Endereço</b>: ${item.address}<br>
                    <b>Cliente</b>: ${item.client}<br>
                    <b>Telefone</b>: ${item.phone}<br>
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