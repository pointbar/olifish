document.addEventListener("DOMContentLoaded", event => {

    const imgs = Array.from(Array(27).keys())
    imgsDB = []

    imgs.map(img => {
        let imgName = `img/thumb-${img+1}.jpg`

        fetch(imgName).then(
            response => response.blob()
        ).then(myBlob => {
            EXIF.getData(myBlob, function() {
                const location = EXIF.getIptcTag(this, "caption")
                const keywords = EXIF.getIptcTag(this, "keywords")
                const imgName = img
                imgsDB.push({ imgName: imgName, location: location, keywords: keywords })
            })
        })
    })


})