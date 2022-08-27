'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var Vibrant = _interopDefault(require('node-vibrant'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// This component takes a src prop (image source, can be a blob or an image path) or intercepts it's children to get the image element,
// and parses the image using node-vibrant, and finally invokes the prop callback with an array of colors.
var ColorExtractor = function (_React$Component) {
	inherits(ColorExtractor, _React$Component);

	function ColorExtractor() {
		var _temp, _this, _ret;

		classCallCheck(this, ColorExtractor);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.processImage = function () {
			if (_this.props.children) {
				// If the image element is direct children of ColorExtractor component, intercept the children and use the `src` property
				// $FlowFixMe
				if (_this.props.children.props.src) {
					_this.parseImage(_this.props.children.props.src, _this.props);
				}
			} else if (_this.props.src && typeof _this.props.src === 'string' && _this.props.src.length > 0) {
				// if the image is provided via src prop
				_this.parseImage(_this.props.src, _this.props);
			} else {
				console.error("Please provide an image url using the 'src' prop or wrap an image element under the <ColorExtractor /> component. Check out the docs for more info - https://goo.gl/rMZ5L7");
			}
		}, _this.parseImage = function (image, props) {
			Vibrant.from(image).maxColorCount(props.maxColors).getSwatches().then(function (swatches) {
				return props.getColors(_this.getColorsFromSwatches(swatches, props));
			}).catch(function (error) {
				if (error) {
					// This error is mainly due to CORS issue. So we retry again by using the default image class. But if still there is any error, we bail out!
					_this.useDefaultImageClass(image, props);
				}
			});
		}, _this.useDefaultImageClass = function (image, props) {
			// If there is any CORS issue, then the default class recreates the image element with crossOrigin set to anonymous.
			new Vibrant.DefaultOpts.ImageClass()
			// $FlowFixMe
			.load(image.src).then(function (data) {
				if (data.image) {
					Vibrant.from(data.image).getSwatches().then(function (swatches) {
						return props.getColors(_this.getColorsFromSwatches(swatches, props));
					}).catch(function (error) {
						if (error) {
							props.onError(error);
						}
					});
				}
			}).catch(function (error) {
				if (error) {
					props.onError(error);
				}
			});
		}, _this.getColorsFromSwatches = function (swatches, props) {
			var colors = [];

			for (var swatch in swatches) {
				if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
					if (props.rgb) {
						colors.push(swatches[swatch].getRgb());
					} else {
						colors.push(swatches[swatch].getHex());
					}
				}
			}

			return colors;
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	ColorExtractor.prototype.componentDidMount = function componentDidMount() {
		this.processImage();
	};

	// If the src url is being passed by the parent component, and if it updates later then we need
	// to parse the updated image again!


	ColorExtractor.prototype.componentDidUpdate = function componentDidUpdate(props) {
		// Check whether the src image or image element is new. If it's a new url, parse the image again!

		if (props.src !== this.props.src && typeof this.props.src === 'string' && this.props.src.length > 0) {
			this.parseImage(this.props.src, this.props);
		} else if (this.props.children &&
		// $FlowFixMe
		props.children.props.src !== this.props.children.props.src) {
			// $FlowFixMe
			this.parseImage(this.props.children.props.src, this.props);
		}
	};

	// Parse the image and extract the colors


	// Get the array of colors from swatches


	ColorExtractor.prototype.render = function render() {
		var length = React.Children.count(this.props.children);

		// We don't handle multiple images at the moment or custom components, sorry!
		if (length > 1) {
			throw new Error('Expected only one image element.');
		} else if (length === 1) {
			// Children should be an image element
			// $FlowFixMe
			if (this.props.children.type === 'img') {
				return this.props.children;
			} else {
				throw new Error('Expected children to be an image element but instead got a "' + this.props.children.type + '"');
			}
		} else {
			return null;
		}
	};

	return ColorExtractor;
}(React.Component);

ColorExtractor.defaultProps = {
	onError: function onError(error) {},
	// Colors can be in vec3 format (rgb or hsl) or in hex format
	getColors: function getColors(colors) {},
	rgb: false,
	hex: true,
	src: null,
	maxColors: 64
};

exports.ColorExtractor = ColorExtractor;
