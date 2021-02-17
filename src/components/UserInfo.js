export default class UserInfo {
    constructor({ name, job, avatar}) {
        this._userName = name;
        this._userJob = job;
        this._avatar = avatar;
    }
    getUserInfo() {
        const userName = this._userName.textContent;
        const aboutMe = this._userJob.textContent;

        return { userName: userName, aboutMe: aboutMe };
    }
    setUserInfo = ({ newUser, newJob }) => {
        this._userName.textContent = newUser;
        this._userJob.textContent = newJob;
    };
}



