/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     SmartCard:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         minVisits:
 *           type: integer
 *         discount:
 *           type: number
 *         type:
 *           type: string
 *           enum: [Silver, Gold, Platinum, Diamond, VIP]
 *         validity:
 *           type: integer
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/smartcard/add:
 *   post:
 *     summary: Add Smart card 
 *     tags: [SmartCard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SmartCard'
 *     responses:
 *       201:
 *         description: Success
 */



/**
 * @swagger
 * /api/v1/smartcard/get:
 *   get:
 *     summary: All smart card list
 *     tags: [SmartCard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Smart cards list
 */

/**
 * @swagger
 * /api/v1/smartcard/get/{id}:
 *   get:
 *     summary: Get smart card by ID
 *     tags: [SmartCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Smart card ID
 *     responses:
 *       200:
 *         description: Smart card details
 */

/**
 * @swagger
 * /api/v1/smartcard/update/{id}:
 *   patch:
 *     summary: Update Smart card 
 *     tags: [SmartCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Smart card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SmartCard'
 *     responses:
 *       200:
 *         description: Smart card updated successfully
 *       404:
 *         description: Smart card not found
 */


/**
 * @swagger
 * /api/v1/smartcard/delete/{id}:
 *   delete:
 *     summary: Delete smart card by ID
 *     tags: [SmartCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Smart card ID
 *     responses:
 *       200:
 *         description: Smart card deleted successfully
 */


