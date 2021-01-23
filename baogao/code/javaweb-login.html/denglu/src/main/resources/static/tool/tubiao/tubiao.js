
function tubiao(id,tubiao1,tubiao2){
	var dom = document.getElementById(id);
	
	tubiao1.reverse();
	tubiao2.reverse();
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	
	option = {
	    backgroundColor: 'black',
	    tooltip: {
	        show: true,
	        formatter: "{b}:{c}"
	        },
	grid: {
	        left: '5%',
	        top: '12%',
	        right: '1%',
	        bottom: '8%',
	        containLabel: true
	        },
	
	    xAxis: {
	            type: 'category',
	            axisTick: {
	                show: false,
	                alignWithLabel: false,
	                length: 5,
	
	            },
	            "splitLine": { //网格线
	                "show": false
	            },
	            inverse: 'true', //排序
	            axisLine: {
	                show: false,
	                lineStyle: {
	                    color: '#fff',
	                }
	            },
	            data: tubiao1
	        },
	    yAxis: [{
	        type: 'value',
	        show:false,
	        position: 'top',
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false,
	            lineStyle: {
	                color: '#fff',
	            }
	        },
	        splitLine: {
	            show: false
	        },
	    }],
	    series: [{
	            name: '能耗值',
	            type: 'bar',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top',
	                    formatter: '{c}',
	                    textStyle: {
	                        color: 'white' //color of value
	                    }
	                }
	            },
	            itemStyle: {
	                //通常情况下：
	                normal: {
	                    barBorderRadius: 8,
	                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
	                    color: function (params) {
	                        var colorList = [
	                            ['#b250ff', 'rgba(11,42,84,.3)'],
	                            ['#ff9717', 'rgba(11,42,84,.3)'],
	                            ['#61dbe8', 'rgba(11,42,84,.3)'],
	                            ['#1ace4a', 'rgba(11,42,84, 0.3)'],
	                        ];
	                        var index = params.dataIndex;
	                        if (params.dataIndex >= colorList.length) {
	                            index = params.dataIndex - colorList.length;
	                        }
	                        return new echarts.graphic.LinearGradient(0, 0, 0, 1,
	                            [{
	                                    offset: 0,
	                                    color: colorList[index][0]
	                                },
	                                {
	                                    offset: 1,
	                                    color: colorList[index][1]
	                                }
	                            ]);
	                    },
	                },
	            },
	            barGap: '0%',
	            barCategoryGap: '50%',
	            data: tubiao2
	        }]
	};           
	
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
}