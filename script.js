let table = document.querySelector('.table');

let myLibrary = [
    {
        title: "Harry Potter & the Half Blood Prince",
        author: "J.K Rowling",
        genre: "Fantasy",
        read: "Read",
    },
    {
        title: "Kafka on the Shore", 
        author: "Haruki Murakami",
        genre: "Thriller",
        read: "Read",
    },
    {
        title: "The Name of the Wind", 
        author: "Patrick Rothfuss",
        genre: "Fantasy",
        read: "Read", 
    },   
];

class Book {
    constructor(title, author, genre, read){
        this.title = title
        this.author = author
        this.genre = genre
        this.read = read
    }
}


let submit = document.querySelector('.submit');

submit.addEventListener('click', function(){
    addBookToLibrary();
})


function addBookToLibrary() {

    let title = document.getElementsByName("title")[0].value;
    let author = document.getElementsByName("author")[0].value;
    let genre = document.getElementsByName("genre")[0].value;
    let checkedVal = document.getElementsByName("read");
    let read;

    for (let i = 0; checkedVal[i]; i++){
        if(checkedVal[i].checked){
            read = checkedVal[i].value;
            break; 
        }
    }
    
    let newBook = new Book(title, author, genre, read);
    this.newBook = newBook;

    myLibrary.push(this.newBook); 

    let tableRow = document.createElement('tr'); 
    table.appendChild(tableRow);

    for (let prop in newBook){
        if (prop == "read"){

            let tableRead = document.createElement('td');
            tableRead.setAttribute('class', 'table-read');

            let tableReadBtn = document.createElement('button');
            tableReadBtn.innerText = this.newBook.read; 
            tableReadBtn.setAttribute('class', 'readbutton');
            tableReadBtn.addEventListener('click', function(event) {
                if (newBook.read == "Read"){
                    newBook.read = "Not Read";
                    event.target.innerText = "Not Read";
                } else if (newBook.read == "Not Read") {
                    newBook.read = "Read"
                    event.target.innerText = "Read";
                }  
            }); 

            tableRead.appendChild(tableReadBtn); 
            tableRow.appendChild(tableRead)

            continue; 

        } 

        let tableData = document.createElement('td'); 
        
        tableData.setAttribute('class', 'table-data');

        tableData.textContent = newBook[prop]; 
        tableRow.appendChild(tableData);
    }

    let tableDelete = document.createElement('td');
    let tableDeleteBtn = document.createElement('button'); 

    tableDelete.setAttribute('class', 'table-delete');

    tableDeleteBtn.innerText = "Delete Book";
    tableDeleteBtn.setAttribute('class', 'deletebutton'); 

    tableDelete.appendChild(tableDeleteBtn); 
    tableRow.appendChild(tableDelete);

    toggle();
    deleteBookButton();
    formHidder();
    console.log(myLibrary);
}

function renderTable(){

    table.innerHTML += myLibrary.map(function(book){
        return '<tr>' + 
                    '<td class="table-data">' + book.title + '</td> ' + 
                    '<td class="table-data">' + book.author + '</td>' + 
                    '<td class="table-data">' + book.genre + '</td>' + 
                    '<td class="table-read">' + '<button class="readbutton">' + book.read + '</button>' + '</td>' +
                    '<td class="table-delete">' + '<button class="deletebutton">Delete</button>' + '</td>' + 
                '</tr>'
    }).join(''); 

    deleteBookButton(); 
}

function toggle() {
    let buttons = document.querySelectorAll('.readbutton'); 

    for (let button of buttons){
        button.addEventListener('click', function (event){
            button.classList.toggle('readbutton');
            button.classList.toggle('notreadbutton');
        })
    }
}

function readButton(){
    let readButton = document.querySelectorAll('.readbutton')
    
    for(let button of readButton){
        button.addEventListener('click', function(event) {
            if (event.target.innerText == "Read"){
                event.target.innerText = "Not Read";
            } else {
                event.target.innerText = "Read";
            }
        })
    }
}


function deleteBookButton() {
    let deleteButton = document.querySelectorAll('.deletebutton');

    for (let buttons of deleteButton) {
        buttons.addEventListener('click', (e) =>{
            e.target.parentNode.parentNode.remove();
        
            let libraryTitles = myLibrary.map(function(x) {return x.title;}); 
            myLibrary.splice(libraryTitles.indexOf(e.target.parentElement.firstChild.innerHTML));
            console.log(myLibrary);
        })
    }
}


function addNewBook (){
    let bookButton = document.querySelector('.bookbutton'); 

    bookButton.addEventListener('click', function(){
        formHidder();
    })
}

function formHidder(){
    let form = document.querySelector('.libraryform'); 
    let pagemask = document.querySelector('.pagemask');

    form.addEventListener('click', function(event){
        event.stopPropagation();
    })

    pagemask.addEventListener('click', function(){
        form.hidden = true; 
        pagemask.hidden = true;
    })

    if (form.hidden && pagemask.hidden){
        form.hidden = false; 
        pagemask.hidden = false;     
    } else {
        form.hidden = true; 
        pagemask.hidden = true; 
    }
}


renderTable();
readButton();
addNewBook();
toggle();