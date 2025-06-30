// Accepts mark as string for form compatibility
export function isDirtyOrNotFilled({
  newOrEditedStudent,
  existingStudent,
}: {
  newOrEditedStudent: { firstName: string; lastName: string; email: string; mark: string };
  existingStudent: { firstName: string; lastName: string; email: string; mark: string } | undefined;
}): boolean {
  // Check for missing property in newOrEditedStudent
  for (const key of ['firstName', 'lastName', 'email', 'mark'] as const) {
    if (newOrEditedStudent[key] === undefined || newOrEditedStudent[key] === '' || (key === 'mark' && isNaN(Number(newOrEditedStudent.mark)))) {
      return false;
    }
  }

  // If editing, check for missing property in existingStudent
  if (existingStudent) {
    for (const key of ['firstName', 'lastName', 'email', 'mark'] as const) {
      if (existingStudent[key] === undefined || existingStudent[key] === '' || (key === 'mark' && isNaN(Number(existingStudent.mark)))) {
        return false;
      }
    }

    // Check if any property changed
    return (
      newOrEditedStudent.firstName !== existingStudent.firstName ||
      newOrEditedStudent.lastName !== existingStudent.lastName ||
      newOrEditedStudent.email !== existingStudent.email ||
      Number(newOrEditedStudent.mark) !== Number(existingStudent.mark)
    );
  }

  // In create mode, all fields are filled, so it's dirty (button enabled)
  return true;
}
