const router = require('express').Router()
const User = require('../models/User.model')

router.get('/:userId', async (req, res) => {
  try {
    const responseFromAPI = await fetch(
      `http://localhost:5005/api/users/${req.params.userId}`
    )
    if (responseFromAPI.ok) {
      const userFromAPI = await responseFromAPI.json()
      res.json({ user: userFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router