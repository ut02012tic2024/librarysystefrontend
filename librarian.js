document.addEventListener("DOMContentLoaded", async () => {
    const categoryForm = document.getElementById("categoryForm");
    const categoryInput = document.getElementById("categoryInput");
    const categoryList = document.getElementById("categoryList");
    const bookForm = document.getElementById("bookForm");
    const bookTitle = document.getElementById("bookTitle");
    const categorySelect = document.getElementById("categorySelect");
    const bookCount = document.getElementById("bookCount");
    const bookUrl = document.getElementById("bookUrl");
    const bookTable = document.getElementById("bookTable").querySelector("tbody");
    const borrowedBooksTable = document.getElementById("borrowedBooksTable").querySelector("tbody");

    // Load categories and books
    await loadCategories();
    await loadBooks();
    await loadBorrowedBooks();

    // Add category
    categoryForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        try {
            await fetch("https://localhost:5001/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: categoryInput.value })
            });

            categoryInput.value = "";
            await loadCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    });

    // Add book
    bookForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        try {
            await fetch("https://localhost:5001/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: bookTitle.value,
                    category: categorySelect.value,
                    count: bookCount.value,
                    url: bookUrl.value
                })
            });

            bookTitle.value = "";
            bookCount.value = "";
            bookUrl.value = "";
            await loadBooks();
        } catch (error) {
            console.error("Error adding book:", error);
        }
    });

    async function loadCategories() {
        categoryList.innerHTML = "";
        categorySelect.innerHTML = "";
        
        try {
            const response = await fetch("https://localhost:5001/api/categories");
            const categories = await response.json();

            categories.forEach(category => {
                const listItem = document.createElement("li");
                listItem.textContent = category.name;
                categoryList.appendChild(listItem);

                const option = document.createElement("option");
                option.value = category.name;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    async function loadBooks() {
        bookTable.innerHTML = "";

        try {
            const response = await fetch("https://localhost:5001/api/books");
            const books = await response.json();

            books.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.category}</td>
                    <td>${book.count}</td>
                    <td><button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button></td>
                `;
                bookTable.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading books:", error);
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

    window.deleteBook = async (id) => {
        try {
            await fetch(`https://localhost:5001/api/books/${id}`, {
                method: "DELETE"
            });
            await loadBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

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
