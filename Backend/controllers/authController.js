const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const Register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "name, email, and password are required."
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(`
            INSERT INTO admins (name, email, password)
            VALUES($1, $2, $3) RETURNING id, name, email`, [name, email, hashedPassword])
        return res.status(200).json({
            message: "Admin created successfully",
            admin: result.rows[0]
        })

    } catch (error) {
        return res.status(409).json({
            message: 'Admin already exist'
        })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "name, email, and password are required."
        })
    }
    try {
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email])
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const admin = result.rows[0]
        const foundAdmin = await bcrypt.compare(password, admin.password)
        if (!foundAdmin) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }
        const token = jwt.sign({
            id: admin.id,
            email: admin.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
        return res.status(200).json({ token })
    } catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}


module.exports = { Register, Login }