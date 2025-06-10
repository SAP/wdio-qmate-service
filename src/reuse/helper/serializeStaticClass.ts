export function serializeStaticClass(cls: any, className: string): string {
  let classDecl = `class ${className} {}`;

  const staticAssignments = Object.getOwnPropertyNames(cls)
    .filter(key => !['length', 'name', 'prototype'].includes(key))
    .map(key => {
      const value = cls[key];
      if (typeof value === 'function') {
        // Wrap function string in parentheses to create a function expression
        return `${className}.${key} = (${value.toString()});`;
      } else {
        return `${className}.${key} = ${JSON.stringify(value)};`;
      }
    })
    .join('\n');

  return `${classDecl}\n${staticAssignments}`;
}
