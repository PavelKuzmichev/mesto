let formElement = document.querySelectorAll('.popup__form');

let nameInput = document.querySelector('.profile__name');

let jobInput = document.querySelector('.profile__about');

let formInput1 = document.querySelector('.popup__input_name');

let formInput2 = document.querySelector('.popup__input_about');
formInput1.value = nameInput.textContent;
formInput2.value = jobInput.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.textContent = formInput1.value;
    jobInput.textContent = formInput2.value; 
}

let profileEditBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let formBtn = document.querySelector('.popup__submit-btn');

profileEditBtn.addEventListener('click', togglePopupVisibility);

popupCloseBtn.addEventListener('click', togglePopupVisibility);

formBtn.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle('popup__visible');
}

formElement.forEach((formNode) => {
    formNode.addEventListener('submit', formSubmitHandler );
});

let like = document.querySelectorAll('.element__like');
console.log (like);
function getlike (like) {
    like.classList.toggle ('element__like_active');}
for (let i = 0; i < like.length; i++) {
                like[i].addEventListener('click', 
                function(e){
                    getlike(e.currentTarget);
                });};
   
    

