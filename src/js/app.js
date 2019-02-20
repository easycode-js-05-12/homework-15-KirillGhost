// Styles
import './../css/style.css';

import { BudgetUIService } from './view/budgetUI.service';
import { container, newType, newDescr, newVal, addBtn } from './view/uiElements.config';

const budgetUIService = new BudgetUIService();

let inc = true;
let idType;

/**
 * @desc Changes operation type (income or expense)
 */
function onOperTypeChange() {
    inc = !Boolean(newType.selectedIndex);
}

/**
 * @desc Add button click
 */
function onAddBtnClick() {
    if (!newDescr.value || !newVal.value) return console.error('Введите данные');

    let type;
    type = newType.options[newType.selectedIndex].text;
    idType = (inc) ? 'income' : 'expense';
    budgetUIService.addNewEntry(inc, type, idType);
}

/**
 * @desc Delete button click
 * @param {event} e - Event
 */
function onDelBtnClick(e) {
    if (e.target.classList.contains('ion-ios-close-outline')) {

        const id = e.target.closest('.item').id;
        idType = (id.substr(0, 6) === 'income') ? 'income' : 'expense';
        budgetUIService.deleteCurEntry(id, idType);
        budgetUIService.updateTopView();
    }
}

// Event listeners
newType.addEventListener('change', onOperTypeChange);
addBtn.addEventListener('click', onAddBtnClick);
container.addEventListener('click', onDelBtnClick);