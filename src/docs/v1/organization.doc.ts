/**
 * @openapi
 * /v1/organizations:
 *   post:
 *     summary: Create organization
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     organization:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "Organization ID"
 *                         name:
 *                           type: string
 *                           example: "Organization Name"
 *                         slug:
 *                           type: string
 *                           example: "organization-name"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @openapi
 * /v1/organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organization]
 *     responses:
 *       200:
 *         description: All organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 */

/**
 * @openapi
 * /v1/organizations/{organizationId}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organization]
 *     parameters:
 *       - name: organizationId
 *         in: path
 *         description: Organization ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
