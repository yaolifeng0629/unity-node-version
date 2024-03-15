import fs from 'fs';
import { exec } from 'child_process';

// 读取 .nvmrc 文件获取期望的 Node 版本
fs.readFile('.nvmrc', 'utf8', (err, desiredNodeVersion) => {
    if (err) {
        console.error('.nvmrc 文件读取失败');
        process.exit(1);
    }

    desiredNodeVersion = desiredNodeVersion.trim();

    // 获取当前 Node 版本
    const currentNodeVersion = process.version.replace('v', '');

    // 如果当前 Node 版本不匹配 .nvmrc 文件中的版本
    if (currentNodeVersion !== desiredNodeVersion) {
        console.log(`当前 Node 版本 (${currentNodeVersion}) 与 .nvmrc 文件中的版本 (${desiredNodeVersion}) 不匹配`);

        // 检查是否安装了 nvm
        exec('command -v nvm', err => {
            if (err) {
                console.error('请安装 nvm 并确保它在 PATH 中可用');
                process.exit(1);
            }

            // 使用 nvm 切换到正确的 Node 版本
            exec(`nvm use ${desiredNodeVersion}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`切换到 Node 版本 ${desiredNodeVersion} 失败`);
                    console.error(stderr);
                    process.exit(1);
                }

                console.log(stdout);
            });
        });
    }
});
