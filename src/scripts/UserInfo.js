export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}){
        this._userName = userNameSelector;
        this._userDescription = userDescriptionSelector;
    }
    getUserInfo  () {
        const userName = this._userName.textContent;
        const aboutMe = this._userDescription.textContent;
        console.log(this._userName.textContent)
        return {userName : userName, aboutMe: aboutMe};
    }
    setUserInfo = ({newUser, newDescription}) =>{
        this._userName.textContent = newUser;
        this._userDescription.textContent = newDescription;
    }
} 



/*export default class UserInfo 
{
    constructor(nameInput, jobInput) {
        this._nameInput = nameInput;
        this._jobInput = jobInput;
        this._name = '';
        this._job = ''; 
       
                     }
                     setUserInfo = (newName, newJob) =>  {
                        this._name = newName;
                            this._job = newJob; 
                            console.log(this._name)
                            
                    }
              updateUserInfo = () => {
                
                this._nameInput.textcontent = this._name;
                this._jobInput.textcontent = this._job;
              console.log(this._name)
               
                }
                
            
getUserInfo =  () => {
    
    return {
        name: this._name,
        job: this._job
    }
      
}

}*/