/**
 * @swagger
 * /api/v1/services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get all services
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of services
 *       401:
 *         description: Unauthorized
 *   post:
 *     tags:
 *       - Services
 *     summary: Create a new service
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               status:
 *                 type: string
 *               operatorId:
 *                 type: string
 *               historyId:
 *                 type: string
 *     responses:
 *       201:
 *         description: service created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/services/{serviceId}:
 *   patch:
 *     tags:
 *       - Services
 *     summary: Update an existing service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               status:
 *                 type: string
 *               operatorId:
 *                 type: string
 *               historyId:
 *                 type: string
 *     responses:
 *       200:
 *         description: service updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */