var data = [
  {"year": 2000,    "debt": 26600},
  {"year": 2001,    "debt": 26200},
  {"year": 2002,    "debt": 25600},
  {"year": 2003,    "debt": 29300},
  {"year": 2004,    "debt": 26500},
  {"year": 2005,    "debt": 29400},
  {"year": 2006,    "debt": 36000},
  {"year": 2007,    "debt": 46300},
  {"year": 2008,    "debt": 49200},
  {"year": 2009,    "debt": 72000},
  {"year": 2010,    "debt": 69200},
  {"year": 2011,    "debt": 80600},
  {"year": 2012,    "debt": 83000},
  {"year": 2013,    "debt": 81300},
  {"year": 2014,    "debt": 75000},
  {"year": 2015,    "debt": 70000},
  {"year": 2016,    "debt": 66200},
  {"year": 2017,    "debt": 64800},
  {"year": 2018,    "debt": 56300},
  {"year": 2019,    "debt": 54900},
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

c.x.domain([2000, 2019])
c.y.domain([20000, 90000])

c.xAxis.ticks(10).tickFormat(ƒ())
c.yAxis.ticks(5).tickFormat(d => d + '')

var area = d3.area().x(ƒ('year', c.x)).y0(ƒ('debt', c.y)).y1(c.height)
var line = d3.area().x(ƒ('year', c.x)).y(ƒ('debt', c.y))

var clipRect = c.svg
  .append('clipPath#clip')
  .append('rect')
  .at({width: c.x(2010) - 2, height: c.height})

var correctSel = c.svg.append('g').attr('clip-path', 'url(#clip)')

correctSel.append('path.area').at({d: area(data)})
correctSel.append('path.line').at({d: line(data)})
yourDataSel = c.svg.append('path.your-line')

c.drawAxis()

yourData = data
  .map(function(d){ return {year: d.year, debt: d.debt, defined: 0} })
  .filter(function(d){
    if (d.year == 2010) d.defined = true
    return d.year >= 2010
  })

var completed = false

var drag = d3.drag()
  .on('drag', function(){
    var pos = d3.mouse(this)
    var year = clamp(2009, 2020, c.x.invert(pos[0]))
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
