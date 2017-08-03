ImgsDb = new Db()

const insertImg = (fields, collection = ImgsDb) =>
    collection.insert(fields)

const getFileNames = () =>
    Array.from(Array(IMGS_COUNT).keys()).map(
        img => {
            return {
                img: `${URL}img-${img+1}.jpg`,
                thumbnail: `${URL}thumb-${img+1}.jpg`
            }
        }
    )

const extractFieldsFromKeywords = (keywords) => {
    const fields = {}
    fields.keyword = []
    keywords.forEach(keyword => {
        if (!keyword.match(/\w*:/)) {
            fields.keyword.push(keyword)
        } else {
            let field = keyword.split(':')
            fields[field[0]] = decodeURIComponent(escape(field[1].trim()))
        }
    })
    return fields
}

const saveRecord = (fileName, blob) => {
    EXIF.getData(blob, function() {
        const fields = convertExifToFields(this)
        fields.fileName = fileName
        insertImg(fields)
    })
}

const convertExifToFields = (exifData) => {
    const exifKeywords = function() {
        if (typeof EXIF.getIptcTag(exifData, 'keywords') === 'string') {
            return [EXIF.getIptcTag(exifData, 'keywords')]
        } else {
            return EXIF.getIptcTag(exifData, 'keywords') || []
        }
    }()
    const fields = extractFieldsFromKeywords(exifKeywords)
    fields.dateCreated = EXIF.getIptcTag(exifData, 'dateCreated') || new Date('01/01/2010')
    fields.location = EXIF.getIptcTag(exifData, 'caption') || ''
    fields.model = EXIF.getTag(exifData, 'Model') || []
    return fields
}


const readAndSaveImgsMetas = (fileNames, collection = ImgsDb) =>
    fileNames.map(fileName => {
        fetch(fileName.thumbnail).then(
            response => response.blob()
        ).then(blob => {
            saveRecord(fileName, blob)
        })
    })