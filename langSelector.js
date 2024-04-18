const arrInputs = document.querySelectorAll('input');

for (let input of arrInputs) {
    if(localStorage.getItem('lang') === input.value) {
        input.checked = true;
    }

    input.addEventListener('click', function() {
        localStorage.setItem('lang', this.value);

        window.location.reload();
    })
}

console.log(localStorage.getItem('lang'));