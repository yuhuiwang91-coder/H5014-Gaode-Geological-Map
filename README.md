# H5014 蕲春幅地质图 · 高德地图叠加

本仓库用于野外地质采样规划。网页将高分辨率 H5014.TIF 图幅处理后的 WebP 瓦片叠加到高德标准图或卫星图上。

## 当前安装状态

已添加地图网页 `index.html` 及自动解压工作流。**高清图片资源必须另外上传**，否则地图网页会缺少地质图及图例。

### 上传高清资源（只需一个 ZIP）

1. 从 ChatGPT 下载 `H5014_HighRes_Gaode_GitHub_Pages.zip`（约 15.6 MB），**保持原文件名，不必解压**。
2. 打开 [上传页面](https://github.com/yuhuiwang91-coder/H5014-Gaode-Geological-Map/upload/main)，上传该 ZIP 文件，提交到 `main` 分支。
3. [GitHub Actions](https://github.com/yuhuiwang91-coder/H5014-Gaode-Geological-Map/actions) 会自动检查 ZIP 并解压，将完整网页、图例和高清瓦片写入仓库，随后删除已上传的 ZIP。
4. 验证仓库存在 `assets/tiles/` 中的瓦片、`assets/H5014_legend.webp` 和 `assets/H5014_GCJ02_overview.webp`。

### 开启 GitHub Pages

打开仓库 Settings → Pages → Build and deployment → Source 选择 **Deploy from a branch**，Branch 选 **main**、**/(root)**，保存。

待部署完成后可访问：

https://yuhuiwang91-coder.github.io/H5014-Gaode-Geological-Map/

## 主要功能

- 标准/卫星底图切换
- 高清地质图层、透明度调整、坐标微调
- 采样点高德导航、位置定位
- 原版图例、整幅地质图查看
- 大新屋组公路剖面、陆坪采石场标注

地图底图由高德瓦片地址加载，可能因网络或服务策略而不可用。配准采用原图图框与 WGS84→GCJ-02 近似转换，尚未经地面控制点精确验证；野外实地位置仍需核验。
