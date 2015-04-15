var _ = require('lodash');
var React = require('react');

var RadarChartPolygon = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    field: React.PropTypes.object.isRequired,
    seriesIndex: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired
  },

  getPoints() {
    var self = this;
    return this.props.data.rows.map((d, i)=>{
      return self.props.field.getPointWithAxisIndex(i, d[self.props.seriesIndex + 1]).toArray().join(',');
    }).join(' ');
  },

  getStyle() {
    var style = this.props.style;
    return style;
  },

  render() {
    return (
      <polygon
        className='polygon'
        points={this.getPoints()}
        style={this.getStyle()}
      />
    );
  }
});

module.exports = RadarChartPolygon;
