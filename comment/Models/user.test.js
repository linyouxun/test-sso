#!/usr/bin/env node
require("babel-polyfill");
require('babel-core/register');
var assert  = require("assert");

var saveUser = require('./User').saveUser;
var getUser = require('./User').getUser;
var findUserOne = require('./User').findUserOne;


it("save user info", async function(){   
    let data ={name:'testName',password:'123456l'};
    let d = await saveUser(data);
    assert.equal(data.name, d.name);
    assert.equal(data.password, d.password);
});

it("find user info", async function(){
    let data = {name:'testName'}
    let d = await getUser(data);
    assert.equal(data.name, d[0].name);
});

it("find one user info", async function(){
    let data = {name:'testName'}
    let d = await findUserOne(data);
    assert.equal(data.name, d.name);
});


