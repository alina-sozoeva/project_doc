export function getStepData(members, stepIndex) {
    const step = members[stepIndex];
    return {
      index: stepIndex,
      ...Object.fromEntries(
        Object.entries(step)
          .filter(([key]) => key.startsWith(`step${stepIndex}_`))
          .map(([key, value]) => [key.replace(`step${stepIndex}_`, ""), value]) 
      ),
    };
  }
  
  export function getRecipientsForStep(stepData, allEmployees) {
    if (stepData.employee) {
      return [stepData.employee];
    }
  
    const { department, position } = stepData;
  
    return allEmployees
      .filter((emp) => {
        const matchDept = department ? emp.department === department : true;
        const matchPos = position ? emp.position === position : true;
        return matchDept && matchPos;
      })
      .map((emp) => emp.id);
  }
  