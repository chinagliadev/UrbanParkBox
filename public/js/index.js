const itensMenu = document.querySelectorAll('.item-lista')
const sections = document.querySelectorAll('.section-estacionamento')

itensMenu.forEach((item, index) => {
  item.addEventListener('click', () => {

    itensMenu.forEach(i => i.classList.remove('active'))

    sections.forEach(section =>
      section.classList.remove('active-section')
    )

    item.classList.add('active')

    sections[index].classList.add('active-section')
  })
})

const modal = document.getElementById('modal-liberar-veiculo')

modal.addEventListener('shown.bs.modal', () => {
  console.log('modal totalmente aberto')
})

console.log('oi')