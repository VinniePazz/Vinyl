import React from "react";
import HomeCard from "./HomeCard";
import styled from "styled-components";

import { Heading } from '../../styled_components'

const CardContainer = styled.section`
  max-width: 71.25em;
	margin: 0 auto;
	padding: 1.5rem;
`;

const CardBlock = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(200px, 1fr));

	@media (max-width: 53.125em) {
		grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
`;

const HomeCardBlock = ({ title, list }) => {

  const renderCards = (cards) =>
    cards
      ? cards.map((product, i) => <HomeCard key={i} {...product} />)
      : null;

  return (
    <CardContainer>
			<Heading shadow={true}>{title}</Heading>
			<CardBlock>
				{renderCards(list)}
			</CardBlock>
    </CardContainer>
  );
};

export default HomeCardBlock;
