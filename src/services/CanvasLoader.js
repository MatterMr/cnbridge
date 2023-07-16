const { GraphQLClient, gql } = require("graphql-request");
const { array } = require("yargs");

module.exports = class CanvasLoader {
  constructor(ENDPOINT, CANVAS_API_TOKEN) {
    this._API_TOKEN = CANVAS_API_TOKEN;
    this._graphQLClient = new GraphQLClient(ENDPOINT + "/api/graphql", {
      errorPolicy: "all",
      headers: {
        authorization: `Bearer ${CANVAS_API_TOKEN}`,
      },
    });
  }
  /**
   * Makes a GraphQL requests
   *
   * @param {String} GraphQL - GraphQL query string
   * @return {Object} Response
   */
  async _GQLRequest(query) {
    const formattedQuery = gql`
      ${query}
    `;
    return await this._graphQLClient
      .request(formattedQuery)
      .catch((err) => this._GQLErrorHandler(err.response));
  }
  /**
   * Returns a string with a new line between each option for graphql formatting.
   *
   * @param {[String]} options
   * @returns {[String]}
   */
  _formatQueryOptions(options) {
    let formattedString = "";
    options.forEach((element) => {
      if (typeof element == array) {
        throw Error("No nested options");
      }
      formattedString += `${element}\n`;
    });
    return formattedString;
  }
  /**
   * Handles the formatting of errors
   *
   * ! In the future this function should also consider non destructive errors
   *
   * @param {Array} errors - Array of errors
   */
  _GQLErrorHandler(response) {
    const errorBatch = [];
    console.log(response.errors);
    response.errors.forEach((err) => {
      errorBatch.push(new Error(`${err.extensions.code} : ${err.message}`));
    });
    throw errorBatch;
  }
  /**
   *  Gets a list of all courses
   *
   * @param {[string]} [options=["name", "id"]] Array of query perameters
   * @return {Array<Object>} Array of course objects
   */
  async getAllCourses(options = ["name", "id"]) {
    const query = `
      query getAllCourses {
        allCourses {
          ${this._formatQueryOptions(options)}
        }
      }
    `;
    const response = await this._GQLRequest(query);
    return response.allCourses;
  }
  /**
   *
   * @param {String} courseId
   * @param {[String]} options
   * @returns
   */
  async getAssignmentGroups(courseId, options = ["name", "id"]) {
    const query = `
      query getAssignmentGroups {
        course(id: "${courseId}") {
          assignmentGroupsConnection {
            nodes {
              ${this._formatQueryOptions(options)}
            }
          }
        }
      }
      `;
    const response = await this._GQLRequest(query);
    return response.course.assignmentGroupsConnection.nodes;
  }
  /**
   *
   * @param {*} assignmentGroupId
   * @param {*} options
   * @returns
   */
  async getAssignmentsFromGroup(
    assignmentGroupId,
    options = ["name", "id", "htmlUrl", "dueAt"]
  ) {
    const query = `query getAssignmentsFromGroup {
      assignmentGroup(id: "${assignmentGroupId}") {
        assignmentsConnection {
          nodes {
            ${this._formatQueryOptions(options)}
          }
        }
      }
    }`;
    const response = await this._GQLRequest(query);
    return response.assignmentGroup.assignmentsConnection.nodes;
  }
};
