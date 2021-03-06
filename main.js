class Calculator{
    constructor (previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number) { 
        if(number === '.' && this.currentOperand.includes('.')) return
       //this.currentOperand = number
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN (prev) || isNaN (current)) return
        // console.log(this.operation)
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break  
            case '/':
                computation = prev / current
                break 
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 1})
        }
        if(decimalDigits != null) {
           // console.log(decimalDigits)
            return `${integerDisplay}.${decimalDigits}`
        } else {
            // console.log(integerDisplay)
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equal]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
 //console.log(numberButtons)

numberButtons.forEach (btn =>{
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach (btn =>{
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', btn =>{
    calculator.clear()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', btn =>{
    calculator.clear()
    calculator.updateDisplay()
})

equalButton.addEventListener('click',btn =>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',btn =>{
    calculator.delete()
    calculator.updateDisplay()
})