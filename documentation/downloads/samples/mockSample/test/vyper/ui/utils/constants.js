module.exports = {
  // Path to mockserver etc.  
  pathToMockServer: "sap/ui/demo/nav/localService/mockserver",
  // Application namesaspace/path
  applicationPath: "sap/ui/demo/nav/",
  // Mockserver delay
  mockDelay: 1,

  // Gathering of all regex used to identify the requests
  regexRequests: {
    getEmployeesCount: String.raw`/.*Employees\/\$count.*/`,
    getEmployees: String.raw`/.*Employees\?\$skip.*\$top.*/`,
    getResumeForEmployee: String.raw`/.*Employees\(.*\)\/Resume.*/`,
    getResumes: String.raw`/.*Resumes\(.*\).*/`
  },
  // The entity set names
  entitySet: {
    employees: "Employees",
    resumes: "Resumes"
  },
  // The http methods to be used for mocking the responses
  httpMethod: {
    get: "GET"
  }
};