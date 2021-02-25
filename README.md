<p align="center">
  <img align="center" width="140" height="140" src="https://image.flaticon.com/icons/svg/1472/1472362.svg"><br/>
  <h1 align="center">Vellichor</h2>
</p>

[![Build Status](https://travis-ci.com/joegiralt/vellichor.svg?branch=master)](https://travis-ci.com/joegiralt/vellichor)[![codecov](https://codecov.io/gh/joegiralt/vellichor/branch/master/graph/badge.svg)](https://codecov.io/gh/joegiralt/vellichor)[![Known Vulnerabilities](https://snyk.io/test/github/joegiralt/vellichor/badge.svg)](https://snyk.io/test/github/joegiralt/vellichor)[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

A useful collection of **fast and lightweight** data structures and their algorithms. All implementations are done with **zero dependencies**

Works on all node versions >= v0.10.

# Quick Start

    npm install vellichor

# Implementations/API

- Double Ended Queue[(typescript port of Denque)](https://github.com/invertase/denque)
- (Singly) Linked List
- LRU Cache
- Heap Queue (Todo)

[Full API Docs here](https://joegiralt.github.io/vellichor/index.html)

## Benchmarks

### DoubleEndedQueue vs [Deque](https://github.com/invertase/denque)

#### Platform info:

```
Darwin 16.7.0 x64
Node.JS 13.0.1
V8 7.8.279.17-node.14
Intel(R) Core(TM) i5-3230M CPU @ 2.60GHz × 4
```

#### 2 million items in queue

(3 x shift + 3 x push ops per 'op')

```
denque x 34,584,460 ops/sec ±1.18% (83 runs sampled)
vellichor-double-ended-queue x 34,662,988 ops/sec ±0.90% (87 runs sampled)
```

#### Splice

(1 x splice per 'op') - initial size of 100,000 items

```
denque.splice x 410,073 ops/sec ±37.09% (59 runs sampled)
DoubleEndedQueue.splice x 426,407 ops/sec ±24.12% (64 runs sampled)
native array splice x 8,070 ops/sec ±18.39% (46 runs sampled)
```

#### Remove One

(1 x removeOne + 10 x push per 'op') - initial size of 100,000 items

```
denque.removeOne x 533,924 ops/sec ±1.18% (82 runs sampled)
DoubleEndedQueue.removeOne x 535,881 ops/sec ±1.16% (87 runs sampled)
native array splice x 2,362 ops/sec ±1.77% (87 runs sampled)
```
