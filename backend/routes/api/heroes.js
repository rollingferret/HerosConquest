const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');

const { User, Hero } = require('../../db/models');
const { route } = require('./heroes');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const userHeroes = await Hero.findAll({
        where: { ownerId: userId }
    });

    //err handler
    if(!userHeroes.length) {
        return res.json({UserHeroes: []})
    };

    return res.json({UserHeroes: userHeroes})
});

router.post('/create', async (req, res) => {
    const { name, heroClass, level, xp, hp, att, def, spd, attSpd } = req.body;

    //err handler
    const errors = {}
    if(!name) errors.name = "Name is required";
    if(name.length > 12) errors.name = "Name cannot be more than 12 characters long";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    }

    const newHero = await Hero.create({
        ownerId: req.user.id,
        name,
        heroClass,
        level,
        xp,
        hp,
        att,
        def,
        spd,
        attSpd
    });
    return res.status(201).json(newHero)
});

route.put('/:heroId', async (req, res) => {
    const { name, heroClass, level, xp, hp, att, def, spd, attSpd } = req.body;
    const { heroId } = req.params;
    const hero = await Hero.findByPk(heroId);

    //error handler
    if(!hero) {
        return res.status(404).json({message: "Hero couldn't be found"});
    };
    if(!name) errors.name = "Name is required";
    if(name.length > 12) errors.name = "Name cannot be more than 12 characters long";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    }

    const updatedHero = {
        ownerId: req.user.id,
        name,
        heroClass,
        level,
        xp,
        hp,
        att,
        def,
        spd,
        attSpd
    };
    await hero.update(updatedHero);
    return res.json(hero)
});

route.delete('/:heroId', async (req, res) => {
    const { heroId } = req.params;
    const hero = await Hero.findByPk(heroId);

    //error handler
    if(!hero) {
        return res.status(404).json({message: "Hero couldn't be found"});
    };

    await hero.destroy();
    return res.json({ message: "Successfully deleted" });
})

module.exports = router;
