//Trong tường hợp này ref chính là element
//rules = [required, email, phone]

const errorClass = ['!border-red-500', '!focus:shadow-sm', '!focus:shadow-red-100'];
const validator = (inputRef, messageErrorRef, rules) => {
    for (var rule of rules) {
        if (rule === 'required') {
            if (inputRef?.value?.trim().length === 0) {
                messageErrorRef.innerHTML = 'Không được để trống trường này';
                messageErrorRef.style.opacity = 1;
                inputRef.classList.add(...errorClass);
                return false;
            }
        } else if (rule === 'email') {
            // eslint-disable-next-line no-useless-escape
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const isEmail = regex.test(inputRef?.value);
            if (!isEmail) {
                messageErrorRef.innerHTML = 'Trường này phải là email';
                messageErrorRef.style.opacity = 1;
                inputRef.classList.add(...errorClass);
                return false;
            }
        } else if (rule === 'phone') {
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (vnf_regex.test(inputRef?.value) === false) {
                messageErrorRef.innerHTML = 'Số điện thoại không hợp lệ';
                messageErrorRef.style.opacity = 1;
                inputRef.classList.add(...errorClass);
                return false;
            }
        }
    }
    return true;
};

const onInput = (inputRef, messageErrorRef) => {
    if (inputRef) {
        inputRef.classList.remove(...errorClass);
    }
    if (messageErrorRef) {
        messageErrorRef.style.opacity = 0;
    }
};

//remove error when onInput
const removeValidatorOnInput = (arrayInputRef = [], arrayMessageErrorRef = []) => {
    for (let i = 0; i < arrayInputRef.length; i++) {
        arrayInputRef[i]?.addEventListener('input', () => onInput(arrayInputRef[i], arrayMessageErrorRef[i]));
    }
};

// arrayValidate = [
//     {
//         inputRef: ref,
//         messageErrorRef: ref,
//         rules = [required, email, phone]
//     }
// ]

const onBlur = (inputRef, messageErrorRef, rules) => {
    if (inputRef && messageErrorRef) {
        validator(inputRef, messageErrorRef, rules);
    }
};

//add validator when onBlur
const addValidatorOnBlur = (arrayValidate) => {
    for (let item of arrayValidate) {
        item?.inputRef?.addEventListener('blur', () => onBlur(item.inputRef, item.messageErrorRef, item.rules));
    }
};

const validatorMultiple = (arrayValidate) => {
    let flag = true;
    for (let item of arrayValidate) {
        if (!validator(item.inputRef, item.messageErrorRef, item.rules)) {
            flag = false;
        }
    }
    return flag;
};

export { validator, removeValidatorOnInput, addValidatorOnBlur, validatorMultiple, errorClass };
