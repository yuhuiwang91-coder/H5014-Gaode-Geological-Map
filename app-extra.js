'use strict';
(()=>{
 const by=id=>document.getElementById(id),side=by('side');
 const tabs=[...document.querySelectorAll('.tabs .tab')];
 function showTab(id){tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));document.querySelectorAll('.tabBody').forEach(b=>b.classList.toggle('active',b.id==='tab-'+id));}
 tabs.forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));
 by('btnMenu').onclick=()=>side.classList.toggle('open');
 by('btnCloseSide').onclick=()=>side.classList.remove('open');
 by('btnBase').onclick=()=>{if(state.mode==='road'){by('sat').click();by('btnBase').textContent='标准图';}else{by('road').click();by('btnBase').textContent='卫星图';}};
 by('btnLocate').onclick=()=>loc();
 const atlas=by('fullMapModal'),vp=by('atlasViewport'),img=by('atlasImage');let scale=1;
 function resizeAtlas(next){const ow=Math.max(1,vp.scrollWidth),oh=Math.max(1,vp.scrollHeight);const x=(vp.scrollLeft+vp.clientWidth/2)/ow,y=(vp.scrollTop+vp.clientHeight/2)/oh;scale=Math.max(.2,Math.min(9,next));img.style.width=(scale*100)+'%';requestAnimationFrame(()=>{vp.scrollLeft=x*vp.scrollWidth-vp.clientWidth/2;vp.scrollTop=y*vp.scrollHeight-vp.clientHeight/2;by('atlasStatus').textContent='缩放 '+Math.round(scale*100)+'% · 原图 '+(img.naturalWidth||'?')+' × '+(img.naturalHeight||'?')+' 像素';});}
 function fitAtlas(){const w=img.naturalWidth||10204,h=img.naturalHeight||5567;resizeAtlas(Math.min(1,(vp.clientHeight-8)/(vp.clientWidth*h/w)));vp.scrollTo(0,0);}
 function openAtlas(){atlas.hidden=false;document.body.style.overflow='hidden';if(!img.getAttribute('src'))img.src='assets/H5014_original_full.webp';requestAnimationFrame(()=>{if(img.complete&&img.naturalWidth)fitAtlas();});}
 function closeAtlas(){atlas.hidden=true;document.body.style.overflow='';}
 by('btnAtlas').onclick=openAtlas;by('openFullMap').onclick=openAtlas;by('aboutFullMap').onclick=openAtlas;by('closeFullMap').onclick=closeAtlas;
 by('atlasPlus').onclick=()=>resizeAtlas(scale*1.5);by('atlasMinus').onclick=()=>resizeAtlas(scale/1.5);by('atlasFit').onclick=fitAtlas;
 img.addEventListener('load',()=>{fitAtlas();by('atlasStatus').textContent='高清图幅已加载 · '+img.naturalWidth+' × '+img.naturalHeight+' 像素';});
 img.addEventListener('error',()=>{by('atlasStatus').textContent='图幅读取失败：请检查 assets/H5014_original_full.webp。';});
 atlas.addEventListener('click',e=>{if(e.target===atlas)closeAtlas();});
 vp.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();resizeAtlas(scale*(e.deltaY<0?1.2:1/1.2));}},{passive:false});
 let drag=null;
 vp.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,y:e.clientY,l:vp.scrollLeft,t:vp.scrollTop};img.classList.add('dragging');});
 window.addEventListener('pointermove',e=>{if(drag){vp.scrollLeft=drag.l+drag.x-e.clientX;vp.scrollTop=drag.t+drag.y-e.clientY;}});
 window.addEventListener('pointerup',()=>{drag=null;img.classList.remove('dragging');});
 vp.addEventListener('dblclick',e=>{e.preventDefault();resizeAtlas(scale*1.7);});
 const modal=by('newSampleModal');let pending=[0,0],custom=[];
 try{const parsed=JSON.parse(localStorage.getItem('H5014-field-samples-v2')||'[]');if(Array.isArray(parsed))custom=parsed.filter(p=>p&&Array.isArray(p.gcj)&&p.gcj.length===2).slice(0,1500);}catch(e){}
 function save(){try{localStorage.setItem('H5014-field-samples-v2',JSON.stringify(custom));}catch(e){notify('浏览器禁止本地存储，样点仅保留到页面关闭');}}
 function openSample(){pending=[state.lon,state.lat];by('samplePosition').textContent='以地图中心为样点 · 高德 GCJ-02：'+pending[1].toFixed(6)+'°N，'+pending[0].toFixed(6)+'°E';modal.hidden=false;by('sampleName').focus();}
 function closeSample(){modal.hidden=true;}
 by('btnNew').onclick=openSample;by('panelAddSample').onclick=openSample;by('cancelSample').onclick=closeSample;modal.addEventListener('click',e=>{if(e.target===modal)closeSample();});
 window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAtlas();closeSample();}});
 by('newSampleForm').addEventListener('submit',e=>{e.preventDefault();let name=by('sampleName').value.trim();if(!name)return;custom.push({id:'local-'+Date.now()+'-'+Math.floor(Math.random()*10000),name,rock:by('sampleRock').value.trim(),note:by('sampleNote').value.trim(),gcj:[...pending],created:new Date().toISOString()});save();by('newSampleForm').reset();closeSample();listCustom();requestRender();notify('样点已保存到当前浏览器');});
 function focusCustom(p){state.lon=p.gcj[0];state.lat=p.gcj[1];state.zoom=Math.max(state.zoom,14);state.selected={id:p.id,name:p.name,gcj:p.gcj,wgs:p.gcj};by('detailTitle').textContent=p.name;by('detailDesc').textContent=[p.rock,p.note].filter(Boolean).join(' · ')||'自采样点';by('coords').textContent='高德 GCJ-02：'+p.gcj[1].toFixed(6)+'°N，'+p.gcj[0].toFixed(6)+'°E';by('detail').classList.add('show');by('attributeInfo').textContent=p.name+'｜'+(p.rock||'岩性未填写')+'｜'+(p.note||'无备注')+'｜高德 '+p.gcj[1].toFixed(6)+', '+p.gcj[0].toFixed(6);if(innerWidth<701)side.classList.remove('open');requestRender();}
 function renderCustom(){const layer=by('markerLayer');for(const p of custom){let el=by('m-'+p.id);if(!el){el=document.createElement('div');el.id='m-'+p.id;el.className='marker custom';const name=document.createElement('span');name.className='name';name.textContent=p.name;const pin=document.createElement('span');pin.className='pin';pin.textContent='＋';el.append(name,pin);el.addEventListener('click',e=>{e.stopPropagation();focusCustom(p)});layer.appendChild(el);}const r=map.getBoundingClientRect(),c=project(state.lon,state.lat,state.zoom),pt=getScreenPoint(p.gcj[0],p.gcj[1],c,r.width,r.height);el.style.left=pt.x+'px';el.style.top=pt.y+'px';el.style.display=(pt.x<-100||pt.x>r.width+100||pt.y<-100||pt.y>r.height+100)?'none':'flex';}}
 const originalRender=render;render=function(){originalRender();renderCustom();};
 function listCustom(){const holder=by('customSampleList');holder.replaceChildren();if(!custom.length){const n=document.createElement('p');n.className='hint';n.textContent='尚无自采样点。移动地图到目标位置后点击新增。';holder.appendChild(n);return;}for(const p of custom){const row=document.createElement('div');row.className='customSample';const title=document.createElement('span');title.textContent=p.name+(p.rock?' · '+p.rock:'');const b=document.createElement('button');b.type='button';b.textContent='定位';b.onclick=()=>focusCustom(p);row.append(title,b);holder.appendChild(row);}}
 by('clearCustom').onclick=()=>{if(!custom.length)return;if(confirm('确定删除本机保存的全部自采样点？')){custom.forEach(p=>by('m-'+p.id)?.remove());custom=[];save();listCustom();requestRender();}};
 function records(){return [...CFG.points.map(p=>({name:p.name,rock:p.type,note:p.description,gcj:p.gcj,wgs:p.wgs,source:'Prave文献或邮件'})),...custom.map(p=>({...p,source:'自采样点'}))];}
 function download(name,s,mime){const blob=new Blob(['\ufeff'+s],{type:mime}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
 const csv=s=>'"'+String(s??'').replaceAll('"','""')+'"';
 by('downloadCSV').onclick=()=>{const rows=[['名称','岩性或类型','备注','GCJ02纬度','GCJ02经度','原始WGS84纬度','原始WGS84经度','来源']];records().forEach(p=>rows.push([p.name,p.rock,p.note,p.gcj[1],p.gcj[0],p.wgs?.[1]??'',p.wgs?.[0]??'',p.source]));download('H5014_field_samples.csv',rows.map(r=>r.map(csv).join(',')).join('\r\n'),'text/csv;charset=utf-8');};
 by('downloadGeoJSON').onclick=()=>{const fc={type:'FeatureCollection',name:'H5014 GCJ-02 field points (not WGS84)',features:records().map(p=>({type:'Feature',geometry:{type:'Point',coordinates:p.gcj},properties:{name:p.name,rock:p.rock,note:p.note,source:p.source,coordinate_system:'GCJ-02',original_wgs84:p.wgs||null}}))};download('H5014_field_samples_GCJ02.geojson',JSON.stringify(fc,null,2),'application/geo+json;charset=utf-8');};
 const originalSelect=selectPoint;selectPoint=function(p){originalSelect(p);by('attributeInfo').textContent=p.name+'｜'+p.type+'｜'+p.description+'｜高德 '+p.gcj[1].toFixed(6)+', '+p.gcj[0].toFixed(6);};
 function search(){const q=by('searchInput').value.trim().toLowerCase(),holder=by('searchResults');holder.replaceChildren();const matches=records().filter(p=>!q||(p.name+' '+(p.rock||'')+' '+(p.note||'')).toLowerCase().includes(q));for(const p of matches){const b=document.createElement('button');b.type='button';b.className='searchItem';b.textContent=p.name+' · '+(p.rock||'采样点');b.onclick=()=>p.id&&p.id.startsWith('local-')?focusCustom(p):selectPoint(CFG.points.find(x=>x.name===p.name)||CFG.points[0]);holder.appendChild(b);}if(!matches.length){const n=document.createElement('p');n.className='hint';n.textContent='没有找到匹配的采样点。';holder.appendChild(n);}}
 by('searchBtn').onclick=search;by('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')search();});
 by('rasterOverview').addEventListener('error',()=>notify('地质图概览加载失败，请检查 assets 文件部署情况。'));
 listCustom();requestRender();
})();