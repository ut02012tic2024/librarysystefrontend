document.addEventListener("DOMContentLoaded", async () => {
    const availableBooksGrid = document.getElementById("availableBooksGrid");
    const borrowedBooksTable = document.getElementById("borrowedBooksTable").querySelector("tbody");
    const borrowRequestForm = document.getElementById("borrowRequestForm");

    // Load available books and borrowed books
    await loadAvailableBooks();
    await loadBorrowedBooks();

    borrowRequestForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const bookId = document.getElementById("borrowBookId").value;

        try {
            await fetch("https://localhost:5001/api/borrowed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookId })
            });
            alert("Borrow request sent.");
            await loadBorrowedBooks();
        } catch (error) {
            console.error("Error sending borrow request:", error);
        }
    });

    async function loadAvailableBooks() {
        availableBooksGrid.innerHTML = "";

        try {
            const response = await fetch("https://localhost:5001/api/books");
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
            console.error("Error loading available books:", error);
        }
    }

    async function loadBorrowedBooks() {
        borrowedBooksTable.innerHTML = "";

        try {
            const response = await fetch("https://localhost:5001/api/borrowed");
            const borrowedBooks = await response.json();

            borrowedBooks.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${new Date(book.borrowDate).toLocaleDateString()}</td>
                    <td><button class="btn btn-danger" onclick="returnBook(${book.id})">Return</button></td>
                `;
                borrowedBooksTable.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading borrowed books:", error);
        }
    }

    window.returnBook = async (id) => {
        try {
            await fetch(`https://localhost:5001/api/borrowed/${id}`, {
                method: "DELETE"
            });
            await loadBorrowedBooks();
        } catch (error) {
            console.error("Error returning book:", error);
        }
    };
});
