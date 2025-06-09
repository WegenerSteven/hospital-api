import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from '../casl-ability.factory';
import { PolicyHandler } from '../interfaces/policy-handler.interface';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const PolicyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    if (PolicyHandlers.length === 0) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false; //no user found, deny access
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    return PolicyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handleRetry(ability);
    }
    return handleRetry.handle(ability);
  }
}
