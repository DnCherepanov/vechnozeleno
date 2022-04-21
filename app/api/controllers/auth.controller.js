const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
  const { username, password } = req.body
  const valid =
    username === process.env.LOGIN && password === process.env.PASSWORD
  const expiresIn = '5h'
  try {
    if (!valid) {
      throw new SyntaxError('Данные некорректны')
    }
    const accessToken = jwt.sign({ user: username }, process.env.SECRET, {
      expiresIn,
    })
    res.json({ token: accessToken })
  } catch (e) {
    res.status(401).json({ message: e.message })
  }
}

module.exports.user = (req, res) => {
  const tokenDecoded = jwt.decode(req.headers.authorization.split('Bearer ')[1])
  res.json({ user: tokenDecoded.user })
}

module.exports.logout = (req, res) => {
  try {
    res.json('Вы успешно вышли')
  } catch (e) {
    res.status(401).json({ message: e.message })
  }
}
