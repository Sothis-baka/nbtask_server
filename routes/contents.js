const express = require('express');
const router = express.Router();

const { getSessionInfo, getPost } = require('../controller/queries');
const { resetSession, addRow, addCol, updatePost } = require('../controller/mutations')

const using = new Set();

router.get('/', async (req, res) => {
   const sessionInfo = await getSessionInfo();

   try{
      if(sessionInfo) res.send(sessionInfo);
      else res.status(404).send('Not found');
   }catch (e) {
      res.status(500).send(e);
   }
});

router.post('/reset', async (req, res) => {
   const session = await resetSession(req.app.io);
   using.clear();

   try{
      if(session)  res.status(200).send('Successfully Reset the session');
      else res.status(404).send("Could not find the post with given information");

      req.app.io.emit('updateData')
   }catch (e) {
      res.status(500).send(e);
   }
})

router.get('/editable:contentId', async (req, res) => {
   const id = req.params.contentId;
   if(using.has(id)) res.status(200).send(false);
   else{
      using.add(id);
      res.status(200).send(true);
   }
});

router.get('/stopEdit:contentId', async (req, res) => {
   const id = req.params.contentId;
   using.delete(id);
   res.status(200).send('Success');
});

router.get('/:contentId', async (req, res) => {
   const id = req.params.contentId;
   const post = await getPost(id);

   try{
      if(post) res.send(post);
      else res.status(404).send("Could not find the post with given information");
   }catch (e) {
      res.status(500).send(e);
   }
});

router.post('/addRow', async (req, res) => {
   try{
      await addRow(Number(req.body.index), req.app.io);
      res.status(200).send('Successfully add a new row at ' + req.body);
   }catch (e) {
      res.status(500).send(e);
   }
})

router.post('/addCol', async (req, res) => {
   try{
      await addCol(Number(req.body.index), req.app.io);
      res.status(200).send('Successfully add a new col at ' + req.body);
   }catch (e) {
      res.status(500).send(e);
   }
})

router.post('/updatePost', async (req, res) => {
   const post = await updatePost(req.body.input);

   try {
      if(post) res.status(200).send('Successfully updated post ' + post._id);
      else res.status(404).send("Could not find the post with given information");

      using.delete(String(post._id));
      req.app.io.emit('updateCell', post._id);
   }catch (e) {
      res.status(500).send(e);
   }
})


module.exports = router;