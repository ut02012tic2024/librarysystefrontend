document.addEventListener("DOMContentLoaded", async () => {
    const availableBooksGrid = document.getElementById("availableBooksGrid");

    try {
        const response = await fetch("https://localhost:5001/api/books/random");
        const books = await response.json();

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "col-md-4";
            bookCard.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Category: ${book.category}</p>
                        <p class="card-text">Count: ${book.count}</p>
                    </div>
                </div>
            `;
            availableBooksGrid.appendChild(bookCard);
        });
    } catch (error) {
        console.error("Error fetching available books:", error);
    }
});
