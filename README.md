# H5014 蕲春幅 · 高德地质地图

基于高分辨率 **H5014.TIF** （1:20万蕲春幅）制作，参考 [黄麦岭采样地图](https://yuhuiwang91-coder.github.io/Huangmailing-Field-Map/) 的操作方式。

## 在线地址

https://yuhuiwang91-coder.github.io/H5014-Gaode-Geological-Map/

如果显示 404，请在本仓库 **Settings → Pages** 中，将 Source 设为 **Deploy from a branch**，Branch 选择 **main / (root)**。页面部署/缓存刷新可能需要几分钟。

## 功能

- 手机及桌面浏览地质图，标准底图/卫星影像切换，GPS 定位
- 透明度调整，原始地层填色和符号，以高清地图瓦片展示
- 点击 **完整图幅**，在网页里查看整幅原始地质图和完整图例，可缩放、拖动、浏览器单独打开
- 图层/搜索/属性/样点/说明 5 个栏目
- 预设大新屋组公路剖面底部、陆坪采石场坐标，并支持高德导航
- 按地图中心新增自采点，保存在当前浏览器，支持 CSV/GeoJSON 导出

## 文件

`index.html` 网页入口；`styles.css` 响应式样式；`app-extra.js` 完整图幅、地图工具及样点交互；`assets/` 下存放原图、图例、地理配准概览和30张高清瓦片。

**图幅不能打开时：** 请确认 `assets/H5014_original_full.webp`（约6.2 MB）、`assets/H5014_legend.webp`、`assets/H5014_GCJ02_overview.webp` 均存在于仓库根目录的 `assets/` 文件夹。原始上传的 `H5014_HighRes_Gaode_GitHub_Pages/` 子目录仅为备份，请从仓库根目录 `index.html` 访问网站。

## 采样坐标说明

Prave et al. (2018) 第168页给出大新屋组公路剖面底部原始坐标（假定 WGS84）：30.341600°N, 115.945800°E。网页的高德叠加坐标为近似 GCJ-02。原始图框地理校正尚未经过控制点实测验证。

**导出的 GeoJSON 坐标为 GCJ-02，并非通用 GIS 默认的 WGS84。** 科研 GIS 分析前请按相应基准转换。地质图为栅格，不具备地层属性的矢量查询功能。

高德在线瓦片依赖可用的网络及相关服务，如底图加载异常可改用其他网络或配置高德官方 API。
