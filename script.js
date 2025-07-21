let emrData = Array(21).fill(null);

// 生成图表
function drawCharts() {
  let xDays = [];
  let yEMRs = [];

  for (let i = 0; i < 21; i++) {
    xDays.push(`day${i + 1}`);
    yEMRs.push(emrData[i]);
  }

  // 情绪代谢率图
  const emrTrace = {
    x: xDays,
    y: yEMRs,
    mode: "lines+markers",
    type: "scatter",
    line: { shape: "spline", color: "#1f77b4" },
    name: "EMR",
  };

  const emrLayout = {
    title: "Emotion Metabolic Rate (EMR) 趋势图",
    xaxis: {
      title: "天数",
      tickangle: -45,
    },
    yaxis: {
      title: "EMR",
      showgrid: true,
      zeroline: false,
    },
    margin: { t: 50, l: 50, r: 30, b: 80 },
    responsive: true,
  };

  Plotly.newPlot("emrChart", [emrTrace], emrLayout, { responsive: true });

  // 情绪恢复图（柱状图）
  const recoveryTrace = {
    x: xDays,
    y: yEMRs,
    type: "bar",
    name: "恢复效果",
    marker: { color: "#ff7f0e" },
  };

  const recoveryLayout = {
    title: "Emotion Recovery Bar Chart",
    xaxis: {
      title: "天数",
      tickangle: -45,
    },
    yaxis: {
      title: "恢复强度",
      showgrid: true,
    },
    margin: { t: 50, l: 50, r: 30, b: 80 },
    responsive: true,
  };

  Plotly.newPlot("recoveryChart", [recoveryTrace], recoveryLayout, { responsive: true });
}

// 添加数据
function addData() {
  const day = parseInt(document.getElementById("dayInput").value);
  const value = parseFloat(document.getElementById("emrInput").value);
  if (day >= 1 && day <= 21 && !isNaN(value)) {
    emrData[day - 1] = value;
    drawCharts();
  } else {
    alert("请输入1-21之间的天数和有效数字！");
  }
}

drawCharts(); // 初始渲染