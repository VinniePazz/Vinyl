import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0"
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <FormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<Radio color="primary" />}
            label={value.name}
          />
        ))
      : null;

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <>
        <List disablePadding>
          <ListItem button onClick={this.handleClick}>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
								style={{ paddingLeft: '1em' }}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
        <Divider />
      </>
    );
  }
}

export default CollapseRadio;
