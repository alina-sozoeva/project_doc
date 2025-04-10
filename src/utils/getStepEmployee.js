export function getStepEmployee(data, stepNumber) {
  if (!Array.isArray(data) || !data[0]?.members) return null;
  const stepKey = `step${stepNumber}_employee`;
  const stepObj = data[0].members.find((m) => m.hasOwnProperty(stepKey));
  return stepObj ? stepObj[stepKey] : null;
}
