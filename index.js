import './select/styles.scss'
import {Select} from './select/select'


const select = new Select('#select', {
    placeholder: 'Please select an item',
    // selectedId: 5,
    data: [
        {id: 1, value: 'Angular'},
        {id: 2, value: 'React'},
        {id: 3, value: 'React Native'},
        {id: 4, value: 'Express'},
        {id: 5, value: 'NextJS'},
        {id: 6, value: 'MongoDB'}
    ],
    onSelect(item) {
        console.log('selected item', item)
    }
})

window.s = select