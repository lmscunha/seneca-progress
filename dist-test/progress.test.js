'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
/* Copyright © 2026 Seneca Project Contributors, MIT License. */
const node_test_1 = require('node:test')
const code_1 = require('@hapi/code')
const seneca_1 = __importDefault(require('seneca'))
const seneca_msg_test_1 = __importDefault(require('seneca-msg-test'))
// import { Maintain } from '@seneca/maintain'
const __1 = __importDefault(require('..'))
const __2 = __importDefault(require('..'))
const basic_messages_1 = __importDefault(require('./basic.messages'))
;(0, node_test_1.describe)('progress', () => {
  ;(0, node_test_1.test)('happy', async () => {
    // console.log(Progress)
    ;(0, code_1.expect)(__2.default).exist()
    ;(0, code_1.expect)(__1.default).exist()
    const seneca = (0, seneca_1.default)({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use(__2.default)
    await seneca.ready()
  })
  ;(0, node_test_1.test)('simple', async () => {
    const seneca = await makeSeneca()
    let p0 = await seneca.post('sys:progress,create:progress', {
      kind: 'simple',
    })
    // console.log('p0', p0)
    ;(0, code_1.expect)(p0.ok).true()
    ;(0, code_1.expect)(p0.item).contains({
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 0,
      status: 'active',
    })
    let p0g0 = await seneca.post('sys:progress,get:progress', {
      id: p0.item.id,
    })
    // console.log('p0g0', p0g0)
    ;(0, code_1.expect)(p0g0.ok).true()
    ;(0, code_1.expect)(p0g0.item).contains({
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 0,
      status: 'active',
    })
    let p0g1 = await seneca.post('sys:progress,get:progress', {
      id: p0.item.id,
      full: true,
    })
    // console.log('p0g1', p0g1)
    ;(0, code_1.expect)(p0g1.ok).true()
    ;(0, code_1.expect)(p0g1.item).contains({
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 0,
      status: 'active',
    })
    ;(0, code_1.expect)(p0g1.list).equal([])
    let p0u0 = await seneca.post('sys:progress,update:progress', {
      id: p0.item.id,
      how: 'step',
    })
    // console.log('p0u0', p0u0)
    ;(0, code_1.expect)(p0u0.ok).true()
    ;(0, code_1.expect)(p0u0.item).includes({
      entity$: '-/sys/progress',
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 10,
      status: 'active',
    })
    ;(0, code_1.expect)(p0u0.entry).includes({
      entity$: '-/sys/progressentry',
    })
    ;(0, code_1.expect)(p0u0.list).equal([])
    let p0u0g0 = await seneca.post('sys:progress,get:progress', {
      id: p0u0.item.id,
    })
    // console.log('p0u0g0', p0u0g0)
    ;(0, code_1.expect)(p0u0g0.ok).true()
    ;(0, code_1.expect)(p0u0g0.item).includes({
      entity$: '-/sys/progress',
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 10,
      status: 'active',
    })
    ;(0, code_1.expect)(p0u0g0.list).equal([])
    let p0u0g1 = await seneca.post('sys:progress,get:progress', {
      id: p0u0.item.id,
      full: true,
    })
    // console.log('p0u0g1', p0u0g1)
    ;(0, code_1.expect)(p0u0g1.ok).true()
    ;(0, code_1.expect)(p0u0g1.item).includes({
      entity$: '-/sys/progress',
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 10,
      status: 'active',
    })
    ;(0, code_1.expect)(p0u0g1.list[0]).includes({
      entity$: '-/sys/progressentry',
    })
    let p0u1 = await seneca.post('sys:progress,update:progress', {
      id: p0.item.id,
      how: 'val',
      val: 95,
      note: 'aaa',
      full: true,
    })
    // console.log('p0u1', p0u1)
    ;(0, code_1.expect)(p0u1.ok).true()
    ;(0, code_1.expect)(p0u1.item).includes({
      entity$: '-/sys/progress',
      kind: 'simple',
      step: 10,
      start: 0,
      end: 100,
      val: 100,
      status: 'active',
    })
    ;(0, code_1.expect)(p0u1.entry).includes({
      entity$: '-/sys/progressentry',
      note: 'aaa',
    })
    ;(0, code_1.expect)(p0u1.list[0]).includes({
      entity$: '-/sys/progressentry',
    })
    ;(0, code_1.expect)(p0u1.list[1]).includes({
      entity$: '-/sys/progressentry',
      note: 'aaa',
    })
  })
  ;(0, node_test_1.test)('basic.messages', async () => {
    const seneca = await makeSeneca()
    await (0, seneca_msg_test_1.default)(seneca, basic_messages_1.default)()
  })
  // test('maintain', Maintain)
})
async function makeSeneca(options) {
  options = options || {}
  const seneca = (0, seneca_1.default)({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('entity-util', { when: { active: true, human: 'y' } })
    .use(__2.default, options.progress)
  await seneca.ready()
  // print all message patterns
  // console.log(seneca.list())
  return seneca
}
//# sourceMappingURL=progress.test.js.map
