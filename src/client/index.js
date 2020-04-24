import { processData } from './js/app';
import { checkSemanticSupport } from './js/checkSupport';
import { allClear } from './js/allClear';
import { showCard } from './js/showCard';
import { printPage } from './js/printPage';

import './styles/normalize.scss';
import './styles/reset.local.scss';
import './styles/style.scss';

//Run check for date type support
checkSemanticSupport();
//Attach event listener to print button
document.querySelector('#print-btn').addEventListener('click', printPage);


export {
    processData,
    allClear,
    showCard
}