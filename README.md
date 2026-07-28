# ADC 数据工具

这是一个JNx系列产品静态网页工具，支持离线分析 ADC 日志，以及 BLE 实时采集。

## 目录说明

- [adc log analysis.html](adc%20log%20analysis.html) ：主页面
- [index.html](index.html) ：GitHub Pages 首页入口，会自动跳转到主页面

## GitHub Pages 自动部署

这个仓库已经配置好 GitHub Actions，推送到 main 分支后会自动部署到 GitHub Pages。

### 操作步骤

1. 将这个仓库推送到 GitHub。
2. 打开仓库的 Settings > Pages。
3. 在 Build and deployment 中，选择 Source 为 GitHub Actions。
4. 提交并推送代码后，GitHub 会自动执行工作流。
5. 部署完成后，访问地址类似：
   - https://你的用户名.github.io/你的仓库名/

### 手动触发部署

也可以在 GitHub 仓库页面进入 Actions，选择 Deploy to GitHub Pages 后手动运行。

## 本地预览

如果你想在本地先预览，可以直接双击打开 [adc log analysis.html](adc%20log%20analysis.html)，或者使用一个简单的静态服务器：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```
