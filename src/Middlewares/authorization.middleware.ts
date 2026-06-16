// export const authorize =
//   (
//     permission:
//       Permission,
//   ) =>
//   (
//     req,
//     res,
//     next,
//   ) => {

//     const permissions =
//       ROLE_PERMISSIONS[
//         req.membership.role
//       ];

//     if (
//       !permissions.includes(
//         permission,
//       )
//     ) {
//       throw new ForbiddenError();
//     }

//     next();
//   };
