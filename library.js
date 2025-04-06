function Author(name, email) {
  this.name = name;
  this.email = email;
}

function Book(name, price, author) {
  this.name = name;
  this.price = price;
  this.author = author;
}

var books = [];
var bookCountSection = document.getElementById("book_count_section");
var bookCountInput = document.getElementById("book_count");
var countBtn = document.querySelector(".count_btn");
var msgErrorNumber = document.querySelector(".msgerror_number");

var bookForm = document.getElementById("book_form");
var nameInput = document.getElementById("form_name");
var priceInput = document.getElementById("form_price");
var authorNameInput = document.getElementById("form_author_name");
var emailInput = document.getElementById("form_email");
var msgErrorName = document.querySelector(".msgerror_name");
var msgErrorPrice = document.querySelector(".msgerror_price");
var msgErrorAuthorName = document.querySelector(".msgerror_author_name");
var msgErrorEmail = document.querySelector(".msgerror_email");

var bookList = document.getElementById("book_list");
var bookTable = document.getElementById("book_table");

var remainingBooks = 0;

bookForm.style.display = "none";
bookTable.style.display = "none";

countBtn.addEventListener("click", function () {
  count();
});

function count() {
  var count = parseInt(bookCountInput.value);
  if (!count || count <= 0) {
    msgErrorNumber.innerText = "Enter a valid number!";
    return;
  }
  remainingBooks = count;
  bookForm.style.display = "block";
  bookCountSection.style.display = "none";
}

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  form();
});

function form() {
  var name = nameInput.value.trim();
  var price = parseFloat(priceInput.value);
  var authorName = authorNameInput.value.trim();
  var email = emailInput.value.trim();
  var nameRegex = /^[A-Za-z\s]+$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isValid = true;

  if (!name || !nameRegex.test(name)) {
    msgErrorName.innerText = "Book name must contain only letters!";
    isValid = false;
  }
  if (isNaN(price) || price <= 0) {
    msgErrorPrice.innerText = "Enter a valid price!";
    isValid = false;
  }
  if (!authorName || !nameRegex.test(authorName)) {
    msgErrorAuthorName.innerText = "Author name must contain only letters!";
    isValid = false;
  }
  if (!emailRegex.test(email)) {
    msgErrorEmail.innerText = "Enter a valid email!";
    isValid = false;
  }

  if (!isValid) return;

  var author = new Author(authorName, email);
  var book = new Book(name, price, author);
  books.push(book);
  remainingBooks--;
  addBookToTable(book);

  if (remainingBooks === 0) {
    bookForm.style.display = "none";
    bookForm.style.display = "none";
    bookTable.style.display = "block";
  }
  bookForm.reset();
}

function addBookToTable(book) {
  var row = document.createElement("tr");
  row.innerHTML = `
          <td>${book.name}</td>
          <td>${book.price}</td>
          <td>${book.author.name}</td>
          <td>${book.author.email}</td>
          <td>
              <button onclick="toggleEditBook(this)">Edit</button>
              <button onclick="deleteBook(this)">Delete</button>
          </td>
      `;
  bookList.appendChild(row);
}

function toggleEditBook(button) {
  var row = button.closest("tr");
  var cells = row.querySelectorAll("td:not(:last-child)");

  if (button.textContent === "Edit") {
    cells.forEach((cell, index) => {
      if (index < cells.length - 1) {
        var input = document.createElement("input");
        input.value = cell.textContent;
        cell.textContent = "";
        cell.appendChild(input);
      }
    });
    button.textContent = "Save";
  } else {
    cells.forEach((cell, index) => {
      if (index < cells.length - 1) {
        cell.textContent = cell.querySelector("input").value;
      }
    });
    button.textContent = "Edit";
  }
}

function deleteBook(button) {
  button.closest("tr").remove();
}
