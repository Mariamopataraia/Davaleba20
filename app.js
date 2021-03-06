const formValidator = (form, fieldsConfig, onValidateSuccess, onValidationError) => {
    const validateField = (fieldElement, fieldConfig) => {
      const value = fieldElement.value;
      const rules = fieldConfig.rules;
      const formGroup = fieldElement.closest('.form-group');
      const errorElement = formGroup.querySelector('.form-error-message');
      let numbers = /^[-+]?[0-9]+$/;
  
      const fieldValidationResult = {name: fieldConfig.name, value: value, errors: []};
      rules.forEach(rule => {
          if (rule.required && !value) {
          fieldValidationResult.errors.push(rule.message);
        }
          if (rule.maxLength && `${value}`.length > rule.maxLength) {
          fieldValidationResult.errors.push(rule.message);
        }
          if (rule.minLength && `${value}`.length < rule.minLength) {
          fieldValidationResult.errors.push(rule.message);
         }
          if (rule.mobileNumber && value){
             if(value.startsWith('+') && value.length !== 13){
              fieldValidationResult.errors.push(rule.message);
             }
             if(value.startsWith('+') && value.length !== 9){
              fieldValidationResult.errors.push(rule.message);
             }
         }
         if(rule.idNumber && value){
             if(value.length!== 11){
              fieldValidationResult.errors.push(rule.message);
             }
          //    if(isNaN(Number(value))){
          //     fieldValidationResult.errors.push(rule.message);
          //    }
             if(/^[0-9]+$/.test(value) === false){
              fieldValidationResult.errors.push(rule.message);
             }
         }
      });
  
      if(fieldValidationResult.errors.length > 0){
        errorElement.innerText = fieldValidationResult.errors.join('\n');
      } else {
        errorElement.innerText = '';
      }
      // console.log(fieldValidationResult);
  
      return fieldValidationResult;
    }
  
    const validateOnChange = () => {
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        fieldElement.addEventListener('input', e => {
          validateField(e.target, fieldConfig);
        });
      })
    }
  
    const validateOnSubmit = () => {
      const validatedFields = [];
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        validatedFields.push(validateField(fieldElement, fieldConfig));
      });
  
      return validatedFields;
    }
  
    const listenFormSubmit = () => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('submit');
        const errors = [];
        const validationResult = validateOnSubmit();
        validationResult.forEach(result => {
          errors.push(...result.errors);
        });
        if(errors.length === 0){
          onValidateSuccess(validationResult);
        }else {
          onValidationError(validationResult);
        }
        console.log(validationResult);
      });
    }
    listenFormSubmit();
    validateOnChange();
  }

  const fieldsConfig = [
    {
        name: 'email',
        rules: [
          {required: true, message: 'Email address is required.'},
        ]
    },
    {
      name: 'first_name',
      rules: [
        {required: true, message: 'First name is required.'},
        {maxLength: 10, message: '?????????????????????????????? ??????????????????????????? ???????????? ???????????? ???????????????????????? 10'},
      ]
    },
    {
      name: 'last_name',
      rules: [
        {required: true, message: 'Last name is required.'},
      ]
    },
    {
      name: 'zip_code',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    },
    {
      name: 'personal_number',
      rules: [
        {required: true, message: 'Personal number is required.'},
        {maxLength: 11, message: '?????????????????????????????? ?????????????????? 11 ?????????????????????'},
        {idNumber: true, message: '?????????????????????????????? ?????????????????? ?????????????????????'},
      ]
    },
    {
      name: 'mobile_number',
      rules: [
        {required: true, message: 'Mobile number is required.'},
        {minLength: 9, message: '?????????????????????????????? ????????????????????? 9 ?????????????????????'},
        {maxLength: 13, message: '?????????????????????????????? ???????????????????????? 13 ?????????????????????'},
        {mobileNumber: true, message: '?????????????????????????????? ?????????????????? ?????????????????????'},
      ]
    },
  ];
  console.log(isNaN ('mobile_number'));
  
  const form = document.querySelector('#user-registration-form');
  
  const onFormSubmitSuccess = (fields) => {
    console.log('We can send data to server', fields);
    addUser(fields);
}
const onFormSubmitError = (fields) => {
  console.log('Error', fields);
}
formValidator(form, fieldsConfig, onFormSubmitSuccess, onFormSubmitError);
function getUsers(){
    fetch('http://api.kesho.me/v1/user-test/index')
    .then(resp =>{
     return resp.json();
    })
    .then(data => {
      console.log(data);
      var table = document.getElementById("table");
      if(data.length > 0){
          var temp = "";
          data.forEach((u) => {
              temp +="<tr>";
              temp += "<td>"+u.id+ "</td>";
              temp += "<td>"+u.email+ "</td>";
              temp += "<td>"+u.first_name+ "</td>";
              temp += "<td>"+u.last_name+ "</td>";
              temp += "<td>"+u.gender+ "</td>";
              temp += "<td>"+u.mobile+ "</td>";
              temp += "<td>"+u.pn+ "</td>";
              temp += "<td>"+u.zip+ "</td>";
              temp += "<td>"+u.status+"</tr>";
          });
          document.getElementById("data").innerHTML = temp;
        }
      })
      .catch(error => {
        console.log(error);
    });
  }
  getUsers();

//   Task 4 - 4. New User ????????????????????? ??????????????????????????? ???????????? ???????????????????????? ?????????????????? ??????????????? ?????????????????? ??????????????? (???????????????-?????????????????????.png). Submit-?????? ?????????????????????????????? ???????????????????????? ??????????????????????????????
async function addUser(userData){
    const response = await fetch('http://api.kesho.me/v1/user-test/index/', {
        method: 'post',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'}
    });
    const respData = await response.json();
    console.log(respData);
}
async function addUser(userData){
    const response = await fetch('http://api.kesho.me/v1/user-test/index/', {
        method: 'post',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'}
    });
    const respData = await response.json();
    console.log(respData);
}

function modal(modalId){
    const modalWrapper = document.querySelector(modalId);
    const modalContent = modalWrapper.querySelector('.modal-content');
    const closeBtn = modalWrapper.querySelector('.close');

    modalWrapper.style.display = 'block';   

    modalWrapper.addEventListener('click', e => {
        modalWrapper.style.display = 'none';
    })

    closeBtn.addEventListener('click', e => {
        modalWrapper.style.display = 'none';  
});
}

const modalButtons = document.querySelectorAll('[data-modal-target]');
modalButtons.forEach((btn) => {
    btn.addEventListener('click', e => {
        modal(e.target.dataset.modalTarget);
        console.log(e.target.dataset.modalTarget);
    })
});
console.log(modalButtons);