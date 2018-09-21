const express = require('express')
const router = express.Router()
const { Page } = require('../models')
const { addPage } = require('../views')
const wikipage = require('../views/wikipage')

router.get('/', (req, res, next) => {
  res.redirect('../views/main.js');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) =>  {
  const page = await Page.findOne({where: {slug: req.params.slug}})
  res.send(wikipage(page, 'tempauthor'))
})

router.post('/', async (req, res, next) => {
  // console.log('res.json(req.body)', res.json(req.body))

  // console.log('NEW PAGE HERE', page);
  try {
    const page = await new Page({
      title: req.body.title,
      content: req.body.content,
      slug: req.body.title
    });

    await page.save();

    res.redirect(`${page.slug}`);
  } catch (error) { next(error) }
});

module.exports = router;
