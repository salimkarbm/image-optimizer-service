/**
 * @openapi
 * /v1/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: All members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */