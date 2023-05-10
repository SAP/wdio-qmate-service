#!/usr/bin/env node
/* eslint-disable no-console */
var args = process.argv.slice(2);
var delay = args[0];

if (delay != parseInt(delay)) {
  console.error("incorrect delay value: " + delay);
  process.exit(1);
}

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
  msleep(n * 1000);
  process.exit(0);
}

sleep(delay);