const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    console.log(target);
    target.style.display = null;
}



document.querySelectorAll('.js-modal'), forEach(a => {
    addEventListener('click', openModal)
})
