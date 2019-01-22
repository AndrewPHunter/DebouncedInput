/**
 * @description Provide schema for json-schema-faker and chance to generate random data
 * from.  See: https://github.com/json-schema-faker/json-schema-faker
 */
const schema = {
  users: {
    type: "array",
    minItems: 20,
    maxItems: 30,
    items: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          unique: "true",
          minimum: "1"
        },
        name: {
          type: "string",
          faker: "name.findName"
        },
        email: {
          type: "string",
          faker: "internet.email"
        },
        favoriteSport: {
          type: "string",
          chance: {
            pickone: [["football", "soccer", "tennis", "volleyball"]]
          }
        }
      },
      required: ["id", "name", "email", "favoriteSport"]
    }
  }
};

module.exports = schema;
