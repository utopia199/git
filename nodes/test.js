// 子进程-收

const { execFileSync } = require('child_process');
const child_process = execFileSync('start npm install',{
    cwd:'G:\\aoneQt\\a01_pc',
    shell: true,
})
process.stdin.on('data', (chunk) => {
    let data = chunk.toString();
    let message = JSON.parse(data);
    process.stdout.write(JSON.stringify({
        type: message.type,
        data: message.data
    }));
});