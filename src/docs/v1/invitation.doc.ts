/**
 * @openapi
 * /v1/organizations/{organizationId}/invitations:
 *   post:
 *     summary: Create an invitation
 *     tags: [Invitation]
 *     parameters:
 *       - name: organizationId
 *         in: path
 *         description: Organization ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Invitation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invitation created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     invitation:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         status:
 *                           type: string
 *                           example: "pending"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @openapi
 * /v1/invitations/{token}/accept:
 *   post:
 *     summary: Accept an invitation
 *     tags: [Invitation]
 *     parameters:
 *       - name: token
 *         in: path
 *         description: Invitation token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation accepted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invitation accepted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                     token:
 *                       type: string
 *                       description: "JWT token (only returned for mobile clients or when X-Client-Type: mobile is sent)"
 *                       example: "eyJhbGciOiJIUzI1NiIs..."
 *                     tokenType:
 *                       type: string
 *                       example: "Bearer"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @openapi
 * /v1/organizations/{organizationId}/invitations:
 *   get:
 *     summary: Get all pending invitations
 *     tags: [Invitation]
 *     parameters:
 *       - name: organizationId
 *         in: path
 *         description: Organization ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invitation'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @openapi
 * /v1/organizations/{organizationId}/invitations/{invitationId}:
 *   delete:
 *     summary: Cancel an invitation
 *     tags: [Invitation]
 *     parameters:
 *       - name: organizationId
 *         in: path
 *         description: Organization ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: invitationId
 *         in: path
 *         description: Invitation ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invitation canceled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invitation canceled successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
