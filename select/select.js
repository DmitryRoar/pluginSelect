const getTemplate = ({placeholder, data = [{id: 666, value: 'empty'}], selectedId}) => {
    let text = placeholder ?? 'placeholder empty'

    const items = data.map(item => {
        let cls = ''
        if (item.id === selectedId) {
            text = item.value
            cls = 'selected'
        }
        return `<li class="select__item ${cls}" data-type='item' data-id='${item.id}'>${item.value}</li>`
    })

    return `
    <div class='select__backdrop' data-type='backdrop'></div>
    <div class="select__input" data-type="input">
        <span class="select__span" data-type="value">${text}</span>
        <i class="fa fa-chevron-down" data-type='arrow'></i>
    </div>
    <div class="select__dropdown">
        <ul class="select__list">
            ${items.join('')}
        </ul>
    </div>    
    `
}

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.#render()
        this.#setup()
    } 
    
    clickHandler = (event) => {
        const {type} = event.target.dataset
        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id)
        } else if (type === 'backdrop') {
            this.close()
        }
    }

    #render() {
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(this.options)
    }

    #setup() {
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    } 

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')
    }

    close () {
        this.$el.classList.remove('open')
        this.$arrow.classList.remove('fa-chevron-up')
        this.$arrow.classList.add('fa-chevron-down')
    }

    get current() {
        return this.options.data.find(i => i.id == this.selectedId)
    }

    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => el.classList.remove('selected'))
        this.$el.querySelector(`[data-id="${this.selectedId}"]`).classList.add('selected')
        this.options.onSelect ? this.options.onSelect(this.current) : null
        this.close()
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}