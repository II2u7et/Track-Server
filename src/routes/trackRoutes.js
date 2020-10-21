const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const track = await Track.find({userID: req.user.userId})

    res.send(track);
})

router.post('/track', async (req, res) => {
    const { name, location } = req.body;

    if(!name || !location){
        return res
        .status(422)
        .send({error: ' You must provide a name and locations'})
    }

    try{
        const track = new Track({name, location, userId: req.user._id})
        await track.save();
        res.send(track);
    }catch(err){
        return res
        .status(422)
        .send({error: err.message})
    }
    

})

module.exports = router;