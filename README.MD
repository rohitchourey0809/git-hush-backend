Testing Endpoints
You can test the following endpoints:



## API Reference

Api:  https://git-hush-backend.vercel.app/

#### POST 

```http
 POST /api/users/register
```

#### Get all items by id

```http
   /books/:id
```

#### GET item

```http
 /api/books
```

#### GET item

```http
  /api/books/search?query=searchTerm
```

#### POST item

```http
/api/reviews
```


#### POST item

```http
 POST /api/users/favorites
```







POST /api/users/register - Register a new user.
POST /api/users/login - Login user and get a token.
GET /api/books - Get a list of books.
GET /api/books/:id - Get details of a specific book.
GET /api/books/search?query=searchTerm - Search for books by title or author.
POST /api/reviews - Submit a new review (requires authentication).
POST /api/users/favorites - Add a book to favorites (requires authentication).
