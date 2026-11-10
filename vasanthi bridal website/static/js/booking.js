
/* =========================================
   VASANTHI BRIDAL MAKEOVER
   APPOINTMENT BOOKING
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("appointmentForm");
    const dateInput = document.getElementById("date");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const messageBox = document.getElementById("bookingMessage");

    if (!bookingForm) return;


    // PREVENT PAST DATE SELECTION
    if (dateInput) {
        const today = new Date();
        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        dateInput.min = localToday;
    }


    // DISPLAY MESSAGE
    function showMessage(message, type) {
        if (!messageBox) {
            alert(message);
            return;
        }

        messageBox.textContent = message;
        messageBox.className = "booking-message " + type;
    }


    // FORM SUBMISSION
    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Browser validation
        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        // EMAIL VALIDATION
        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            emailInput.focus();
            return;
        }

        // PHONE VALIDATION
        const phone = phoneInput.value.trim();
        const phoneDigits = phone.replace(/\D/g, "");

        if (!/^[0-9+\-\s()]+$/.test(phone) ||
            phoneDigits.length < 10 ||
            phoneDigits.length > 15) {

            showMessage("Please enter a valid phone number.", "error");
            phoneInput.focus();
            return;
        }

        // DATE VALIDATION
        if (dateInput && dateInput.value < dateInput.min) {
            showMessage("Please select today or a future date.", "error");
            dateInput.focus();
            return;
        }

        // PREVENT DOUBLE SUBMISSION
        const submitButton = bookingForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        showMessage("Submitting your appointment request...", "success");

        try {

            const formData = new FormData(bookingForm);

            const bookingData = Object.fromEntries(formData.entries());

            const response = await fetch(
                "https://formsubmit.co/ajax/vasanthibridalmakeover@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        ...bookingData,
                        _replyto: bookingData.email,
                        _subject: `New appointment request - ${bookingData.fullName}`,
                        _template: "table"
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || result.success !== "true" && result.success !== true) {
                throw new Error(
                    result.message || "Unable to send your appointment request."
                );
            }

            showMessage(
                "Your request has been submitted. Our team will contact you soon.",
                "success"
            );
            bookingForm.reset();
        } catch (error) {

            showMessage(
                error.message ||
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Appointment";
            }
        }

    });

});
