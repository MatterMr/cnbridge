const { GraphQLClient, gql } = require("graphql-request");

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
   * Handles the formatting of errors
   *
   * ! In the future this function should also consider non destructive errors
   *
   * @param {Array} errors - Array of errors
   */
  _GQLErrorHandler(response) {
    const errorBatch = [];
    response.errors.forEach((err) => {
      errorBatch.push(new Error(`${err.extensions.code} : ${err.message}`));
    });
    throw errorBatch;
  }
  /**
   * Gets all the Courses accesable to the user
   *
   * @typedef {Object} allCourses
   * @property {string} allCourses[].name - The name of the course
   * @property {string} allCourses[].id - The id of the course
   *
   * @return {allCourses}
   */
  async getAllCourses() {
    const query = `
      query getAllCourses {
        allCourses {
          name
          id
        }
      }
    `;
    const response = await this._GQLRequest(query);
    return response.allCourses;
  }
  async getAssignmentGroups(courseId) {
    const query = `
      query getAssignmentGroups {
        course(id: "${courseId}") {
          assignmentGroupsConnection {
            nodes {
              id
              name
            }
          }
        }
      }
      `;
    const response = await this._GQLRequest(query);
    return response.course.assignmentGroupsConnection.nodes;
  }
};
