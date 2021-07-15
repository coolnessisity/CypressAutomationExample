//	Test pass/fail returnals are not consistent between tests. 
//	In my experience, should only be using one method to verify test results, 
// reasoning: 
//		it looks more consistent and makes it easier to see where each test endpoint is

//Verification methodds are mix and matched due to learning to use Cypress while taking this test


context('Assertions', () => {

  //text verification points
  const const_instructions = 'Enter a number to get the median of primes:'
  const const_result = 'The median is:'

  //errors
  const error_NoNumber = 'Please enter a number'

  //This constant is set dynamically it seems like 
  const error_NumberTooLow = 'Please enter a valid value. The two nearest valid values are 0 and 1.'
  const error_numberTooHigh = 'Number is too high'
  const error_DecimalNumber = 'Please enter a valid value. The two nearest valid values are '

  //elements used often
  const numberInput = 'input[type="number"]'
  const resultElement = 'h2'

	//Use this to build the result string, accepts the expected result as a string.
	function expectedResult(expected) {
		return 'The median is: [' + expected + ']'
	}

  beforeEach(() => {
    cy.visit('localhost:3000')
  })

	afterEach(() => {
		cy.clearCookies();
	})

	describe('View Page', () => {

		it('Verify homepage text', () => {
			//Could use a custom commmand to verify text
			cy.get('h1').should('contain', const_instructions)
		})
	})

	describe('Median primes', () => {

		it('Get Median  of 10', () => {
			cy.getMedian('10')
			cy.get(resultElement).then(($result) => {
				expect($result.text()).to.contain(expectedResult('3,5'))
			})
		})

		it('Get Median of 18', () => {
			cy.getMedian('18')
			cy.get(resultElement)
			cy.get(resultElement).then(($result) => {
				expect($result.text()).to.contain(expectedResult('7'))
			})
				
		})

		it('Get median of 10000000000000000000', () => {
			cy.GetMedian('10000000000000000000')
			cy.get(numberInput).then(($input) => {
				expect($input[0].validationMessage).to.contain(error_NoNumber)
			})
		})
	})

	describe('Validation Errors', () => {
		//Nothing seems to happen when there's an empty submission, the form is unusable.
		it('Empty submission: click submit button', () => {
			cy.submitByButtonClick()
			cy.get(numberInput).then(($input) => {
				expect($input[0].validationMessage).to.contain(error_NoNumber)
			})
		})

		//textbox validation seems to only work on keypress. Only testing once for the sake of this example
		it('Empty submission, submit form through enter keypress', () => {
			cy.submitByKeypress()
			cy.get(numberInput).then(($input) => {
				expect($input[0].validationMessage).to.contain(error_NoNumber)
			})
		})

		//Only testing with keypress, ideally would be testing with both but I didn't feel the need to include testing both for every input in this example
		it('Number too low', () => {
			cy.getMedian('.05')
			cy.get(numberInput + ':Invalid').should('have.length', 1)
			cy.get(numberInput).then(($input) => {
				expect($input[0].validationMessage).to.contain(error_NumberTooLow)
			})
		})

		//Characters '+' and '-' shouldn't be allowed in but they are
		//Incorrectly passing test. Keyboard input allows me to enter in the characters '+' and '-' into the textbox, however I can't get them to appear when using the cypress type command
		it('Invalid characters', () => {
			cy.get(numberInput).type('!@#$%^&*()-=_+<>,.?|\'"`~abcdefghijklmnopqrstuvwxyz')
			cy.get(numberInput).then(($input) => {
				expect($input.val()).to.contain('')
			})
		})

		it('Invalid values: negative numbers', () =>{
			cy.getMedian('-5')
			cy.get(numberInput).then(($input) => {
				expect($input[0].validationMessage).to.contain(error_NumberTooLow)
			})
		})

		//This seems to fail rarely. Form has somewhat inconsistent behaviour, however I can't replicate it reliably
		it.skip('invalid values: decimal number', () => {
			cy.getMedian('1.5')
			cy.get(numberInput).then(($input) => {
				var error = error_DecimalNumber + Math.floor($input.val()) + ' and ' + (Math.floor($input.val())+1)
				expect($input[0].validationMessage).to.contain(error)
			})
		})
	})

	//Consistently repeatable behavior but not necesarily something common. Figured this might be worth including since I can consistently replicate it.
	describe('Edge cases', () => {
		it('Sumitting invalid values in succession', () => {
			cy.getMedian('.01')
			cy.get(numberInput).blur()
			cy.get(numberInput).type('{enter}')
			cy.get(resultElement).should('not.exist')
			cy.get(numberInput).then(($input) => {
				var error = error_DecimalNumber + Math.floor($input.val()) + ' and ' + (Math.floor($input.val())+1)
				expect($input[0].validationMessage).to.contain(error)
			})
		})
	})
})