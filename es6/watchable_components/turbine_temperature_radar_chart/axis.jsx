var _ = require('lodash');
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var RadarChartAxis = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    data: React.PropTypes.array.isRequired,
    field: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired
  },

  getSize() {
    return this.props.field.getSize();
  },

  getCenter() {
    return this.props.field.getCenter();
  },

  render() {
    var self = this;
    var p = this.props;
    var degrees = p.data.getDegrees();
    var _degrees = degrees.slice(0, -1);
    var center = this.getCenter();
    var size = this.getSize();
    return (
      <g className='axis-container'>
        <g className='axis-line'>
          {degrees.map((d, i)=>{
            var pos2 = p.field.getPointWithAxisIndex(i, p.field.dataRange);
            return (
              <line className='axis-line-line' style={p.config.axisLine.style}
                    x1={center.x} y1={center.y} x2={pos2.x} y2={pos2.y} />
            );
          })}
        </g>

        <g className='axis-title' >
          {degrees.map((d, i)=>{
            var pos = p.field.getPointWithAxisIndex(i, p.field.dataRange * 1.1);
            return (
              <text style={p.config.axisTitle.style}
                    textAnchor='middle' x={pos.x} y={pos.y} >
                {d}
              </text>
            );
          })}
        </g>

        <g className='axis-auxAxis'>
          {_.range(p.config.auxAxisCount).map((axisIndex)=>{
            var textPosition = [];
            var range = p.field.dataRange / p.config.auxAxisCount * axisIndex;

            var axisAuxLines = _degrees.map((d, i)=>{
              var pos = p.field.getPointWithAxisIndex(i, range);
              var pos2 = p.field.getPointWithAxisIndex(i + 1, range);
              textPosition.push(pos);
              return (
                <line
                  className='axis-auxAxis-axis-line'
                  style={p.config.auxAxisLine.style}
                  x1={pos.x} y1={pos.y}
                  x2={pos2.x} y2={pos2.y}
                />
              );
            });

            var axisAuxText = _degrees.map((d, i)=>{
              return (
                <text
                  className='axis-auxAxis-axis-text'
                  text-anchor='start'
                  x={textPosition[i].x} y={textPosition[i].y} >
                  {i%3 === 0 ? range : ''}
                </text>
              );
            });

            return (
              <g className='axis-auxAxis-axis'>
                <g>
                  {axisAuxLines}
                </g>
                <g>
                  {axisAuxText}
                </g>
              </g>
            );
          })}
        </g>
      </g>
    );
  }
});

module.exports = RadarChartAxis;
