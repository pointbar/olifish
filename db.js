const Db = class {
    constructor() {
        this.data = []
    }

    findByName(query) {
        return this.data.filter(item => {
            if (item.Fr) {
                return this._slugify(item.Fr) === this._slugify(query)
            }
        })
    }

    find() {
        return this.data
    }

    insert(meta) {
        if (this._isObjEmpty(meta)) {
            throw 'Try to insert empty record'
        } else {
            return this.data.push(meta)
        }
    }

    _isObjEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    _slugify(text) {
        const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
        const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
        const p = new RegExp(a.split('').join('|'), 'g')

        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c =>
                b.charAt(a.indexOf(c))) // Replace special chars
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
    }

}