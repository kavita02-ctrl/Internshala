// script.js

document.addEventListener('DOMContentLoaded', function () {
    const options = document.querySelectorAll('input[type="radio"]');
    
    options.forEach(option => {
        option.addEventListener('change', function () {
            const selectedOption = document.querySelector('input[name="selector"]:checked').nextElementSibling.textContent;
            console.log('Selected option:', selectedOption);
            // You can perform any action here based on the selected option
        });
    });
});
