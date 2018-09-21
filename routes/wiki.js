const express = require('express')
const router = express.Router()
const { Page } = require('../models')
const { addPage } = require('../views')
const slug = require('../slugGenerator')
const wikipage = require('../views/wikipage')

router.get('/', (req, res, next) => {
  res.redirect('../views/main.js');
});

router.post('/', async (req, res, next) => {
  // console.log('res.json(req.body)', res.json(req.body))
  const page = await new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.title
  });
  Page.beforeCreate((pageInstance) => {
    pageInstance.slug = slug(pageInstance.slug);
  })
  console.log('NEW PAGE HERE', page);
  try {
    await page.save();
    res.send(wikipage(page, 'fakeWriter'));
    // res.redirect(`/${page.slug}`);
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
