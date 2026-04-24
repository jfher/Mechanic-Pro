/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get all vehicles
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
 *         description: List of vehicles
 *       401:
 *         description: Unauthorized
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Create a new vehicle
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: string
 *               color:
 *                 type: string
 *               plate:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/vehicles/{vehicleId}:
 *   patch:
 *     tags:
 *       - Vehicles
 *     summary: Update an existing vehicle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
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
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: string
 *               color:
 *                 type: string
 *               plate:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */