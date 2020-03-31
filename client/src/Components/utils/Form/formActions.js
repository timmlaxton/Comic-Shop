

export const validate = (element, formdata = []) => {
    var error = [true, ''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid,message] : error;

    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message] : error;
    }
    return error
}

   


export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }

    const newElement = {
    ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if(element.blur){
        var validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validiationMessage = validData[1];
     }

    newElement.touched = element.blur;
    newFormdata[element.id]= newElement;

    return newFormdata;


}

export const generateData = (formdata, formName) => {
    var dataToSubmit = {};

    for(var key in formdata){
            dataToSubmit[key] = formdata[key].value;

        }
    

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
        var formIsValid = true;

        for(var key in formdata){
            formIsValid = formdata[key].valid && formIsValid
        }
        return formIsValid;
}