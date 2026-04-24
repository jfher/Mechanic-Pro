/**
 * @swagger
 * /api/v1/process:
 *   get:
 *     tags:
 *       - Processes
 *     summary: Get all processes
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
 *         description: List of Processes
 *       401:
 *         description: Unauthorized
 *   post:
 *     tags:
 *       - Processes
 *     summary: Create a new process
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *               operatorId:
 *                 type: string
 *               vehicleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Process created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/process/{processId}:
 *   patch:
 *     tags:
 *       - Processes
 *     summary: Update an existing process
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: processId
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
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *               operatorId:
 *                 type: string
 *               vehicleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Process updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */