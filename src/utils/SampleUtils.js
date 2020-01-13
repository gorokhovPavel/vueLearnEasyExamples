export default class SampleUtils {
    
    constructor( seed, months, colors ) {
        this._seed = seed;
        this._months = months;
        this._colors = colors;
    }
   
	rand = function(min, max) {
		var seed = this._seed;
		min = min === undefined ? 0 : min;
		max = max === undefined ? 1 : max;
		this._seed = (seed * 9301 + 49297) % 233280;
		return min + (this._seed / 233280) * (max - min);
    }
    
	numbers = function(config) {
		var cfg = config || {};
		var min = cfg.min || 0;
		var max = cfg.max || 1;
		var from = cfg.from || [];
		var count = cfg.count || 8;
		var decimals = cfg.decimals || 8;
		var continuity = cfg.continuity || 1;
		var dfactor = Math.pow(10, decimals) || 0;
		var data = [];
		var i, value;
		for (i = 0; i < count; ++i) {
			value = (from[i] || 0) + this.rand(min, max);
			if (this.rand() <= continuity) {
				data.push(Math.round(dfactor * value) / dfactor);
			} else {
				data.push(null);
			}
		}
		return data;
    }
    
	labels = function(config) {
		var cfg = config || {};
		var min = cfg.min || 0;
		var max = cfg.max || 100;
		var count = cfg.count || 8;
		var step = (max - min) / count;
		var decimals = cfg.decimals || 8;
		var dfactor = Math.pow(10, decimals) || 0;
		var prefix = cfg.prefix || '';
		var values = [];
		var i;
		for (i = min; i < max; i += step) {
			values.push(prefix + Math.round(dfactor * i) / dfactor);
		}
		return values;
    }
    
	months = function(config) {
		var cfg = config || {};
		var count = cfg.count || 12;
		var section = cfg.section;
		var values = [];
		var i, value;
		for (i = 0; i < count; ++i) {
			value = this._months[Math.ceil(i) % 12];
			values.push(value.substring(0, section));
		}
		return values;
    }
    
	color = function(index) {
		return this._colors[index % this._colors.length];
    }
    
	transparentize = function(color, opacity) {
		var alpha = opacity === undefined ? 0.5 : 1 - opacity;
		return 0;//Color(color).alpha(alpha).rgbString();
	}
}