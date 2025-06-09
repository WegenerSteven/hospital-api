import { AppAbility } from '../casl-ability.factory';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type policyHandlerCallBack = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | policyHandlerCallBack;
