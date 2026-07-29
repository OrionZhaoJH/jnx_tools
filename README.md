# JNx 工具箱

JNx 系列产品辅助工具集合，数据均在本地处理，不上传任何数据。

## 工具列表

| 工具 | 说明 | 入口 |
| --- | --- | --- |
| ADC 数据分析 | 离线分析 ADC 日志文件，支持 C / B / T / Diff 数据折线图与统计 | [adc_analysis.html](adc_analysis.html) |
| BLE 分析 | 通过 Web Bluetooth API 实时连接 BLE 设备，采集并可视化 ADC 数据 | [ble_analysis.html](ble_analysis.html) |

## 目录说明

- [index.html](index.html) ：工具箱首页，展示所有工具入口卡片（可扩展）
- [adc_analysis.html](adc_analysis.html) ：ADC 数据分析工具
- [ble_analysis.html](ble_analysis.html) ：BLE 分析工具

### 新增工具

在 `index.html` 的 `TOOLS` 数组中添加一个配置对象即可，无需修改其他代码：

```js
{
  id: 'your-tool',
  title: '工具名称',
  icon: '🔧',
  desc: '工具描述',
  href: './your_tool.html',
  accent: '#10b981',
  accentSoft: '#ecfdf5',
  tags: ['标签1', '标签2'],
  enabled: true,
}
```

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

如果你想在本地先预览，可以直接双击打开 [index.html](index.html)，或者使用一个简单的静态服务器：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```
