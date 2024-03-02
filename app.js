const express = require("express");
const app = express();
const path = require('path');
const { render } = require("ejs");
const pool = require("./db");

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middlewares 
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.send("I am root");
});
app.get('/data', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 20; // Number of records per page
        const offset = (page - 1) * perPage;

        const client = await pool.connect();
        const result = await client.query('SELECT * FROM app LIMIT $1 OFFSET $2', [perPage, offset]);
        const data = result.rows;

        // Calculate pagination information
        const totalCount = await client.query('SELECT COUNT(*) FROM app');
        const totalRecords = parseInt(totalCount.rows[0].count);
        const totalPages = Math.ceil(totalRecords / perPage);

        // Determine if there's a next page
        const hasNextPage = page < totalPages;

        // Determine if there's a previous page
        const hasPrevPage = page > 1;

        const pagination = {
            prev: hasPrevPage ? page - 1 : null,
            next: hasNextPage ? page + 1 : null
        };

        res.render('index.ejs', { data, pagination });
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/data/sort/date', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 20; // Number of records per page
        const offset = (page - 1) * perPage;
        const sortOrder = req.query.order || 'asc';

        const validSortOrders = ['asc', 'desc'];
        if (!validSortOrders.includes(sortOrder)) {
            return res.status(400).send('Invalid sort order');
        }

        const client = await pool.connect();
        const result = await client.query('SELECT * FROM app ORDER BY created_at ' + sortOrder + ' LIMIT $1 OFFSET $2', [perPage, offset]);
        const data = result.rows;

        // Calculate pagination information
        const totalCount = await client.query('SELECT COUNT(*) FROM app');
        const totalRecords = parseInt(totalCount.rows[0].count);
        const totalPages = Math.ceil(totalRecords / perPage);

        // Determine if there's a next page
        const hasNextPage = page < totalPages;

        // Determine if there's a previous page
        const hasPrevPage = page > 1;

        const pagination = {
            prev: hasPrevPage ? page - 1 : null,
            next: hasNextPage ? page + 1 : null
        };

        res.render('index.ejs', { data, pagination });
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/search/location', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 20; // Number of records per page
        const offset = (page - 1) * perPage;
        const sortOrder = req.query.order || 'asc';
        const location = req.query.location; // Get location from query parameters

        const validSortOrders = ['asc', 'desc'];
        if (!validSortOrders.includes(sortOrder)) {
            return res.status(400).send('Invalid sort order');
        }

        const client = await pool.connect();
        let query = 'SELECT * FROM app';

        // Add location filter to query if location is provided
        if (location) {
            query += ' WHERE location = $1';
        }

        query += ' ORDER BY created_at ' + sortOrder + ' LIMIT $2 OFFSET $3';

        const result = await client.query(query, location ? [location, perPage, offset] : [perPage, offset]);
        const data = result.rows;

        // Calculate pagination information
        let totalCountQuery = 'SELECT COUNT(*) FROM app';
        if (location) {
            totalCountQuery += ' WHERE location = $1';
        }
        const totalCount = await client.query(totalCountQuery, location ? [location] : []);
        const totalRecords = parseInt(totalCount.rows[0].count);
        const totalPages = Math.ceil(totalRecords / perPage);

        // Determine if there's a next page
        const hasNextPage = page < totalPages;

        // Determine if there's a previous page
        const hasPrevPage = page > 1;

        const pagination = {
            prev: hasPrevPage ? page - 1 : null,
            next: hasNextPage ? page + 1 : null
        };

        res.render('index.ejs', { data, pagination });
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

app.get('/search/name', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of records per page
        const offset = (page - 1) * perPage;
        const sortOrder = req.query.order || 'asc';
        const location = req.query.location; // Get location from query parameters
        const customerName = req.query.customer_name; // Get customer_name from query parameters

        const validSortOrders = ['asc', 'desc'];
        if (!validSortOrders.includes(sortOrder)) {
            return res.status(400).send('Invalid sort order');
        }

        const client = await pool.connect();
        let query = 'SELECT * FROM app';

        // Add location filter to query if location is provided
        if (location) {
            query += ' WHERE location = $1';
        }

        // Add customer_name filter to query if customer_name is provided
        if (customerName) {
            query += location ? ' AND customer_name = $2' : ' WHERE customer_name = $1';
        }

        query += ' ORDER BY created_at ' + sortOrder + ' LIMIT $2 OFFSET $3';

        const result = await client.query(query, customerName ? (location ? [location, customerName, perPage, offset] : [customerName, perPage, offset]) : (location ? [location, perPage, offset] : [perPage, offset]));
        const data = result.rows;

        // Calculate pagination information
        let totalCountQuery = 'SELECT COUNT(*) FROM app';
        if (location) {
            totalCountQuery += ' WHERE location = $1';
        }
        if (customerName) {
            totalCountQuery += location ? ' AND customer_name = $2' : ' WHERE customer_name = $1';
        }
        const totalCountParams = customerName ? (location ? [location, customerName] : [customerName]) : (location ? [location] : []);
        const totalCount = await client.query(totalCountQuery, totalCountParams);
        const totalRecords = parseInt(totalCount.rows[0].count);
        const totalPages = Math.ceil(totalRecords / perPage);

        // Determine if there's a next page
        const hasNextPage = page < totalPages;

        // Determine if there's a previous page
        const hasPrevPage = page > 1;

        const pagination = {
            prev: hasPrevPage ? page - 1 : null,
            next: hasNextPage ? page + 1 : null
        };

        res.render('index.ejs', { data, pagination });
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

app.get("/users", (req, res) => {
    res.render("index.ejs");
})

app.listen(8080, () => {
    console.log("Server is listening to port 8080")
});