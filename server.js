const { Sequelize, DataTypes } = require("sequelize");
const express = require('express')

const sequelize = new Sequelize('sqlite::memory:');
const Pokemon = sequelize.define('Pokemon', {
  nom: DataTypes.STRING,
  pv: DataTypes.INTEGER,
  niveau: DataTypes.INTEGER,
  typePokemon: DataTypes.STRING,
  nature: DataTypes.STRING,
  baiespreferer: DataTypes.STRING,
});

const Champion = sequelize.define('Champion', {
    name: DataTypes.STRING,
    difficulte: DataTypes.INTEGER,
    toxicite: DataTypes.INTEGER,
    niveau: DataTypes.INTEGER,
    attaquephysique: DataTypes.INTEGER,
    attaquemagique: DataTypes.INTEGER,
    armurephysique: DataTypes.INTEGER,
    armuremagique: DataTypes.INTEGER,
    critique: DataTypes.INTEGER,
    main: DataTypes.BOOLEAN,
  });

const app = express()
const port = 3000

app.use(express.json());
sequelize.sync()

app.get('/', (req, res) => {
  res.send('Accueil projet "Pokemon & Champion LOL"')
})

app.get('/pokemons', async(req,res) => {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
})

app.get('/pokemons/:id', async(req,res) => {
    const pokemon = await Pokemon.findByPk(req.params.id);
    if(pokemon != null)
    {
        res.json(pokemon);
    }
    else
    {
        res.json({
            message: "Ce pokemon n'existe pas !"
        })
    }
})

app.post('/pokemons', async (req, res) => {
    const pokemon = await Pokemon.create({
        nom: req.body.nom,
        pv: req.body.pv,
        niveau: req.body.niveau,
        typePokemon: req.body.typePokemon,
        nature: req.body.nature,
        baiespreferer: req.body.baiespreferer,
    });
    res.json(pokemon)
})

app.put('/pokemons/:id', async (req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id)
    if(pokemon != null)
    {
        pokemon.nom = req.body.nom
        pokemon.pv = req.body.pv
        pokemon.niveau = req.body.niveau
        pokemon.typePokemon = req.body.typePokemon
        pokemon.nature = req.body.nature
        pokemon.baiespreferer = req.body.baiespreferer
    
        pokemon.save()
        res.json(pokemon)
    }
    else
    {
        res.json({
            message: "Ce pokemon n'existe pas !"
        })
    }
    
})

app.delete('/pokemons/:id', async (req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id)
    if(pokemon != null)
    {
        pokemon.destroy()
        res.json({
            message: "Pokemon supprimé !",
        })
    }
    else
    {
        res.json({
            message: "Ce pokemon n'existe pas !"
        })
    }
})

app.get('/champions', async(req,res) => {
    const chamions = await Champion.findAll();
    res.json(chamions);
})

app.get('/champions/:id', async(req,res) => {
    const champion = await Champion.findByPk(req.params.id);
    if(champion != null)
    {
        res.json(champion);
    }
    else
    {
        res.json({
            message: "Ce champion n'existe pas !"
        })
    }
})

app.post('/champions', async (req, res) => {
    const champion = await Champion.create({
        name: req.body.name,
        difficulte: req.body.difficulte,
        toxicite: req.body.toxicite,
        niveau: req.body.niveau,
        attaquephysique: req.body.attaquephysique,
        attaquemagique: req.body.attaquemagique,
        armurephysique: req.body.armurephysique,
        armuremagique: req.body.armuremagique,
        critique: req.body.critique,
        main: req.body.main,
    });
    res.json(champion)
})

app.put('/champions/:id', async (req, res) => {
    const champion = await Champion.findByPk(req.params.id)
    if(champion != null)
    {
        champion.name = req.body.name
        champion.difficulte = req.body.difficulte
        champion.toxicite = req.body.toxicite
        champion.niveau = req.body.niveau
        champion.attaquephysique = req.body.attaquephysique
        champion.attaquemagique = req.body.attaquemagique
        champion.armurephysique = req.body.armurephysique
        champion.armuremagique = req.body.armuremagique
        champion.critique = req.body.critique
        champion.main = req.body.main
    
        champion.save()
        res.json(champion)
    }
    else
    {
        res.json({
            message: "Ce pokemon n'existe pas !"
        })
    }
    
})

app.delete('/champions/:id', async (req, res) => {
    const champion = await Champion.findByPk(req.params.id)
    if(champion != null)
    {
        champion.destroy()
        res.json({
            message: "Champion supprimé !",
        })
    }
    else
    {
        res.json({
            message: "Ce champion n'existe pas !"
        })
    }
})

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`)
})