const { GraphQLClient, gql } = require("graphql-request");

module.exports = class CanvasLoader {
  constructor(ENDPOINT, CANVAS_API_TOKEN) {
    this._API_TOKEN = CANVAS_API_TOKEN;
    this._graphQLClient = new GraphQLClient(ENDPOINT + "/api/graphql", {
      headers: {
        authorization: `Bearer ${CANVAS_API_TOKEN}`,
      },
    });
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
    const query = gql`
      query MyQuery {
        allCourses {
          name
          id
        }
      }
    `;
    const data = await this._graphQLClient.request(query);
    return await data.allCourses;
  }
};
