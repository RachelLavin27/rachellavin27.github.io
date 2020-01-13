
*Published by The Business Post*

*Inspired by the New York Times 'You Draw It' interactive graphs.*

https://www.nytimes.com/interactive/2017/01/15/us/politics/you-draw-obama-legacy.html


*Website template was adapted by Alpha by HTML5 UP*
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


A clean, super minimal responsive template geared towards startups, app devs, and other
dedicated folks working tirelessly to launch their products. Includes a landing page,
generic page, contact page, and a page with a whole mess of pre-styled elements (something
new I'm trying out). Sass sources are also included.

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use for pretty much whatever.

(* = Not included)

Feedback, bug reports, and comments are not only welcome, but strongly encouraged :)

AJ
aj@lkn.io | @ajlkn

PS: Not sure how to get that contact form working? Give formspree.io a try (it's awesome).


Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Scrollex (github.com/ajlkn/jquery.scrollex)
		Responsive Tools (github.com/ajlkn/responsive-tools)

*Graphs were adapted from this template by BenoitFuric:*
https://github.com/BenoitFuric/you-draw-it-graph

# A great idea from the NYT

Inspired by the New York Times article : [You Draw It: What Got Better or Worse During Obama’s] (https://www.nytimes.com/interactive/2017/01/15/us/politics/you-draw-obama-legacy.html)
	
This repository is a fork from <a href="https://bl.ocks.org/1wheel/07d9040c3422dac16bd5be741433ff1e">Adam Pearce’s early/simplified version of “You draw it”</a>, based on <a href="https://d3js.org/">D3.js</a>.

## Demo
[Check the demo] (https://benoitfuric.github.io/you-draw-it-graph/) - An interactive graph which works on desktop and mobile.

![DrawIt gif](https://benoitfuric.github.io/you-draw-it-graph/DrawIt.gif)

## Set the range
In ``js/_script.js``, put the limit of the view, according to your data.

```javascript
c.x.domain([2007, 2016])
c.y.domain([0, 700])
```

## Place your graph in your page
You can define the place of the  in ``js/_script.js``.  Choose an element or an id.
```javascript
var sel = d3.select('#infographie').html('')`
```

# Todo / Option to  :
- Reveal the result with a button and not at the end of the drawing
- Display data on the graph
- Add a grid
 
