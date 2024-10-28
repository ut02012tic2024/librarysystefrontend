document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("nameInput").value;
    const nic = document.getElementById("nicInput").value;
    const password = document.getElementById("passwordInput").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    try {
        const response = await fetch("https://localhost:5001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, nic, password, role })
        });

        if (response.ok) {
            alert("Registration successful. You can now log in.");
            window.location.href = "login.html";
        } else {
            alert("Registration failed.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
});
