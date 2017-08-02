document.addEventListener("DOMContentLoaded", function(event) {
    const form = document.querySelector('form')
    const aGaleries = document.querySelectorAll('a.gallery')

    form.onsubmit = (event) => {
        event.preventDefault()
        const query = document.querySelector('input').value
        const imgsSelect = ImgsDb.find(query)
        displayImgs(imgsSelect)
    }

    Array.from(aGaleries).map(a =>
        a.onclick = (event) => {
            const query = event.target.innerText
            const imgsSelect = ImgsDb.find(query)
            displayImgs(imgsSelect)
        }
    )
})

const displayImgs = (imgsSelect) => {
    const area = document.querySelector('.imgs')
    const tpl = document.querySelector('#img')
    area.innerHTML = ''
    imgsSelect.map(item => {
        let url = 'https://raw.githubusercontent.com/olivier-colli/olifish-tofs/master/'
        let a = tpl.content.querySelector('a')
        a.href = url + item.fileName.img
        a.setAttribute('data-caption', `${item.Fr} - <i>${item.Lat}</i>`)
        let img = tpl.content.querySelector('img')
        img.src = url + item.fileName.thumbnail
        img.title = item.model
        let pLatin = tpl.content.querySelector('p.latin')
        let pFr = tpl.content.querySelector('p.nom')
        pLatin.innerText = item.Lat
        pFr.innerText = item.Fr
        let clone = document.importNode(tpl.content, true)
        area.appendChild(clone)
    })
}