import React from 'react';
import TextField from '@material-ui/core/TextField';

class MyInput extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    var InputProps = this.props.InputProps;
    if(!InputProps) {
      InputProps = {"className": "myinput"}
    }
    return <div style={{padding: "10px 0" }}>
      <TextField
        style={this.props.style}
        style={{width: '250px'}}
      	name={this.props.name}
        label={this.props.label}
        type={this.props.type}
        value={this.props.value}
        variant="outlined"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        error= {this.props.error}
        helperText={this.props.helperText}
        InputProps={this.props.InputProps}
        disabled={this.props.disabled}
      />
    </div>
  }
}

export default MyInput;

