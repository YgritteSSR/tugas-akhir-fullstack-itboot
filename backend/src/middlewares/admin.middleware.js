function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Akses ditolak, hanya admin' })
  }
  next()
}

module.exports = { authorizeAdmin };