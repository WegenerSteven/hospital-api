import { AppAbility } from '../casl-ability.factory';
import { Injectable } from '@nestjs/common';
import { Action } from '../action.enum';

@Injectable()
export class patientPolicies {
  static read(ability: AppAbility) {
    return (
      ability.can(Action.Read, 'Patient') ||
      ability.can(Action.Read, 'Appointment')
    );
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Read, 'Patient');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'Patient');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'Patient');
  }
}
