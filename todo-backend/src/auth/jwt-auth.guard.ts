import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Añadir lógica adicional de autorización si es necesario
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Manejo de errores de autenticación
    if (err || !user) {
      throw err || new UnauthorizedException('Usuario no autorizado');
    }
    return user;
  }
}
