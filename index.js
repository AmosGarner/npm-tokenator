


let fetchToken = async (tokenSource) => {
    return await fetch(tokenSource);
};

let Get = async (tokenSource) => {
    return await fetchToken(tokenSource);
};

let PopulateForms = async (endpoint, tokenSource) => {
    let token;

    const forms = Array.prototype.slice.call(document.querySelectorAll(`form[action=${endpoint}]`));
    if (forms.length < 1) {
        console.warn(`RSC.Tokenator: No forms with action '${endpoint}'`);
    }

    try {
        token = await Get(tokenSource);
    } catch {
        console.error("Token Service is not responding or an error occurred.");
        return;
    }

    for (let form in forms) {
        let inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'hidden');
        inputElement.setAttribute('name', 'token');
        inputElement.setAttribute('value', token);

        forms[form].appendChild(inputElement);
    }
};

module.exports = {
    PopulateForms,
    Get
};