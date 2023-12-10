const express = require('express')
const router = express.Router()
let books = require('./books.json')

// For getting all the books
router.get('/', (req, res) => {
    res.json(books);
})

// For getting a specific book
router.get('/:id', (req, res) => {
    const { id } = req.params
    const filteredBooks = books.filter((ele) => (ele.id) === parseInt(id));
    if (filteredBooks.length > 0) {
        res.json(filteredBooks)
    } else {
        res.status(404).json({ error: 'Book not found' })
    }
})

// For Adding new book
router.post('/', (req, res) => {
    const body = req.body

    if (Object.keys(body).length === 0) {
        res.status(400).json({ error: 'Invalid request data' })
    } else {
        books.push(body)
        res.json({ message: 'The book has been added' })
    }
})

// // For updating book
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log(body)
    let updated = false;
    let ele = null
    if (Object.keys(body).length === 0) {
        // Checking if the request body is empty
        res.status(400).json({ message: 'Request body is empty' });
    } else {
        books.forEach((book, index) => {
            if (book.id === parseInt(id)) {
                books[index] = { ...book, ...body };
                ele = books[index]
                updated = true;
            }
        });

        if (updated) {
            res.json({ message: `The book with ID ${id} has been updated`, element: ele });
        } else {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        }
    }
});


// // For deleting book
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const bookToDelete = books.find(book => book.id === parseInt(id));

    if (!bookToDelete) {
        res.status(404).json({ message: `Book with id #${id} not found` });
    } else {
        books = books.filter(book => book.id !== parseInt(id));
        res.json({ message: `Book with id #${id} has been deleted` });
    }
});
module.exports = router;
