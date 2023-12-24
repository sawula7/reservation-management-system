import express, { response } from 'express'
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
let hashPassword ;
router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from users where email = ? and password = ?";
   
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });
       
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" });
            console.log(token);
            res.cookie('token',token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Username or password is incorrect!" });
        }
    });
});

router.get('/tour', (req, res) => {
    const sql = "SELECT id,gchNo,title,departureDate,paxCount,agent,groupName,status,bookingOperator,remarks,handledBy FROM tour;";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
});

router.get('/user', (req, res) => {
    const sql = "SELECT * FROM users;";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
});

router.get('/role', (req, res) => {
    const sql = "SELECT id,roleName FROM user_role;";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status: true})
});

router.get('/user/:id', (req, res) => {
    const id =req.params.id;
    const sql = "SELECT * FROM users where id =?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
});

router.put('/edit_user/:id', (req, res) => {
    const id =req.params.id;
    const sql = `update users set name=?, email=?, role=? where id=?`;
    const values =[
        req.body.name,
        req.body.email,
        req.body.role
    ]
    con.query(sql,[...values,id], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true, Result: result})
    })
});

router.post('/add_tour', (req, res) => {
    const sql = "INSERT INTO tour (`title`) VALUES (?)";
    con.query(sql, [req.body.tour], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.post('/add_user',(req,res) =>{
    const sql =`insert into users (name,email,role,status,created_at,updated_at,created_by,password) values (?)`;
    const NUMBER_CHARCODES = [48,49,50,51,52,53,54,55,56,57]
    const SYMBOLS_CHARCODES = [33, 40, 41, 45, 46, 63, 91, 93, 95, 96, 126, 59, 58, 64, 35, 36, 37, 94, 38, 42, 43, 61]
    const UPPER_CHARCODES = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]
    const LOWER_CHARCODES = [97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122]
    let charcodes = []
    const randomizedCharcodes = []
    let length = 9;
    charcodes = charcodes.concat(NUMBER_CHARCODES)
    charcodes = charcodes.concat(SYMBOLS_CHARCODES)
    charcodes = charcodes.concat(UPPER_CHARCODES)
    charcodes = charcodes.concat(LOWER_CHARCODES)
    for (let i = 0; i < length; i++){
        const charcode = charcodes[Math.floor(Math.random() * charcodes.length)]
        randomizedCharcodes.push(String.fromCharCode(charcode))
    }
    let plainPassword = randomizedCharcodes.join("");
   
    bcrypt
    .hash(plainPassword,10, (err,hash)=>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.user.name,
            req.body.user.email,
            req.body.user.role,
            req.body.user.status=1,
            req.body.user.created_at=new Date(),
            req.body.user.updated_at=new Date(),
            req.body.user.created_by='Admin',
            hash,
    
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true})
        })
    })
    })
    
export { router as adminRouter }