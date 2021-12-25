let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();
let session = require('express-session');
let cors = require('cors');
let cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { resolveModuleName } = require('typescript');
const { stringify } = require('querystring');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: "Your secret key" }));
const TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
app.use(cors({
    origin: '*'
}));


function generateAccessToken(email) {
    return jwt.sign(email, TOKEN_SECRET, { expiresIn: '60s' });
};

const Users = [
    { email: '1@gmail.com', password: "1", role: 'user' },
    { email: '2@gmail.com', password: "2", role: 'user' },
    { email: '3@gmail.com', password: "3", role: 'user' },
    { email: '4@gmail.com', password: "4", role: 'admin' },
];

app.post('/addUser', function (req, res) {
    // console.log(req.body);
    if (!req.body.email || !req.body.password) {
        res.status("400");
        res.json({ message: 'Invalid details!' });
    } else {
        let flag = false;
        Users.filter(function (user) {
           
            if (user.email === req.body.email) {
                console.log('User exists');
                res.json({ message: 'User Already Exists! Login or choose another user id' });
                flag = true;
            }
        });
        if (flag === false) {
            console.log('User not exists');
            let newUser = { email: req.body.email, password: req.body.password };
            Users.push(newUser);
            req.session.user = newUser;
            res.json({ message: 'signup success', email: newUser.email });
        }
    }
});

app.post('/login', function (req, res) {
    // console.log(TOKEN_SECRET);
    if (!req.body.email || !req.body.password) {
        res.send({message: 'id not exist or id, password not correct ' });
    } else {
        Users.filter(function (user) {
            
            if (user.email === req.body.email && user.password === req.body.password) {
                req.session.user = user;
                res.json({message: generateAccessToken({email: user.email}), role: user.role});
            } 
            else {
                // res.status(404);
                // res.json({status:'400', msg:'not matched'});
            }
        });
    }
});

app.get('/checklogin', function (req, res) {
    if (req.session.user) {
        res.json({ message: 'sign in success', email: req.session.user.email });
    } else {
        res.json({ message: 'please log in' })
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy(function () {
    });
    res.json({ message: 'user log out' });
});

app.get('/allUsers', function (req, res) {
    res.json(Users);
    
});

app.delete("/deleteUser/:email", function(req, res, next) {
    for (let i in Users) {
        if (Users[i].email == req.params.email) {
            Users.splice(i, 1);
            break;
        }
    }
    res.send(Users);
})

app.listen(5800, function () {
    console.log("Server started on Port 5800...");
});