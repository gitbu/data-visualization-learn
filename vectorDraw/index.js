import Vector2d from '../util/vector2d.js';





function regularPolygon(edges = 3, x, y, step) {
  // 计算每个外角的角度
  const deg = Math.PI * (1 - (edges - 2) / edges)
  // 存储每个点向量的数组
  const points = [];
  // 每个点的向量 
  let p = new Vector2d(x, y);
  const dir = new Vector2d(step, 0);

  // 生成每一个顶点的向量坐标
  for (let i = 0; i < edges; i++) {
    const temp = dir.rotate(deg);
    p = p.copy().add(temp)
    points.push(p);
  }

  console.log(points);

  return points;
}

function draw(points, engine='canvas', strokStyle = 'black', fillStyle = null) {
  if (engine === 'canvas') {
    const canvasEle = document.querySelector('#canvas');
    canvasEle.width = 500;
    canvasEle.height = 500;
    const ctx = canvasEle.getContext('2d');

    // 获取画布尺寸
    const { width, height } = canvasEle;
    // 移动到中心开始绘制图
    ctx.translate(width/2, height/2);
    // 反转坐标轴
    ctx.scale(1, -1);

    ctx.strokStyle = strokStyle;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0],points[i][1])
    }
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    ctx.stroke();
  } else {
    const bodyEle = document.querySelector('body');
    const svgEle = document.createElementNS('http://www.w3.org/2000/svg','svg')
    bodyEle.appendChild(svgEle);

    svgEle.setAttribute('width', 500);
    svgEle.setAttribute('height', 500);

    const polygonEle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    let _points = '';
    points.forEach((item, index) => {
      _points += `${item[0]} ${item[1]}`;
      if (index !== points.length -1) {
        _points += ',';
      }
    })
    svgEle.appendChild(polygonEle);
    polygonEle.setAttribute('points', _points);
    polygonEle.setAttribute('stroke', 'red');
    polygonEle.setAttribute('fill', 'none');
    polygonEle.setAttribute('transform', 'translate(300, 250) scale(1, -1)');
  }
}

// draw(regularPolygon(10, 0, -100, 100));
draw(regularPolygon(8, 0, -100, 100), 'svg');