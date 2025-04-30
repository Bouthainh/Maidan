console.log("JS file is connected");

function showError(input, message) {
    const error = document.createElement('small');
    error.className = 'error-message';
    error.style.color = 'pink';
    error.innerText = message;
    input.style.border = '1px solid red';
    input.parentNode.insertBefore(error, input.nextSibling);
}

function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(e => e.remove());
    form.querySelectorAll('input, select, textarea').forEach(i => i.style.border = '');
}

function isFutureDate(dateStr) {
    const inputDate = new Date(dateStr);
    const today = new Date();
    return inputDate > today;
}

document.addEventListener("DOMContentLoaded", () => {
    // Contact Us Form
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearErrors(contactForm);

            let valid = true;

            const firstName = contactForm.firstName;
            const lastName = contactForm.lastName;
            const mobile = contactForm.mobile;
            const gender = contactForm.gender;
            const dob = contactForm.dateOfBirth;
            const email = contactForm.email;
            const language = contactForm.language;
            const message = contactForm.message;

            if (!/^[A-Za-z\s]{2,50}$/.test(firstName.value)) {
                showError(firstName, "First Name must contain only letters and be 2–50 characters long.");
                valid = false;
            }

            if (!/^[A-Za-z\s]{2,50}$/.test(lastName.value)) {
                showError(lastName, "Last Name must contain only letters and be 2–50 characters long.");
                valid = false;
            }

            if (!/^\d{10}$/.test(mobile.value)) {
                showError(mobile, "Mobile number must be exactly 10 digits.");
                valid = false;
            }

            if (!gender.value) {
                showError(gender, "Please select your gender.");
                valid = false;
            }

            if (isFutureDate(dob.value)) {
                showError(dob, "Date of birth cannot be in the future.");
                valid = false;
            }

            if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email.value)) {
                showError(email, "Please enter a valid email address.");
                valid = false;
            }

            if (!language.value) {
                showError(language, "Please select a language.");
                valid = false;
            }

            if (!message.value.trim()) {
                showError(message, "Message cannot be empty.");
                valid = false;
            }

            if (!valid) {
                message.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            const formData = {
                language: language.value,
                firstName: firstName.value,
                lastName: lastName.value,
                mobile: mobile.value,
                gender: gender.value,
                dateOfBirth: dob.value,
                email: email.value,
                message: message.value
            };

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert("Message sent successfully!");
                    contactForm.reset();
                } else {
                    alert(result.message || "Submission failed. Please check your inputs.");
                }
            } catch (error) {
                alert("Something went wrong while submitting the form.");
                console.error("Error:", error);
            }
        });
    }

    // Ministry Rep Form
    const repForm = document.getElementById("rep-form");
    if (repForm) {
        repForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearErrors(repForm);

            let valid = true;
            const name = repForm['rep-name'];
            const email = repForm['email-rep'];
            const checkbox = repForm['rep-confirmation'];

            if (!/^[A-Za-z\s]{7,50}$/.test(name.value)) {
                showError(name, "Full name must be at least 7 characters and only letters.");
                valid = false;
            }

            if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email.value)) {
                showError(email, "Enter a valid email address.");
                valid = false;
            }

            if (!checkbox.checked) {
                showError(checkbox, "You must confirm your official status.");
                valid = false;
            }

            if (!valid) {
                checkbox.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            const formData = {
                fullName: name.value,
                email: email.value
            };

            try {
                const response = await fetch(repForm.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert("Message sent successfully!");
                    repForm.reset();
                } else {
                    alert(result.message || "Submission failed. Please check your inputs.");
                }
            } catch (error) {
                alert("Something went wrong while submitting the form.");
                console.error("Error:", error);
            }
        });
    }

    // Stadium Admin Form
    const adminForm = document.getElementById("admin-form");
    if (adminForm) {
        adminForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearErrors(adminForm);

            let valid = true;

            const name = adminForm["fullName"];
            const stadium = adminForm["stadiumName"];
            const email = adminForm["email"];
            const position = adminForm["position"];
            const checkbox = document.getElementById("admin-confirmation");

            if (!/^[A-Za-z\s]{7,50}$/.test(name.value)) {
                showError(name, "Full name must be at least 7 characters and only letters.");
                valid = false;
            }

            if (!/^[A-Za-z\s]{5,90}$/.test(stadium.value)) {
                showError(stadium, "Stadium name must be at least 5 characters.");
                valid = false;
            }

            if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email.value)) {
                showError(email, "Enter a valid email address.");
                valid = false;
            }

            if (!position.value) {
                showError(position, "Please select your position.");
                valid = false;
            }

            if (!checkbox.checked) {
                showError(checkbox, "You must confirm your official status.");
                valid = false;
            }

            if (!valid) {
                checkbox.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            const formData = {
                fullName: name.value,
                stadiumName: stadium.value,
                email: email.value,
                position: position.value
            };

            try {
                const response = await fetch(adminForm.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert("Admin info submitted successfully!");
                    adminForm.reset();
                } else {
                    alert(result.message || "Submission failed. Please check your inputs.");
                }
            } catch (error) {
                alert("Something went wrong while submitting the form.");
                console.error("Error:", error);
            }
        });
    }
});