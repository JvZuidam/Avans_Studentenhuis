const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const assert = require('assert')

chai.should();
chai.use(chaiHttp);

describe("Maaltijd API POST", () => {
    it("should throw an error when using invalid JWT token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return a maaltijd when posting a valid object", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when naam is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when beschrijving is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when ingredienten is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when allergie is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when prijs is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});

describe("Maaltijd API GET one", () => {
    it("should throw an error when using invalid JWT token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return the correct maaltijd when using an existing maaltijdId", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return an error when using an non-existing maaltijdId", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});

describe("Maaltijd API GET all", () => {
    it("should throw an error when using invalid JWT token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return all maaltijden when using a valid token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});

describe("Maaltijd API PUT", () => {
    it("should throw an error when using invalid JWT token", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should return a maaltijd with ID when posting a valid object", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when naam is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when beschrijving is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when ingredienten is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when allergie is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when prijs is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});

describe("Maaltijd API DELETE", () => {
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

    it("should throw an error when naam is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when beschrijving is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when ingredienten is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when allergie is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it("should throw an error when prijs is missing", (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});