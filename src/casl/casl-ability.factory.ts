import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './action.enum';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Role } from 'src/profiles/entities/profile.entity';
//define a type for subjects
type Subject =
  | 'Profile'
  | 'User'
  | 'Patient'
  | 'Doctor'
  | 'Appointment'
  | 'Admin'
  | 'All';

//define the type of ability to be used
export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Profile): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.role === Role.ADMIN) {
      //admin can do everything
      can(Action.Manage, 'All');
    }

    //Doctor
    else if (user.role === Role.DOCTOR) {
      can(Action.Read, ['Appointment', 'Patient', 'Profile']);

      //doctor can manage appointments
      can([Action.Create, Action.Update, Action.Delete], 'Appointment');
      //doctor can manage patients
      can(Action.Update, ['Patient', 'Profile']);
    } else if (user.role === Role.PATIENT) {
      //patients can read
      can(Action.Read, ['Appointment', 'Doctor']);
      //patients can manage
      can([Action.Read, Action.Update], 'Profile');
    }

    return build();
  }
}
