var typed = new Typed('.typing', {
    strings: [
        'Morango', 'Couve-flor', 'Alface', 'Pimentão', 'Repolho', 'Brocoli', 'Tomate', 'Melancia'
    ],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
})



const validateQuantity = (input)=>{
    let value = parseInt(input.value, 10)

    if(value > 10){
        input.value = 10
    }

    if(input.value.startsWith('0') && input.value.length > 1){
        input.value = input.value.replace(/^0+/, '')
    }
}



const client = document.getElementById('client')
const email = document.getElementById('email')
const qnt = document.getElementById('qnt')
const phone = document.getElementById('phone')
const product = document.getElementById('product')
const address = document.getElementById('address')
const products = ['Morango', 'Couve-flor', 'Alface', 'Pimentão', 'Repolho', 'Brocoli', 'Tomate', 'Melancia']


document.getElementById('form').addEventListener('submit', async(e)=>{
    e.preventDefault()
    
    if(isNaN(qnt.value) || isNaN(phone.value)){
        alert(`Apenas números nos campos de telefone ou quantidade`)
    }

    const value = product.value.trim().toLowerCase()

    if(!products.some(p => p.toLowerCase() === value)){
        alert(`${product.value} não está disponível na lista`)

        return
    }

    const formData = {
        client: client.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        product: product.value,
        quantity: qnt.value
    }

    const response = await fetch('http://10.23.1.5:3003/order', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
    })

    if(!response.ok){
        const errorText = await response.text()
        if(errorText === 'jwt must be provided'){
            alert('É preciso estar logado na sua conta')
            window.location.href = 'pages/login.html'
        }else{
            alert(errorText)
        }

        return
    }

    const result = await response.text()

    alert(result)

})


const menuIcon = document.getElementById('menu-icon')
const navUl = document.querySelector('section ul')


menuIcon.addEventListener('click', ()=>{

})

menuIcon.addEventListener('click', ()=>{
    menuIcon.classList.toggle('fa-xmark')
    navUl.classList.toggle('active')
})


const av_box = document.querySelector('.av_box')

document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://10.23.1.5:3003/products').then(res => res.json()).then(data=>{
        av_box.innerHTML = data.map(product =>{
            return`
                <div class="av_card">
                    <div class="av_image">
                        <img src=${product.urlImage} alt="imaga_of_available">
                    </div>
                    <div class="av_info">
                        <h2>${product.product}</h2>
                        <p>${product.description}</p>
                        <h3>R$ ${Number(product.price).toFixed(2)} <span>Kg</span></h3>
                        <div class="av_icon">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <a href="#order" class="av_btn">Adicionar ao carrinho</a>
                    </div>
                </div>
            `
        }).join('')
    }).catch(e => alert(e.message))
})