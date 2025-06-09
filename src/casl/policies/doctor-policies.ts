import { Injectable } from '@nestjs/common';
import { AppAbility } from '../casl-ability.factory';
import { Action } from '../action.enum';

@Injectable()
export class doctorPolicies {
  static Read(ability: AppAbility) {
    return (
      ability.can(Action.Read, 'Doctor') ||
      ability.can(Action.Read, 'Appointment')
    );
  }

  static Create(ability: AppAbility) {
    return ability.can(Action.Create, 'Doctor');
  }

  static Update(ability: AppAbility) {
    return ability.can(Action.Update, 'Doctor');
  }

  static Delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'Doctor');
  }
}
