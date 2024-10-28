document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const nic = document.getElementById("nicInput").value;
    const password = document.getElementById("passwordInput").value;

    try {
        const response = await fetch("https://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nic, password })
        });
        
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = user.role === "librarian" ? "librarian.html" : "member.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
});
