/*
shaker 1.0 - http://github.com/keepitterron/shaker
original by
jRumble v1.1 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com
Copyright 2011, Jack Rugile
MIT license - http://www.opensource.org/licenses/mit-license.php
*/

(function($)
{
	$.fn.shake = function(options)
	{
		// add prefixed transforms to object
		var vendors = ['-webkit','-moz','-o','ms'];
		function add_transforms(o, val)
		{
			o.transform = val;
			for(var vendor in vendors) o[vendor+'-transform'] = val;
			return o;
		}
		
		var defaults = {
			on: 'hover',
			speed: 10,
			x: 2,
			y: 2,
			deg: 1,
			tazer: 1000,
			posX: 'left',
			posY: 'top'
		};
		var opt = $.extend(defaults, options);

		return this.each(function()
		{
			$obj = $(this);						
			var barman;
			// save original state for reset
			var base = {'position': $obj.css('position'), 'left' : $obj.css('left'), 'top' : $obj.css('top')}
			var original_state = add_transforms(base, 'rotate(0deg)');
			// fix element properties for movement
			if($obj.css('display') === 'inline') $obj.css('display', 'inline-block');
			if($obj.css('position') === 'static') $obj.css('position', 'relative');
			
			function shake_it(element)
			{
				var random_x = Math.floor(Math.random() * (opt.x+1)) - opt.x/2;
				var random_y = Math.floor(Math.random() * (opt.y+1)) - opt.y/2;
				var random_deg = Math.floor(Math.random() * (opt.deg+1)) -opt.deg/2;
				
				var base = {'position': $obj.css('position'), 'left' : random_x, 'top' : random_y}				
				element.css(add_transforms(base, 'rotate('+random_deg+'deg)'));
			}
			
			function start()
			{
				var shaker = $(this);
				start_with(shaker);
			}
			function stop()
			{
				stop_with($(this))
			}
			function taze(shaker)
			{
				start_with(shaker);
				setTimeout(function() { stop_with(shaker); }, opt.tazer);
			}
			function start_with(shaker)
			{
				barman = setInterval(function() { shake_it(shaker); }, opt.speed);
			}
			function stop_with(shaker)
			{				
				clearInterval(barman);
				barman = false;				
				shaker.css(original_state);
			}

			switch(opt.on)
			{
				case 'hover':  $obj.bind('mouseover touchstart', start).bind('mouseout mouseleave touchend', stop); break;
        case 'hold':   $obj.bind('mousedown touchstart', start).bind('mouseup mouseout mouseleave touchend', stop); break;
        case 'toggle': $obj.click(function(){ barman ? stop_with($(this)) : start_with($(this)) }); break;
        case 'taze': taze($obj); break;
        default: start_with($obj);
			}
		});
	}
})(jQuery);