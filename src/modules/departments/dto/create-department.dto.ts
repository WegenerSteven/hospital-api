export class CreateDepartmentDto {
  departmentId?: string;
  name: string;
  description?: string;
  headOfDepartmentId?: string; // Assuming this is a reference to a user or another entity
}
