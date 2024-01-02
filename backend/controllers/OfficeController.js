//models
const Office = require('../models/office');
//helpers 
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const sendErrorResponse = require('../helpers/sendErrorResponse');
//errorMessages
const errorMessages = require('../public/errorMessages/errorMessages');
module.exports = class OfficeController {

    static async createOffice(req, res) {
        const { cargo, valorHora, isAdmin } = req.body;

        // validations

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user == null) {
            sendErrorResponse.fourTwoTwo(errorMessages.userNotAut, res);
            return;
        }

        if (user.isAdmin == false) {
            sendErrorResponse.fourTwoTwo(errorMessages.userNotAut, res);
            return;
        }

        const validations = {
            cargo,
            valorHora,
            isAdmin,
        };

        for (const field in validations) {
            if (!validations[field]) {
                sendErrorResponse.fourTwoTwo(errorMessages[field], res);
                return;
            }
        }

        const officeExistente = await Office.findOne({ where: { cargo: cargo } })

        if (officeExistente) {
            sendErrorResponse.fourTwoTwo(errorMessages.officeExistente, res);
            return;
        }

        const idUser = user.id;
        const bit = true;

        try {
            const office = await Office.create({ cargo, valorHora, isAdmin, idUser, bit })
            sendErrorResponse.twoZero(errorMessages.officeConcluir, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAllOffice(req, res) {

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user == null) {
            sendErrorResponse.fourTwoTwo(errorMessages.userNotAut, res);
            return;
        }

        if (user.isAdmin == false) {
            sendErrorResponse.fourTwoTwo(errorMessages.userNotAut, res);
            return;
        }

    }












}