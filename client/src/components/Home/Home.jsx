import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs>
          <Typography color="secondary">Column 1</Typography>
        </Grid>
        <Grid item xs>
          <Button size="large" color="secondary" variant="contained" classes={{containedSecondary: classes.containedSecondary}}>Primary</Button>
        </Grid>
        <Grid item>Column 3</Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
})

export default withStyles(styles)(Home);
