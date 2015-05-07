var request = require("request");

var base_url = "http://localhost:8080/api";

describe("Simple Score Server", function() {
  describe("GET /api", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
