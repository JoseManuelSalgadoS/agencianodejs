const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) => {
    let listAuto = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Estos son todos los autos",
        listAuto: listAuto
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Este es el auto que elegiste :P",
        auto: auto
    })
});

router.post('/create', async (req, res) => {
    const {nombre, matricula, añoVerificacion, fechaRegistro, fechaActualizacion, marca} = req.body;
    const auto = {
        nombre, matricula, añoVerificacion, fechaRegistro, fechaActualizacion, status: 1, marca
    };
    await pool.query('INSERT INTO autos set ?', [auto]);
    res.json({
        status: 200,
        message: "Auto registrado correctamente :D",
        auto: auto
    });
});

router.post('/update:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, matricula, añoVerificacion, fechaRegistro, fechaActualizacion, marca} = req.body;

    const auto = {nombre, matricula, añoVerificacion, fechaRegistro, fechaActualizacion, marca};

    await pool.query('UPDATE autos SET ? WHERE id = ?', [auto, id]);
    res.json({
        status: 200,
        message: "El auto ha sido actualizado :D",
        auto: auto
    });
});

router.post('/delete:id', async (req, res) => {
    const {id} = req.params;

    await pool.query('UPDATE autos SET estado = 0 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Auto eliminado :O"
    });
});



module.exports = router;