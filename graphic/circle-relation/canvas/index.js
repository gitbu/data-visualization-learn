const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';

(async function() {
  // 这里刚开始看有点小疑问，
  const data = await (await fetch(dataSource)).json();
  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value);

  const pack = d3.pack()
    .size([1600, 1600])
    .padding(3);

  const root = pack(regions);

  const ctx = document.querySelector('#canvas-container');
  const context = ctx.getContext('2d');

  function draw(ctx, node) {
    const { x, y, r, children } = node;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    // 这里的beginPath很重要，如果不加的话，每次绘制的时候都后把之前的绘制重新绘制一遍
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
    if (children) {
      children.forEach(item => {
        draw(ctx, item)
      })
    } else {
      ctx.fillStyle = 'white';
      ctx.font = '1.5rem Arial';;
      ctx.textAlign = 'center';
      ctx.fillText(node.data.name, x, y)
    }
  }

  draw(context, root);
})()