const itensDaLista = document.querySelectorAll('.item-lista')
const sectionEstacionamento = document.querySelectorAll('.section-estacionamento')

itensDaLista.forEach((item, index) => {
  item.addEventListener('click', e => {
    e.preventDefault()

    itensDaLista.forEach(i => i.classList.remove('active'))

    sectionEstacionamento.forEach(section =>
      section.classList.remove('active-section')
    )

    item.classList.add('active')

    sectionEstacionamento[index].classList.add('active-section')
  })
})
