let transactions = [
    {
        id: 1,
        amount: -700,
        text: 'Aluguel'
    },
    {
        id: 2,
        amount: 2000,
        text: 'Salario'
    },
]

function setAll() {
    transactions.forEach(item => Tconstructor(item))
}

setAll()

async function clean() {
    $('#transactionList').empty();
}

async function Tconstructor(transact) {

    // defining elements
    let transactionList = document.getElementById('transactionList')
    let li = document.createElement('LI')
    let span = document.createElement('SPAN')
    let button = document.createElement('BUTTON')
    button.setAttribute('class', 'delete-btn')
    button.addEventListener('click', () => { deleteTransaction(transact.id) })
    // defining elements

    let tText = document.createTextNode(transact.text);
    let tAmount = transact.amount;

    if (tAmount < 0) {
        li.setAttribute('class', 'minus')
    }
    else {
        li.setAttribute('class', 'plus')
    }

    button.innerHTML = 'x';

    li.appendChild(tText);
    span.innerHTML = tAmount;
    transactionList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
}


let myID;

function generateID() {
    myID = parseInt((Math.random() * 10))
    return myID
}

function assignID() {

    let tIds = transactions.map(transaction => transaction.id)
    generateID()

    while (tIds.indexOf(myID) != -1 || myID == 0) {
        generateID()
    }
    return myID
}

function add() {
    let inputText = document.getElementById('inputText').value
    let inputAmount = document.getElementById('inputAmount').value
    let inputID = assignID();

    if (inputText == "" || inputAmount == "") {
        return;
    }

    let newTransact = { id: inputID, amount: parseFloat(inputAmount), text: inputText }
    transactions.push(newTransact)

    document.getElementById('inputText').value = "";
    document.getElementById('inputAmount').value = "";
    Tconstructor(newTransact);
    Calculate();
}

function deleteTransaction(setID) {
    transactions = transactions.filter(transaction => transaction.id !== setID)

    clean();
    setAll();
    Calculate();

}

function Calculate() {

    let balance = document.getElementById('balance');
    let moneyPlus = document.getElementById('money-plus');
    let moneyMinus = document.getElementById('money-minus');

    if (typeof transactions !== 'undefined' && transactions.length > 0) {

        let transactionAmount = transactions.map(transaction => transaction.amount)

        let Incomes = transactionAmount.filter(item => item > 0);

        if (typeof Incomes !== 'undefined' && Incomes.length > 0) {
            Incomes = Incomes.reduce((acc, item) => acc += item).toFixed(2);
        }
        else {
            Incomes = 0;
        }

        let Expenses = transactionAmount.filter(item => item < 0);

        if (typeof Expenses !== 'undefined' && Expenses.length > 0) {
            Expenses = Expenses.reduce((acc, item) => acc += item).toFixed(2);
        }
        else {
            Expenses = 0;
        }

        let total = transactionAmount.reduce((acc, item) => acc += item).toFixed(2);

        balance.innerHTML = '$' + total;
        moneyPlus.innerHTML = '$' + Incomes;
        moneyMinus.innerHTML = '$' + Expenses;
    }
    else {
        balance.innerHTML = '$' + 0;
        moneyPlus.innerHTML = '$' + 0;
        moneyMinus.innerHTML = '$' + 0;
    }
}

Calculate()