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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if(!response.ok){
        alert('Erro ao enviar pedido')
        
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