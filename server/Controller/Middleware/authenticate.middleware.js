const jwt = require('jsonwebtoken');

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNjg0NDg4NjYzfQ.v2MNdqsxtYjwHnrcwno3tTc-g64u1piVdEpCsRNNz4w';

// sample user data
const users = [
  { id: 1, username: 'testUser', password: 'samplePassword' },
];



// Login route
exports.login = (req,res) =>
{
  const { username, password } = req.body;

  // Find the user by username and password
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

    // Set the token in the Authorization header and redirect to the protected endpoint
    res.set('Authorization', `Bearer ${token}`);
    res.redirect(`/protected?token=${encodeURIComponent(token)}`);
  } else {
    res.status(401).json({ alert: 'Invalid credentials' });
  }
};



// Middleware to authenticate the token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = req.query.token || (authHeader && authHeader.split(' ')[1]);

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}