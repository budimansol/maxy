const express = require ('express');
const {PrismaClient} = require('@prisma/client');
const dotenv = require('dotenv');
const app = express();

const prisma = new PrismaClient();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        const user = await prisma.user.create({
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                address: newUser.address,
                pin: newUser.pin
            },
        });
        res.status(200).json({
            data: user,
            message: "Create User Succesfull"
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});



app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});