import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategyBase } from 'passport-local';
import { Strategy as JwtStrategyBase, ExtractJwt } from 'passport-jwt';

class LocalStrategy extends PassportStrategy(LocalStrategyBase, 'local') {
  async validate(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      return {
        id: 1,
        username
      };
    }

    return null;
  }
}

class JwtStrategy extends PassportStrategy(JwtStrategyBase, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'demo-secret'
    });
  }

  async validate(payload: { sub: number; username: string }) {
    return {
      id: payload.sub,
      username: payload.username
    };
  }
}

class LocalAuthGuard extends AuthGuard('local') { }

class JwtAuthGuard extends AuthGuard('jwt') { }

export function solve_08_passport_local_jwt_strategies(): string {
  const localGuard = LocalAuthGuard;
  const jwtGuard = JwtAuthGuard;

  return `Passport strategies configured: ${localGuard.name}, ${jwtGuard.name}`;
}