const { spawnSync } = require('child_process');
const cwd = process.cwd();
function git(args, env) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8', env: Object.assign({}, process.env, env || {}) });
  return { code: r.status, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() };
}

console.log('== status ==');
console.log(git(['status', '--short']).out);

console.log('\n== add ==');
console.log(git(['add', '-A']).out || '(ok)');

console.log('\n== commit ==');
const msg = `BLE: 连接流程稳定性改造（5 页统一）

症状：① 连上后特征发现静默失败，不提示未找到 FFE1；② 连上立刻断开且无任何反馈；
      ③ 重连常常立即成功（说明重试有效，只是一次失败就放弃）。

根因：Web Bluetooth 两处时序抖动——gatt.connect() 返回时服务树尚未就绪导致首次枚举不全；
      以及刚建链就触发 gattserverdisconnected。

改造（JNA_tools / JNA_Plus_Tool / JNB_Tool / JNC_tools / ble_analysis 统一）：
- 两阶段各自重试：建链 4 次(300/700/1200ms)，特征发现 3 次(200/450ms)。
- connect() 成功后 settle 120ms 再枚举服务树，避开未就绪窗口。
- 一次 getPrimaryServices() + 并发 getCharacteristics() 后本地匹配，不再对同一服务树反复枚举。
- 意外掉线自动重连 2 次(间隔 350ms)；用 userDisconnect 标志区分主动断开，
  主动断开才释放 device，意外掉线保留 device 以便静默重连（不重复弹设备选择框）。
- 新增 discovering / partial 两个状态徽章，明确区分「链路通了」与「工具就绪/特征不全」。
- 新增 .ble-notice 提示条 + 「重试发现特征」按钮，全程显式反馈，杜绝静默失败。
- FFE1 补偿发现：启动数据流时若仍无 FFE1 会再试一次并给出提示（原为静默 return）。
- JNB 保留「无 FFE1 视为不支持 JNB 协议」语义，但把 alert 改为提示条。

另修：JNC 单次测试主指令解析侧同步 0x04 -> 0xA4（上一提交 c023489）。
sw.js 缓存版本 v2-70 -> v2-71。`;
const c = git(['commit', '-m', msg]);
console.log(c.out || c.err);

console.log('\n== local HEAD ==');
const head = git(['rev-parse', 'HEAD']);
console.log(head.out);

console.log('\n== push origin main ==');
const p = git(['push', 'origin', 'main']);
console.log('exit=' + p.code);
console.log('stdout: ' + p.out);
console.log('stderr: ' + p.err);

console.log('\n== remote head ==');
const remote = git(['ls-remote', 'origin', 'refs/heads/main']);
console.log(remote.out);
const rh = remote.out.split(/\s+/)[0];
console.log('\nmatch =', rh === head.out);
