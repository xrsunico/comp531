import Action from '../../actions'


export const updateHeadline=(text)=> {
	return ({type: Action.UPDATE_PROFILE, headline: text})
}
 
export function updateForm(e,newUsername, newEmail, newPhone, newZip, newPsw, newPwconf){
	e.preventDefault()
	console.log("sfhgjk")
	if (newUsername) {
			if (!newUsername.match('^[a-zA-Z][a-zA-Z0-9]*')) {
				console.log("sds")
				return ({type: Action.ERR, errMsg: 'Invalid username. Upper case and lower case letters and numbers only; Starts with a letter'})
			}
    	}
		if (newEmail) {
			if (!newEmail.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
				return ({type: Action.ERR, errMsg: 'Invalid email. e.g. :@b.edu/a@b.co'})
			}
		}
		if (newPhone) {
			if (!newPhone.match('^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$')) {
				return ({type: Action.ERR, errMsg:'Invalid phone. e.g.: ###-###-####'})
			}
		}
		if (newZip) {
			if (!newZip.match('^([0-9]{5})')) {
				return ({type: Action.ERR, errMsg:'Invalid zipcode. e.g.: #####'})
			}
		}
		if (newPsw || newPwconf) {
			if (newPsw !== newPwconf) {
				return ({type: Action.ERR, errMsg:'Password do not match'})
			}
		}
		
			return ({type:Action.UPDATE_PROFILE, username: newUsername, email: newEmail, 
			phone: newPhone, zipcode:newZip})
}
