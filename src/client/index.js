
import { processData } from './js/app'
import { checkSemanticSupport } from './js/checkSupport'
import { allClear } from './js/allClear'
import './styles/normalize.scss'
import './styles/reset.local.scss'
import './styles/style.scss'

checkSemanticSupport();

export {
    processData,
    allClear
}