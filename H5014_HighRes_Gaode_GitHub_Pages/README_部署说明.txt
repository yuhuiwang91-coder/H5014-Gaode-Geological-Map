H5014 蕲春幅 · 高清 TIFF 高德地质图叠加（2026-10-08）
源数据：用户提供 H5014.TIF，10204×5567 像素，300 dpi。
文件：
- index.html：免申请Key的交互网页（高德非官方瓦片，可能失效）
- official-amap.html：官方JS API版（需自备 Web JS API Key/安全密钥）
- assets/tiles/tile_X_Y.webp：1024px 高清地质图瓦片，颜色无损 WebP
- assets/H5014_GCJ02_highres.webp：5632×4352高清GCJ02地质图
- assets/H5014_GCJ02_overview.webp：概览图
- assets/H5014_original_full.webp：完整TIFF原图转WebP（图框、图例和文字均保留）
- assets/H5014_legend.webp：独立高清原图图例
- assets/points.geojson：原始GPS采样点
- assets/georeference.json：配准参数与限制

部署：解压全部文件至仓库根目录；Settings > Pages，main/(root) 部署。
请保留assets目录结构不变。部署后GitHub Pages地址形如：https://用户名.github.io/仓库名/

精度：图幅按 115–116E、30–30°40N 四角近似线性配准；坐标基准被假设为WGS84，并近似转换GCJ-02；原分幅投影未知、未经控制点检验，不可用于米级野外定位。高德非官方瓦片随时可能失效。
高清图层在过大缩放级别会出现正常的像素放大，但不再受之前低清GIF数据限制。
