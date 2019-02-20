import { budVal, budInc, budExp, newDescr, newVal, incList, expList } from './uiElements.config';

let budget = {
    total: 0,
    totalInc: 0,
    totalExp: 0,
    income: [],
    expense: []
};

let incNum = 0;
let expNum = 0;

export class BudgetUIService {   
    /**
     * @desc Adds new entry (income or expense)
     * @param {boolean} inc - Is operation income or not
     * @param {string} type - Selected type (+/-)
     * @param {string} idType - Operation type name
     */
    addNewEntry(inc, type, idType) {

        let newEntry = {
            id: 0, 
            descr: newDescr.value,
            val: newVal.value
        };

        if (inc) {
            newEntry.id = incNum;            
            budget.income.push(newEntry);
            budget.totalInc += Number(newVal.value);
        } else {
            newEntry.id = expNum;
            budget.expense.push(newEntry);
            budget.totalExp += Number(newVal.value);
        }     
        budget.total = budget.totalInc - budget.totalExp;

        this.updateTopView();
        this.updateContainer(inc, type, idType);

        newDescr.value ='';
        newVal.value = '';
    }

    /**
     * @desc Updates data in page top
     */
    updateTopView() {

        budVal.textContent = budget.total;
        budInc.textContent = '+ ' + budget.totalInc;
        budExp.textContent = '- ' + budget.totalExp;
    }

    /**
     * @desc Updates data in page container
     * @param {boolean} inc - Is operation income or not
     * @param {string} type - Selected type (+/-)
     * @param {string} idType - Operation type name (income or expense)
     */
    updateContainer(inc, type, idType) {

        let template;

        if (inc) {
            template = this.entryTemplate(incNum, type, idType);
            incNum++;
            incList.insertAdjacentHTML('beforeend', template)
        } else {
            template = this.entryTemplate(expNum, type, idType);
            expNum++;
            expList.insertAdjacentHTML('beforeend', template);
        }
    }

    /**
     * @desc Adds markup for new entry
     * @param {number} entryId - New entry id
     * @param {string} type - Selected type (+/-)
     * @param {string} idType - Operation type name
     * @returns {string} New entry markup
     */
    entryTemplate(entryId, type, idType) {
        return `
            <div class="item clearfix" id="${idType}-${entryId}">
                <div class="item__description">${newDescr.value}</div>
                <div class="right clearfix">
                    <div class="item__value">${type} ${newVal.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * @desc Deletes selected entry
     * @param {string} id - Income id
     * @param {string} curType - Operation type (income or expense)
     * @returns {object} Deleted entry
     */
    deleteCurEntry(id, curType) {

        let deletedEntry;

        const idNum = id.slice(-1);

        for (let i = 0; i < budget[curType].length; i++) {
            if (budget[curType][i].id === Number(idNum)) {

                if (curType === 'income') {
                    budget.totalInc -= budget[curType][i].val;
                    budget.total -= budget[curType][i].val;
                } else {
                    budget.totalExp -= Number(budget[curType][i].val); 
                    budget.total += Number(budget[curType][i].val); 
                }

                deletedEntry = budget[curType].splice(i, 1);
                break;
            }
        }
        this.deleteEntryFromView(id);

        return deletedEntry;
    }

    /**
     * @desc Removes current entry from list
     * @param {string} id - Entry id
     */    
    deleteEntryFromView(id) {
        const target = document.getElementById(id);
        target.parentElement.removeChild(target);
    }
}