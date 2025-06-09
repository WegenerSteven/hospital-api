import { Injectable } from '@nestjs/common';
import { AppAbility } from '../casl-ability.factory';
import { Action } from '../action.enum';

@Injectable()
export class adminPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Manage, 'All');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'All');
  }
}
