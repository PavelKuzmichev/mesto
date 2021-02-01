export default class UserInfo 
{
    constructor (name, job)
    {this._name = name;
    this._job = job;
    
}

getUserInfo (){
    
    /*const formInputName = document.querySelector(".popup__input_form_name");
    this._name = formInputName.value;
    console.log(this._name);
    console.log(formInputName.value);
    const formInputAbout = document.querySelector(".popup__input_form_about");
    this._job = formInputAbout.value;
    return formInputName.value*/
}
setUserInfo (){
    this._inputList = this._element.querySelectorAll('.popup__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name,input.job] = input.value);
    
    return this._formValues;
}
}