export function getStepEmployee(data, stepNumber) {
  const stepKey = `step${stepNumber}_employee`;
  const stepObj = data[0].members.find((m) => m.hasOwnProperty(stepKey));
  return stepObj ? stepObj[stepKey] : null;
}
