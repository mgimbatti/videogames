import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import GameCard from './GameCard';

configure({adapter: new Adapter()});

let game = {
    id: 1,
    name: 'Super Mario',
    platforms: ["PC", "PlayStation V"],
    genres: ['Action','Shooter'],
    image: 'https://static.wikia.nocookie.net/doblaje/images/2/25/Mario_New_Super_Mario_Bros_U_Deluxe.png'
}

describe('<Gamecard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper =  mount(<Router><GameCard game={game} /></Router>)
  })
  it('Should render an image tag', () => {
    expect(wrapper.find('img')).toHaveLength(1)
  })
  it('Should render image passed to props', () => {
    expect(wrapper.find('img').prop('src')).toEqual(game.image)
  })
  it('Should render a "div" containing the game platforms title passed to props', () => {
    expect(wrapper.contains(<div>{game.platforms}</div>)).toEqual(true)
  })
  
});