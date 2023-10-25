const router = require('express').Router()
//import { useParams } from 'react-router-dom';

/* GET home page */
/* router.get('/', async (req, res) => {
  try {
    const responseFromAPI = await fetch('https://ih-crud-api.herokuapp.com/characters')
    if (responseFromAPI.ok) {
      const charactersFromAPI = await responseFromAPI.json()
      res.json({ characters: charactersFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
}) */

router.get('/profileId', async (req, res) => {
  try {
    const responseFromAPI = await fetch(
      `http://localhost:5005/api/profile/${req.params._id}`
    )
    if (responseFromAPI.ok) {
      const userFromAPI = await responseFromAPI.json()
      res.json({ user: userFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})

// POST to create a new character
/* router.post('/', async (req, res) => {
  try {
    const responseFromAPI = await fetch(`https://ih-crud-api.herokuapp.com/characters`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (responseFromAPI.ok) {
      const newCharacter = await responseFromAPI.json()
      res.status(201).json(newCharacter)
    }
  } catch (error) {
    console.log(error)
  }
})
// PUT to update an existing character
router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const responseFromAPI = await fetch(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (responseFromAPI.ok) {
      const characterFromAPI = await responseFromAPI.json()
      res.json({ character: characterFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})
// DELETE to delete one character
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await fetch(`https://ih-crud-api.herokuapp.com/characters/${id}`, {
      method: 'DELETE',
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error })
  }
}) */
module.exports = router