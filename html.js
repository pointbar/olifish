document.addEventListener("DOMContentLoaded", function(event) {
    const form = document.querySelector('form')
    const aGaleries = document.querySelectorAll('a.gallery')

    form.onsubmit = event => {
        event.preventDefault()
        const query = document.querySelector('input').value
        location.hash = query
    }

    Array.from(aGaleries).map(a =>
        a.onclick = event => {
            event.preventDefault()
            const query = event.target.innerText
            location.hash = query
        }
    )
})

window.onhashchange = () => {
    const query = location.hash
    if (query) {
        const imgsSelect = ImgsDb.find(query)
        displayImgs(imgsSelect)
    }
}

const displayImgs = (imgsSelect) => {
    const area = document.querySelector('.imgs')
    const tpl = document.querySelector('#img')
    area.innerHTML = ''
    imgsSelect.map(item => {
        let a = tpl.content.querySelector('a')
        a.href = URL + item.fileName.img
        a.setAttribute('data-caption', `${item.Fr} - <i>${item.Lat}</i>`)
        let img = tpl.content.querySelector('img')
        img.src = URL + item.fileName.thumbnail
        img.title = item.model
        let pLatin = tpl.content.querySelector('p.latin')
        let pFr = tpl.content.querySelector('p.nom')
        pLatin.innerText = item.Lat
        pFr.innerText = item.Fr
        let clone = document.importNode(tpl.content, true)
        area.appendChild(clone)
    })
}