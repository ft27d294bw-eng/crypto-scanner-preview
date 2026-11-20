'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const e=require('../public/portfolio-engine.js');
const holdings=[{asset:'BTC',qty:0.1,buyUsd:80000},{asset:'XAU',qty:2,buyUsd:3500},{asset:'PLN',qty:1000,buyUsd:0.25}];
const prices={BTC:90000,XAU:4000};
test('base holdings count USD and PLN cash correctly',()=>{
 const s=e.summarize(holdings,prices,4);assert.equal(s.totalPln,69000);assert.equal(s.totalUsd,17250);assert.equal(s.scenarioPln,69000);
});
test('crypto shock changes crypto only',()=>{
 const s=e.summarize(holdings,prices,4,{crypto:-50});assert.equal(s.scenarioPln,51000);assert.equal(s.deltaPln,-18000);
});
test('FX shock leaves PLN notes unchanged',()=>{
 const s=e.summarize(holdings,prices,4,{usdPln:20});assert.equal(s.scenarioPln,82600);
});
test('metal shock independent of crypto shock',()=>{
 const s=e.summarize(holdings,prices,4,{metals:25});assert.equal(s.scenarioPln,77000);
});
test('goal inflation decreases purchasing power',()=>{
 const s=e.summarize(holdings,prices,4);const g=e.goalCheck(s,60000,20);assert.equal(g.cost,72000);assert.equal(g.remaining,-3000);assert.equal(g.reached,false);
});
test('unknown positions are never assigned mock prices',()=>{
 const s=e.summarize([...holdings,{asset:'SOL',qty:5,buyUsd:100}],prices,4);assert.deepEqual(s.missing,['SOL']);assert.equal(s.partial,true);assert.equal(s.totalPln,69000);
});
test('no rates means unavailable not zero',()=>{const s=e.summarize(holdings,prices,null);assert.equal(s.ready,false);assert.equal(s.totalPln,null);});
test('zero or negative holdings are rejected',()=>{assert.equal(e.isHolding({asset:'ETH',qty:-1,buyUsd:1}),false);assert.equal(e.isHolding({asset:'ETH',qty:1,buyUsd:0}),true);});
test('stablecoins are fiat-class for scenario',()=>{const s=e.summarize([{asset:'USDT',qty:100,buyUsd:1}],{USDT:1},4,{crypto:-50});assert.equal(s.scenarioPln,400);});

test('emergency reserve is protected before checking goal affordability',()=>{
 const s=e.summarize(holdings,prices,4);
 const g=e.goalCheck(s,60000,0,15000);
 assert.equal(g.spendable,54000);assert.equal(g.remaining,-6000);assert.equal(g.reached,false);
});
