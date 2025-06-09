import { Injectable } from '@nestjs/common';
import { AppAbility } from '../casl-ability.factory';
import { Action } from '../action.enum';

@Injectable()
export class profilepPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'Profile');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'Profile');
  }
  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'Profile');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'Profile');
  }
}
