// index.ts
import express from 'express';
import procurementRoutes from './api/procurement';
import insightRoutes from './api/insight';
import dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";

// 加载 .env 文件中的环境变量
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 根路径路由
app.get("/", (req, res) => {
  res.send("Welcome to the Express + TypeScript API!");
});

// 注册 API 路由
app.use('/api', procurementRoutes);
app.use('/api', insightRoutes);

// 监听端口并启动服务器
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});