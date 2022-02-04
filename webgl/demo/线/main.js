import {
  _$,
  randomColor,
  createShaderFromScript,
  createSimpleProgram,
} from '../../util/webgl-helper.js';

let gl = null;
    const lineTypes = [{
      type: 'LINES',
      title: '基本线段',
    }, {
      type: 'LINE_STRIP',
      title: '带状线段',
    }, {
      type: 'LINE_LOOP',
      title: '闭合线段',
    }];

const RootComponent = { 
  template: `
    <div>
      <div class="line-type">
        <span
          v-for="line in lineTypes"
          :key="line.type"
        >
          <input
            type="radio"
            :name="line.type"
            :id="line.type"
            v-model="currentType"
            :value="line.type"
            @input="handleInput"
          />
          <label :for="line.type">{{line.title}}</label>
        </span>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  `,
  data() {
    return {
      currentType: 'LINES',
      positions: [],
      lineTypes,
    }

  },
  create() {
  },
  mounted() {
    const canvas = _$('#canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = canvas.getContext('webgl');
    
    const vertexShader = createShaderFromScript(gl, 'vertex', 'vertexShader');
    const fragmentShader = createShaderFromScript(gl, 'fragment', 'fragmentShader');

    const program = createSimpleProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    let a_Position = gl.getAttribLocation(program, 'a_Position');
    let a_Screen_Size = gl.getAttribLocation(program, 'a_Screen_Size');
    let u_Color = gl.getUniformLocation(program, 'u_Color');

    gl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height);

    const color = randomColor();
    gl.uniform4f(u_Color, color.r, color.g, color.b, color.a);



    gl.enableVertexAttribArray(a_Position);
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 定点如何从buffer中读取数据
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    canvas.addEventListener('click', (e) => {
      this.positions.push(e.pageX, e.pageY);
      if (this.positions.length > 0) {
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        this.render(gl);
      }
    })

  },
  methods: {
    // 渲染
		render(gl){
			gl.clear(gl.COLOR_BUFFER_BIT);
			if(this.positions.length > 0){
				gl.drawArrays(gl[this.currentType], 0, this.positions.length / 2);
			}
    },
    handleInput() {
      this.positions = [];
      this.render(gl);
    },
  }
}

const app = Vue.createApp(RootComponent)
const vm = app.mount('#app');