## 项目初始化

### 创建项目
```
# 创建项目
npm create vite@latest react-shop --template react

cd react-shop

# 安装依赖
npm install

# 安装路由库、axios、TailwindCSS
npm install react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

### 遇到的问题
```
1. 在执行最后一行命令时报错，原因是最新版的tailwindcss不适应，回退到低版本再次执行