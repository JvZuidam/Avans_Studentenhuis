const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const assert = require('assert')

chai.should();
chai.use(chaiHttp);

describe("Deelnemer API GET", () => {
    it("should throw an error when using invalid JWT token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return all deelnemers from the given maaltid when using a valid token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});

describe("Deelnemer API DELETE", () => {
    it("should throw an error when using invalid JWT token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return a studentenhuis when posting a valid object", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when voornaam is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when achternaam is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when email is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

});