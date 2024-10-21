import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * JwtGuard
 */
export class JwtGuard extends AuthGuard('jwt') {}
