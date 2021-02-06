/* eslint-disable*/
const { Router } = require('express');

const router = Router();

router.post('/', async (req, resp) => {
  try {

  } catch {
    console.log(`Error ${500}`)
  }
})

router.get('/', async (req, resp) => {
  resp.send('Hello from OpenIO')
})

module.exports = router;