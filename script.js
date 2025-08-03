document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const lengthInput = document.getElementById('length');
    const lengthValueSpan = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy-button');

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+=-`~[]{};':\",./<>?";

    function updateLength() {
        lengthValueSpan.textContent = lengthInput.value;
        const min = lengthInput.min;
        const max = lengthInput.max;
        const val = lengthInput.value;
        const percentage = ((val - min) * 100) / (max - min);
        lengthInput.style.setProperty('--progress-percent', `${percentage}%`);
    }

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        let charPool = "";
        let password = "";

        if (uppercaseCheckbox.checked) charPool += uppercaseChars;
        if (lowercaseCheckbox.checked) charPool += lowercaseChars;
        if (numbersCheckbox.checked) charPool += numberChars;
        if (symbolsCheckbox.checked) charPool += symbolChars;

        if (charPool === "") {
            passwordInput.value = "Select an option!";
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool.charAt(randomIndex);
        }

        passwordInput.value = password;
    }

    function copyToClipboard() {
        const password = passwordInput.value;
        if (password && password !== "Select an option!") {
            navigator.clipboard.writeText(password).then(() => {
                alert("Password copied to clipboard!"); 
            });
        }
    }

    // Event Listeners
    lengthInput.addEventListener('input', updateLength);
    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyToClipboard);

    // Initial setup
    updateLength();
    generatePassword();
});