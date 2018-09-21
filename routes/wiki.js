const express = require('express')
const router = express.Router()
const { Page } = require('../models')
const { addPage } = require('../views')

router.get('/', (req, res, next) => {
  res.redirect('../views/main.js');
});

router.post('/', async (req, res, next) => {
  const page = await new Page({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
