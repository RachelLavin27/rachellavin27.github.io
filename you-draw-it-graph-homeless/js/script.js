var data = [

  {"year": 2014.498, "debt":3258},
  {"year": 2014.581, "debt":3335},
  {"year": 2014.664, "debt":3402},
  {"year": 2014.747, "debt":3378},
  {"year": 2014.83, "debt":3607},
  {"year": 2014.913, "debt":3738},
  {"year": 2015, "debt":3845},
  {"year": 2015.08333, "debt":3908},
  {"year": 2015.166, "debt":4135},
  {"year": 2015.249, "debt":4261},
  {"year": 2015.332, "debt":4345},
  {"year": 2015.415, "debt":4576},
  {"year": 2015.498, "debt":4668},
  {"year": 2015.581, "debt":4868},
  {"year": 2015.664, "debt":4998},
  {"year": 2015.747, "debt":5101},
  {"year": 2015.83, "debt":5324},
  {"year": 2015.913, "debt":5241},
  {"year": 2016, "debt":5715},
  {"year": 2016.08333, "debt":5811},
  {"year": 2016.166, "debt":5963},
  {"year": 2016.249, "debt":6189},
  {"year": 2016.332, "debt":6170},
  {"year": 2016.415, "debt":6358},
  {"year": 2016.498, "debt":6525},
  {"year": 2016.581, "debt":6611},
  {"year": 2016.664, "debt":6709},
  {"year": 2016.747, "debt":6847},
  {"year": 2016.83, "debt":6985},
  {"year": 2016.913, "debt":7148},
  {"year": 2017, "debt":7167},
  {"year": 2017.08333, "debt":7421},
  {"year": 2017.166, "debt":7552},
  {"year": 2017.249, "debt":7680},
  {"year": 2017.332, "debt":7699},
  {"year": 2017.415, "debt":7941},
  {"year": 2017.498, "debt":8160},
  {"year": 2017.581, "debt":8270},
  {"year": 2017.664, "debt":8374},

  {"year": 2017.83, "debt":8857},
  {"year": 2017.913, "debt":8587},
  {"year": 2018, "debt":9104},
  {"year": 2018.08333, "debt":9807},
  {"year": 2018.166, "debt":9681},
  {"year": 2018.249, "debt":9652},
  {"year": 2018.332, "debt":9846},
  {"year": 2018.415, "debt":9872},
  {"year": 2018.498, "debt":9891},
  {"year": 2018.581, "debt":9527},
  {"year": 2018.664, "debt":9698},
  {"year": 2018.747, "debt":9724},
  {"year": 2018.83, "debt":9938},
  {"year": 2018.913, "debt":9753},
  {"year": 2019, "debt":9987},
  {"year": 2019.08333, "debt":10264},
  {"year": 2019.166, "debt":10305},
  {"year": 2019.249, "debt":10378},

  {"year": 2019.415, "debt":10172},
  {"year": 2019.498, "debt":10275},

  {"year": 2019.664, "debt":10397},
  {"year": 2019.747, "debt":10514},
  {"year": 2019.83, "debt":10448},

]

var ƒ = d3.f

var sel = d3.select('#infographie').html('')
var c = d3.conventions({
  parentSel: sel,
  totalWidth: sel.node().offsetWidth,
  height: 400,
  margin: {left: 50, right: 50, top: 30, bottom: 30}
})

c.svg.append('rect').at({width: c.width, height: c.height, opacity: 0})

c.x.domain([2014.498, 2019.83])
c.y.domain([0, 10500])

c.xAxis.ticks(4).tickFormat(ƒ())
c.yAxis.ticks(5).tickFormat(d => d + '')

var area = d3.area().x(ƒ('year', c.x)).y0(ƒ('debt', c.y)).y1(c.height)
var line = d3.area().x(ƒ('year', c.x)).y(ƒ('debt', c.y))

var clipRect = c.svg
  .append('clipPath#clip')
  .append('rect')
  .at({width: c.x(2017) - 2, height: c.height})

var correctSel = c.svg.append('g').attr('clip-path', 'url(#clip)')

correctSel.append('path.area').at({d: area(data)})
correctSel.append('path.line').at({d: line(data)})
yourDataSel = c.svg.append('path.your-line')

c.drawAxis()

yourData = data
  .map(function(d){ return {year: d.year, debt: d.debt, defined: 0} })
  .filter(function(d){
    if (d.year == 2017) d.defined = true
    return d.year >= 2017
  })

var completed = false

var drag = d3.drag()
  .on('drag', function(){
    var pos = d3.mouse(this)
    var year = clamp(2015, 2020, c.x.invert(pos[0]))
    var debt = clamp(0, c.y.domain()[1], c.y.invert(pos[1]))

    yourData.forEach(function(d){
      if (Math.abs(d.year - year) < .5){
        d.debt = debt
        d.defined = true
      }
    })

    yourDataSel.at({d: line.defined(ƒ('defined'))(yourData)})

    if (!completed && d3.mean(yourData, ƒ('defined')) == 1){
      completed = true
      clipRect.transition().duration(1500).attr('width', c.x(2020))
    }
  })

c.svg.call(drag)



function clamp(a, b, c){ return Math.max(a, Math.min(b, c)) }
