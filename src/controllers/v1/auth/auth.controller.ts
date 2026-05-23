import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { AuthService } from '../../../auth/auth.service';
import { HttpResponse } from '../../../shared/utils';
import { ENVIRONMENT } from '../../../config';

const authService = new AuthService();
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.signUp(req);
    return HttpResponse({
      response: res,
      status: STATUS_CODE.CREATED,
      message: SUCCESS_MESSAGE.CREATED('User'),
    });
  } catch (err) {
    return next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.verifyEmail(req);
    return HttpResponse({
      response: res,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.VERIFIED('Email'),
    });
  } catch (err) {
    return next(err);
  }
};

export const resendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.resendOTP(req);
    return HttpResponse({
      response: res,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.RESENT('OTP'),
    });
  } catch (err: any) {
    return next(err);
  }
};

export const login = async (
  req: Request & { isMobile?: boolean },
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.login(req);

    // Web: HTTP-only cookie (most secure)
    if (!req.isMobile) {
      res.cookie('token', result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none', // for cross-site cookie in modern browsers
        maxAge: ENVIRONMENT.JWT.accessTokenExpiryInSeconds * 1000, // convert to milliseconds
        partitioned: true, // for Safari
        path: '/api/v1', // ensure cookie is sent for all routes
      });

      return HttpResponse({
        response: res,
        status: STATUS_CODE.OK,
        message: result.message ? result.message : SUCCESS_MESSAGE.LOGIN,
        data: {
          session: result.session,
          expiresIn: ENVIRONMENT.JWT.accessTokenExpiryInSeconds,
          user: result.user,
        }, // No token in body
      });
    }

    // Mobile: Return short-lived token + refresh token pattern
    return HttpResponse({
      response: res,
      status: STATUS_CODE.OK,
      message: result.message ? result.message : SUCCESS_MESSAGE.LOGIN,
      data: {
        message: result.message,
        user: result.user,
        session: result.session,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken, // Separate, longer-lived token
        expiresIn: ENVIRONMENT.JWT.accessTokenExpiryInSeconds,
        tokenType: 'Bearer',
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const refreshToken = async (
  req: Request & { isMobile?: boolean },
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.refreshHandler(req);
    // Web: HTTP-only cookie (most secure)
    if (!req.isMobile) {
      res.cookie('token', data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none', // for cross-site cookie in modern browsers
        maxAge: ENVIRONMENT.JWT.accessTokenExpiryInSeconds * 1000, // convert to milliseconds
        partitioned: true, // for Safari
        path: '/api/v1', // ensure cookie is sent for all routes
      });

      return HttpResponse({
        response: res,
        status: STATUS_CODE.OK,
        message: SUCCESS_MESSAGE.REFRESHED('Token'),
        data: { user: data.userId, session: data.session }, // No token in body
      });
    }

    // Mobile: Return short-lived token + refresh token pattern
    return HttpResponse({
      response: res,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.LOGIN,
      data: {
        userId: data.userId,
        session: data.session,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken, // Separate, longer-lived token
        expiresIn: ENVIRONMENT.JWT.refreshTokenExpiryInSeconds,
        tokenType: 'Bearer',
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.logoutHandler(req);
    res.clearCookie('refreshToken', { path: '/refresh' });
    return HttpResponse({
      response: res,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.LOGGED_OUT,
    });
  } catch (err) {
    return next(err);
  }
};

export const logoutAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.logoutAllHandler(req);
    res.clearCookie('refreshToken', { path: '/refresh' });
    return HttpResponse({
      response: res,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.LOGGED_OUT_ALL,
    });
  } catch (err) {
    return next(err);
  }
};
