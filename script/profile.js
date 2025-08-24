const logout = document.getElementById('logout-icon')
const overlay = document.getElementById('overlay')
const navUl = document.querySelector('ul')
const user = document.querySelector('.user-data')
const cartBox = document.querySelector('.cart_box')
const orderBox = document.querySelector('.order_box')
const BASE_URL = 'https://hortifruti-api.vercel.app'
//const BASE_URL = 'http://localhost:3003'







logout.addEventListener('click', ()=>{
    const decide = window.confirm('Tem certeza que deseja deslogar da sua conta?')

    if(decide){
        localStorage.clear()
        window.location.href = '../index.html'
    }
})


const getProfile = ()=>{
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
}

/* CARRINHO */
const getCartItems = ()=>{
    fetch(`${BASE_URL}/cartItems`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(async res =>{
        if(!res.ok){
            const errorText = await res.text()
            cartBox.innerHTML = errorText

            return Promise.reject(new Error(errorText))
        }
        return await res.json()
    }).then(data=>{
        cartBox.innerHTML = data.map(item=>{
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
                        <a class="av_btn" data-item='${JSON.stringify(item)}' onclick="confirmRemoveFromCart(this)">
                            Remover do carrinho
                        </a>
                    </div>
                </div>
            `
        }).join('')
    }).catch(e => console.error(e?.message))
}


const confirmRemoveFromCart = (item)=>{
    const decide = window.confirm('Tem certeza que quer remover o produto?')

    if(decide){
        removeFromCart(item)
    }
}

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
            console.error(errorText)

            return Promise.reject()
        }
        return await res.text()
    }).then(() =>{        
        elemnt.closest('.av_card').remove()
    })
    .catch(e => console.error(e.message))
}

/* PEDIDOS */
const confirmRemoverOrder = (id)=>{
    const decide = window.confirm('Tem certeza que deseja remover o produto?')

    if(decide) removeOrder(id)
}


const removeOrder = (id)=>{
    fetch(`${BASE_URL}/order/${id}`, {
        method:'DELETE',
        headers: { 'Authorization': localStorage.getItem('token') }
    }).then(async res=>{
        if(!res.ok){
            const errorText = await res.text()
            console.error(errorText)

            return Promise.reject()
        }
        return await res.text()
    }).then(() => getOrders())
        .catch(e => console.error(e.message))
}


const getOrders = ()=>{
    fetch(`${BASE_URL}/orders`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(async res=>{
        if(!res.ok){
            const errorText = await res.text()
            orderBox.innerHTML = errorText

            return Promise.reject(new Error(errorText))
        }

        return res.json()
    }).then(data=>{
        orderBox.innerHTML = data.map(item=>{
            return`
                <div class="order_card">
                    <b>Pedido</b>: ${item.product}<br>
                    <b>Preço</b>: R$ ${Number(item.price).toFixed(2)}<br>
                    <b>Quantidade</b>: ${item.quantity}<br>
                    <b>Total</b>: R$ ${Number(item.total).toFixed(2)}<br>
                    <b>Endereço</b>: ${item.address}<br>
                    <b>Cliente</b>: ${item.client}<br>
                    <b>Telefone</b>: ${item.phone}<br>
                    <button onclick="confirmRemoverOrder('${item.id}')">Remover</button>
                </div>
            `
        }).join('')
    }).catch(e => console.error(e?.message))
}


document.addEventListener('DOMContentLoaded', ()=>{
    getProfile()
    getCartItems()
    getOrders()
})