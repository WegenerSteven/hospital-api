// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetCurrentUser = createParamDecorator(
//   (data: string | undefined, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     if (data) {
//       return request.user[data]; // Return specific user data if requested
//     }
//     return request.user; // Return the entire user object if no specific data is requested
//   },
// );
