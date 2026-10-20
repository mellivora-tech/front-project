# Design Token 梳理 — ReUI × 桌面语义体系

> 目标:前端(React + Tailwind v4 + ReUI 组件)直接复用 `design-project` 的桌面 Design Token,
> 命名与用法对齐 ReUI(shadcn/ui 超集),不出现第二套色值。

## 两套体系是什么

**ReUI**(reui.io):基于 shadcn/ui + Tailwind v4 的组件库,主题即 CSS 变量。底座是 shadcn
标准语义令牌(`--background`、`--primary`、`--muted`…),并扩展了一组状态令牌:
`--info` / `--success` / `--warning` / `--invert` 及各自的 `-foreground`,还有
`--destructive-foreground`。通过 `@theme inline` 把变量注册成 Tailwind 类。

**design-project**:桌面应用(工具+内容+协作)令牌体系,四层结构 —
`primitives`(OKLCH 12 步色阶、间距、圆角、阴影、动效)→ `semantic`(唯一解释语义的一层,
含 light/dark/hc 三主题)→ `scenarios` → `components`。构建产物
`dist/tokens.css` 暴露 `--color-*` / `--radius-*` / `--shadow-*` 等 1396 个变量,
暗色由 `html[data-theme="dark"]` 自动换指向。

## 结合方式:加一层"ReUI 命名别名层"

```
ReUI 组件(shadcn 类名)                本层 reui-tokens.css              design-project dist/tokens.css
─────────────────────   引用   ─────────────────────────  别名  ──────────────────────────────
bg-primary / text-ring   →   --primary: var(--color-action-primary-default)   →  OKLCH 色阶
```

- 组件只认 shadcn/ReUI 命名,样式决策(色阶步骤、主题、无障碍对比度)全部留在
  design-project 语义层,本层**只转发、不定义色值**。
- 暗色、高对比主题零成本:design-project 已用 `[data-theme="dark"|"contrast"]` 切换
  底层变量,本层无需写 `.dark` 重复定义。

## 完整映射表

| ReUI / shadcn 令牌 | 桌面语义令牌 | 说明 |
| --- | --- | --- |
| `--background` | `--color-bg-app` | 应用底色 |
| `--foreground` | `--color-text-primary` | 正文(≥12:1) |
| `--card` / `--popover` | `--color-bg-surface` / `--color-bg-elevated` | 表面/弹出层(层级靠 shadow) |
| `--primary` (+`-foreground`) | `--color-action-primary-default` / `-text` | 品牌实心,文字对比度生成器保证 |
| `--secondary` (+`-foreground`) | `--color-action-secondary-default` / `-text` | 描边按钮 |
| `--muted` / `--muted-foreground` | `--color-bg-sunken` / `--color-text-secondary` | 输入井、说明文字 |
| `--accent` / `--accent-foreground` | `--color-action-ghost-hover` / `--color-text-primary` | 悬浮高亮底 |
| `--destructive` / `--destructive-foreground` | `--color-action-danger-default` / `-text` | ReUI 扩展的 foreground 正好对上 |
| `--border` / `--input` | `--color-border-default` | 默认边框 |
| `--ring` | `--color-border-focus` | 焦点环(≥3:1 已校验) |
| `--info` / `-foreground` | `--color-state-info-bg` / `-text` | ReUI 用实心色,桌面是浅底深字对,成对替换 |
| `--success` / `--warning` 同理 | `--color-state-success-*` / `-warning-*` | Alert/Badge 直接可用 |
| `--invert` / `-foreground` | `--color-bg-inverse` / `--color-text-inverse` | tooltip 深底 |
| `--chart-1..5` | `--color-viz-series-1..5` | 图表分类色 |
| `--sidebar-*` | `--color-bg-surface` / `-text-primary` / `-bg-sunken` / `-border-subtle` | |
| `--radius` = `--radius-md`(6px),派生 sm/md/lg | | 沿用 shadcn `calc(var(--radius) - n)` 约定 |
| 间距 | 两边都是 4px 基数,直接用 Tailwind 默认 spacing | `space.4 = 4px` |

**语义差异点**(取舍记录):ReUI 的 `--info` 等是实心色(violet-500),桌面体系状态色一律
"浅底 + 深字"两步走(alert 专用)。映射采用桌面的成对语义,ReUI 组件拿到的是更克制、
对比度已校验的状态样式;若某个场景确实需要实心徽标,用 `--color-state-info-border` 一档替代。

## 使用

```css
/* app.css(Tailwind v4) */
@import "../design-project/dist/tokens.css";
@import "./design-tokens/reui-tokens.css";
@import "tailwindcss";
```

```html
<html data-theme="dark">  <!-- 暗色;contrast = 高对比 -->
```

```jsx
// ReUI 组件 + Tailwind 类,语义与桌面其他端一致
<button className="bg-primary text-primary-foreground rounded-md">…</button>
<span className="bg-info text-info-foreground">提示</span>
```

## 维护规则

1. 色值唯一来源是 design-project 的 `tokens/` → `npm run build`;本层禁止写死颜色。
2. 新增语义先加进 design-project 语义层,再在本层做 ReUI 命名转发。
3. 无障碍校验(design-project `npm run validate`)覆盖了对比度;改映射后重跑一次。
4. 组件侧栏、密度(默认/compact/comfortable)等桌面特有维度不经 ReUI,按需直接引用
   `--color-*` / `--density-*`。
