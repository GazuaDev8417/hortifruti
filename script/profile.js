const logout = document.getElementById('logout-icon')




logout.addEventListener('click', ()=>{
    const decide = window.confirm('Tem certeza que deseja deslogar da sua conta?')

    if(decide){
        localStorage.clear()
        window.location.href = '../index.html'
    }
})