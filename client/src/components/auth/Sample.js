import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import _ from "lodash";

export default class Sample extends Component {
  state = {
    value: "",
    onSelected: ""
  };
  render() {
    console.log(this.state.onSelected);
    return (
      <Autocomplete
        getItemValue={item => item.label}
        items={_.filter(
          [{ label: "apple" }, { label: "banana" }, { label: "pear" }],
          function(item) {
            return _.some(item.label, function(tag) {
              return _.startsWith(tag, this.state.value);
            });
          }
        )}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
            {item.label}
          </div>
        )}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={e => this.setState({ onSelected: e })}
      />
    );
  }
}
