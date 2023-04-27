// $.get("url-to-server", function(data) {
//   console.log(data);
// });
document.addEventListener('DOMContentLoaded', () => {

  const generateModal = document.querySelector('.generator-modal');
  const generateUserBtn = generateModal.querySelector('#generate-user-btn');
  const genderSelect = document.querySelector('.gender-select');
  const avatar = document.querySelector('.user-avatar');
  const fullName = document.querySelector('.user-name');
  const phone = document.querySelector('.user-phone');
  const email = document.querySelector('.user-email');
  const address = document.querySelector('.user-address');
  const table = document.querySelector('.table');
  const spinner = document.querySelector('#spinner');
  const successMessage = document.querySelector('#success-message');
  const errorMessage = document.querySelector('#error-message');

  

  let newRow;
  let detailsBtn;

  function createUserRow(userAvatar, userName, userEmail, userPhone,userAddress,gender) {
    newRow = table.insertRow(1);
    const avatarCell = newRow.insertCell(0);
    const fullNameCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const phoneCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    avatarCell.innerHTML = `<div class="info__user-icon">
                            <img src="${userAvatar}" alt="${userName}" />
                          </div>`
    fullNameCell.textContent = userName;
    emailCell.textContent = userEmail;
    phoneCell.textContent = userPhone;
    actionCell.innerHTML = '<button type="button" id="details-btn" class="my-btn"  data-toggle="modal" data-target="#myModal3">Details</button>';

      /* Button Details */
    detailsBtn = document.querySelector('#details-btn');
    const modalUserName = document.querySelector('.user-name-details');
    const modalUserEmail = document.querySelector('.user-email-details');
    const modalUserPhone = document.querySelector('.user-phone-details');
    const modalUserAddress = document.querySelector('.user-address-details')
    const modalUserGender = document.querySelector('.user-gender-details')
    const modalUserAvatar = document.querySelector('.user-avatar-details');

    detailsBtn.addEventListener('click', () => {
      modalUserAvatar.src = userAvatar;
      modalUserName.textContent = userName;
      modalUserEmail.textContent = userEmail;
      modalUserPhone.textContent = userPhone;
      modalUserGender.textContent = gender;
      modalUserAddress.textContent = userAddress;
  });

    return newRow;
  }

  /*Button generate-user*/
  


  generateUserBtn.addEventListener('click', async () => {
    spinner.style.display = 'block';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    const gender = genderSelect.value;
    const response = await fetch(`https://randomuser.me/api/?gender=${gender}`);
    const data = await response.json();
    const user = data.results[0];
    const userAvatar = user.picture.large;
    const userName = `${user.name.first} ${user.name.last}`;
    const userEmail = user.email;
    const userPhone = user.phone;
    const userAddress = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}, ${user.location.postcode}`;
    avatar.src = userAvatar;
    fullName.textContent = userName;
    email.textContent = userEmail;
    phone.textContent = userPhone;
    const generateRow = createUserRow(userAvatar, userName, userEmail, userPhone, userAddress, gender);
     fetch('https://randomuser.me/api/?gender')
    .then(response => {
      spinner.style.display = 'none';
      
      if (response.ok) {
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 2000);
      } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
          errorMessage.style.display = 'none';
        }, 2000);
      }
    })
    .catch(error => {
      spinner.style.display = 'none';
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 2000);
    });
  });



  /* Button create-user */
  const createModal = document.querySelector('.create-modal')
  const createUserBtn = createModal.querySelector('#create-user-btn');
  const userForm = createModal.querySelector('#user-form');
  createUserBtn.addEventListener('click', () => {
    /* Validator */
    const inputName = userForm.querySelector('#name');
    const inputSurname = userForm.querySelector('#surname');
    const inputPhone = userForm.querySelector('#phone');
    const inputEmail = userForm.querySelector('#email');

    function validatePhoneNumber(inputPhone) {
      const regex = /^\d{10}$/
    return regex.test(inputPhone.value);
    }

    function validateEmail(inputEmail) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(inputEmail.value);
    }

    if (inputName.value.trim() === '') {
      inputName.classList.add('is-invalid');
    } else {
      inputName.classList.remove('is-invalid');
    }

     if (inputSurname.value.trim() === '') {
       inputSurname.classList.add('is-invalid');
    } else {
      inputSurname.classList.remove('is-invalid');
    }

    if (!validateEmail(inputEmail)) {
      inputEmail.classList.add('is-invalid');
    }else {
      inputEmail.classList.remove('is-invalid');
    }

    if (!validatePhoneNumber(inputPhone)) {
      inputPhone.classList.add('is-invalid');
    } else {
      inputPhone.classList.remove('is-invalid');
    }
    if (inputName || inputSurname || inputEmail || inputPhone === false) {
      console.log('1');
    }


    


    const imageUrl = photo.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const userAvatar = reader.result;
      const userName = `${userForm.elements.name.value} ${userForm.elements.surname.value}`
      const userEmail = userForm.elements.email.value;
      const userPhone = userForm.elements.phone.value;
      const gender = userForm.elements.gender.value;
      const userAddress = userForm.elements.address.value;
      avatar.src = userAvatar;
      fullName.textContent = userName;
      email.textContent = userEmail;
      phone.textContent = userPhone;
      const createRow = createUserRow(userAvatar, userName, userEmail, userPhone, userAddress, gender);
      userForm.reset();
    });
    if (imageUrl) {
      reader.readAsDataURL(imageUrl);
    }
  });
});