const email = document.getElementById('email')
        const password = document.getElementById('password')
        const form = document.getElementById('form')
        const eye = document.getElementById('eye-icon')



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
                email: email.value,
                password: password.value
            }

            fetch('http://10.23.1.5:3003/login', {
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