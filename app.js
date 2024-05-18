const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'multi_tenancy.db'
});

const Tenant = sequelize.define('Tenant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

app.post('/tenants', async (req, res) => {
  const { name } = req.body;
  try {
    const tenant = await Tenant.create({ name });
    res.status(201).json({ message: 'Tenant created successfully', tenant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/tenants', async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    res.json({ tenants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error('Error synchronizing database:', error));
