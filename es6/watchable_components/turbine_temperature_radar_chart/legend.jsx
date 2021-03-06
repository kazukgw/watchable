var React = require('react');
var _ = require('lodash');
var RadarChartLegend = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    colors: React.PropTypes.array.isRequired,
    config: React.PropTypes.object
  },

  getDefaultProps(){
    return {
      config: {
        line: {
          style: {
            strokeWidth: '2px'
          }
        },
        text: {
          style: {}
        }
      }
    }
  },

  getLineStyle(index) {
    var style = _.cloneDeep(this.props.config.line.style);
    style.stroke = this.props.colors[index];
    return style;
  },

  render() {
    var self = this;
    return (
      <g className='legend' transform={`translate(${this.props.x},${this.props.y})`}>
        {_.range(this.props.data.getSeriesCount()).map((i)=>{
          return (
            <g key={i}>
              <line
                style={self.getLineStyle(i)}
                x1='0' y1={20 * i}
                x2='20' y2={20 * i}
              />
              <text x='25' y={20 * i} style={self.props.config.text.style}
                transform='translate(0, 5)'>
                {self.props.data.getSeriesName(i)}
              </text>
            </g>
          );
        })}
      </g>
    );
  }
});

module.exports = RadarChartLegend;
