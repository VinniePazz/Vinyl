import React from "react";
import Button from "../Button";
import { withStyles } from "@material-ui/core/styles";

const HomePromotion = ({ classes }) => {

  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In second hand guitars",
    linkTitle: "Shop now",
    linkTo: "/shop"
  };

  const renderPromotion = () =>
    promotion ? (
      <div
        className={classes.image}
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className={classes.wrapper}>
          <div className="tag title">{promotion.lineOne}</div>
          <div className="tag low_title">{promotion.lineTwo}</div>
          <Button
            type="default"
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            promotion
          />
        </div>
      </div>
    ) : null;

  return <div className='home_promotion'>{renderPromotion()}</div>;
};

const styles = (theme) => ({
	image: {
		height: '70vh',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		[theme.breakpoints.down("xs")]: {
			height: "100vh"
		},
	},

	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default withStyles(styles)(HomePromotion);
