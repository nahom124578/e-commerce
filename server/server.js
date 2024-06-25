const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer")

const app = express();
const port = 3001;
const SECRET_KEY = 'your_secret_key';

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection



const db = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12714508",
  password: "SR9mhCriiX",
  database: "sql12714508",
  connectionLimit: 10000, // Adjust as per your server capacity
  waitForConnections: true, // Queue connection requests
  queueLimit: 0, // Unlimited queueing (you may set a limit based on your needs)
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const filename = path.parse(file.originalname).base;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Endpoint to add a new product
app.post('/api/product', upload.single('image'), async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    const sql = "INSERT INTO Product (productName, price, stock, Type, image) VALUES (?, ?, ?, ?, ?)";
    const values = [req.body.name, req.body.price, req.body.stock, req.body.category, req.file.filename];

    const [data] = await connection.query(sql, values);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    if (connection) connection.release(); // Ensure the connection is always released
  }
});


// Endpoint to get all products
app.get('/api/productsDress', async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    
    const sql = "SELECT * FROM Product WHERE Type = 'Dress'";
    const [rows] = await connection.query(sql);
    
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    if (connection) connection.release(); // Ensure the connection is always released
  }
});

app.get('/api/productsShoes', async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    
    const sql = "SELECT * FROM Product WHERE Type = 'Shoes'";
    const [rows] = await connection.query(sql);
    
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    if (connection) connection.release(); // Ensure the connection is always released
  }
});

app.delete('/api/deleteProduct/:id', async (req, res) => {
  const productId = req.params.id;
  console.log(`Attempting to delete product with ID: ${productId}`);

  let connection;
  try {
    connection = await db.promise().getConnection();

    // Using prepared statement for parameter binding
    const sql = "DELETE FROM Product WHERE productID = ?";
    const values = [productId];

    const [result] = await connection.query(sql, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      console.log(`Product with ID: ${productId} deleted successfully.`);
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (err) {
    console.error('Database query failed:', err); // Log the entire error object
    res.status(500).json({ error: 'Database error occurred' }); // More generic error message for the client
  } finally {
    if (connection) connection.release();
  }
});


// User registration endpoint
app.post('/register', async (req, res) => {
  let connection;
  const { firstName, lastName, userName, email, password, country, street, city, role, phoneNumber, accountNumber } = req.body;

  try {
      // Validate all required fields are provided
      if (!firstName || !lastName || !userName || !email || !password || !country || !street || !city || !role || !phoneNumber) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate role
      if (role !== 'User' && role !== 'Vendor') {
          return res.status(400).json({ message: 'Invalid role' });
      }

      // Additional validation logic can be added here as needed

      connection = await db.promise().getConnection();
      const hashedPassword = await bcrypt.hash(password, 10);
      let redirectUrl = '/login'; // Default redirect URL

      if (role === 'User') {
          const sql1 = "INSERT INTO User (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
          const values1 = [firstName, lastName, email, hashedPassword];
          await connection.query(sql1, values1);

          const userIdQuery = "SELECT userID FROM User WHERE email = ?";
          const [userIdRows] = await connection.query(userIdQuery, [email]);
          const userId = userIdRows[0].userID;

          const sql2 = "INSERT INTO Authentication (username, password, role) VALUES (?, ?, ?)";
          const values2 = [userName, hashedPassword, role];
          await connection.query(sql2, values2);

          const sql3 = "INSERT INTO UserAddress (country, street, city, userId) VALUES (?, ?, ?, ?)";
          const values3 = [country, street, city, userId];
          await connection.query(sql3, values3);

          const sql4 = "INSERT INTO UserPhone (phoneNumber, userID) VALUES (?, ?)";
          const values4 = [phoneNumber, userId];
          await connection.query(sql4, values4);

          redirectUrl = '/user-dashboard'; // Redirect to user dashboard after registration
          res.status(201).json({ message: "User registered successfully", redirectUrl });
      } else if (role === 'Vendor') {
          // Ensure accountNumber is provided for vendors
          if (!accountNumber) {
              return res.status(400).json({ message: 'Account number is required for vendors' });
          }

          const sql1 = "INSERT INTO Vendors (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
          const values1 = [firstName, lastName, email, hashedPassword];
          await connection.query(sql1, values1);

          const vendorIdQuery = "SELECT vendorID FROM Vendors WHERE email = ?";
          const [vendorIdRows] = await connection.query(vendorIdQuery, [email]);
          const vendorId = vendorIdRows[0].vendorID;

          const sql2 = "INSERT INTO Authentication (username, password, role) VALUES (?, ?, ?)";
          const values2 = [userName, hashedPassword, role];
          await connection.query(sql2, values2);

          const sql3 = "INSERT INTO VendorAddress (country, street, city, vendorId) VALUES (?, ?, ?, ?)";
          const values3 = [country, street, city, vendorId];
          await connection.query(sql3, values3);

          const sql4 = "INSERT INTO VendorPhone (phoneNumber, vendorID) VALUES (?, ?)";
          const values4 = [phoneNumber, vendorId];
          await connection.query(sql4, values4);

          const sql5 = "INSERT INTO Account (accountNumber, vendorID) VALUES (?, ?)";
          const values5 = [accountNumber, vendorId];
          await connection.query(sql5, values5);

          redirectUrl = '/vendor-dashboard'; // Redirect to vendor dashboard after registration
          res.status(201).json({ message: "Vendor registered successfully", redirectUrl });
      } else {
          res.status(400).json({ message: "Invalid role" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
  } finally {
      if (connection) connection.release();
  }
});
// User login endpoint
app.post('/login', async (req, res) => {
    let connection;
    try {
        connection = await db.promise().getConnection();

        const { username, password, role } = req.body;
        const sql = "SELECT * FROM Authentication WHERE username = ?";
        const [rows] = await connection.query(sql, [username]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid username or passwords" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        const isMatch2 = (password === user.password) //for admin only
        const isRoleMatch = (role === user.role);
        console.log(password)
        console.log(role)
        console.log(user)
        console.log(isMatch)
        console.log(isMatch2)
        console.log(isRoleMatch)
        if(!isMatch2 && !isMatch ){
          return res.status(400).json({ message: "Invalid username or password" })
        }
              else if ( !isRoleMatch){
          return res.status(400).json({ message: "invalid role" });
        }
        

        const token = jwt.sign({ id: user.userID }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user: { id: user.userID, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in" });
    } finally {
        if (connection) connection.release();
    }
});
// Endpoint to fetch feedback data
app.get('/feedbacks', (req, res) => {
  db.query('SELECT * FROM Feedback', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});
// Endpoint to handle feedback submission
app.post('/submit-feedback', (req, res) => {
  const { aspect, satisfaction_levels, improvement_suggestions } = req.body;
  const satisfactionLevelsString = JSON.stringify(satisfaction_levels);

  const query = "INSERT INTO Feedback (aspect, satisfaction_level, improvement_suggestions) VALUES (?, ?, ?)";
  db.query(query, [aspect, satisfactionLevelsString, improvement_suggestions], (err, result) => {
      if (err) {
          console.error('Error submitting feedback:', err);
          res.status(500).send('Error submitting feedback');
      } else {
          res.status(200).send('Feedback submitted successfully');
      }
  });
});
// Endpoint to handle contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const sql = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
  const values = [name, email, phone, message];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Message sent successfully', data: result });
  });
});
// Endpoint to fetch contact
app.get('/Contacts', (req, res) => {
  db.query('SELECT name,email,message FROM contacts', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});
app.get('/api/productsDress', async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    
    const sql = "SELECT * FROM Product WHERE Type = 'Dress'";
    const [rows] = await connection.query(sql);
    
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    if (connection) connection.release(); // Ensure the connection is always released
  }
});

app.post('/buy', async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    const orderSql = "INSERT INTO Orders (userID, status, totalAmount, shippingMethodID) VALUES (?, ?, ?, ?)";
    const orderValues = [
      2,
      req.body.order.status,
      req.body.order.totalAmount,
      req.body.order.shippingMethodID
    ];
    const [orderResult] = await connection.query(orderSql, orderValues);

    const orderID = orderResult.insertId; // Get the ID of the inserted order

    req.body.orderItem.forEach(async (item, index) => {
      const orderItemSql = "INSERT INTO OrderItems (orderID, productID, price, quantity) VALUES (?, ?, ?, ?)";
      const orderItemValues = [
        orderID,
        65,
        item.price,
        item.quantity
      ];
      await connection.query(orderItemSql, orderItemValues);
    });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error placing order" });
  } finally {
    if (connection) connection.release();
  }
});

app.get('/orders/:id', async (req, res) => {
  const orderID = req.params.id; // Define orderID locally
  let connection;
  
  try {
    connection = await db.promise().getConnection();

    // Fetch the order by orderID
    const orderSql = "SELECT * FROM Orders WHERE orderID = ?";
    const values = [orderID];
    const [orderResults] = await connection.query(orderSql, values);

    if (orderResults.length === 0) {
      return res.status(404).json({ message: "No order found with the given ID" });
    }

    // Fetch order items for the order
    const orderItemsSql = "SELECT * FROM OrderItems WHERE orderID = ?";
    const [orderItemsResult] = await connection.query(orderItemsSql, values);

    // Add the order items to the order object
    orderResults[0].items = orderItemsResult;

    res.status(200).json(orderResults[0]);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: "Error fetching orders" });
  } finally {
    if (connection) connection.release();
  }
})

app.get('/api/productsShoes', async (req, res) => {
  let connection;
  try {
    connection = await db.promise().getConnection();
    
    const sql = "SELECT * FROM Product WHERE Type = 'Shoes'";
    const [rows] = await connection.query(sql);
    
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Database query failed' });
  } finally {
    if (connection) connection.release(); // Ensure the connection is always released

  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
