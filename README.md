# Equitable Weighing

### 介绍 📖

该项目主要用于双屏秤的称重打印

### 安装使用步骤 📔

- **Clone：**

```text
# GitHub
git clone https://github.com/yht-7550/equitableWeighing.git
```

- **Install：**

```text
pnpm install
```

- **Run：**

```text
pnpm dev
```

- **commit：**

```
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
pnpm commit
```

### Unocss字体图标库 🎨
* 字体图标库 **[@iconify-json/material-symbols](https://icon-sets.iconify.design/material-symbols)**
```
<div class="i-material-symbols:settings w-24px h-24px"></div>
```
### 代码提交类型规范 🔨

#### commitlint.config.cjs 文件

```
{ value: "feat", name: "特性:   🚀  新增功能", emoji: "🚀" },
{ value: "fix", name: "修复:   🐞  修复缺陷", emoji: "🐞" },
{ value: "docs", name: "文档:   📚  文档变更", emoji: "📚" },
{ value: "style", name: "格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" },
{ value: "refactor", name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: "♻️" },
{ value: "perf", name: "性能:    ⚡️  性能优化", emoji: "⚡️" },
{ value: "test", name: "测试:   ✅  添加疏漏测试或已有测试改动", emoji: "✅" },
{ value: "build", name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）", emoji: "📦️" },
{ value: "ci", name: "集成:   🎡  修改 CI 配置、脚本", emoji: "🎡" },
{ value: "revert", name: "回退:   ⏪️  回滚 commit", emoji: "⏪️" },
{ value: "chore", name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: "🔨" },
{ value: "wip", name: "开发:   🕔  正在开发中", emoji: "🕔" },
{ value: "workflow", name: "工作流:   📋  工作流程改进", emoji: "📋" },
{ value: "types", name: "类型:   🔰  类型定义文件修改", emoji: "🔰" }
```
