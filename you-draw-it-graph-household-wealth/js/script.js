var data = [
  {"year": 2002.25,    "debt": 372},
  {"year": 2002.5,    "debt": 373},
  {"year": 2002.75,    "debt": 392},
  {"year": 2003,    "debt": 405},
  {"year": 2003.25,    "debt": 421},
  {"year": 2003.5,    "debt": 439},
  {"year": 2003.75,    "debt": 461},
  {"year": 2004,    "debt": 478},
  {"year": 2004.25,    "debt": 492},
  {"year": 2004.5,    "debt": 504},
  {"year": 2004.75,    "debt": 518},
  {"year": 2005,    "debt": 528},
  {"year": 2005.25,    "debt": 550},
  {"year": 2005.5,    "debt": 575},
  {"year": 2005.75,    "debt": 603},
  {"year": 2006,    "debt": 619},
  {"year": 2006.25,    "debt": 641},
  {"year": 2006.5,    "debt": 684},
  {"year": 2006.75,    "debt": 709},
  {"year": 2007,    "debt": 719},
  {"year": 2007.25,    "debt": 721},
  {"year": 2007.5,    "debt": 717},
  {"year": 2007.75,    "debt": 707},
  {"year": 2008,    "debt": 708},
  {"year": 2008.25,    "debt": 688},
  {"year": 2008.5,    "debt": 657},
  {"year": 2008.75,    "debt": 613},
  {"year": 2009,    "debt": 571},
  {"year": 2009.25,    "debt": 550},
  {"year": 2009.5,    "debt": 544},
  {"year": 2009.75,    "debt": 541},
  {"year": 2010,    "debt": 538},
  {"year": 2010.25,    "debt": 526},
  {"year": 2010.5,    "debt": 519},
  {"year": 2010.75,    "debt": 503},
  {"year": 2011,    "debt": 486},
  {"year": 2011.25,    "debt": 471},
  {"year": 2011.5,    "debt": 448},
  {"year": 2011.75,    "debt": 436},
  {"year": 2012,    "debt": 436},
  {"year": 2012.25,    "debt": 431.6},
  {"year": 2012.5,    "debt": 445},
  {"year": 2012.75,    "debt": 451},
  {"year": 2013,    "debt": 432},
  {"year": 2013.25,    "debt": 439},
  {"year": 2013.5,    "debt": 460},
  {"year": 2013.75,    "debt": 470},
  {"year": 2014,    "debt": 485},
  {"year": 2014.25,    "debt": 516},
  {"year": 2014.5,    "debt": 547},
  {"year": 2014.75,    "debt": 558},
  {"year": 2015,    "debt": 577},
  {"year": 2015.25,    "debt": 590},
  {"year": 2015.5,    "debt": 596},
  {"year": 2015.75,    "debt": 605},
  {"year": 2016,    "debt": 608},
  {"year": 2016.25,    "debt": 618},
  {"year": 2016.5,    "debt": 644},
  {"year": 2016.75,    "debt": 655},
  {"year": 2017,    "debt": 662},
  {"year": 2017.25,    "debt": 679},
  {"year": 2017.5,    "debt": 708},
  {"year": 2017.75,    "debt": 721},
  {"year": 2018,    "debt": 728},
  {"year": 2018.25,    "debt": 750},
  {"year": 2018.5,    "debt": 763},
  {"year": 2018.75,    "debt": 753},
  {"year": 2019,    "debt": 768},
  {"year": 2019.25,    "debt": 780},


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

c.x.domain([2002, 2019])
c.y.domain([350, 800])

c.xAxis.ticks(10).tickFormat(ƒ())
c.yAxis.ticks(5).tickFormat(d => '€' + d + 'bn')

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
