import jwt from 'jsonwebtoken'

export const userExtractor = (req, res, next) => {
  let token = null
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.body.userId = decodedToken.userId
  } catch (err) {
    req.body.errors = [{ msg: 'No valid token provided.' }]
  }
  next()
}
