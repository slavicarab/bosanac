const userForm = document.getElementById('userForm');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userAddress = document.getElementById('userAddress');
const userFloor = document.getElementById('userFloor');
const goalAddress = document.getElementById('goalAddress');
const goalFloor = document.getElementById('goalFloor');
const category = document.getElementById('category');
const moveType = document.getElementById('moveType');
const moveDate = document.getElementById('moveDate');
const btnSubmit = document.getElementById('btnSubmit');



function alertMessage(element, message){
    const aMessage = document.createElement('small');
    aMessage.innerHTML = message;
    element.after(aMessage);
    aMessage.style.color='red';
    return false;

}



function validateForm (event){
    event.preventDefault();
    const userNameVal = userName.value;
    const userEmailVal = userEmail.value;
    const userAddressVal = userAddress.value;
    const userFloorVal = userFloor.value;
    const goalAddressVal = goalAddress.value;
    const goalFloorVal = goalFloor.value;
    const categoryVal = category.value;
    const moveTypeVal = moveType.value;
    const moveDateVal = moveDate.value;
    
    if (userNameVal === ''){
        return alertMessage(userName, 'Enter a name please')
    }

    if(userEmailVal === ''){
        return alertMessage(userEmail, 'Enter valid e-mail-addresse')
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(userEmailVal)){
        return alertMessage(userEmail, 'Enter a valid e-mail-addresse');
    }
        
    if(userAddressVal===''){
        return alertMessage(userAddress, 'Enter an address please')
    }

    if(goalAddressVal===''){
        return alertMessage(goalAddress, 'Enter an address please')
    }

        fetch("/submit", {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({userNameVal,userEmailVal,userAddressVal,goalAddressVal, userFloorVal, goalFloorVal,categoryVal, moveTypeVal, moveDateVal})
        })
        .then((response) => response.json())
        .then((data) => {
            window.location.href = data.redirect;

        })
        .catch((error) => {
            console.log("Error:", error)
        })

    }
userForm.addEventListener('submit', validateForm);

