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
const qnt = document.getElementById('qnt')
const products = ['Morango', 'Couve-flor', 'Alface', 'Pimentão', 'Repolho', 'Brocoli', 'Tomate', 'Melancia']
const product = document.getElementById('product')
const address = document.getElementById('address')


document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    const value = product.value.trim().toLowerCase()

    if(!products.some(p => p.toLowerCase() === value)){
        alert(`${product.value} não está disponível na lista`)

        return
    }
    
    alert(`${qnt.value} ${product.value} para o endereço ${address.value} solicitado pelo cliente ${client.value}`)
})