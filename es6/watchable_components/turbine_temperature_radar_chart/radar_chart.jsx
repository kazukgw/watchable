var _ = require('lodash');
var is = require('is_js');
var React = require('react');
var Reflux = require('reflux');

var Field = require('./field');
var Axis = require('./axis');
var Series = require('./series');
var Legend = require('./legend');
var TemperatureData = require('./temperature_data');
var Config = require('./config');

var pt = React.PropTypes;

var RadarChart = React.createClass({
  propTypes: {
    data: pt.instanceOf(TemperatureData).isRequired,
    dataRangeMin: pt.number,
    dataRangeMax: pt.number,
    size: pt.number,
    topBottomPadding: pt.number,
    leftRightPadding: pt.number,
    outerWidth: pt.number,
    outerHeight: pt.number,
    colors: pt.arrayOf(pt.string).isRequired,
    series: pt.shape({
      point: pt.shape({
        attr: pt.object,
        style: pt.object
      }),
      polygon: pt.shape({
        attr: pt.object,
        style: pt.object
      })
    }),
    axis: pt.shape({
      auxAxisCount: pt.number.isRequired,
      axisLine: pt.shape({ style: pt.object }),
      axisTitle: pt.shape({ style: pt.object }),
      auxAxisLine: pt.shape({ style: pt.object })
    }),
    legend: pt.shape({
      line: pt.shape({ style: pt.object }),
      text: pt.shape({ style: pt.object })
    })
  },

  getDefaultProps() {
    return Config.getDefaultConfig();
  },

  getDynamicProps() {
    var _props = _.cloneDeep(this.props);
    _props.width = this.props.size + this.props.leftRightPadding * 2;
    _props.height = this.props.size + this.props.topBottomPadding * 2;
    _props.outerWidth = this.props.outerWidth || _props.width;
    _props.outerHeight = this.props.outerHeight || _props.height;
    _props.center = {
      x: this.props.size / 2 + this.props.leftRightPadding,
      y: this.props.size / 2 + this.props.topBottomPadding
    };
    _props.field = new Field(this.props.data, this.props.size);
    _props.field.setDataRange(this.props.dataRangeMin, this.props.dataRangeMax);
    _props.field.setCenter(_props.center.x, _props.center.y);
    _props.legendX = _props.width - this.props.leftRightPadding;
    _props.legendY = this.props.topBottomPadding;
    return _props;
  },

  getSeriesProps(i, props) {
    return {
      index: i,
      data: this.props.data,
      color: props.colors[i],
      field: props.field,
      config: props.series
    };
  },

  getAxisProps(props) {
    return {
      data: this.props.data,
      field: props.field,
      config: props.axis
    };
  },

  getLegendProps(props) {
    return {
      data: this.props.data,
      x: props.legendX,
      y: props.legendY,
      colors: props.colors,
      config: props.legend
    };
  },

  render() {
    var self = this;
    var _props = this.getDynamicProps();
    return (
      <svg className='chart-container'
           width={this.props.outerWidth} height={this.props.outerHeight}
           viewBox={`0 0 ${_props.width} ${_props.height}`} >

        <Axis {...this.getAxisProps(_props)} />

        {_.range(this.props.data.getSeriesCount()).map((i)=>{
          return (<Series key={i} {...self.getSeriesProps(i, _props)} />)
        })}

        <Legend {...this.getLegendProps(_props)} />
      </svg>
    );
  }
});

module.exports = RadarChart;
