/**
 * @openapi
 * /v1/auth/sign-up:
 *   post:
 *     summary: Sign up for the Image Processor API
 *     description: Registers a new user and sends OTP for verification.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "secure_password"
 *               firstName:  # Fixed: was over-indented
 *                 type: string
 *                 example: "John"
 *               lastName:   # Fixed: was over-indented
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Successful sign-up, sends OTP for verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 message:
 *                   type: string
 *                   example: "Sign-up successful"
 *                 data:      # Fixed: everything below was over-indented
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64a7b8c9d1e2f3g4h5i6j7k8"
 *                     email:  # Fixed: was 1 space too far
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     firstName:  # Fixed: was 1 space too far
 *                       type: string
 *                       example: "John"
 *                     lastName:   # Fixed: was 1 space too far
 *                       type: string
 *                       example: "Doe"
 *                     username:   # Fixed: was 1 space too far
 *                       type: string
 *                       example: "johndoe"
 *                     role:       # Fixed: was 1 space too far
 *                       type: string
 *                       example: "user"
 *                     status:     # Fixed: was 1 space too far
 *                       type: string
 *                       example: "pending"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @openapi
 * /v1/auth/verify-email:
 *   post:
 *     summary: Verify email with OTP
 *     description: Verifies a user's email address using a one-time password (OTP) sent to their email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Invalid OTP or email.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /v1/auth/resend-otp:
 *   post:
 *     summary: Resend OTP for email verification
 *     description: Resends a one-time password (OTP) to the user's email for verification purposes.
 *     tags:
 *       - Authentication
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
 *                 format: email
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: OTP resent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent to your email"
 *       400:
 *         description: Invalid email format.
 *       404:
 *         description: User not found.
 *       429:
 *         description: Too many requests - OTP already sent recently.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     summary: User login
 *     description: |
 *       Logs in a user. Returns token differently based on client:
 *       - **Web browsers**: Token is set as HTTP-only cookie automatically
 *       - **Mobile apps**: Token is returned in response body (check `data.token`)
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: X-Client-Type
 *         schema:
 *           type: string
 *           enum: [web, mobile]
 *         description: |
 *           Optional: Tell the server what client you're using.
 *           - `mobile` → returns token in body
 *           - `web` or omitted → uses HTTP-only cookie
 *         example: "mobile"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: HTTP-only cookie (web clients only)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
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
 *                     expiresIn:
 *                       type: number
 *                       example: 3600
 */

/**
 * @openapi
 * /v1/auth/refresh-token:
 *   post:
 *     summary: Refresh token
 *     description: |
 *       Refreshes the access token. Returns token differently based on client:
 *       - **Web browsers**: Token is set as HTTP-only cookie automatically
 *       - **Mobile apps**: Token is returned in response body (check `data.token`)
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: X-Client-Type
 *         schema:
 *           type: string
 *           enum: [web, mobile]
 *         description: |
 *           Optional: Tell the server what client you're using.
 *           - `mobile` → returns token in body
 *           - `web` or omitted → uses HTTP-only cookie
 *         example: "mobile"
 *       - in: cookie
 *         name: token
 *         required: false
 *         schema:
 *           type: string
 *         description: HTTP-only refresh token cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - userId
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: "64a7b8c9d1e2f3g4h5i6j7k8"
 *               userId:
 *                 type: string
 *                 example: "64a7b8c9d1e2f3g4h5i6j7k8"
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: HTTP-only cookie (web clients only)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token refreshed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: "User ID"
 */

/**
 * @openapi
 * /v1/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out a user, revoking their token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - userId
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: "64a7b8c9d1e2f3g4h5i6j7k8"
 *               userId:
 *                 type: string
 *                 example: "64a7b8c9d1e2f3g4h5i6j7k8"
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 */

/**
 * @openapi
 * /v1/auth/logout-all:
 *   post:
 *     summary: User logout all devices or sessions
 *     description: Logs out a user, revoking their token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64a7b8c9d1e2f3g4h5i6j7k8"
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 */

/**
 * @openapi
 * /v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends an OTP to the user's email for password reset.
 *     tags:
 *       - Authentication
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
 *                 format: email
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully"
 */

/**
 * @openapi
 * /v1/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Resets the user's password using the OTP sent to their email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "new_password"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Invalid OTP, email, or new password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
