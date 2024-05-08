import { validationResult } from 'express-validator'

export const expressValidator = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res
      .status(400)
      .send({ errors: errors.array() })
    return true
  }
  return false
}
