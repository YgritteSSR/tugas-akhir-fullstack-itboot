const AuthService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'Semua field wajib' })
    }
    const user = await AuthService.register({ username, email, password, role })
    res.status(201).json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { token, user } = await AuthService.login(req.body)
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username, // pastikan ada
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login };
